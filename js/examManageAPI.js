var examAPIUrl = "https://28ses1vro8.execute-api.us-west-2.amazonaws.com";

function getExamList() {
    $.ajax({
        url: examAPIUrl + "/getExamList",
        type: "GET",
        success: function (result) {
            createExamTable(result["Items"]);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function putExam() {
    var data = {};
    data.Item = {};
    data.Item.title = document.getElementById("put_exam_title").value;
    data.Item.subtitle = document.getElementById("put_exam_subtitle").innerHTML;
    data.Item.examId = document.getElementById("put_exam_examId").innerHTML;
    data.Item.category = document.getElementById("put_exam_category").value;
    data.Item.round = document.getElementById("put_exam_round").value;
    data.Item.date = document.getElementById("put_exam_date").value;
    // var tagArray = [];
    data.Item.tags = document.getElementById("put_exam_tags").value.split(",");
    // data.Item.tags = { ...tagArray };

    $.ajax({
        url: examAPIUrl + "/putExam",
        type: "POST",
        data: JSON.stringify(data),
        dataType: "JSON",
        success: function (result) {
            // console.log(result);
            alert("Created.");
            getExamList();
        },
        error: function (error) {
            console.log(error);
        },
    });
}
