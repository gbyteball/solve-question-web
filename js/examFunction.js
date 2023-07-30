function createExamTitleTable(jsonData) {
    let container = $("#exam_title_table");
    $("#exam_title_table *").remove();
    let table = $("<table>");
    let thead = $("<thead>");
    let tr = $("<tr>");

    let cols = Object.keys(jsonData[0]);

    $.each(cols, function (i, item) {
        let th = $("<th>");
        th.text(item);
        tr.append(th);
    });
    thead.append(tr);
    table.append(tr);

    $.each(jsonData, function (i, item) {
        let tr = $("<tr>");

        let vals = Object.values(item);

        $.each(vals, (i, elem) => {
            let td = $(
                "<td><input type='text' value='" +
                    elem +
                    // "' onclick = 'getExamSubtitleList(\"" +
                    "' onclick = 'redirectPage(\"" +
                    "subtitle.html?title=" +
                    elem +
                    "\")'></input>" +
                    "</td>"
            );
            tr.append(td);
        });
        table.append(tr);
    });
    container.append(table);
}

function createExamSubtitleTable(title, jsonData) {
    let container = $("#exam_subtitle_table");
    $("#exam_subtitle_table *").remove();
    let table = $("<table>");
    let thead = $("<thead>");
    let tr = $("<tr>");

    let cols = Object.keys(jsonData[0]);

    $.each(cols, function (i, item) {
        let th = $("<th>");
        th.text(item);
        tr.append(th);
    });
    thead.append(tr);
    table.append(tr);

    $.each(jsonData, function (i, item) {
        let tr = $("<tr>");

        let vals = Object.values(item);

        $.each(vals, (i, elem) => {
            let td = $(
                "<td><input type='text' value='" +
                    elem["S"] +
                    // "' onclick = 'getExam(\"" +
                    "' onclick = 'redirectPage(\"" +
                    "question.html?title=" +
                    title +
                    "&subtitle=" +
                    elem["S"] +
                    "\")'></input>" +
                    "</td>"
            );
            tr.append(td);
        });
        table.append(tr);
    });
    container.append(table);
}
