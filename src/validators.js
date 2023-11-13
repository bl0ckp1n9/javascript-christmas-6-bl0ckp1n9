const PREFIX_ERROR = '[ERROR]';

export const check = (message, validator) => {
    if (validator()) throw new Error(`${PREFIX_ERROR} ${message}`);
};

export const isMoreThan = (message, data, limit) => check(message, () => data > limit);

export const isDuplicate = (message, list) => check(message, () => new Set(list).size !== list.length);

export const isNotMatchRegex = (message, data, regex) => check(message, () => !regex.test(data));

export const isNotInclude = (message, data, list) => check(message, () => !list.includes(data));
