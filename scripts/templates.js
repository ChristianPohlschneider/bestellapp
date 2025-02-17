// menus: menu, description, price, plus

function getMenuTemplate(menuType, index) {
    return `
                <div class="menuElement" onclick="toggleButtonClass(${'tab' + menuType + 'item' + index}), addToBasket(${menuType},${index})">
                    <div class="menuTitle">
                        <h2 id="${'tabValue' + index}">${menu[menuType].section[index].name}</h2>
                        <h3>${menu[menuType].section[index].description}</h3>
                        <h3>${menu[menuType].section[index].price.toFixed(2).replace('.', ',') + " €"}</h3>
                    </div>
                    <img id="${'tab' + menuType + 'item' + index}" class="addIcon button" src="./assets/icons/plus.png" alt="Add">
                </div>
            `;
}

function getKartTemplate(menuType, index) {
    return `
            <div id="${menuType + 'basketElementDiv' + index}">
                <h3 class="kartItemTitle" id="${menuType + 'shoppingKartItemInsert' + index}">${menu[menuType].section[index].name}</h3>
                    <div class="sumDiv">
                    <img id="${'minus' + menuType + 'icon' + index}" class="addIcon" onclick='addAmount(${menuType},${index}, -1), toggleButtonClass(${'minus' + menuType + 'icon' + index})' src="./assets/icons/minus.png" alt="minus">
                    <div id="${menuType + 'amount' + index}" value='1'>1</div>
                    <img id="${'plus' + menuType + 'icon' + index}" class="addIcon" onclick='addAmount(${menuType},${index}, 1), toggleButtonClass(${'plus' + menuType + 'icon' + index})' src="./assets/icons/plus.png" alt="plus">
                    <div id="${menuType + 'sum' + index}">${menu[menuType].section[index].price}</div>
                    <img id="${'trash' + menuType + 'icon' + index}" class="addIcon" onclick='deleteAmount(${menuType},${index})' src="./assets/icons/trash.png" alt="trash">
                </div>
            </div>
            `;
}