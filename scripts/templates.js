// menus: menu, description, price, plus

function getMenuTemplate(menuType, index) {
    return `
                <div class="menuElement">
                    <div class="menuTitle">
                        <h2 id="${'tabValue' + index}">${menu[menuType].section[index].name}</h2>
                        <h3>${menu[menuType].section[index].description}</h3>
                        <h3>${menu[menuType].section[index].price}</h3>
                    </div>
                    <img id="${'tab' + menuType + 'item' + index}" onclick="addToBasket(${menuType},${index})" class="addIcon" src="./assets/icons/plus.png" alt="Add">
                </div>
            `;
}

function getKartTemplate(menuType, index) {
    return `
                <h3 class="kartItemTitle" id="shoppingKartItemInsert">${menu[menuType].section[index].name}</h3>
                    <div class="sumDiv">
                    <img class="addIcon" src="./assets/icons/minus.png" alt="minus">
                    <div id="amount" value="1">1</div>
                    <img class="addIcon" onclick="addAmount(${menuType},${index})" src="./assets/icons/plus.png" alt="plus">
                    <div id="sum">${menu[menuType].section[index].price}</div>
                    <img class="addIcon" src="./assets/icons/trash.png" alt="trash">
                </div>
            `;
}