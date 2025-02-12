function init(menuType) {
    // onload: menuType = 0
    renderMenu(menuType);
}

function renderMenu(menuType) {
    let menuRef = document.getElementById("tabMenuElement");
    let tabTitleRef = document.getElementById("tabTitle");
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
    let cartRef = document.getElementById("shoppingTemplateTarget");
    // let item = document.getElementById('tabValue' + index).innerHTML;
    cartRef.innerHTML += getKartTemplate(menuType, index);
    calculateSum(menuType, index);
}

function calculateSum(menuType, index) {
let amount = document.getElementById("amount").attributes.value.value;
let price = menu[menuType].section[index].price;
let deliveryPrice = document.getElementById("deliveryPrice").value;
let shoppingKartSumRef = document.getElementById("shoppingKartSum");
let totalSumRef = document.getElementById("totalSum");
let shoppingKartSum = amount * price;
let totalSum = deliveryPrice + shoppingKartSum;
shoppingKartSumRef.innerHTML = shoppingKartSum;

totalSumRef.innerHTML = totalSum;
}