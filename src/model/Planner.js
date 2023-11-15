import { PROMOTION_CATEGORIES } from '../constant/index.js';
import PromotionFactory from './Promotion.js';

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
                promotionBenefitPrice: this.#applyPromotions(promotion, productInOrders),
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
    #applyPromotions(promotion) {
        const totalPriceWithoutDiscount = this.#order.getTotalPrice();
        if (totalPriceWithoutDiscount < 1_0000) return 0;
        const promotionFactory = this.#calendar.getPromotionFactory();
        return promotionFactory.calculatePromotionPrice(promotion, this.#order);
    }
}

export default Planner;
