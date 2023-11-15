import { PROMOTION_CATEGORIES, PROMOTION_CONFIG } from '../constant/index.js';

const ChristPromotion = {
    CONFIG: PROMOTION_CONFIG.CHRISTMAS,
    getPromotionPrice(date) {
        return this.CONFIG.BENEFIT_PRICE + this.CONFIG.BENEFIT_PRICE * 0.1 * (date - 1);
    },
};

const WeekendsPromotion = {
    CONFIG: PROMOTION_CONFIG.WEEKENDS,
    getPromotionPrice(orders) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);
        return this.CONFIG.BENEFIT_PRICE * menuCount;
    },
};
const WeekdaysPromotion = {
    CONFIG: PROMOTION_CONFIG.WEEKDAYS,
    getPromotionPrice(orders) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);
        return this.CONFIG.BENEFIT_PRICE * menuCount;
    },
};

const SpecialPromotion = {
    CONFIG: PROMOTION_CONFIG.SPECIAL,
    getPromotionPrice() {
        return this.CONFIG.BENEFIT_PRICE;
    },
};

const GiftPromotion = {
    CONFIG: PROMOTION_CONFIG.GIFT,
    getPromotionPrice(preDiscountAmount) {
        if (preDiscountAmount < this.CONFIG.MINIMUM_PRICE) return 0;
        return this.CONFIG.BENEFIT_PRICE;
    },
};

const PromotionFactory = {
    promotionList: [ChristPromotion, WeekendsPromotion, WeekdaysPromotion, SpecialPromotion, GiftPromotion],
    calculatePromotionPrice(promotion, order) {
        const promotionCategory = promotion.CONFIG.EVENT;
        if (promotionCategory === PROMOTION_CATEGORIES.CHRISTMAS || promotionCategory === PROMOTION_CATEGORIES.SPECIAL)
            return promotion.getPromotionPrice(order.getOrderDate());
        if (
            promotionCategory === PROMOTION_CATEGORIES.WEEKENDS ||
            promotionCategory === PROMOTION_CATEGORIES.WEEKDAYS
        ) {
            const productInOrders = order.getOrderMenuByCategory(promotion.CONFIG.PRODUCT);
            return promotion.getPromotionPrice(productInOrders);
        }
        if (promotionCategory === PROMOTION_CATEGORIES.GIFT) return promotion.getPromotionPrice(order.getTotalPrice());
        return 0;
    },
};

export default PromotionFactory;
