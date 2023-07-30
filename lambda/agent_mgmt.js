import {
    ConnectClient,
    ListUsersCommand,
    DescribeUserCommand,
    CreateUserCommand,
    DeleteUserCommand,
    UpdateUserIdentityInfoCommand,
    UpdateUserPhoneConfigCommand,
    UpdateUserRoutingProfileCommand,
    UpdateUserSecurityProfilesCommand,
    ListRoutingProfilesCommand,
    ListSecurityProfilesCommand,
    ListTagsForResourceCommand,
} from "@aws-sdk/client-connect"; // ES Modules import

const client = new ConnectClient();

export const handler = async (event) => {
    // Agent(상담사) 관리

    var inputParam = {};
    inputParam.InstanceId = "1a5cb6a4-e53e-4ba9-aeae-94e9a8970226";

    var method, path, command, result;
    var response = {};
    response.headers = {};

    // console.log('event : ' + JSON.stringify(event));
    // console.log('body : ' + JSON.parse(event['body']));
    // console.log('search_option : ' + JSON.parse(event['body']).search_option);

    method = JSON.stringify(
        event["requestContext"]["http"]["method"]
    ).replaceAll('"', "");
    path = JSON.stringify(event["requestContext"]["http"]["path"]).replaceAll(
        '"',
        ""
    );
    console.log("method : " + method);
    console.log("path : " + path);

    if (method == "GET" && path == "/listUsers") {
        // 목록 조회
        console.log("Case : listUsers");

        command = new ListUsersCommand(inputParam);
        result = await client.send(command);

        result.UserSummaryList.sort(arrOrder("Username"));

        response.statusCode = 200;
        response.body = JSON.stringify(result.UserSummaryList);
    } else if (method == "GET" && path == "/getUser") {
        // 상세 조회
        console.log("Case : getUser");
        // console.log(event['queryStringParameters']['user_id']);

        inputParam.UserId = event["queryStringParameters"]["user_id"];
        // inputParam.UserId = JSON.parse(event['body']).user_id;

        command = new DescribeUserCommand(inputParam);
        result = await client.send(command);

        response.statusCode = 200;
        response.body = JSON.stringify(result.User);
    } else if (method == "POST" && path == "/createUser") {
        // 생성
        console.log("Case : createUser");

        let buff = Buffer.from(event["body"], "base64");
        let eventBodyStr = buff.toString("UTF-8");
        let eventBody = JSON.parse(eventBodyStr);
        // console.log(eventBody);

        inputParam = Object.assign(inputParam, eventBody);
        console.log(inputParam);
        // inputParam = Object.assign(inputParam, JSON.parse(event['body']));
        // inputParam = { // CreateUserRequest
        //   Username: "createUser", // required
        //   Password: "!pwd1234Abcd",
        //   IdentityInfo: { // UserIdentityInfo
        //     FirstName: "first",
        //     LastName: "last",
        //     // Email: "STRING_VALUE",
        //     // SecondaryEmail: "STRING_VALUE",
        //     // Mobile: "STRING_VALUE",
        //   },
        //   PhoneConfig: { // UserPhoneConfig
        //     PhoneType: "SOFT_PHONE", // required
        //     AutoAccept: false,
        //     // AfterContactWorkTimeLimit: Number("int"),
        //     DeskPhoneNumber: "",
        //   },
        //   // DirectoryUserId: "STRING_VALUE",
        //   SecurityProfileIds: [ // SecurityProfileIds // required
        //     "c08c4ead-c35b-423a-925b-da4eb2ae2399",
        //   ],
        //   RoutingProfileId: "d6c58b73-9a28-4dd1-9ab2-90d46453bf3c", // required
        //   // HierarchyGroupId: "STRING_VALUE",
        //   InstanceId: "1a5cb6a4-e53e-4ba9-aeae-94e9a8970226", // required
        //   Tags: {},
        // };
        console.log(inputParam);

        command = new CreateUserCommand(inputParam);
        result = await client.send(command);

        response.statusCode = 200;
        response.body = JSON.stringify(result);
    } else if (method == "DELETE" && path == "/deleteUser") {
        // 삭제
        console.log("Case : deleteUser");

        inputParam.UserId = event["queryStringParameters"]["user_id"];
        // inputParam.UserId = JSON.parse(event['body']).user_id;

        command = new DeleteUserCommand(inputParam);
        result = await client.send(command);

        response.statusCode = 200;
        response.body = JSON.stringify(result);
    } else if (method == "PUT" && path == "/updateUser") {
        // 수정
        console.log("Case : updateUser");

        let buff = Buffer.from(event["body"], "base64");
        let eventBodyStr = buff.toString("UTF-8");
        let eventBody = JSON.parse(eventBodyStr);
        // console.log(eventBody);

        inputParam = Object.assign(inputParam, eventBody);
        console.log(inputParam);
        // inputParam = Object.assign(inputParam, JSON.parse(event['body']));
        // inputParam = {
        //   UserId: "STRING_VALUE", // required
        //   InstanceId: "STRING_VALUE", // required
        //   IdentityInfo: { // UserIdentityInfo
        //     FirstName: "STRING_VALUE",
        //     LastName: "STRING_VALUE",
        //     Email: "STRING_VALUE",
        //     SecondaryEmail: "STRING_VALUE",
        //     Mobile: "STRING_VALUE",
        //   },
        //   PhoneConfig: { // UserPhoneConfig
        //     PhoneType: "SOFT_PHONE" || "DESK_PHONE", // required
        //     AutoAccept: true || false,
        //     AfterContactWorkTimeLimit: Number("int"),
        //     DeskPhoneNumber: "STRING_VALUE",
        //   },
        //   RoutingProfileId: "d6c58b73-9a28-4dd1-9ab2-90d46453bf3c", // required
        //   SecurityProfileIds: [ // SecurityProfileIds // required
        //     "c08c4ead-c35b-423a-925b-da4eb2ae2399",
        //   ],
        // };

        command = new UpdateUserIdentityInfoCommand(inputParam);
        result = await client.send(command);
        console.log(JSON.stringify(result));
        command = new UpdateUserPhoneConfigCommand(inputParam);
        result = await client.send(command);
        console.log(JSON.stringify(result));
        command = new UpdateUserRoutingProfileCommand(inputParam);
        result = await client.send(command);
        console.log(JSON.stringify(result));
        command = new UpdateUserSecurityProfilesCommand(inputParam);
        result = await client.send(command);
        console.log(JSON.stringify(result));

        response.statusCode = 200;
        response.body = JSON.stringify(result);
    } else if (method == "GET" && path == "/listRoutingProfiles") {
        // RoutingProfile 조회
        console.log("Case : listRoutingProfiles");

        command = new ListRoutingProfilesCommand(inputParam);
        result = await client.send(command);

        result.RoutingProfileSummaryList.sort(arrOrder("Name"));

        response.statusCode = 200;
        response.body = JSON.stringify(result.RoutingProfileSummaryList);
    } else if (method == "GET" && path == "/listSecurityProfiles") {
        // SecurityProfile 조회
        console.log("Case : listSecurityProfiles");

        command = new ListSecurityProfilesCommand(inputParam);
        result = await client.send(command);

        result.SecurityProfileSummaryList.sort(arrOrder("Name"));

        response.statusCode = 200;
        response.body = JSON.stringify(result.SecurityProfileSummaryList);
    } else if (method == "GET" && path == "/listTagsForResource") {
        // TagsForResource 조회
        console.log("Case : listTagsForResource");

        inputParam.resourceArn = event["queryStringParameters"]["resource_arn"];
        console.log(inputParam);

        command = new ListTagsForResourceCommand(inputParam);
        result = await client.send(command);

        response.statusCode = 200;
        response.body = JSON.stringify(result.tags);
    } else {
        console.log("Case : default");

        response.statusCode = 200;
        response.body = "empty";
    }

    return response;
};

function arrOrder(key) {
    return function (a, b) {
        if (a[key] > b[key]) {
            return 1;
        } else if (a[key] < b[key]) {
            return -1;
        }

        return 0;
    };
}
