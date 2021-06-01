
let cart = [];

class Hamburger {
    constructor (size, stuffing) {
        this.hamb = [];
        this.stuff = [];
        this.stuff2 = [];
    }
    fetchHumb() {
        this.hamb = [
            {size: 'small', price: 50, calorie: 20},
            {size: 'big', price: 100, calorie: 40},
        ]
    }
    fetchStuff() {
        this.stuff = [
            {stuff: 'chiz', price: 10, calorie: 20},
            {stuff: 'salat', price: 20, calorie: 5},
            {stuff: 'potatoes', price: 15, calorie: 10},
        ]
    }
    fetchStuff2() {
        this.stuff2 = [
            {stuff2: 'mayo', price: 20, calorie: 5},
            {stuff2: 'seas', price: 15, calorie: 0},
        ]
    }
    getSize(size) {
        let getSize = menu.hamb.findIndex(x => x.size === size);
        cart = [];
        cart.push(menu.hamb[getSize]);
        console.log(cart);
        cartSum();
    }
    getStuff(stuff) {
        let getStuff = menu.stuff.findIndex(x => x.stuff === stuff);
        cart[1] = menu.stuff[getStuff];
        menu.fetchHumb(); //В этом моменте, я не понял почему, но данные о гамбургере перезаписывались и в меню и в корзине. Пофиксить получилось только с помошью перезаписи самого меню. Костыльно но другого у меня ничего не получилось
        console.log(cart);
        cartSum();
    };
    getStuff2(stuff) {
        let getStuff = menu.stuff2.findIndex(x => x.stuff2 === stuff);
        cart[2] = menu.stuff2[getStuff];
        console.log(cart);
        cartSum();
    }
    findHamb() {
        let getHamb = this.hamb.findIndex(x => x.size === cart[0].size)
        return getHamb
    }
    findHambPrice() {
        let getHambPrice = this.hamb[this.findHamb()].price;
        return getHambPrice
    }
    findHambCalo() {
        let getHambCalo = this.hamb[this.findHamb()].calorie;
        return getHambCalo
    }
};

let cartSum = function(){ //Эта функция, которая подсчитывает всю цену и каллории, почему-то не хотела работать внутри класса, как только я вынес ее за пределы класса, все заработало как надо.
    let totalSum = 0;
    let totalCalo = 0;
    for(i=0; i < cart.length; i++){
        totalSum = totalSum + cart[i].price;
        totalCalo = totalCalo + cart[i].calorie;
    }
    console.log("total sum: "+totalSum+" total Calorie: "+totalCalo);
};
    
const menu = new Hamburger ();
menu.fetchHumb();
menu.fetchStuff();
menu.fetchStuff2();

let addHamb = menu.getSize;
let addStuff1 = menu.getStuff;
let addStuff2 = menu.getStuff2;