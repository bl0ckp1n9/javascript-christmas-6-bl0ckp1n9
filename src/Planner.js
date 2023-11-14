import { isDuplicate, isEveryInclude, isMoreThanLimit, isNotMatchRegex, isSomeNotInclude } from './validators.js';

const ERROR_MESSAGE = Object.freeze({
    INVALID_DATE: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    IS_INVALID_ORDER: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const { INVALID_DATE, IS_INVALID_ORDER } = ERROR_MESSAGE;
class Planner {
    static validateOrderOnlyOneCategory(orders, menus, category) {
        const { orderMenuNameList } = Planner.parseOrders(orders);
        const menuNameListForCategory = Object.values(menus)
            .filter((menu) => menu.TYPE === category)
            .map((menu) => menu.NAME);

        isEveryInclude(IS_INVALID_ORDER, orderMenuNameList, menuNameListForCategory);
    }

    static validateIncludeMenu(orders, menus) {
        const { orderMenuNameList } = Planner.parseOrders(orders);
        const menuNameList = Object.values(menus).map((menu) => menu.NAME);

        isSomeNotInclude(IS_INVALID_ORDER, orderMenuNameList, menuNameList);
    }

    static validateDuplicationOrder(orders) {
        const { orderMenuNameList } = Planner.parseOrders(orders);

        isDuplicate(IS_INVALID_ORDER, orderMenuNameList);
    }

    static validateLimitOrderCount(orders, limitOrderCount) {
        const { totalOrderCount } = Planner.parseOrders(orders);

        isMoreThanLimit(IS_INVALID_ORDER, totalOrderCount, limitOrderCount);
    }

    static validateOrderFormat(orders, regex) {
        const { orderList } = Planner.parseOrders(orders);

        orderList.forEach((order) => isNotMatchRegex(IS_INVALID_ORDER, order, regex));
    }

    static validateDayFormat(date, regex) {
        isNotMatchRegex(INVALID_DATE, date, regex);
    }

    static parseOrders(orders) {
        const orderList = orders.split(',').map((order) => order.trim());
        const orderMenuNameList = orderList.map((order) => order.split('-')[0]);
        const orderMenuCountList = orderList.map((order) => order.split('-')[1]);
        const totalOrderCount = orderMenuCountList.reduce((acc, cur) => acc + Number(cur), 0);

        return {
            orderList,
            orderMenuNameList,
            orderMenuCountList,
            totalOrderCount,
        };
    }

    #orders = new Map();
    #menus = new Map();
    constructor(menus) {
        this.#menus = new Map(Object.entries(menus));
    }

    setOrders(orders) {
        const { orderMenuNameList, orderMenuCountList } = Planner.parseOrders(orders);
        orderMenuNameList.forEach((menuName, index) => {
            const category = this.#getCategoryByMenuName(menuName);
            const key = this.#getKeyByName(menuName);

            this.#orders.set(key, {
                name: menuName,
                count: orderMenuCountList[index],
                category,
            });
        });
    }

    getCategories() {
        return Array.from(new Set(Array.from(this.#menus.values()).map((menu) => menu.TYPE)));
    }
    getOrders() {
        return this.getCategories()
            .map((categoryName) => this.getOrdersByCategory(categoryName))
            .flat();
    }
    getOrdersByCategory(categoryName) {
        return Array.from(this.#orders.values()).filter((order) => order.category === categoryName);
    }
    getPreDiscountTotalPrice() {
        return Array.from(this.#orders.values()).reduce((acc, order) => {
            const key = this.#getKeyByName(order.name);
            const menu = this.#menus.get(key);
            return acc + menu.PRICE * order.count;
        }, 0);
    }

    validate(validators) {
        validators.forEach((validator) => validator());
    }

    #getCategoryByMenuName(menuName) {
        return Array.from(this.#menus.values()).find((menuMap) => menuMap.NAME === menuName).TYPE;
    }

    #getKeyByName(name) {
        return Array.from(this.#menus.keys()).find((key) => this.#menus.get(key).NAME === name);
    }
}

export default Planner;
