const PREFIX_ERROR = '[ERROR]';

export const check = (errorMessage, validator) => {
    if (validator()) throw new Error(`${PREFIX_ERROR} ${errorMessage}`);
};

export const isMoreThanLimit = (errorMessage, target, limit) => check(errorMessage, () => target > limit);

export const isDuplicate = (errorMessage, targets) =>
    check(errorMessage, () => new Set(targets).size !== targets.length);

export const isNotMatchRegex = (errorMessage, target, regex) => check(errorMessage, () => !regex.test(target));

export const isEveryInclude = (errorMessage, targets, references) =>
    check(errorMessage, () => targets.every((item) => references.includes(item)));

export const isSomeNotInclude = (errorMessage, targets, references) =>
    check(errorMessage, () => targets.some((item) => !references.includes(item)));
