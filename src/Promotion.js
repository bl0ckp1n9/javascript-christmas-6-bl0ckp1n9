import { PROMOTION_CONFIG } from './constant.js';

export const ChristPromotion = {
    CONFIG: PROMOTION_CONFIG.CHRISTMAS,
    getPromotionPrice(date) {
        if (date > this.END_DATE) return 0;
        return this.BENEFIT_PRICE + this.BENEFIT_PRICE * 0.1 * (date - 1);
    },
};

export const WeekendsPromotion = {
    CONFIG: PROMOTION_CONFIG.WEEKENDS,
    getPromotionPrice(orders) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);
        return this.BENEFIT_PRICE * menuCount;
    },
};
export const WeekdaysPromotion = {
    CONFIG: PROMOTION_CONFIG.WEEKENDS,
    getPromotionPrice(orders) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);
        return this.BENEFIT_PRICE * menuCount;
    },
};

export const SpecialPromotion = {
    CONFIG: PROMOTION_CONFIG.SPECIAL,
    getPromotionPrice(date) {
        if (!this.SPECIAL_DATE.includes(date)) return 0;
        return this.BENEFIT_PRICE;
    },
};

export const GiftPromotion = {
    CONFIG: PROMOTION_CONFIG.GIFT,
    getPromotionPrice(preDiscountAmount) {
        if (preDiscountAmount < this.MINIMUM_PRICE) return 0;
        return this.BENEFIT_PRICE;
    },
};
export const PromotionList = [ChristPromotion, WeekendsPromotion, SpecialPromotion, GiftPromotion];
