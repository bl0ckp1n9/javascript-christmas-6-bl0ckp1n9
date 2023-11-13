import { Console } from '@woowacourse/mission-utils';

const PREFIX_ERROR = '[ERROR]';

export const check = (message, validator) => {
    try {
        const isInvalid = validator();
        if (isInvalid) throw new Error(`${PREFIX_ERROR} ${message}`);

        return false;
    } catch (e) {
        Console.print(e.message);

        return true;
    }
};

export const isEmpty = (message, data) =>
    check(message, () => data.length === 0);

export const isNotPositiveInteger = (message, data) =>
    check(message, () => data < 1);

export const isMoreThan = (message, data, limit) =>
    check(message, () => data > limit);

export const isLessThan = (message, data, limit) =>
    check(message, () => data < limit);

export const isNotIn = (message, data, list) =>
    check(message, () => !list.includes(data));

export const isDuplicate = (message, data, list) =>
    check(message, () => list.includes(data));

export const isOutOfRange = (message, data, range) =>
    check(message, () => {
        const { start, end } = range;

        if (data < start || data > end) return true;

        return false;
    });
