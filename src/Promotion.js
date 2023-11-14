import { PROMOTION_CONFIG } from './constant.js';

export const ChristPromotion = {
    CONFIG: PROMOTION_CONFIG.CHRISTMAS,
    getPromotionPrice(date) {
        return this.CONFIG.BENEFIT_PRICE + this.CONFIG.BENEFIT_PRICE * 0.1 * (date - 1);
    },
};

export const WeekendsPromotion = {
    CONFIG: PROMOTION_CONFIG.WEEKENDS,
    getPromotionPrice(orders) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);
        return this.CONFIG.BENEFIT_PRICE * menuCount;
    },
};
export const WeekdaysPromotion = {
    CONFIG: PROMOTION_CONFIG.WEEKDAYS,
    getPromotionPrice(orders) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);
        return this.CONFIG.BENEFIT_PRICE * menuCount;
    },
};

export const SpecialPromotion = {
    CONFIG: PROMOTION_CONFIG.SPECIAL,
    getPromotionPrice() {
        return this.CONFIG.BENEFIT_PRICE;
    },
};

export const GiftPromotion = {
    CONFIG: PROMOTION_CONFIG.GIFT,
    getPromotionPrice(preDiscountAmount) {
        if (preDiscountAmount < this.CONFIG.MINIMUM_PRICE) return 0;
        return this.CONFIG.BENEFIT_PRICE;
    },
};

export const Promotions = [ChristPromotion, WeekendsPromotion, WeekdaysPromotion, SpecialPromotion, GiftPromotion];
