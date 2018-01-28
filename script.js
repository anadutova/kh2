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

    lectures.push( {
        date: "12.25",
            topic: "Bemutatkozás, játékszabályok",
            address:  null,
            lecturer: "NK",
            comment:  "Lorem ipsum dolor sit amet \u25b6 \n Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet" 
    });

    var table = document.getElementById("table-body");

    for (var lecture of lectures){
        var row = document.createElement("tr");
        row.setAttribute("class", "table__row");

        let cell = document.createElement("td");
        //unicode for BLACK RIGHT-POINTING TRIANGLE
        cell.textContent = "\u25b6";
        cell.classList.add("class", "table__cell--text-align-center", "table__cell--xs-only")
        cell.addEventListener("click", function(event){
            var row = event.target.parentElement;
            var cells = row.querySelectorAll(".js-collapsibleCell");
            for (cell of cells){
                cell.classList.toggle("undisplayed");
            }
        })
        row.appendChild(cell);

        for(let i = 0; i < 5; i++) {
            let cell = document.createElement("td");
            if (i == 0 || i == 2 || i == 2) cell.setAttribute("class", "table__cell--text-align-center  table__cell--inflexible");
            else cell.setAttribute("class", "table__cell--flexible");
            if (i == 3) cell.classList.add("table_cell--data-lecturer", "js-collapsibleCell", "table__cell--text-align-center");
            if (i == 4) cell.classList.add("table_cell--data-comment", "js-collapsibleCell");
            cell.classList.add("table__cell");
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
                case 4: cell.textContent = lecture.comment;
                break;             
            }
            if (i !== 4) cell.appendChild(cellText);
            row.appendChild(cell);

            if (i == 2){
                let flexBreak = document.createElement("td");
                flexBreak.classList.add("table__flex-break");
                row.appendChild(flexBreak);
            }
        }

        table.appendChild(row);
    }
}

ready(onReady);

function createCollapsibleTable(){
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