import { PROMOTIONS } from '../constant/index.js';

const ChristPromotion = {
    CONFIG: PROMOTIONS.CHRISTMAS,
    getPromotionPrice(order) {
        const date = order.getOrderDate();

        return this.CONFIG.BENEFIT_PRICE + this.CONFIG.BENEFIT_PRICE * 0.1 * (date - 1);
    },
};
const WeekendsPromotion = {
    CONFIG: PROMOTIONS.WEEKENDS,
    getPromotionPrice(order) {
        const productInOrder = order.getOrderMenuByCategory(this.CONFIG.PRODUCT);
        const menuCount = productInOrder.reduce((acc, cur) => acc + Number(cur.count), 0);

        return this.CONFIG.BENEFIT_PRICE * menuCount;
    },
};
const WeekdaysPromotion = {
    CONFIG: PROMOTIONS.WEEKDAYS,
    getPromotionPrice(order) {
        const productInOrder = order.getOrderMenuByCategory(this.CONFIG.PRODUCT);
        const menuCount = productInOrder.reduce((acc, cur) => acc + Number(cur.count), 0);

        return this.CONFIG.BENEFIT_PRICE * menuCount;
    },
};
const SpecialPromotion = {
    CONFIG: PROMOTIONS.SPECIAL,
    getPromotionPrice() {
        return this.CONFIG.BENEFIT_PRICE;
    },
};
const GiftPromotion = {
    CONFIG: PROMOTIONS.GIFT,
    getPromotionPrice(order) {
        const preDiscountAmount = order.getTotalPrice();
        if (preDiscountAmount < this.CONFIG.MINIMUM_PRICE) return 0;

        return this.CONFIG.BENEFIT_PRICE;
    },
};
export const Promotions = [ChristPromotion, WeekendsPromotion, WeekdaysPromotion, SpecialPromotion, GiftPromotion];
export default Promotions;
