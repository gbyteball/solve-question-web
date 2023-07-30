var questionAPIUrlL = "https://2t4unsjmrf.execute-api.us-west-2.amazonaws.com";

function getQuestionList(examId) {
    var data = {};
    data.examId = examId;

    $.ajax({
        url: questionAPIUrlL + "/getQuestionList",
        type: "GET",
        data: data,
        dataType: "JSON",
        success: function (result) {
            // console.log(result["Item"]);
            createQuestionTable(result["Item"]);
        },
        error: function (error) {
            console.log(error);
        },
    });
}
