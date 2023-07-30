var examAPIUrl = "https://28ses1vro8.execute-api.us-west-2.amazonaws.com";

function getExamTitleList() {
    $.ajax({
        url: examAPIUrl + "/getExamTitleList",
        type: "GET",
        success: function (result) {
            createExamTitleTable(result["Items"]);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function getExamSubtitleList(title) {
    var data = {};
    data.title = title;

    $.ajax({
        url: examAPIUrl + "/getExamSubtitleList",
        type: "GET",
        data: data,
        dataType: "JSON",
        success: function (result) {
            // console.log(result["Items"]);
            createExamSubtitleTable(title, result["Items"]);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function getExam(title, subtitle) {
    var data = {};
    data.title = title;
    data.subtitle = subtitle;

    $.ajax({
        url: examAPIUrl + "/getExam",
        type: "GET",
        data: data,
        dataType: "JSON",
        success: function (result) {
            console.log(result);
            getQuestionList(result["Item"]["examId"]["S"]);
        },
        error: function (error) {
            console.log(error);
        },
    });
}
