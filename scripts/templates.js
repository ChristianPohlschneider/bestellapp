// menus: menu, description, price, plus

function getMenuTemplate(menuType, index) {
    return `
            <div class="menuElement">
                <div class="menuTitle">
                    <h2 id="${'tabValue' + index}">${menu[menuType].section[index].name}</h2>
                    <h3>${menu[menuType].section[index].description}</h3>
                    <h3>${menu[menuType].section[index].price}</h3>
                </div>
                <img id="${'tab' + menuType + 'item' + index}" onclick="addToBasket(${index})" class="addIcon" src="./assets/icons/plus.png" alt="Add">
            </div>
            `;
}