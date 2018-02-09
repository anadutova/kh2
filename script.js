function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function initTable() {
    var lectures = new Array;

    lectures.push(
        {
            date: '02.07',
            topic: 'Bemutatkozás, játékszabályok',
            address: 'kh2-01_bevezeto.pdf',
            lecturer: 'NK',
            comment: '<a href="kh2-01_bevezeto-animacio-nelkul.pdf" class="link">Animációk nélküli változat</a>'
        },
        {
            date: "02.13",
            topic: "Technikatörténeti áttekintés",
            address: "kh2-02_tortenelem_vezetekes_arch.pdf",
            lecturer: null,
            comment: "Nem vizsgaanyag"
        },
        {
            date: "02.20–02.19",
            topic: "Analóg és digitális beszédátvitel",
            address: "kh2-03_PCM.pdf",
            lecturer: "NK"
        }
    );

    var table = document.getElementById("table-body");

    for (var lecture of lectures) {
        var row = document.createElement("tr");
        row.setAttribute("class", "table__row");

        let cell = document.createElement("td");

        var button = document.createElement("button");
        button.classList.add("expand-button");
        button.setAttribute("role", "switch");

        var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
        svg.classList.add("expand-icon");

        var use = document.createElementNS('http://www.w3.org/2000/svg', "use");
        use.setAttributeNS('http://www.w3.org/1999/xlink', "href", "icons.svg#ic_add_white_24px");

        svg.appendChild(use);
        button.appendChild(svg);
        cell.appendChild(button);


        cell.classList.add("table__cell--text-align-center", "table__cell--xs-only", "table__cell--inflexible", "table__cell");
        button.addEventListener("click", function (event) {
            var button = event.target;
            var row = button.parentElement.parentElement;
            var cells = row.querySelectorAll(".js-collapsibleCell");
            for (cell of cells) {
                if (!cell.classList.toggle("table__cell--except-xs"))
                    button.firstChild.firstChild.setAttributeNS('http://www.w3.org/1999/xlink', "href", "icons.svg#ic_remove_white_24px");
                else button.firstChild.firstChild.setAttributeNS('http://www.w3.org/1999/xlink', "href", "icons.svg#ic_add_white_24px");
            }

        })
        row.appendChild(cell);

        for (let i = 0; i < 5; i++) {
            let cell = document.createElement("td");
            if (i == 2) cell.setAttribute("class", "table__cell--text-align-center  table__cell--inflexible");
            else if (i == 0) cell.setAttribute("class", "table__cell--date");
            else cell.setAttribute("class", "table__cell--flexible");
            if (i == 3) cell.classList.add("table_cell--data-lecturer", "js-collapsibleCell", "table__cell--text-align-center", "table__cell--except-xs");
            if (i == 4) cell.classList.add("table_cell--data-comment", "js-collapsibleCell", "table__cell--except-xs");
            cell.classList.add("table__cell");
            let cellText;
            switch (i) {
                case 0: cellText = document.createTextNode(lecture.date);
                    break;
                case 1: {
                    cellText = document.createTextNode(lecture.topic);
                    var a = document.createElement("a");
                    a.classList.add("link");
                    a.textContent = lecture.topic;
                    a.href = lecture.address;
                    cellText = a;
                }
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
                case 3: cellText = document.createTextNode(lecture.lecturer || "–");
                    break;
                case 4: cell.innerHTML = lecture.comment || "–";
                    break;
            }
            if (i !== 4) cell.appendChild(cellText);
            row.appendChild(cell);

            if (i == 2) {
                let flexBreak = document.createElement("td");
                flexBreak.classList.add("table__flex-break");
                row.appendChild(flexBreak);
            }
        }

        table.appendChild(row);
    }
}

function onReady() {
    initTable();
    initMenuButtonClickEvent();
    updateLastModified();
    initSmoothScroll();
}

ready(onReady);

function initSmoothScroll() {
    document.querySelectorAll(".menu__item").forEach((item) => {
        item.addEventListener("click", (e) => {
            event.preventDefault();
            document.querySelector("#" + e.target.dataset.anchor).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
            console.log(e.target);
        });
    });
}

function initCollapsibleTable() {
    if (window.matchMedia("(max-width: 576px)").matches) {
        var tableHeader = document.querySelector(".table__header");
        tableHeader.insertBefore(document.createElement("th"), tableHeader.firstChild);
        var rows = document.querySelectorAll("tbody > tr");
        var cell = document.createElement("td");
        cell.textContent = "\u25b6";
        for (row of rows) {
            row.insertBefore(cell.cloneNode(true), row.firstChild);
            console.log("row");
        }
    }
}

var menuCollapsed = true;

function initMenuButtonClickEvent() {
    var button = document.querySelector(".js-menuButton");
    button.addEventListener("click", function (event) {
        event.stopPropagation();
        items = document.querySelectorAll(".menu__item");
        items.forEach(
            (item) => {
            menuCollapsed = item.classList.toggle("menu__item--collapsed") ;
            })
        console.log("Menu button clicked")
    });

    document.addEventListener("click", function (event) {
        if (!event.target.classList.contains("menu") && !menuCollapsed)
        {event.stopPropagation();
        document.querySelector(".js-menuButton").dispatchEvent(new Event("click"));}
    });
}

function updateLastModified() {

    var req = new XMLHttpRequest();
    req.responseType = "document";
    req.onload = function () {
        var time = document.querySelector("#js-lastModified");
        time.textContent = this.getResponseHeader("Last-Modified");
    };
    req.open('HEAD', 'script.js');
    req.send();
}