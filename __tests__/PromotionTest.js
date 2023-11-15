import { MENUS, PROMOTION_CONFIG } from '../src/constant/index.js';
import { Order } from '../src/model/index.js';
import { fillArrayToDates } from '../src/util/index.js';
import { Promotions } from '../src/model/Promotions.js';

const {
    T_BONE_STEAK,
    COKE_ZERO,
    RED_WINE,
    ICE_CREAM,
    CHOCOLATE_CAKE,
    BARBECUE_RIB,
    SEAFOOD_PASTA,
    CHRISTMAS_PASTA,
    MUSHROOM_SOUP,
    TAPAS,
    CHAMPAGNE,
    CAESAR_SALAD,
} = MENUS;

const calculateChristmasPromotionPrice = (orderDate, rate) => {
    const { BENEFIT_PRICE } = PROMOTION_CONFIG.CHRISTMAS;
    return PROMOTION_CONFIG.CHRISTMAS.BENEFIT_PRICE + BENEFIT_PRICE * rate * (orderDate - 1);
};

describe('Promotion 테스트', () => {
    const [ChristmasPromotion, WeekendsPromotion, WeekdaysPromotion, SpecialPromotion, GiftPromotion] = Promotions;

    test.each(fillArrayToDates(25))('크리스마스 디데이 혜택 기능 테스트', (input) => {
        const order = new Order(MENUS, `${T_BONE_STEAK.NAME}-1`, input);

        const expectedResult = calculateChristmasPromotionPrice(input, 0.1);
        expect(ChristmasPromotion.getPromotionPrice(order)).toBe(expectedResult);
    });

    test.each([
        {
            orderMenu: `${T_BONE_STEAK.NAME}-1,${TAPAS.NAME}-1`,
            count: 1,
        },
        {
            orderMenu: `${T_BONE_STEAK.NAME}-2,${BARBECUE_RIB.NAME}-1,${ICE_CREAM.NAME}-1`,
            count: 3,
        },
        {
            orderMenu: `${T_BONE_STEAK.NAME}-3,${BARBECUE_RIB.NAME}-2,${COKE_ZERO.NAME}-1`,
            count: 5,
        },
        {
            orderMenu: `${T_BONE_STEAK.NAME}-10,${SEAFOOD_PASTA.NAME}-10`,
            count: 20,
        },
        {
            orderMenu: `${CHRISTMAS_PASTA.NAME}-2,${MUSHROOM_SOUP.NAME}-1`,
            count: 2,
        },
    ])('주말 혜택 기능 테스트', (input) => {
        const { orderMenu, count } = input;
        const order = new Order(MENUS, orderMenu, 1);

        const expectedResult = count * WeekendsPromotion.CONFIG.BENEFIT_PRICE;
        expect(WeekendsPromotion.getPromotionPrice(order)).toBe(expectedResult);
    });

    test.each([
        {
            orderMenu: `${T_BONE_STEAK.NAME}-1,${CHOCOLATE_CAKE.NAME}-1`,
            count: 1,
        },
        {
            orderMenu: `${CHOCOLATE_CAKE.NAME}-2,${ICE_CREAM.NAME}-1,${CHAMPAGNE.NAME}-1`,
            count: 3,
        },
        {
            orderMenu: `${CHOCOLATE_CAKE.NAME}-3,${ICE_CREAM.NAME}-2,${RED_WINE.NAME}-1`,
            count: 5,
        },
    ])('평일 혜택 기능 테스트', (input) => {
        const { orderMenu, count } = input;
        const order = new Order(MENUS, orderMenu, 1);

        const expectedResult = count * WeekdaysPromotion.CONFIG.BENEFIT_PRICE;
        expect(WeekdaysPromotion.getPromotionPrice(order)).toBe(expectedResult);
    });

    describe('증정 혜택 테스트', () => {
        test('12만원 이상일 때', () => {
            const order = new Order(MENUS, `${T_BONE_STEAK.NAME}-3`, 1);

            expect(GiftPromotion.getPromotionPrice(order)).toBe(GiftPromotion.CONFIG.BENEFIT_PRICE);
        });

        test('12만원 미만일 때', () => {
            const order = new Order(MENUS, `${CAESAR_SALAD.NAME}-1`, 1);

            expect(GiftPromotion.getPromotionPrice(order)).toBe(0);
        });
    });

    test('특별 혜택 테스트', () => {
        expect(SpecialPromotion.getPromotionPrice()).toBe(SpecialPromotion.CONFIG.BENEFIT_PRICE);
    });
});
