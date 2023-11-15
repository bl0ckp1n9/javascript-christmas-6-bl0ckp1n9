import { BADGE, PROMOTION_CATEGORIES, PROMOTION_MINIMUM_PRICE } from '../constant/index.js';

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
        const { SANTA, TREE, STAR, NONE } = BADGE;
        const totalBenefitPrice = this.getTotalBenefitPrice();
        if (totalBenefitPrice >= SANTA.PRICE) return SANTA.NAME;
        if (totalBenefitPrice >= TREE.PRICE) return TREE.NAME;
        if (totalBenefitPrice >= STAR.PRICE) return STAR.NAME;

        return NONE.NAME;
    }
    #applyPromotions(promotion) {
        const totalPriceWithoutDiscount = this.#order.getTotalPrice();
        if (totalPriceWithoutDiscount < PROMOTION_MINIMUM_PRICE) return 0;

        return promotion.getPromotionPrice(this.#order);
    }
}

export default Planner;
