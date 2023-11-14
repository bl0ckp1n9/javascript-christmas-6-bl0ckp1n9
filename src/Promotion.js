const PRMOTION_CATEGORY = {
    CHRISTMAS: 'CHRISTMAS',
    WEEKS: 'WEEKS',
};
export const ChristPromotion = {
    BASE_PRICE: 1_000,
    END_DATE: 25,
    TYPE: PRMOTION_CATEGORY.CHRISTMAS,
    calcPromotionPrice(date) {
        if (date > this.END_DATE) return 0;
        return this.BASE_PRICE + this.BASE_PRICE * 0.1 * (date - 1);
    },
};

export const WeeksPromotion = {
    BASE_PRICE: 2_023,
    END_DATE: 31,
    TYPE: PRMOTION_CATEGORY.WEEKS,
    calcPromotionPrice(orders, date) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);
        return this.BASE_PRICE * menuCount;
    },
};
