/*
    Class Tovar
*/

class Tovar {
    constructor(name = "tovar", price = 0, count = 0) {
        this.name = name;
        this.price = Number(price);
        this.count = Number(count);
    }

    getAllPrice() {
        let pr = this.price * this.count;
        return pr;
    }
}