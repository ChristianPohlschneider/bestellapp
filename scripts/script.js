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
    let amountRef = document.getElementById(menuType + 'amount' + index);
    let kartItem = menu[menuType].section[index];
    let amount = parseFloat(amountRef.getAttribute('value'));
    // Object.defineProperty(kartItem, 'amount', {
    //     value: amount,
    //     writable: true,
    //     enumerable: true,
    //     configurable: true

    // });
    // shoppingKart.push(kartItem);
        Object.defineProperty(menu[menuType].section[index], 'amount', {
        value: amount,
        writable: true,
        enumerable: true,
        configurable: true

    });
    shoppingKart.push(kartItem);
    
    calculateSum(menuType, index);
}

function calculateSum(menuType, index) {
    
    // let amount = parseFloat(document.getElementById(menuType + 'amount' + index).getAttribute('value'));
    let amount = menu[menuType].section[index].amount;
    let sum = document.getElementById(menuType + 'sum' + index);
    let amountRef = document.getElementById(menuType + 'amount' + index);
    let deliveryPrice = parseFloat(document.getElementById('deliveryPrice').getAttribute('value'));
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
    
    amountRef.innerHTML = amount;
    shoppingKartSumRef.innerHTML = calculateValue;
    sum.innerHTML = menu[menuType].section[index].amount * menu[menuType].section[index].price;
    let totalSum = deliveryPrice + calculateValue;
    totalSumRef.innerHTML = totalSum;
 }

function addAmount(menuType, index, operator) {
    // indexSum = shoppingKart.findIndex(shoppingAmount(x));
    indexSum = findIndexSumIndex(shoppingKart, menu[menuType].section[index]);
    shoppingKart[indexSum].amount = shoppingKart[indexSum].amount + operator;
    let amountRef = document.getElementById(menuType + 'amount' + index);
    amountRef.setAttribute('value', shoppingKart[indexSum].amount.toString());
    amountRef.innerHTML = shoppingKart[indexSum].amount;
    calculateSum(menuType, index);
    
}

// function shoppingAmount(x) {
//     let idName = document.getElementById('shoppingKartItemInsert').innerHTML;
//     return x.name === idName;
//   }
// findElementIndex([10, 20, 30, 40], 30)
  function findIndexSumIndex(array, element) {
    // document.getElementById("findElementIndex").innerHTML = array.indexOf(element);
    // console.log(array.indexOf(element));
    return array.indexOf(element);} //gibt den return wert zurück

    function deleteAmount(menuType, index) {
        let amountRef = document.getElementById(menuType + 'amount' + index);
        indexSum = findIndexSumIndex(shoppingKart, menu[menuType].section[index]);
        shoppingKart[indexSum].amount = 0;
        amountRef.setAttribute('value', 0);
        // amountRef.innerHTML = "";
        calculateSum(menuType, index);
        document.getElementById(menuType + 'basketElementDiv' + index).remove();
    }

    // zweimal austern abfangen