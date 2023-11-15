import { MENUS, PROMOTIONS } from '../src/constant/index.js';
import { calculateChristmasPromotionPrice, getPromotionsByOrderDate, makePlanner } from './test.js';

const { CHRISTMAS, WEEKENDS, WEEKDAYS, SPECIAL, GIFT } = PROMOTIONS;

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

describe('Planner 테스트', () => {
    describe('날짜에 따른 이벤트 존재 여부 테스트', () => {
        describe('크리스마스 이벤트', () => {
            test.each(CHRISTMAS.TARGET_DATES)('존재', (input) => {
                const promotionsForDate = getPromotionsByOrderDate(input);

                const promotions = promotionsForDate.filter((promotion) => promotion.EVENT === CHRISTMAS.EVENT);
                expect(promotions.length).toBe(1);
            });
            test.each([26, 27, 28, 29, 30, 31])('미존재', (input) => {
                const promotionsForDate = getPromotionsByOrderDate(input);

                const promotions = promotionsForDate.filter((promotion) => promotion.EVENT === CHRISTMAS.EVENT);
                expect(promotions.length).toBe(0);
            });
        });
        describe('주말 이벤트', () => {
            test.each(WEEKENDS.TARGET_DATES)('존재', (input) => {
                const promotionsForDate = getPromotionsByOrderDate(input);

                const promotions = promotionsForDate.filter((promotion) => promotion.EVENT === WEEKENDS.EVENT);
                expect(promotions.length).toBe(1);
            });
            test.each(WEEKDAYS.TARGET_DATES)('미존재', (input) => {
                const promotionsForDate = getPromotionsByOrderDate(input);

                const promotions = promotionsForDate.filter((promotion) => promotion.EVENT === WEEKENDS.EVENT);
                expect(promotions.length).toBe(0);
            });
        });
        describe('평일 이벤트', () => {
            test.each(WEEKDAYS.TARGET_DATES)('존재', (input) => {
                const promotionsForDate = getPromotionsByOrderDate(input);

                const promotions = promotionsForDate.filter((promotion) => promotion.EVENT === WEEKDAYS.EVENT);
                expect(promotions.length).toBe(1);
            });
            test.each(WEEKENDS.TARGET_DATES)('미존재', (input) => {
                const promotionsForDate = getPromotionsByOrderDate(input);

                const promotions = promotionsForDate.filter((promotion) => promotion.EVENT === WEEKDAYS.EVENT);
                expect(promotions.length).toBe(0);
            });
        });
        test.each(SPECIAL.TARGET_DATES)('특별 이벤트 존재', (input) => {
            const promotionsForDate = getPromotionsByOrderDate(input);

            const promotions = promotionsForDate.filter((promotion) => promotion.EVENT === SPECIAL.EVENT);
            expect(promotions.length).toBe(1);
        });
        test.each(GIFT.TARGET_DATES)('증정 이벤트 존재', (input) => {
            const promotionsForDate = getPromotionsByOrderDate(input);

            const promotions = promotionsForDate.filter((promotion) => promotion.EVENT === GIFT.EVENT);
            expect(promotions.length).toBe(1);
        });
    });

    test.each([
        {
            orderMenus: `${T_BONE_STEAK.NAME}-1,${COKE_ZERO.NAME}-1`,
            orderDate: 1,
            expectedResult: calculateChristmasPromotionPrice(1) + WEEKENDS.BENEFIT_PRICE,
        },
        {
            orderMenus: `${T_BONE_STEAK.NAME}-1,${COKE_ZERO.NAME}-1,${BARBECUE_RIB.NAME}-1,${CHOCOLATE_CAKE.NAME}-2`,
            orderDate: 3,
            expectedResult:
                calculateChristmasPromotionPrice(3) +
                WEEKENDS.BENEFIT_PRICE * 2 +
                SPECIAL.BENEFIT_PRICE +
                GIFT.BENEFIT_PRICE,
        },
        {
            orderMenus: `${T_BONE_STEAK.NAME}-2,${COKE_ZERO.NAME}-1,${SEAFOOD_PASTA.NAME}-1,${CHOCOLATE_CAKE.NAME}-2,${ICE_CREAM.NAME}-3`,
            orderDate: 9,
            expectedResult: calculateChristmasPromotionPrice(9) + WEEKENDS.BENEFIT_PRICE * 3 + GIFT.BENEFIT_PRICE,
        },
        {
            orderMenus: `${T_BONE_STEAK.NAME}-1,${ICE_CREAM.NAME}-1,${CHOCOLATE_CAKE.NAME}-1`,
            orderDate: 18,
            expectedResult: calculateChristmasPromotionPrice(18) + WEEKDAYS.BENEFIT_PRICE * 2,
        },
        {
            orderMenus: `${T_BONE_STEAK.NAME}-1,${COKE_ZERO.NAME}-1`,
            orderDate: 25,
            expectedResult: calculateChristmasPromotionPrice(25) + SPECIAL.BENEFIT_PRICE,
        },
        {
            orderMenus: `${T_BONE_STEAK.NAME}-3,${COKE_ZERO.NAME}-1,${RED_WINE.NAME}-1,${ICE_CREAM.NAME}-1,${CHOCOLATE_CAKE.NAME}-1`,
            orderDate: 29,
            expectedResult: GIFT.BENEFIT_PRICE + WEEKENDS.BENEFIT_PRICE * 3,
        },
    ])('이벤트 혜택 총금액 테스트', (input) => {
        const { orderMenus, orderDate, expectedResult } = input;
        const planner = makePlanner(orderMenus, orderDate);
        expect(planner.getTotalBenefitPrice()).toBe(expectedResult);
    });
});
