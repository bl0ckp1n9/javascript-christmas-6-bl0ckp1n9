import { isDuplicate, isMoreThan, isNotInclude, isNotMatchRegex } from './validators.js';

const ERROR_MESSAGE = Object.freeze({
    INVALID_DATE: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    IS_INVALID_ORDER: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const MENU_LIST = {
    COKE_ZERO: {
        name: '제로콜라',
        price: 3_000,
    },
    RED_WINE: {
        name: '레드와인',
        price: 6_000,
    },
    CHAMPAGNE: {
        name: '샴페인',
        price: 25_000,
    },
    CHOCOLATE_CAKE: {
        name: '초코케이크',
        price: 15_000,
    },
    ICE_CREAM: {
        name: '아이스크림',
        price: 5_000,
    },
    T_BONE_STEAK: {
        name: '티본스테이크',
        price: 55_000,
    },
    BARBECUE_RIB: {
        name: '바비큐립',
        price: 54_000,
    },
    SEAFOOD_PASTA: {
        name: '해산물파스타',
        price: 35_000,
    },
    CHRISTMAS_PASTA: {
        name: '크리스마스파스타',
        price: 25_000,
    },
    MUSHROOM_SOUP: {
        name: '양송이수프',
        price: 6_000,
    },
    TAPAS: {
        name: '타파스',
        price: 5_500,
    },
    CAESAR_SALAD: {
        name: '시저샐러드',
        price: 8_000,
    },
};
const MENU_NAME_LIST = Object.values(MENU_LIST).map((menu) => menu.name);

const { INVALID_DATE, IS_INVALID_ORDER } = ERROR_MESSAGE;
class Planner {
    static isValidDate(date) {
        const validDateFormatRegExp = /^(3[01]|[12][0-9]|[1-9])$/;
        const validators = [() => isNotMatchRegex(INVALID_DATE, date, validDateFormatRegExp)];

        validators.forEach((validator) => validator());

        return true;
    }

    static isValidOrders(orders) {
        const orderList = orders.split(',').map((order) => order.trim());
        const orderMenuNameList = orderList.map((order) => order.split('-')[0]);
        const validOrderFormatRegExp = /^([가-힣\w]+)-([1-9]\d*)$/;
        const validators = [
            () => isMoreThan(IS_INVALID_ORDER, orderList.length, 20),
            () => orderList.forEach((order) => isNotMatchRegex(IS_INVALID_ORDER, order, validOrderFormatRegExp)),
            () => isDuplicate(IS_INVALID_ORDER, orderMenuNameList),
            () => orderMenuNameList.forEach((menuName) => isNotInclude(IS_INVALID_ORDER, menuName, MENU_NAME_LIST)),
        ];
        validators.forEach((validator) => validator());

        return true;
    }

    #date = '';

    setDate(date) {
        this.#date = date;
    }
    getDate() {
        return this.#date;
    }
}

export default Planner;
