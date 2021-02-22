class Sudoku {
    constructor(initStr = '000000000000000000000000000000000000000000000000000000000000000000000000000000000') {
        const stval = initStr
            .split('')
            .filter(x => "0123456789".includes(x))
            .map(x => Number(x));


        this.body = [];

        let idCounter = 1;
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                this.body.push({
                    id: idCounter,
                    x: x,
                    y: y,
                    s: parseInt(y / 3) * 3 + parseInt(x / 3),
                    num: stval[idCounter - 1],
                    selected: false,
                    supported: false
                });
                idCounter++;
            }
        }

        let zeroCells = this.shaffleSudoku();

        this.body.forEach(element => {
            if (zeroCells.includes(element.id)) {
                element.num = 0;
            }
        });


        this.body.forEach(element => {
            if (element.num) {
                element.enabeled = false;
            } else {
                element.enabeled = true;
            }
        });
    }

    getRow(n) {
        let row = [];
        for (let i = 0; i < 9; i++) {
            row.push(this.body[n * 9 + i]);
        }
        return row;
    }

    getColumn(n) {
        let col = [];
        for (let i = 0; i < 9; i++) {
            col.push(this.body[n + i * 9]);
        }
        return col;
    }

    getSegment(n) {
        let seg = [];

        let x = n % 3;
        let y = parseInt(n / 3);

        for (let iy = 0; iy < 3; iy++) {
            for (let jx = 0; jx < 3; jx++) {
                seg.push(this.body[y * 27 + iy * 9 + x * 3 + jx])
            }
        }

        return seg;
    }

    keydownHandler(event, item) {
        if ("123456789".includes(event.key)) {
            item.num = parseInt(event.key);
        } else if (["Backspace", "Delete"].includes(event.key)) {
            item.num = 0;
        }
        event.preventDefault();
        this.viewUpdate();
    }

    focusHandler(event, item) {
        item.selected = true;

        for (const el of this.getRow(item.y)) {
            el.supported = true;
        }

        for (const el of this.getColumn(item.x)) {
            el.supported = true;
        }

        this.viewUpdate();
    }

    blurHandler(event, item) {
        item.selected = false;

        for (const el of this.getRow(item.y)) {
            el.supported = false;
        }

        for (const el of this.getColumn(item.x)) {
            el.supported = false;
        }

        this.viewUpdate();
    }

    getHTML(size) {
        for (const item of this.body) {
            const inputEl = document.createElement('input');
            inputEl.classList.add("sudoku-cell");
            inputEl.setAttribute("type", "text");
            inputEl.addEventListener('keydown', event => this.keydownHandler(event, item));
            inputEl.addEventListener('focus', event => this.focusHandler(event, item));
            inputEl.addEventListener('blur', event => this.blurHandler(event, item));

            if (!item.enabeled) {
                inputEl.setAttribute("disabled", "disabled");
                inputEl.classList.add("start-cell");
            }

            item.element = inputEl;
        }


        const rootEl = document.createElement('div');
        rootEl.classList.add("sudoku-game");
        rootEl.setAttribute("id", "sudoku")
        rootEl.style.width = `${size}px`;
        rootEl.style.height = `${size}px`;
        rootEl.style["font-size"] = `${size / 20}px`;

        for (let i = 0; i < 9; i++) {
            const segEl = document.createElement('div');
            segEl.classList.add('sudoku-segment');

            for (const cell of this.getSegment(i)) {
                segEl.append(cell.element);
            }

            rootEl.append(segEl);
        }

        this.viewUpdate()

        return rootEl;
    }

    viewUpdate() {
        for (const cell of this.body) {
            cell.element.classList.remove("supported-cell", "selected-cell");
            cell.element.value = cell.num ? cell.num : '';
            if (cell.supported) {
                cell.element.classList.add("supported-cell");
            }
            if (cell.selected) {
                cell.element.classList.add("selected-cell");
            }
        }
    }

    checkSolve() {
        let solve = true;
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        for (let i = 0; i < 9; i++) {
            arr1 = this.getSegment(i);
            arr2 = this.getRow(i);
            arr3 = this.getColumn(i);
            const seg = new Set(arr1);
            const row = new Set(arr2);
            const col = new Set(arr3);

            const numbers1 = new Set();
            const numbers2 = new Set();
            const numbers3 = new Set();

            seg.forEach(element => {
                numbers1.add(element.num)
            });
            row.forEach(element => {
                numbers2.add(element.num)
            });
            col.forEach(element => {
                numbers3.add(element.num)
            });
            numbers1.delete(0);
            numbers2.delete(0);
            numbers3.delete(0);
            if (numbers1.size < 9 || numbers2.size < 9 || numbers3.size < 9) {
                solve = false;
            }
        }
        return solve;
    }

    getRandomInt(min, max) {
        return min + Math.floor(Math.random(5648) * Math.floor(max - min));
    }

    swapRow() {
        let swapSegment = this.getRandomInt(0, 3);
        let swapRow1 = 0;
        let swapRow2 = this.getRandomInt(1, 3);

        let sw1 = swapSegment * 3 + swapRow1;
        let sw2 = swapSegment * 3 + swapRow2;

        //console.log(sw1, " ", sw2)

        let tmp;

        for (let i = 0; i < 9; i++) {
            tmp = this.body[sw1 * 9 + i].num;
            this.body[sw1 * 9 + i].num = this.body[sw2 * 9 + i].num;
            this.body[sw2 * 9 + i].num = tmp;
        }
    }

    swapColumn() {
        let swapSegment = this.getRandomInt(0, 3);
        let swapRow1 = 0;
        let swapRow2 = this.getRandomInt(1, 3);

        let sw1 = swapSegment * 3 + swapRow1;
        let sw2 = swapSegment * 3 + swapRow2;

        //console.log(sw1, " ", sw2)

        let tmp;

        for (let i = 0; i < 9; i++) {
            tmp = this.body[sw1 + i * 9].num;
            this.body[sw1 + i * 9].num = this.body[sw2 + i * 9].num;
            this.body[sw2 + i * 9].num = tmp;
        }
    }

    shaffleSudoku() {
        for (let i = 0; i < 100; i++) {
            this.swapColumn();
            this.swapRow();
        }

        let x = this.gn(0, 80, 1);
        console.log(x());
        return x();

    }

    gn(b, d, c) {
        for (var a = []; b <= d; b++) {
            a = a.concat(a.splice(Math.random() * a.length | 0, 1, b));
        }
        return function() {
            return a.length >= c ? a.splice(a.length - c) : a.splice(0)
        }
    };

}