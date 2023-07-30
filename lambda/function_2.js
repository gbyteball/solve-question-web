import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    GetCommand,
    ScanCommand,
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    // console.log(event);
    const phonenumber =
        event["Details"]["ContactData"]["CustomerEndpoint"]["Address"];
    console.log("phonenumber : ", phonenumber);

    const command = new ScanCommand({
        TableName: "table_1",
    });

    const result = await docClient.send(command);
    // console.log(result);
    // console.log(result.Item);

    var response = {};
    if (result.Item) {
        console.log("Item defined");
        response = {
            statusCode: 200,
            isExist: "true",
            date: result.Item.date,
            time: result.Item.time,
        };
    } else {
        console.log("Item unefined");
        response = {
            statusCode: 200,
            isExist: "false",
        };
    }

    return response;
};
