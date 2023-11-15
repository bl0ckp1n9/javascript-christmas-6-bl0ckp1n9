import { isDuplicate, isEveryInclude, isMoreThanLimit, isNotMatchRegex, isSomeNotInclude } from '../util/index.js';
import { LIMIT_ORDER_COUNT, MENU_CATEGORIES, MENUS, ORDER_REGEX } from '../constant/index.js';

const ERROR_MESSAGE = Object.freeze({
    INVALID_DATE: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    IS_INVALID_ORDER: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});
const { INVALID_DATE, IS_INVALID_ORDER } = ERROR_MESSAGE;
class Order {
    static validateOrder(orderMenus) {
        const validators = [
            () => Order.validateDuplicationOrder(orderMenus),
            () => Order.validateOrderMenuFormat(orderMenus, ORDER_REGEX.ORDER_FORMAT),
            () => Order.validateLimitOrderCount(orderMenus, LIMIT_ORDER_COUNT),
            () => Order.validateIncludeMenu(orderMenus, MENUS),
            () => Order.validateOrderOnlyOneCategory(orderMenus, MENUS, MENU_CATEGORIES.BEVERAGE),
        ];
        validators.forEach((validator) => validator());
    }
    static validateDate(date) {
        const validators = [() => Order.validateDayFormat(date, ORDER_REGEX.DAY_FORMAT)];
        validators.forEach((validator) => validator());
    }
    static validateOrderOnlyOneCategory(orderMenus, menus, category) {
        const { orderMenuNameList } = Order.parseOrders(orderMenus);
        const menuNameListForCategory = Object.values(menus)
            .filter((menu) => menu.CATEGORY === category)
            .map((menu) => menu.NAME);

        isEveryInclude(IS_INVALID_ORDER, orderMenuNameList, menuNameListForCategory);
    }
    static validateIncludeMenu(orderMenus, menus) {
        const { orderMenuNameList } = Order.parseOrders(orderMenus);
        const menuNameList = Object.values(menus).map((menu) => menu.NAME);

        isSomeNotInclude(IS_INVALID_ORDER, orderMenuNameList, menuNameList);
    }
    static validateDuplicationOrder(orderMenus) {
        const { orderMenuNameList } = Order.parseOrders(orderMenus);

        isDuplicate(IS_INVALID_ORDER, orderMenuNameList);
    }
    static validateLimitOrderCount(orderMenus, limitOrderCount) {
        const { totalOrderCount } = Order.parseOrders(orderMenus);

        isMoreThanLimit(IS_INVALID_ORDER, totalOrderCount, limitOrderCount);
    }
    static validateOrderMenuFormat(orderMenus, regex) {
        const { orderMenuList } = Order.parseOrders(orderMenus);

        orderMenuList.forEach((orderMenu) => isNotMatchRegex(IS_INVALID_ORDER, orderMenu, regex));
    }
    static validateDayFormat(date, regex) {
        isNotMatchRegex(INVALID_DATE, date, regex);
    }
    static parseOrders(orderMenu) {
        const orderMenuList = orderMenu.split(',').map((menu) => menu.trim());
        const orderMenuNameList = orderMenuList.map((menu) => menu.split('-')[0]);
        const orderMenuCountList = orderMenuList.map((menu) => menu.split('-')[1]);
        const totalOrderCount = orderMenuCountList.reduce((acc, cur) => acc + Number(cur), 0);

        return {
            orderMenuList,
            orderMenuNameList,
            orderMenuCountList,
            totalOrderCount,
        };
    }

    #orderDate;
    #orderMenus = new Map();
    #menus = new Map();

    constructor(menus, orderMenus, orderDate) {
        this.#menus = new Map(Object.entries(menus));
        this.#orderDate = orderDate;
        this.#setOrderMenus(orderMenus);
    }

    getOrderMenuList() {
        return this.#getOrderMenuCategories()
            .map((categoryName) => this.getOrderMenuByCategory(categoryName))
            .flat();
    }
    getTotalPrice() {
        return Array.from(this.#orderMenus.values()).reduce((acc, orderMenu) => {
            const key = this.#getKeyByMenuName(orderMenu.name);
            const menu = this.#menus.get(key);
            return acc + menu.PRICE * orderMenu.count;
        }, 0);
    }
    getOrderDate() {
        return this.#orderDate;
    }
    getOrderMenuByCategory(categoryName) {
        return Array.from(this.#orderMenus.values()).filter((orderMenu) => orderMenu.category === categoryName);
    }
    #setOrderMenus(orderMenus) {
        const { orderMenuNameList, orderMenuCountList } = Order.parseOrders(orderMenus);
        orderMenuNameList.forEach((menuName, index) => {
            const category = this.#getCategoryByMenuName(menuName);
            const key = this.#getKeyByMenuName(menuName);

            this.#orderMenus.set(key, {
                name: menuName,
                count: orderMenuCountList[index],
                category,
            });
        });
    }
    #getOrderMenuCategories() {
        return Array.from(new Set(Array.from(this.#menus.values()).map((menu) => menu.CATEGORY)));
    }
    #getCategoryByMenuName(menuName) {
        return Array.from(this.#menus.values()).find((menuMap) => menuMap.NAME === menuName).CATEGORY;
    }
    #getKeyByMenuName(menuName) {
        return Array.from(this.#menus.keys()).find((key) => this.#menus.get(key).NAME === menuName);
    }
}
export default Order;
