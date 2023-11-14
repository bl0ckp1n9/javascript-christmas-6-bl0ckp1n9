const PRMOTION_CATEGORY = {
    CHRISTMAS: 'CHRISTMAS',
    WEEKS: 'WEEKS',
    SPECIAL: 'SPECIAL',
    GIFT: 'GIFT',
};
export const ChristPromotion = {
    BENEFIT_PRICE: 1_000,
    END_DATE: 25,
    TYPE: PRMOTION_CATEGORY.CHRISTMAS,
    getPromotionPrice(date) {
        if (date > this.END_DATE) return 0;
        return this.BENEFIT_PRICE + this.BENEFIT_PRICE * 0.1 * (date - 1);
    },
};

export const WeeksPromotion = {
    BENEFIT_PRICE: 2_023,
    TYPE: PRMOTION_CATEGORY.WEEKS,
    getPromotionPrice(orders) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);
        return this.BENEFIT_PRICE * menuCount;
    },
};

export const SpecialPromotion = {
    BENEFIT_PRICE: 1_000,
    END_DATE: 31,
    TYPE: PRMOTION_CATEGORY.SPECIAL,
    getPromotionPrice() {
        return this.BENEFIT_PRICE;
    },
};

export const GiftPromotion = {
    BENEFIT_PRICE: 25_000,
    GIFT_NAME: '샴페인',
    END_DATE: 31,
    TYPE: PRMOTION_CATEGORY.GIFT,
    getPromotionPrice() {
        return this.BENEFIT_PRICE;
    },
};
