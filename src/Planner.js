import { isDuplicate, isEveryIndclude, isMoreThanLimit, isNotInclude, isNotMatchRegex } from './validators.js';

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

    getDate() {
        return this.#date;
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
            () => this.#isOnlyDrink(orders),
        ];

        validators.forEach((validator) => validator());

        return true;
    }

    #initializeMenu(menus) {
        Object.entries(menus).forEach(([category, categoryMenus]) => {
            this.#menu.set(category, new Map());
            Object.entries(categoryMenus).forEach(([menuName, { name, price }]) => {
                this.#menu.get(category).set(menuName, { name, price });
            });
        });
    }

    #isOnlyDrink(orders) {
        const { orderMenuNameList } = this.#parseOrders(orders);
        const drinkMenuNameList = Array.from(this.#menu.get('DRINK').values()).map((menu) => menu.name);

        isEveryIndclude(IS_INVALID_ORDER, orderMenuNameList, drinkMenuNameList);
    }
    #isNotIncludeMenu(orders) {
        const { orderMenuNameList } = this.#parseOrders(orders);
        const menuNameList = Array.from(this.#menu.values())
            .map((menuMap) => Array.from(menuMap.values()).map((menu) => menu.name))
            .flat();

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
}

export default Planner;
