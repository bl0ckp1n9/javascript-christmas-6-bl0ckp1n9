import { fillArrayToDates, getWeekdaysDates, getWeekendsDates } from './utils.js';

export const MENU_CATEGORIES = {
    BEVERAGE: 'BEVERAGE',
    DESSERT: 'DESSERT',
    MAIN: 'MAIN',
    APPETIZER: 'APPETIZER',
};
const { BEVERAGE, DESSERT, MAIN, APPETIZER } = MENU_CATEGORIES;
export const MENUS = {
    COKE_ZERO: {
        TYPE: BEVERAGE,
        NAME: '제로콜라',
        PRICE: 3_000,
    },
    RED_WINE: {
        TYPE: BEVERAGE,
        NAME: '레드와인',
        PRICE: 6_000,
    },
    CHAMPAGNE: {
        TYPE: BEVERAGE,
        NAME: '샴페인',
        PRICE: 25_000,
    },
    CHOCOLATE_CAKE: {
        TYPE: DESSERT,
        NAME: '초코케이크',
        PRICE: 15_000,
    },
    ICE_CREAM: {
        TYPE: DESSERT,
        NAME: '아이스크림',
        PRICE: 5_000,
    },
    T_BONE_STEAK: {
        TYPE: MAIN,
        NAME: '티본스테이크',
        PRICE: 55_000,
    },
    BARBECUE_RIB: {
        TYPE: MAIN,
        NAME: '바비큐립',
        PRICE: 54_000,
    },
    SEAFOOD_PASTA: {
        TYPE: MAIN,
        NAME: '해산물파스타',
        PRICE: 35_000,
    },
    CHRISTMAS_PASTA: {
        TYPE: MAIN,
        NAME: '크리스마스파스타',
        PRICE: 25_000,
    },
    MUSHROOM_SOUP: {
        TYPE: APPETIZER,
        NAME: '양송이수프',
        PRICE: 6_000,
    },
    TAPAS: {
        TYPE: APPETIZER,
        NAME: '타파스',
        PRICE: 5_500,
    },
    CAESAR_SALAD: {
        TYPE: APPETIZER,
        NAME: '시저샐러드',
        PRICE: 8_000,
    },
};

export const LIMIT_ORDER_COUNT = 20;
export const REGEX = {
    DAY_FORMAT: /^(3[01]|[12][0-9]|[1-9])$/,
    ORDER_FORMAT: /^([가-힣\w]+)-([1-9]\d*)$/,
};

export const DAYS = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
};

export const MONTHS = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12,
};

export const PROMOTION_YEAR = 2023;
export const PROMOTION_MONTH = MONTHS.DEC;

export const PROMOTION_CATEGORIES = {
    CHRISTMAS: 'CHRISTMAS',
    WEEKENDS: 'WEEKENDS',
    WEEKDAYS: 'WEEKDAYS',
    SPECIAL: 'SPECIAL',
    GIFT: 'GIFT',
};

export const PROMOTION_CONFIG = {
    CHRISTMAS: {
        NAME: '크리스마스 디데이',
        EVENT: PROMOTION_CATEGORIES.CHRISTMAS,
        TYPE: 'DISCOUNT',
        PRODUCT: 'TOTAL',
        BENEFIT_PRICE: 1_000,
        MINIMUM_PRICE: 0,
        TARGET_DATES: fillArrayToDates(25),
    },
    WEEKENDS: {
        NAME: '주말',
        EVENT: PROMOTION_CATEGORIES.WEEKENDS,
        TYPE: 'DISCOUNT',
        PRODUCT: MENU_CATEGORIES.MAIN,
        BENEFIT_PRICE: 2_023,
        MINIMUM_PRICE: 0,
        TARGET_DATES: getWeekendsDates(PROMOTION_YEAR, PROMOTION_MONTH),
    },
    WEEKDAYS: {
        NAME: '평일',
        EVENT: PROMOTION_CATEGORIES.WEEKDAYS,
        TYPE: 'DISCOUNT',
        PRODUCT: MENU_CATEGORIES.BEVERAGE,
        BENEFIT_PRICE: 2_023,
        MINIMUM_PRICE: 0,
        TARGET_DATES: getWeekdaysDates(PROMOTION_YEAR, PROMOTION_MONTH),
    },
    SPECIAL: {
        NAME: '특별',
        EVENT: PROMOTION_CATEGORIES.SPECIAL,
        TYPE: 'DISCOUNT',
        PRODUCT: 'TOTAL',
        BENEFIT_PRICE: 2_023,
        MINIMUM_PRICE: 0,
        TARGET_DATES: [3, 10, 17, 24, 25, 31],
    },
    GIFT: {
        NAME: '증정',
        EVENT: PROMOTION_CATEGORIES.GIFT,
        TYPE: 'GIFT',
        PRODUCT: MENUS.CHAMPAGNE,
        BENEFIT_PRICE: MENUS.CHAMPAGNE.PRICE,
        MINIMUM_PRICE: 120_000,
        TARGET_DATES: fillArrayToDates(31),
    },
};
