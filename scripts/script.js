let menuRef = document.getElementById("tabMenuElement");
let tabTitleRef = document.getElementById("tabTitle");
let cartRef = document.getElementById("shoppingTemplateTarget");
let shoppingKartSumRef = document.getElementById("shoppingKartSum");
let deliveryPriceRef = document.getElementById('deliveryPrice');
let totalSumRef = document.getElementById("totalSum");
let shoppingKart = [];

function init(menuType) {
    renderMenu(menuType);
    getlocalStorage();
    togglePlaceholder();
}

function renderMenu(menuType) {
    menuRef.innerHTML = "";
    tabTitleRef.innerHTML = "";
    for (let index = 0; index < menu[menuType].section.length; index++) {
        tabTitleRef.innerHTML = menu[menuType].tabTitle;
        menuRef.innerHTML += getMenuTemplate(menuType, index);
    }
}

function getlocalStorage() {
    if (localStorage.getItem("shoppingKartStorage") == null) {
        return
    }
    else {
        shoppingKart = JSON.parse(localStorage.getItem("shoppingKartStorage"));
        for (let storageIndex = 0; storageIndex < shoppingKart.length; storageIndex++) {
            for (let menuTypeIndex = 0; menuTypeIndex < menu.length; menuTypeIndex++) {
                findMenuTypeIndex(storageIndex, menuTypeIndex, shoppingKart)
            }}}
}

function findMenuTypeIndex(storageIndexA, menuTypeIndexA, shoppingKartA) {
    for (let menuIndex = 0; menuIndex < menu[menuTypeIndexA].section.length; menuIndex++) {
        if (menu[menuTypeIndexA].section[menuIndex].name === shoppingKartA[storageIndexA].name) {
            let menuType = menuTypeIndexA;
            let index = menuIndex;
            cartRef.innerHTML += getKartTemplate(menuType, index);
            defineAmount(menuType, index);
            document.getElementById(menuType + 'amount' + index).innerHTML = shoppingKartA[storageIndexA].amount;
            menu[menuType].section[index] = shoppingKartA[storageIndexA];
            calculateSum(menuType, index);
            break;}}
}

function saveToLocalStorage() {
    localStorage.setItem("shoppingKartStorage", JSON.stringify(shoppingKart));
}

function addToBasket(menuType, index, operator) {
    if (shoppingKart.length > 0) {
        for (let doubleindex = 0; doubleindex < shoppingKart.length; doubleindex++) {
            if (menu[menuType].section[index].name == shoppingKart[doubleindex].name) {
                addAmount(menuType, index, operator);
                return;}}
        renderBasket(menuType, index);
        toggleButtonClass(0 + "button" + menuType + 'icon' + index);
    } else {
        renderBasket(menuType, index);
        toggleButtonClass(0 + "button" + menuType + 'icon' + index);
    }
    togglePlaceholder();
}

function renderBasket(menuType, index) {
    cartRef.innerHTML += getKartTemplate(menuType, index);
    defineAmount(menuType, index)
    shoppingKart.push(menu[menuType].section[index]);
    calculateSum(menuType, index);
    saveToLocalStorage(menuType, index);
}

function defineAmount(menuType, index) {
    Object.defineProperty(menu[menuType].section[index], 'amount', {
        value: parseFloat(document.getElementById(menuType + 'amount' + index).getAttribute('value')),
        writable: true,
        enumerable: true,
        configurable: true
    });
}

function calculateSum(menuType, index) {
    let subTotal = 0;
    let calculateValue = 0;
    for (let indexSum = 0; indexSum < shoppingKart.length; indexSum++) {
        if (shoppingKart.length == 1) {
            calculateValue = shoppingKart[indexSum].price * shoppingKart[indexSum].amount;
        } else {
            subTotal = calculateValue + shoppingKart[indexSum].price * shoppingKart[indexSum].amount;
            calculateValue = parseFloat(subTotal.toFixed(2));
        }}
    document.getElementById(menuType + 'amount' + index).innerHTML = menu[menuType].section[index].amount;
    renderSum(menuType, index, calculateValue);
}

function renderSum(menuType, index, calculateValueA) {
    let sum = document.getElementById(menuType + 'sum' + index);
    let deliveryPrice = parseFloat(deliveryPriceRef.getAttribute('value'));
    shoppingKartSumRef.innerHTML = calculateValueA.toFixed(2).replace('.', ',') + " €";
    sum.innerHTML = ((menu[menuType].section[index].amount * menu[menuType].section[index].price).toFixed(2).replace('.', ',')) + " €";
    let totalSum = deliveryPrice + calculateValueA;
    totalSumRef.innerHTML = totalSum.toFixed(2).replace('.', ',') + " €";
    document.getElementById("respBasket").innerHTML = "Warenkorb Summe: " + totalSum + " €";
    document.getElementById("respBasketTop").innerHTML = "Warenkorb Summe: " + totalSum + " €";
}

function addAmount(menuType, index, operator) {
    indexSum = findIndexSumIndex(shoppingKart, menu[menuType].section[index]);
    if (shoppingKart[indexSum].amount + operator == -1 || shoppingKart[indexSum].amount + operator > 50) {
        return;
    } else {
        let amountRef = document.getElementById(menuType + 'amount' + index);
        if (amountRef.innerHTML == 1 && operator == -1) {
            deleteAmount(menuType, index);
        } else {
            addAmountCalculation(menuType, index, operator)
        }}
}

function addAmountCalculation(menuType, index, operator) {
 if (operator == 0) {
        operator = 1;
        toggleButtonClass(0 + "button" + menuType + 'icon' + index);
        shoppingKart[indexSum].amount = shoppingKart[indexSum].amount + operator;
        renderAddAmount(menuType, index)
    } else {
        toggleButtonClass(operator + 'button' + menuType + 'icon' + index);
        shoppingKart[indexSum].amount = shoppingKart[indexSum].amount + operator;
        renderAddAmount(menuType, index)
    }
}

function renderAddAmount(menuType, index) {
    let amountRef = document.getElementById(menuType + 'amount' + index);
    amountRef.setAttribute('value', shoppingKart[indexSum].amount.toString());
    amountRef.innerHTML = shoppingKart[indexSum].amount;
    calculateSum(menuType, index);
    saveToLocalStorage(menuType, index);
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
    saveToLocalStorage(menuType, index)
    togglePlaceholder();
}

function deliveryOrNot(operator) {
    deliveryPriceRef.setAttribute('value', operator.toFixed(2).toString());
    deliveryPriceRef.innerHTML = deliveryPriceRef.getAttribute('value').replace('.', ',') + " €";
    let totalSum = parseFloat(shoppingKartSumRef.innerHTML.replace(',', '.')) + operator;
    totalSumRef.innerHTML = totalSum.toFixed(2).replace('.', ',') + " €";
}

function toggleButtonClass(button) {
    if (button == undefined) {
        return;
    }
    document.getElementById(button).classList.add('buttonActive');
    setTimeout(function () {
        document.getElementById(button).classList.remove('buttonActive');
    }, 200);
}

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('respMenuClosed');
}

function toggleLink(id) {
    if (document.getElementById(id).className == "activeLink") {
        return
    } else {
        document.getElementsByClassName("activeLink")[0].classList.remove('activeLink');
        document.getElementById(id).classList.add('activeLink');
    }
}

function toggleDeliveryButton(id) {
    if (document.getElementById(id).className == "activeButton") {
        return
    } else {
        document.getElementsByClassName('activeButton')[0].classList.remove('activeButton');
        document.getElementById(id).classList.add('activeButton');
    }
}

function toggleBasket() {
    document.getElementById('respBasketTop').classList.toggle('respBasketTop');
    document.getElementById('respBasketTop').classList.toggle('respBasketClose');
    document.getElementById('respBasket').classList.toggle('respBasket');
    document.getElementById('respBasket').classList.toggle('respBasketClose');
    document.getElementById('shoppingKart').classList.toggle('shoppingKart');
    document.getElementById('shoppingKart').classList.toggle('shoppingKartOpen');
    document.getElementById('shoppingKartInlay').classList.toggle('shoppingKartInlay');
    document.getElementById('shoppingKartInlay').classList.toggle('shoppingKartInlayOpen');
}

function togglePlaceholder() {
    if (document.getElementsByClassName('kartItemTitle')[0] != undefined) {
        document.getElementById('placeholderDiv').classList.add('placeholderClosed');
        document.getElementById('placeholderDiv').classList.remove('placeholderDiv');
    } else {
        document.getElementById('placeholderDiv').classList.remove('placeholderClosed');
        document.getElementById('placeholderDiv').classList.add('placeholderDiv');
    }
}

function order() {
    for (let index = 0; index < shoppingKart.length; index++) {
        if (shoppingKart.length == 0) { return
        } else {
        shoppingKart.splice(index, 1);
        localStorage.removeItem('shoppingKartStorage');}
    document.getElementById('shoppingTemplateTarget').innerHTML = ""
    document.getElementById('shoppingKartSum').innerHTML = "0,00 €"
    document.getElementById('totalSum').innerHTML = "0,00 €"
    document.getElementById('deliveryPrice').innerHTML = "0,00 €"
    document.getElementById("respBasket").innerHTML = "Warenkorb Summe: " + "0,00 €";
    document.getElementById("respBasketTop").innerHTML = "Warenkorb Summe: " + "0,00 €";
    togglePlaceholder();
    on()}}

function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
    location.reload();
  }