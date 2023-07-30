import {
    GetItemCommand,
    QueryCommand,
    DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
    PutCommand,
    DeleteCommand,
    ScanCommand,
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    console.log(event);

    var method = JSON.stringify(
        event["requestContext"]["http"]["method"]
    ).replaceAll('"', "");
    var path = JSON.stringify(
        event["requestContext"]["http"]["path"]
    ).replaceAll('"', "");
    console.log("method : " + method);
    console.log("path : " + path);

    var inputParam = {};
    inputParam.TableName = "exam";

    if (method == "GET" && path == "/getExamTitleList") {
        inputParam.ProjectionExpression = "#T";
        inputParam.ExpressionAttributeNames = {
            "#T": "title",
        };
        const command = new ScanCommand(inputParam);
        const response = await docClient.send(command);

        // JSON배열 중복제거
        response.Items = [...new Set(response.Items.map(JSON.stringify))].map(
            JSON.parse
        );
        return response;
    } else if (method == "GET" && path == "/getExamSubtitleList") {
        inputParam.ProjectionExpression = "subtitle";
        inputParam.KeyConditionExpression = "title = :title";
        inputParam.ExpressionAttributeValues = {
            ":title": { S: event["queryStringParameters"]["title"] },
        };
        // console.log(inputParam);
        command = new QueryCommand(inputParam);
        response = await docClient.send(command);

        return response;
    } else if (method == "GET" && path == "/getExam") {
        // console.log(event);
        var command, response;
        if (typeof event.queryStringParameters !== "undefined") {
            inputParam.Key = {};
            var item;
            if (typeof event.queryStringParameters.title !== "undefined") {
                item = event["queryStringParameters"]["title"];
                inputParam.Key.title = { S: item };
            }
            if (typeof event.queryStringParameters.subtitle !== "undefined") {
                item = event["queryStringParameters"]["subtitle"];
                inputParam.Key.subtitle = { S: item };
            }
            console.log(inputParam);
            command = new GetItemCommand(inputParam);
            response = await client.send(command);
        } else {
            console.log(inputParam);
            command = new QueryCommand(inputParam);
            response = await client.send(command);
        }

        return response;
    } else if (method == "GET" && path == "/getExamList") {
        const command = new ScanCommand(inputParam);
        const response = await docClient.send(command);

        return response;
    } else if (method == "POST" && path == "/putExam") {
        // console.log(event);
        let buff = Buffer.from(event["body"], "base64");
        let eventBodyStr = buff.toString("UTF-8");
        let eventBody = JSON.parse(eventBodyStr);
        // console.log(eventBody);

        inputParam = Object.assign(inputParam, eventBody);
        console.log(inputParam);

        const command = new PutCommand(inputParam);
        const response = await docClient.send(command);

        return response;
    } else if (method == "DELETE" && path == "/deleteExam") {
        inputParam.Key = {};
        inputParam.Key.title = event["queryStringParameters"]["title"];
        inputParam.Key.subtitle = event["queryStringParameters"]["subtitle"];

        const command = new DeleteCommand(inputParam);
        const response = await docClient.send(command);

        return response;
    }

    return event;
};
