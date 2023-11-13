import { isEmpty, isNotPositiveInteger, isOutOfRange } from './validators.js';

const ERROR_MESSAGE = Object.freeze({
    INVALID_DATE: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    IS_NOT_POSITIVE_INTEGER: '양수를 입력해주세요',
    IS_EMPTY: '값을 입력해주세요',
});

const { INVALID_DATE, IS_EMPTY, IS_NOT_POSITIVE_INTEGER } = ERROR_MESSAGE;
class Planner {
    static validateDate(date) {
        this.validators = [
            () => isEmpty(IS_EMPTY, date),
            () => isNotPositiveInteger(IS_NOT_POSITIVE_INTEGER, date),
            () =>
                isOutOfRange(INVALID_DATE, date, {
                    start: 1,
                    end: 31,
                }),
        ];

        return this.validators.some((validator) => validator());
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
