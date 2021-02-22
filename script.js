var arrTov = [];

function fibonaci() {
    //let n = prompt("Введіть n: ")
    let n = document.getElementById("textFi").value;
    let f0 = 0;
    let f1 = 1;
    let f2 = 1;

    if (n == 1) document.getElementById("numfi").innerText = 'n чисел Фібоначі: ' + f0 + ' ';
    else if (n == 2) document.getElementById("numfi").innerText = 'n чисел Фібоначі: ' + f0 + ' ' + f1 + ' ';
    else if (n > 2) document.getElementById("numfi").innerText = 'n чисел Фібоначі: ' + f0 + ' ' + f1 + ' ';
    else document.getElementById("numfi").innerText = "Ви ввели 0 або некоректне значення!!!";

    for (let i = 0; i < n - 2; i++) {
        f2 = f1 + f0;
        f0 = f1;
        f1 = f2;
        document.getElementById("numfi").innerHTML += f2 + ' ';
    }
}

function floor_s() {
    //let n = prompt("Введіть кількість поверхів:")
    let n = document.getElementById("textFn").value;
    let f = document.getElementById("textFf").value;
    if (n <= 0) {
        alert("Поверх неможливий, перевірте вхідні дані");
        //n = prompt("Спробуйте ввести кількість поверхів ще раз:");
    } else if (f / 3 > n || f <= 0) {
        alert("Номер квартири неможливий, перевірте вхідні дані");
    } else {
        document.getElementById("floors1").innerText = "Кількість поверхів: " + n;
        //f = prompt("В будинку " + n + " поверхів та " + (n * 3) + " квартир. " + "Введіть номер квартири:");
        document.getElementById("floors2").innerText = "Обрана квартира: " + f;
        /*while (f / 3 > n || f <= 0) {
            alert("Кваритири не існує!!! Спробуйте ввести інше значення!");
            //f = prompt("В будинку " + n + " поверхів та " + (n * 3) + " квартир. " + "Введіть номер квартири:");
        }*/

        f--;
        let current_floor = Math.floor(f / 3) + 1;
        //alert(current_floor)
        let cfup = current_floor + 1;
        let cfdown = current_floor - 1;

        if (current_floor % 2 == 1) {
            document.getElementById("floors3").innerText = "Результат: Ліфт підніметься на " + current_floor + " поверсі. Шукайте квартиру на даному поверсі.";
        } else if (current_floor % 2 == 0 && cfup <= n) {
            document.getElementById("floors3").innerText = "Результат: Ліфт підніметься на " + cfup + " поверсі. Шукайте квартиру поверхом нижче.";
        } else if (current_floor % 2 == 0 && cfup > n) {
            document.getElementById("floors3").innerText = "Результат: Ліфт підніметься на " + cfdown + " поверсі. Шукайте квартиру поверхом вишче.";
        } else {
            document.getElementById("floors3").innerText = "Результат: Помилка, спробуйте ще раз";
        }
    }
}

function matrix() {
    let m = document.getElementById("textMm").value;
    let n = document.getElementById("textMn").value;

    let matrix = [];
    let m3 = document.getElementById("m3");
    //let row = []

    //body reference 
    var body = document.getElementById("matrixdiv");

    body.innerHTML = "";

    // create elements <table> and a <tbody>
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    for (let i = 0; i < m; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row[j] = -10 + Math.floor(Math.random() * Math.floor(20));
        }
        matrix[i] = row;
    }

    // cells creation
    for (var j = 0; j < n; j++) {
        // table row creation
        var row = document.createElement("tr");

        for (var i = 0; i < m; i++) {
            // create element <td> and text node 
            //Make text node the contents of <td> element
            // put <td> at end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matrix[i][j]);

            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        //row added to end of table body
        tblBody.appendChild(row);
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);
    // put <table> in the <body>
    body.appendChild(tbl);
    // tbl border attribute to 
    tbl.setAttribute("border", "2");
    tblBody.appendChild(row);

    let plusNum = document.getElementById("m4");
    let minusNum = document.getElementById("m5");
    plusNum.innerHTML = "Додатні числа: ";
    minusNum.innerHTML = "Від'ємні числа:";

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] > 0) {
                plusNum.innerHTML += matrix[i][j] + "&nbsp;";
            } else if (matrix[i][j] < 0) {
                minusNum.innerHTML += matrix[i][j] + "&nbsp;";
            }
        }
    }
}

function schedule() {
    let date = new Date(document.getElementById("date").value);
    let day = date.getDay();
    let gr = String(document.getElementById("group").value);
    let days = ["неділю", "понеділок", "вівторок", "середу", "четвер", "п'ятницю", "cуботу"];
    let paragraph = document.getElementById("schedRes");
    let islec = false;

    paragraph.innerHTML = "Розклад на " + days[day] + ":<br>";

    predmet.forEach(element => {
        let g = String(element.groups);
        if (g.indexOf(gr) != -1 && element.day == day) {
            paragraph.innerHTML += "Предмет: " + element.name + "<br>";
            paragraph.innerHTML += "Час: " + element.time + "<br>";
            paragraph.innerHTML += "Кабінет: " + element.classroom + "<br><br>";
            islec = true;
        }
    });

    if (!islec) {
        paragraph.innerHTML += "пар немає";
    }
}

function plusOp() {
    let op1 = Number(document.getElementById("op1").value);
    let op2 = Number(document.getElementById("op2").value);

    let res = op1 + op2;

    document.getElementById("resultCalc").value = res;
}

function minusOp() {
    let op1 = Number(document.getElementById("op1").value);
    let op2 = Number(document.getElementById("op2").value);

    let res = op1 - op2;

    document.getElementById("resultCalc").value = res;
}

function multOp() {
    let op1 = Number(document.getElementById("op1").value);
    let op2 = Number(document.getElementById("op2").value);

    let res = op1 * op2;

    document.getElementById("resultCalc").value = res;
}

function devOp() {
    let op1 = Number(document.getElementById("op1").value);
    let op2 = Number(document.getElementById("op2").value);
    let res = 0;

    if (op1 == null || op2 == null) {
        res = "Пусті поля!!!";
    } else if (op2 == 0) {
        res = "На нуль ділити не можна";
    } else {
        res = op1 / op2;
    }

    document.getElementById("resultCalc").value = res;
}

function addTovar() {
    let name = document.getElementById("nameTov").value;
    let price = document.getElementById("priceTov").value;
    let count = document.getElementById("numTov").value;

    let f = true;

    arrTov.forEach(element => {
        if (element.name == name && element.price == price) {
            element.count += Number(count);
            f = false;
        }
    });
    if (f) {
        var tov = new Tovar(name, price, count);
        arrTov.push(tov);
    }

}

function writeTov() {
    var m = 4;
    var n = arrTov.length;
    //body reference 
    var body = document.getElementById("tovdiv");

    body.innerHTML = "";
    // create elements <table> and a <tbody>
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    var tempArr = [];


    var row = document.createElement("tr");

    tempArr[0] = "Назва товару";
    tempArr[1] = "Ціна товару";
    tempArr[2] = "Кількість товару";
    tempArr[3] = "Загальна ціна";

    for (var i = 0; i < m; i++) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(tempArr[i]);

        cell.appendChild(cellText);
        row.appendChild(cell);
    }
    //row added to end of table body
    tblBody.appendChild(row);

    let sum = 0;
    // cells creation
    for (var j = 0; j < n; j++) {
        // table row creation
        var row = document.createElement("tr");

        tempArr[0] = String(arrTov[j].name);
        tempArr[1] = String(arrTov[j].price);
        tempArr[2] = String(arrTov[j].count);
        tempArr[3] = String(arrTov[j].getAllPrice());

        sum += Number(tempArr[3]);

        for (var i = 0; i < m; i++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(tempArr[i]);

            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        //row added to end of table body
        tblBody.appendChild(row);
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);
    // put <table> in the <body>
    body.appendChild(tbl);
    // tbl border attribute to 
    tbl.setAttribute("border", "2");
    tblBody.appendChild(row);

    document.getElementById("allSuma").innerHTML = "Загальна вартісьть: " + sum;
}

var globalSudoku = new Sudoku(`
    1 2 3   4 5 6   7 8 9
    4 5 6   7 8 9   1 2 3
    7 8 9   1 2 3   4 5 6

    2 3 4   5 6 7   8 9 1
    5 6 7   8 9 1   2 3 4
    8 9 1   2 3 4   5 6 7

    3 4 5   6 7 8   9 1 2
    6 7 8   9 1 2   3 4 5
    9 1 2   3 4 5   6 7 8
`);


function generateSudocu() {

    var sudoku = new Sudoku(`
    1 2 3   4 5 6   7 8 9
    4 5 6   7 8 9   1 2 3
    7 8 9   1 2 3   4 5 6

    2 3 4   5 6 7   8 9 1
    5 6 7   8 9 1   2 3 4
    8 9 1   2 3 4   5 6 7

    3 4 5   6 7 8   9 1 2
    6 7 8   9 1 2   3 4 5
    9 1 2   3 4 5   6 7 8
`);

    globalSudoku = sudoku;
    //var parent = document.getElementById("app");
    //var child = document.getElementById("sudoku");
    //parent.removeChild(child);
    document.getElementById("app").innerHTML = '';
    document.querySelector("#app").append(globalSudoku.getHTML(500));

    //sudoku.shaffleSudoku();
}

function getResult() {
    if (globalSudoku.checkSolve()) {
        document.getElementById("sudResult").innerHTML = "ПРАВИЛЬНО";
    } else {
        document.getElementById("sudResult").innerHTML = "НЕПРАВИЛЬНО";
    }
}