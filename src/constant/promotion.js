import { fillArrayToDates, getWeekdaysDates, getWeekendsDates } from '../util/date.js';
import { MONTHS } from './date.js';
import { MENU_CATEGORIES, MENUS } from './menu.js';

export const BADGE = {
    SANTA: {
        NAME: '산타',
        PRICE: 20_000,
    },
    TREE: {
        NAME: '트리',
        PRICE: 10_000,
    },
    STAR: {
        NAME: '별',
        PRICE: 5_000,
    },
    NONE: {
        NAME: '없음',
        PRICE: 0,
    },
};
export const PROMOTION_MINIMUM_PRICE = 10_000;
export const PROMOTION_YEAR = 2023;
export const PROMOTION_MONTH = MONTHS.DEC;
export const PROMOTION_CATEGORIES = {
    CHRISTMAS: 'CHRISTMAS',
    WEEKENDS: 'WEEKENDS',
    WEEKDAYS: 'WEEKDAYS',
    SPECIAL: 'SPECIAL',
    GIFT: 'GIFT',
};
export const PROMOTION_PRODUCTS = {
    TOTAL: 'TOTAL',
    DESSERT: MENU_CATEGORIES.DESSERT,
    MAIN: MENU_CATEGORIES.MAIN,
    CHAMPAGNE: MENUS.CHAMPAGNE,
};
export const PROMOTIONS = {
    CHRISTMAS: {
        NAME: '크리스마스 디데이',
        EVENT: PROMOTION_CATEGORIES.CHRISTMAS,
        PRODUCT: PROMOTION_PRODUCTS.TOTAL,
        BENEFIT_PRICE: 1_000,
        MINIMUM_PRICE: 0,
        TARGET_DATES: fillArrayToDates(25),
    },
    WEEKENDS: {
        NAME: '주말',
        EVENT: PROMOTION_CATEGORIES.WEEKENDS,
        PRODUCT: PROMOTION_PRODUCTS.MAIN,
        BENEFIT_PRICE: 2_023,
        MINIMUM_PRICE: 0,
        TARGET_DATES: getWeekendsDates(PROMOTION_YEAR, PROMOTION_MONTH),
    },
    WEEKDAYS: {
        NAME: '평일',
        EVENT: PROMOTION_CATEGORIES.WEEKDAYS,
        PRODUCT: PROMOTION_PRODUCTS.DESSERT,
        BENEFIT_PRICE: 2_023,
        MINIMUM_PRICE: 0,
        TARGET_DATES: getWeekdaysDates(PROMOTION_YEAR, PROMOTION_MONTH),
    },
    SPECIAL: {
        NAME: '특별',
        EVENT: PROMOTION_CATEGORIES.SPECIAL,
        PRODUCT: PROMOTION_PRODUCTS.TOTAL,
        BENEFIT_PRICE: 1_000,
        MINIMUM_PRICE: 0,
        TARGET_DATES: [3, 10, 17, 24, 25, 31],
    },
    GIFT: {
        NAME: '증정',
        EVENT: PROMOTION_CATEGORIES.GIFT,
        PRODUCT: PROMOTION_PRODUCTS.CHAMPAGNE,
        BENEFIT_PRICE: PROMOTION_PRODUCTS.CHAMPAGNE.PRICE,
        MINIMUM_PRICE: 120_000,
        TARGET_DATES: fillArrayToDates(31),
    },
};
