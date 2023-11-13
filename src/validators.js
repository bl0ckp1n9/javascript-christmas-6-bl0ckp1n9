export const check = (message, validator) => {
    if (validator()) throw new Error(`[ERROR] ${message}`);
};

export const isEmpty = (message, data) =>
    check(message, () => data.length === 0);

export const isNotPositiveInteger = (message, data) =>
    check(message, () => data < 1);

export const isInvalidDate = (message, data, range) =>
    check(message, () => {
        const { start, end } = range;
        const date = new Date(data);

        if (date < start || date > end) return true;

        return false;
    });

export const isMoreThan = (message, data, limit) =>
    check(message, () => data > limit);

export const isLessThan = (message, data, limit) =>
    check(message, () => data < limit);

export const isNotIn = (message, data, list) =>
    check(message, () => !list.includes(data));

export const isDuplicate = (message, data, list) =>
    check(message, () => list.includes(data));

export const isNotRange = (message, data, range) =>
    check(message, () => {
        const { start, end } = range;

        if (data < start || data > end) return true;

        return false;
    });
