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
    getlocalStorage();
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
                for (let menuIndex = 0; menuIndex < menu[menuTypeIndex].section.length; menuIndex++) {
                    if (menu[menuTypeIndex].section[menuIndex].name === shoppingKart[storageIndex].name) {
                        let menuType = menuTypeIndex;
                        let index = menuIndex;
                        cartRef.innerHTML += getKartTemplate(menuType, index);
                        defineAmount(menuType, index)
                        calculateSum(menuType, index);
                        document.getElementById(menuType + 'amount' + index).innerHTML = shoppingKart[storageIndex].amount;
                        menu[menuType].section[index] = shoppingKart[storageIndex];
                        break;
                    }
                }
            }
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem("shoppingKartStorage", JSON.stringify(shoppingKart));
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
    shoppingKartSumRef.innerHTML = calculateValue.toFixed(2).replace('.', ',') + " €";
    sum.innerHTML = ((menu[menuType].section[index].amount * menu[menuType].section[index].price).toFixed(2).replace('.', ',')) + " €";
    let totalSum = deliveryPrice + calculateValue;
    totalSumRef.innerHTML = totalSum.toFixed(2).replace('.', ',') + " €";
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
        saveToLocalStorage(menuType, index)
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
    saveToLocalStorage(menuType, index)
}

function deliveryOrNot(operator) {
    deliveryPriceRef.setAttribute('value', operator.toFixed(2).toString());
    deliveryPriceRef.innerHTML = deliveryPriceRef.getAttribute('value').replace('.', ',') + " €";
    let totalSum = parseFloat(shoppingKartSumRef.innerHTML.replace(',', '.')) + operator;
    totalSumRef.innerHTML = totalSum.toFixed(2).replace('.', ',') + " €";
}

function toggleButtonClass(button) {
    button.className = 'addIcon buttonActive';
    setTimeout(function () {
        button.className = 'addIcon';
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