function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

function onReady(){
    var lectures = new Array(5).fill(
        {
            date: "12.25",
            topic: "Bemutatkozás, játékszabályok",
            address:  null,
            lecturer: "NK",
            comment:  "Lorem ipsum dolor sit amet"     
        }
    );

    var table = document.getElementById("table-body");

    for (var lecture of lectures){
        var row = document.createElement("tr");
        row.setAttribute("class", "table__row");

        let cell = document.createElement("td");
        cell.textContent = "\u25b6";
        row.appendChild(cell);

        for(let i = 0; i < 5; i++) {
            let cell = document.createElement("td");
            if (i == 0 || i == 2 || i == 3) cell.setAttribute("class", "table__cell--text-align-center");
            let cellText;
            switch (i) {
                case 0: cellText = document.createTextNode(lecture.date);
                break;
                case 1: cellText = document.createTextNode(lecture.topic);
                break;
                case 2: cellText = document.createTextNode(lecture.address);
                break;
                case 3: cellText = document.createTextNode(lecture.lecturer);
                break;
                case 4: cellText = document.createTextNode(lecture.comment);
                break;             
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }
    createFoldedTable();
}

ready(onReady);

function createFoldedTable(){
    if (window.matchMedia("(max-width: 576px)").matches) {
        var tableHeader = document.querySelector(".table__header");
        tableHeader.insertBefore(document.createElement("th"), tableHeader.firstChild);
        var rows = document.querySelectorAll("tbody > tr");
        var cell = document.createElement("td");
        cell.textContent = "\u25b6";
        for (row of rows)
            {
                row.insertBefore(cell.cloneNode(true), row.firstChild);
                console.log("row");
            }
    }
}