function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

function onReady(){
    initMenuButtonClickEvent();

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
            topic: "Bemutatkozás, játékszabályok Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet ",
            address:  null,
            lecturer: "NK",
            comment:  "Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet" 
    });

    lectures.push( {
        date: "12.25",
            topic: "Bemutatkozás, játékszabályok",
            address:  null,
            lecturer: "NK",
            comment:  "Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet" 
    });

    var table = document.getElementById("table-body");

    for (var lecture of lectures){
        var row = document.createElement("tr");
        row.setAttribute("class", "table__row");

        let cell = document.createElement("td");
        //unicode for BLACK RIGHT-POINTING TRIANGLE
        cell.textContent = "\u25b6";
        cell.classList.add("table__cell--text-align-center", "table__cell--xs-only", "table__cell--inflexible", "table__cell");
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
                case 2: {
                    var a = document.createElement("a");
                    a.classList.add("download-button");
                    a.setAttributeNode(document.createAttribute("download"));
                    a.setAttribute("href", lecture.address)

                    var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                    svg.classList.add("download-icon");

                    var use = document.createElementNS('http://www.w3.org/2000/svg', "use");
                    use.setAttributeNS('http://www.w3.org/1999/xlink', "href", "icons.svg#ic_file_download_white_24px");

                    svg.appendChild(use);
                    a.appendChild(svg);

                    cellText = a;
                }
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

function initCollapsibleTable(){
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

function initMenuButtonClickEvent(){
    var button = document.querySelector(".js-menuButton");
    button.addEventListener("click", function(event){
     menu = document.querySelector(".menu__items");
     menu.style.display = !menu.style.display || menu.style.display === 'none' ? 'flex' : 'none';
     console.log("Menu button clicked")
    })

    window.matchMedia("(min-width: 577px)").addListener(() => {
        menu = document.querySelector(".menu__items");
        menu.removeAttribute("style");
    });

}