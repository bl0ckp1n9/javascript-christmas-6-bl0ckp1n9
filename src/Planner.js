import { PROMOTION_CATEGORIES } from './constant.js';

class Planner {
    #order;
    #calendar;

    constructor(order, calendar) {
        this.#order = order;
        this.#calendar = calendar;
    }
    getPromotionsByOrderDate() {
        const promotions = this.#calendar.getPromotionsByDate(this.#order.getOrderDate());
        const activePromotions = [];
        promotions.forEach((promotion) => {
            const { CONFIG } = promotion;
            const productInOrders = this.#order.getOrderMenuByCategory(CONFIG.PRODUCT);
            activePromotions.push({
                ...CONFIG,
                promotionBenefitPrice: this.#calculatePromotions(promotion, productInOrders),
            });
        });
        return activePromotions;
    }
    getTotalBenefitPrice() {
        const promotions = this.getPromotionsByOrderDate();
        return promotions.reduce((acc, cur) => acc + cur.promotionBenefitPrice, 0);
    }
    getTotalPriceWithDiscount() {
        const promotions = this.getPromotionsByOrderDate();
        const totalPrice = this.#order.getTotalPrice();
        const getTotalBenefitPrice = this.getTotalBenefitPrice();
        const giftMenu = promotions.find((promotion) => promotion.EVENT === PROMOTION_CATEGORIES.GIFT);
        return totalPrice - (getTotalBenefitPrice - giftMenu.promotionBenefitPrice);
    }
    getBadge() {
        const totalBenefitPrice = this.getTotalBenefitPrice();
        if (totalBenefitPrice >= 20_000) return '산타';
        if (totalBenefitPrice >= 10_000) return '트리';
        if (totalBenefitPrice >= 5_000) return '벨';
        return '없음';
    }
    #calculatePromotions(promotion) {
        const promotionCategory = promotion.CONFIG.EVENT;
        if (promotionCategory === PROMOTION_CATEGORIES.CHRISTMAS || promotionCategory === PROMOTION_CATEGORIES.SPECIAL)
            return promotion.getPromotionPrice(this.#order.getOrderDate());
        if (
            promotionCategory === PROMOTION_CATEGORIES.WEEKENDS ||
            promotionCategory === PROMOTION_CATEGORIES.WEEKDAYS
        ) {
            const productInOrders = this.#order.getOrderMenuByCategory(promotion.CONFIG.PRODUCT);
            return promotion.getPromotionPrice(productInOrders);
        }
        if (promotionCategory === PROMOTION_CATEGORIES.GIFT)
            return promotion.getPromotionPrice(this.#order.getTotalPrice());
        return 0;
    }
}

export default Planner;
