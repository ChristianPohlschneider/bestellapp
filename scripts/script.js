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

function addToBasket(index){
    let item = document.getElementById('tabValue' + index).innerHTML;
    document.getElementById("shoppingKartItem").innerHTML = item;
}