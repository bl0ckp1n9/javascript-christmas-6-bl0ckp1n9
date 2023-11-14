export const CATEGORIES = {
    BEVERAGE: 'BEVERAGE',
    DESSERT: 'DESSERT',
    MAIN: 'MAIN',
    APPETIZER: 'APPETIZER',
};
const { BEVERAGE, DESSERT, MAIN, APPETIZER } = CATEGORIES;
export const MENUS = {
    COKE_ZERO: {
        type: BEVERAGE,
        name: '제로콜라',
        price: 3_000,
    },
    RED_WINE: {
        type: BEVERAGE,
        name: '레드와인',
        price: 6_000,
    },
    CHAMPAGNE: {
        type: BEVERAGE,
        name: '샴페인',
        price: 25_000,
    },
    CHOCOLATE_CAKE: {
        type: DESSERT,
        name: '초코케이크',
        price: 15_000,
    },
    ICE_CREAM: {
        type: DESSERT,
        name: '아이스크림',
        price: 5_000,
    },
    T_BONE_STEAK: {
        type: MAIN,
        name: '티본스테이크',
        price: 55_000,
    },
    BARBECUE_RIB: {
        type: MAIN,
        name: '바비큐립',
        price: 54_000,
    },
    SEAFOOD_PASTA: {
        type: MAIN,
        name: '해산물파스타',
        price: 35_000,
    },
    CHRISTMAS_PASTA: {
        type: MAIN,
        name: '크리스마스파스타',
        price: 25_000,
    },
    MUSHROOM_SOUP: {
        type: APPETIZER,
        name: '양송이수프',
        price: 6_000,
    },
    TAPAS: {
        type: APPETIZER,
        name: '타파스',
        price: 5_500,
    },
    CAESAR_SALAD: {
        type: APPETIZER,
        name: '시저샐러드',
        price: 8_000,
    },
};

export const LIMIT_ORDER_COUNT = 20;
export const REGEX = {
    DAY_FORMAT: /^(3[01]|[12][0-9]|[1-9])$/,
    ORDER_FORMAT: /^([가-힣\w]+)-([1-9]\d*)$/,
};
