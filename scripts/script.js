let menuRef = document.getElementById("tabMenuElement");
let tabTitleRef = document.getElementById("tabTitle");
let cartRef = document.getElementById("shoppingTemplateTarget");
let shoppingKartSumRef = document.getElementById("shoppingKartSum");
let deliveryPriceRef = document.getElementById('deliveryPrice');
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
    if (shoppingKart.length != 0) {
        for (let doubleindex = 0; doubleindex < shoppingKart.length; doubleindex++) {
            if (menu[menuType].section[index].name == shoppingKart[doubleindex].name) {
                addAmount(menuType, index, 1);
                return;
            }
        }
        renderBasket(menuType, index);
    }
    else {
        renderBasket(menuType, index);
    }
}

function renderBasket(menuType, index) {
    cartRef.innerHTML += getKartTemplate(menuType, index);
    Object.defineProperty(menu[menuType].section[index], 'amount', {
        value: parseFloat(document.getElementById(menuType + 'amount' + index).getAttribute('value')),
        writable: true,
        enumerable: true,
        configurable: true
    });
    shoppingKart.push(menu[menuType].section[index]);
    calculateSum(menuType, index);
}

function calculateSum(menuType, index) {
    let sum = document.getElementById(menuType + 'sum' + index);
    let deliveryPrice = parseFloat(deliveryPriceRef.getAttribute('value'));
    let subTotal = 0;
    let calculateValue = 0;
    for (let indexSum = 0; indexSum < shoppingKart.length; indexSum++) {
        if (shoppingKart.length == 1) {
            calculateValue = shoppingKart[indexSum].price * shoppingKart[indexSum].amount;
        } else {
            subTotal = calculateValue + shoppingKart[indexSum].price * shoppingKart[indexSum].amount;
            calculateValue = parseFloat(subTotal.toFixed(2));
        }
    }
    document.getElementById(menuType + 'amount' + index).innerHTML = menu[menuType].section[index].amount;
    shoppingKartSumRef.innerHTML = calculateValue.toFixed(2).replace('.',',') + " €";
    sum.innerHTML = ((menu[menuType].section[index].amount * menu[menuType].section[index].price).toFixed(2).replace('.',',')) + " €";
    let totalSum = deliveryPrice + calculateValue;
    totalSumRef.innerHTML = totalSum.toFixed(2).replace('.',',') + " €";
}

function addAmount(menuType, index, operator) {
    indexSum = findIndexSumIndex(shoppingKart, menu[menuType].section[index]);
    if (shoppingKart[indexSum].amount + operator == -1 || shoppingKart[indexSum].amount + operator > 50) {
        return;
    }
    else {
        shoppingKart[indexSum].amount = shoppingKart[indexSum].amount + operator;
        let amountRef = document.getElementById(menuType + 'amount' + index);
        amountRef.setAttribute('value', shoppingKart[indexSum].amount.toString());
        amountRef.innerHTML = shoppingKart[indexSum].amount;
        calculateSum(menuType, index);
    }
}

function findIndexSumIndex(array, element) {
    return array.indexOf(element);
}

function deleteAmount(menuType, index) {
    indexSum = findIndexSumIndex(shoppingKart, menu[menuType].section[index]);
    shoppingKart.splice(indexSum, 1);
    document.getElementById(menuType + 'amount' + index).setAttribute('value', 0);
    calculateSum(menuType, index);
    document.getElementById(menuType + 'basketElementDiv' + index).remove();
}

function deliveryOrNot(operator) {
    deliveryPriceRef.setAttribute('value', operator.toFixed(2).toString());
    deliveryPriceRef.innerHTML = deliveryPriceRef.getAttribute('value').replace('.',',') + " €";
    let totalSum = parseFloat(shoppingKartSumRef.innerHTML.replace(',','.')) + operator;
    totalSumRef.innerHTML = totalSum.toFixed(2).replace('.',',') + " €";
}