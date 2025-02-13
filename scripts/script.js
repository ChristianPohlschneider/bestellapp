let menuRef = document.getElementById("tabMenuElement");
let tabTitleRef = document.getElementById("tabTitle");

let cartRef = document.getElementById("shoppingTemplateTarget");


let shoppingKartSumRef = document.getElementById("shoppingKartSum");
let totalSumRef = document.getElementById("totalSum");
let shoppingKart = [];

function init(menuType) {
    // onload: menuType = 0
    renderMenu(menuType);
}

function renderMenu(menuType) {

    menuRef.innerHTML = "";
    tabTitleRef.innerHTML = "";
    for (let index = 0; index < menu[menuType].section.length; index++) {
        tabTitleRef.innerHTML = menu[menuType].tabTitle;
        menuRef.innerHTML += getMenuTemplate(menuType, index);
    }
}

function localStorage() {

}

function addToBasket(menuType, index) {

    cartRef.innerHTML += getKartTemplate(menuType, index);
    calculateSum(menuType, index);
}

function calculateSum(menuType, index) {
    let amount = parseFloat(document.getElementById("amount").getAttribute('value'));
    let kartitem = menu[menuType].section[index];
    let deliveryPrice = parseFloat(document.getElementById("deliveryPrice").getAttribute('value'));
    let subTotal = 0;
    let calculateValue = 0;

    shoppingKart.push(kartitem);

    Object.defineProperty(kartitem, 'amount', {
        value: amount,
        writable: true,
        enumerable: true,
        configurable: true
    });

    for (let indexSum = 0; indexSum < shoppingKart.length; indexSum++) {
        if (shoppingKart.length == 1) {
            subTotal = shoppingKart[indexSum].price * shoppingKart[indexSum].amount;
        } else {
            subTotal = calculateValue + shoppingKart[indexSum].price * shoppingKart[indexSum].amount;
            calculateValue = parseFloat(subTotal.toFixed(2));
        }
    }
    shoppingKartSumRef.innerHTML = calculateValue;
    let totalSum = deliveryPrice + calculateValue;
    totalSumRef.innerHTML = totalSum;
}

function addAmount(menuType, index) {
    indexSum = shoppingKart.findIndex(shoppingAmount);
    shoppingKart[indexSum].amount = shoppingKart[indexSum].amount + 1;
    document.getElementById("amount").value = shoppingKart[indexSum].amount;
    calculateSum(menuType, index);
    
}

function shoppingAmount(x) {
    let idName = document.getElementById('shoppingKartItemInsert').innerHTML;
    return x.name === idName;
  }