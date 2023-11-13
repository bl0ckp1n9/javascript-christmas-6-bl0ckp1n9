import { isDuplicate, isEveryIndclude, isMoreThanLimit, isNotInclude, isNotMatchRegex } from './validators.js';
import { CATEGORIES } from './constant.js';

const ERROR_MESSAGE = Object.freeze({
    INVALID_DATE: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    IS_INVALID_ORDER: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const { INVALID_DATE, IS_INVALID_ORDER } = ERROR_MESSAGE;
class Planner {
    #date = '';
    #limitOrderCount = 0;
    #orders = new Map();
    #menu = new Map();
    constructor(menus, limitOrderCount) {
        this.#initializeMenu(menus);
        this.#limitOrderCount = limitOrderCount;
    }

    setDate(date) {
        this.#date = date;
    }

    setOrders(orders) {
        const { orderMenuNameList, orderMenuCountList } = this.#parseOrders(orders);
        orderMenuNameList.forEach((menuName, index) => {
            const category = this.#getCategoryByMenuName(menuName);
            const menuNameEn = Array.from(this.#menu.keys()).find((key) => this.#menu.get(key).name === menuName);

            this.#orders.set(menuNameEn, {
                name: menuName,
                count: orderMenuCountList[index],
                category,
            });
        });
    }

    getOrdersByCategory(categoryName) {
        return Array.from(this.#orders.values()).filter((order) => order.category === categoryName);
    }

    isValidDate(date) {
        const validators = [() => this.#isNotValidDateFormat(date)];

        validators.forEach((validator) => validator());

        return true;
    }
    isValidOrders(orders) {
        const validators = [
            () => this.#isMoreThanMaxOrderCount(orders),
            () => this.#isNotValidOrderFormat(orders),
            () => this.#isDuplicateOrder(orders),
            () => this.#isNotIncludeMenu(orders),
            () => this.#isOrderOnlyOneCategory(orders, CATEGORIES.BEVERAGE),
        ];

        validators.forEach((validator) => validator());

        return true;
    }

    #initializeMenu(menus) {
        this.#menu = new Map(Object.entries(menus));
    }

    #isOrderOnlyOneCategory(orders, category) {
        const { orderMenuNameList } = this.#parseOrders(orders);
        const drinkMenuNameList = Array.from(this.#menu.values())
            .filter((menuMap) => menuMap.type === category)
            .map((menuMap) => menuMap.name);

        isEveryIndclude(IS_INVALID_ORDER, orderMenuNameList, drinkMenuNameList);
    }
    #isNotIncludeMenu(orders) {
        const { orderMenuNameList } = this.#parseOrders(orders);
        const menuNameList = Array.from(this.#menu.values()).map((menuMap) => menuMap.name);

        orderMenuNameList.forEach((menuName) => isNotInclude(IS_INVALID_ORDER, menuName, menuNameList));
    }

    #isDuplicateOrder(orders) {
        const { orderMenuNameList } = this.#parseOrders(orders);

        isDuplicate(IS_INVALID_ORDER, orderMenuNameList);
    }

    #isMoreThanMaxOrderCount(orders) {
        const { totalOrderCount } = this.#parseOrders(orders);

        isMoreThanLimit(IS_INVALID_ORDER, totalOrderCount, this.#limitOrderCount);
    }

    #isNotValidOrderFormat(orders) {
        const { orderList } = this.#parseOrders(orders);
        const validOrderFormatRegExp = /^([가-힣\w]+)-([1-9]\d*)$/;

        orderList.forEach((order) => isNotMatchRegex(IS_INVALID_ORDER, order, validOrderFormatRegExp));
    }

    #isNotValidDateFormat(date) {
        const validDateFormatRegExp = /^(3[01]|[12][0-9]|[1-9])$/;

        isNotMatchRegex(INVALID_DATE, date, validDateFormatRegExp);
    }

    #parseOrders(orders) {
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

    #getCategoryByMenuName(menuName) {
        return Array.from(this.#menu.values()).find((menuMap) => menuMap.name === menuName).type;
    }
}

export default Planner;
