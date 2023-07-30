function createQuestionTable(jsonData) {
    if (!jsonData) {
        let container = $("#question_table");
        $("#question_table *").remove();
        let table = $("<table>");
        let tr = $("<tr>");
        let td = $("<td>입력된 문제가 없습니다.</td>");
        tr.append(td);
        table.append(tr);
        container.append(table);
        return;
    }

    let container = $("#question_table");
    $("#question_table *").remove();
    let table = $("<table>");
    let thead = $("<thead>");
    let tr = $("<tr>");

    var th = $("<th>");
    // th.text("examId");
    // tr.append(th);

    // th = $("<th>");
    th.text("no");
    tr.append(th);

    // th = $("<th>");
    // th.text("questionId (unique)");
    // tr.append(th);

    th = $("<th>");
    th.text("content (HTML)");
    tr.append(th);

    th = $("<th>");
    th.text("examples");
    tr.append(th);

    th = $("<th>");
    th.text("tag");
    tr.append(th);

    thead.append(tr);
    table.append(tr);

    tr = $("<tr>");

    // let td = $("<td>" + jsonData["examId"]["S"] + "</td>");
    // tr.append(td);

    td = $("<td>" + jsonData["no"]["N"] + "</td>");
    tr.append(td);

    // td = $("<td>" + jsonData["questionId"]["S"] + "</td>");
    // tr.append(td);

    td = $("<td>" + jsonData["content"]["S"] + "</td>");
    tr.append(td);

    td = $("<td><div id='example_table'></div>" + "</td>");
    tr.append(td);

    td = $("<td>" + jsonData["tag"]["S"] + "</td>");
    tr.append(td);

    table.append(tr);
    container.append(table);

    createExampleTable(jsonData["examples"]);
}

function createExampleTable(jsonData) {
    let container = $("#example_table");
    let table = $("<table>");
    let thead = $("<thead>");
    let tr = $("<tr>");

    var th = $("<th>");
    th.text("no");
    tr.append(th);

    th = $("<th>");
    th.text("example");
    tr.append(th);

    th = $("<th>");
    th.text("isAnswer");
    tr.append(th);

    // th = $("<th>");
    // th.text("tag");
    // tr.append(th);

    thead.append(tr);
    table.append(tr);

    $.each(jsonData["L"], function (i, item) {
        tr = $("<tr>");
        item = item["M"];

        let td = $("<td>" + item["no"]["N"] + "</td>");
        tr.append(td);

        td = $("<td>" + item["example"]["S"] + "</td>");
        tr.append(td);

        td = $("<td>" + item["isAnswer"]["BOOL"] + "</td>");
        tr.append(td);

        // td = $("<td>" + item["tag"]["S"] + "</td>");
        // tr.append(td);

        table.append(tr);
    });

    container.append(table);
}
