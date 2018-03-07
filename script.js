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
            date: '02.06',
            topic: 'Bemutatkozás, játékszabályok',
            address: 'http://w3.tmit.bme.hu/kh2/kh2-01_bevezeto.pdf',
            lecturer: 'NK',
            comment: ''
        },
        {
            date: "02.13",
            topic: "Mobiltelefon-hálózatok: áttekintés, 1G, 2G (GSM)",
            address: "http://w3.tmit.bme.hu/kh2/kh2-02_mobil_1g_2g.pdf",
            lecturer: 'NK',
            comment: ''
        }
    );

    var table = document.getElementById("table-body");
    for(var i = 0; i < lectures.length; i++) {
      var lecture = lectures[i];
      var row = document.createElement("tr");
      row.setAttribute("class", "table__row");

      let cell = document.createElement("td");

      var button = document.createElement("button");
      button.classList.add("expand-button");
      button.setAttribute("role", "switch");

      var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
      svg.setAttribute("class", "expand-icon");

      var use = document.createElementNS('http://www.w3.org/2000/svg', "use");
      use.setAttributeNS('http://www.w3.org/1999/xlink', "href", "icons.svg#ic_add_white_24px");

      svg.appendChild(use);
      button.appendChild(svg);
      cell.appendChild(button);


      cell.setAttribute("class", "table__cell--text-align-center table__cell--xs-only table__cell--inflexible table__cell");
      button.addEventListener("click", function (event) {
          var button = event.target;
          var row = button.parentElement.parentElement;
          var cells = row.querySelectorAll(".js-collapsibleCell");
          for(var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            if (!cell.classList.toggle("table__cell--except-xs"))
                button.firstChild.firstChild.setAttributeNS('http://www.w3.org/1999/xlink', "href", "icons.svg#ic_remove_white_24px");
            else button.firstChild.firstChild.setAttributeNS('http://www.w3.org/1999/xlink', "href", "icons.svg#ic_add_white_24px");
          }
      })
      row.appendChild(cell);

      for (let i = 0; i < 5; i++) {
          let cell = document.createElement("td");
          if (i == 2) cell.setAttribute("class", "table__cell--text-align-center table__cell--inflexible");
          else if (i == 0) cell.setAttribute("class", "table__cell--small");
          else cell.setAttribute("class", "table__cell--flexible");
          if (i == 3) cell.setAttribute("class", "table_cell--data-lecturer table__cell--small js-collapsibleCell table__cell--text-align-center table__cell--except-xs");
          if (i == 4) cell.setAttribute("class", "table_cell--data-comment js-collapsibleCell table__cell--except-xs");
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
                  svg.setAttribute("class", "download-icon");

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
    svg4everybody();
}

ready(onReady);

function initSmoothScroll() {
    document.querySelectorAll(".menu__item").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            var elementY = document.querySelector("#" + e.target.dataset.anchor).getBoundingClientRect().top;
            var bodyY = document.querySelector("body").getBoundingClientRect().top;
            window.scroll({
                top: elementY - bodyY - 70,
                left: 0,
                behavior: 'smooth'
            });
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
        for(var i = 0; i < row.length; i++) {
          var row = row[i];
          row.insertBefore(cell.cloneNode(true), row.firstChild);
        }
    }
}

var menuCollapsed = true;

function initMenuButtonClickEvent() {
    var button = document.querySelector(".js-menuButton");
    button.addEventListener("click", function (event) {
        event.stopPropagation();
        items = document.querySelectorAll(".menu__item");
        for(var i = 0; i < items.length; i++) {
          menuCollapsed = items[i].classList.toggle("menu__item--collapsed") ;
        }
    });

    document.addEventListener("click", function (event) {
        if (!event.target.classList.contains("menu") && !menuCollapsed) {
          event.stopPropagation();
          var button = document.querySelector(".js-menuButton");
          var event = document.createEvent("MouseEvents");
          event.initEvent('click', true, true);
          button.dispatchEvent(event);
        }
    });
}

function updateLastModified() {

    var req = new XMLHttpRequest();
    req.onload = function () {
        var time = document.querySelector("#js-lastModified");
        var htmlTime = new Date(document.lastModified);
        var jsTime = new Date(this.getResponseHeader("Last-Modified"));
        time.textContent = jsTime > htmlTime ? jsTime : htmlTime;
    };
    req.open('HEAD', 'script.js');
    req.responseType = "document";
    req.send();

}
