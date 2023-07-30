function createExamTable(jsonData) {
    if (!jsonData) {
        let container = $("#exam_table");
        $("#exam_table *").remove();
        let table = $("<table>");
        let tr = $("<tr>");
        let td = $("<td>입력된 시험이 없습니다.</td>");
        tr.append(td);
        table.append(tr);
        container.append(table);
        return;
    }

    let container = $("#exam_table");
    $("#exam_table *").remove();
    let table = $("<table>");
    let thead = $("<thead>");
    let tr = $("<tr>");

    var th = $("<th>");
    th.text("title (PK)");
    tr.append(th);

    th = $("<th>");
    th.text("subtitle (SK)");
    tr.append(th);

    th = $("<th>");
    th.text("examId (unique)");
    tr.append(th);

    th = $("<th>");
    th.text("category");
    tr.append(th);

    th = $("<th>");
    th.text("round");
    tr.append(th);

    th = $("<th>");
    th.text("date");
    tr.append(th);

    th = $("<th>");
    th.text("tags");
    tr.append(th);

    thead.append(tr);
    table.append(tr);

    $.each(jsonData, function (i, item) {
        tr = $("<tr>");

        var tdPrefix =
            "<td style='cursor:pointer;' " +
            "data-title='" +
            item["title"] +
            "' " +
            "data-subtitle='" +
            item["subtitle"] +
            "' " +
            "data-exam-id='" +
            item["examId"] +
            "' " +
            "data-category='" +
            item["category"] +
            "' " +
            "data-round='" +
            item["round"] +
            "' " +
            "data-date='" +
            item["date"] +
            "' " +
            "data-tags='" +
            item["tags"] +
            "' " +
            ">";
        var td = $(tdPrefix + item["title"] + "</td>");
        tr.append(td);

        td = $(tdPrefix + item["subtitle"] + "</td>");
        tr.append(td);

        td = $(tdPrefix + item["examId"] + "</td>");
        tr.append(td);

        td = $(tdPrefix + item["category"] + "</td>");
        tr.append(td);

        td = $(tdPrefix + item["round"] + "</td>");
        tr.append(td);

        td = $(tdPrefix + item["date"] + "</td>");
        tr.append(td);

        td = $(tdPrefix + item["tags"] + "</td>");
        tr.append(td);

        table.append(tr);
    });

    container.append(table);
}

function makePutExamVariables() {
    var title = document.getElementById("put_exam_title").value;
    var category = document.getElementById("put_exam_category").value;
    var round = document.getElementById("put_exam_round").value;
    var date = document.getElementById("put_exam_date").value;

    document.getElementById("put_exam_subtitle").innerHTML =
        category + "_" + round + "_" + date;

    document.getElementById("put_exam_examId").innerHTML =
        title + "_" + document.getElementById("put_exam_subtitle").innerHTML;
}

function onExamTableClick(event) {
    // console.log("onExamTableClick", event);
    var title = event.target.dataset.title;
    var subtitle = event.target.dataset.subtitle;
    var examId = event.target.dataset.examId;
    var category = event.target.dataset.category;
    var round = event.target.dataset.round;
    var date = event.target.dataset.date;
    var tags = event.target.dataset.tags;

    fillPutExamForm(title, subtitle, examId, category, round, date, tags);
}

function fillPutExamForm(title, subtitle, examId, category, round, date, tags) {
    document.getElementById("put_exam_title").value = title;
    document.getElementById("put_exam_subtitle").innerHTML = subtitle;
    document.getElementById("put_exam_examId").innerHTML = examId;
    document.getElementById("put_exam_category").value = category;
    document.getElementById("put_exam_round").value = round;
    document.getElementById("put_exam_date").value = date;
    document.getElementById("put_exam_tags").value = tags;
}
