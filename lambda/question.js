import {
    GetItemCommand,
    QueryCommand,
    DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

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
    inputParam.TableName = "question";

    if (method == "GET" && path == "/getQuestionList") {
        var command, response;
        if (typeof event.queryStringParameters !== "undefined") {
            inputParam.Key = {};
            var item;
            if (typeof event.queryStringParameters.examId !== "undefined") {
                item = event["queryStringParameters"]["examId"];
                inputParam.Key.examId = { S: item };
            }
            console.log(inputParam);
            command = new GetItemCommand(inputParam);
            response = await client.send(command);

            return response;
        }
    }

    return event;
};
