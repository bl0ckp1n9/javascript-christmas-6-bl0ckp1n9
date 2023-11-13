import { isDuplicate, isMoreThan, isNotMatchRegex } from './validators.js';

const ERROR_MESSAGE = Object.freeze({
    INVALID_DATE: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    IS_INVALID_ORDER: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const { INVALID_DATE, IS_INVALID_ORDER } = ERROR_MESSAGE;
class Planner {
    static validateDate(date) {
        const validDateFormatRegExp = /^(3[01]|[12][0-9]|[1-9])$/;
        const validators = [() => isNotMatchRegex(INVALID_DATE, date, validDateFormatRegExp)];

        return validators.some((validator) => validator());
    }

    static validateMenu(orders) {
        const orderList = orders.split(',').map((order) => order.trim());
        const validOrderFormatRegExp = /^([가-힣\w]+)-([1-9]\d*)$/;
        const validators = [
            () => isMoreThan(IS_INVALID_ORDER, orderList.length, 20),
            () => orderList.some((order) => isNotMatchRegex(IS_INVALID_ORDER, order, validOrderFormatRegExp)),
            () =>
                isDuplicate(
                    IS_INVALID_ORDER,
                    orderList.map((order) => order.split('-')[0]),
                ),
        ];

        return validators.some((validator) => validator());
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
