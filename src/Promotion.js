export const ChristPromotion = {
    BASE_PRICE: 1_000,
    END_DATE: 25,
    calcPromotionPrice(date) {
        if (date > this.END_DATE) return 0;
        return this.BASE_PRICE + this.BASE_PRICE * 0.1 * (date - 1);
    },
};
