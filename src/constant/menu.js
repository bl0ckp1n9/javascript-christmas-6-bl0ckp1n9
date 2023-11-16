export const MENU_CATEGORIES = {
    BEVERAGE: 'BEVERAGE',
    DESSERT: 'DESSERT',
    MAIN: 'MAIN',
    APPETIZER: 'APPETIZER',
};
const { BEVERAGE, DESSERT, MAIN, APPETIZER } = MENU_CATEGORIES;
export const MENUS = {
    COKE_ZERO: {
        CATEGORY: BEVERAGE,
        NAME: '제로콜라',
        PRICE: 3_000,
    },
    RED_WINE: {
        CATEGORY: BEVERAGE,
        NAME: '레드와인',
        PRICE: 6_000,
    },
    CHAMPAGNE: {
        CATEGORY: BEVERAGE,
        NAME: '샴페인',
        PRICE: 25_000,
    },
    CHOCOLATE_CAKE: {
        CATEGORY: DESSERT,
        NAME: '초코케이크',
        PRICE: 15_000,
    },
    ICE_CREAM: {
        CATEGORY: DESSERT,
        NAME: '아이스크림',
        PRICE: 5_000,
    },
    T_BONE_STEAK: {
        CATEGORY: MAIN,
        NAME: '티본스테이크',
        PRICE: 55_000,
    },
    BARBECUE_RIB: {
        CATEGORY: MAIN,
        NAME: '바비큐립',
        PRICE: 54_000,
    },
    SEAFOOD_PASTA: {
        CATEGORY: MAIN,
        NAME: '해산물파스타',
        PRICE: 35_000,
    },
    CHRISTMAS_PASTA: {
        CATEGORY: MAIN,
        NAME: '크리스마스파스타',
        PRICE: 25_000,
    },
    MUSHROOM_SOUP: {
        CATEGORY: APPETIZER,
        NAME: '양송이수프',
        PRICE: 6_000,
    },
    TAPAS: {
        CATEGORY: APPETIZER,
        NAME: '타파스',
        PRICE: 5_500,
    },
    CAESAR_SALAD: {
        CATEGORY: APPETIZER,
        NAME: '시저샐러드',
        PRICE: 8_000,
    },
};
