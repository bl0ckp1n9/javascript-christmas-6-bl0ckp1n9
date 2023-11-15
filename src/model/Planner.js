import { PROMOTION_CATEGORIES } from '../constant/index.js';

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
            activePromotions.push({
                ...CONFIG,
                promotionBenefitPrice: this.#applyPromotions(promotion),
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
        const giftPromotion = promotions.find((promotion) => promotion.EVENT === PROMOTION_CATEGORIES.GIFT);
        return totalPrice - (getTotalBenefitPrice - giftPromotion.promotionBenefitPrice);
    }
    getBadge() {
        const totalBenefitPrice = this.getTotalBenefitPrice();
        if (totalBenefitPrice >= 20_000) return '산타';
        if (totalBenefitPrice >= 10_000) return '트리';
        if (totalBenefitPrice >= 5_000) return '벨';
        return '없음';
    }
    #applyPromotions(promotion) {
        const totalPriceWithoutDiscount = this.#order.getTotalPrice();
        if (totalPriceWithoutDiscount < 1_0000) return 0;
        return promotion.getPromotionPrice(this.#order);
    }
}

export default Planner;
