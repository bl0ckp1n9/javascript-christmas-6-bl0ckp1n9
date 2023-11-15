import Order from '../src/Order.js';
import { MENUS } from '../src/constant.js';

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

describe('Order 테스트', () => {
    describe('예약 날짜 테스트', () => {
        test('유효한 날짜', () => {
            for (let input = 1; input <= 31; input++) {
                expect(() => Order.validateDate(input)).not.toThrow();
            }
        });

        test.each([[0], [32], ['-1'], [''], ['a'], ['1a'], ['a1']])('유효하지 않은 날짜', (input) => {
            expect(() => Order.validateDate(input)).toThrow();
        });
    });

    describe('예약 메뉴 주문 테스트', () => {
        test.each([
            ['티본스테이크-1'],
            ['티본스테이크-1,제로콜라-1'],
            ['티본스테이크-1,제로콜라-1,타파스-1'],
            ['티본스테이크-1,제로콜라-1,타파스-1,레드와인-1'],
            ['티본스테이크-10,타파스-10'],
            ['티본스테이크-10,제로콜라-10'],
        ])('유효한 주문', (input) => {
            expect(() => Order.validateOrder(input)).not.toThrow();
        });

        test.each([
            [''],
            ['티본스테이크-1,'],
            ['티본스테이크-0'],
            ['티본스테이크-a'],
            ['티본스테이크1'],
            ['티본스테이크-1,티본스테이크-2'],
            ['티본스테이크-1,과자-2,제로콜라-3,타파스-4'],
            ['티본스테이크,제로콜라'],
            ['티본스테이크-21'],
            ['티본스테이크-15,제로콜라-6'],
            ['제로콜라-1,레드와인-2'],
        ])('유효하지 않은 주문', (input) => {
            expect(() => Order.validateOrder(input)).toThrow();
        });
    });

    test.each([
        {
            orderMenus: `${T_BONE_STEAK.NAME}-1,${COKE_ZERO.NAME}-1`,
            totalPrice: T_BONE_STEAK.PRICE + COKE_ZERO.PRICE,
        },
        {
            orderMenus: `${T_BONE_STEAK.NAME}-1,${COKE_ZERO.NAME}-1,${TAPAS.NAME}-1`,
            totalPrice: T_BONE_STEAK.PRICE + COKE_ZERO.PRICE + TAPAS.PRICE,
        },
        {
            orderMenus: `${T_BONE_STEAK.NAME}-2,${COKE_ZERO.NAME}-1,${TAPAS.NAME}-1,${RED_WINE.NAME}-1`,
            totalPrice: T_BONE_STEAK.PRICE * 2 + COKE_ZERO.PRICE + TAPAS.PRICE + RED_WINE.PRICE,
        },
        {
            orderMenus: `${T_BONE_STEAK.NAME}-2,${COKE_ZERO.NAME}-1,${TAPAS.NAME}-1,${RED_WINE.NAME}-1,${ICE_CREAM.NAME}-1`,
            totalPrice: T_BONE_STEAK.PRICE * 2 + COKE_ZERO.PRICE + TAPAS.PRICE + RED_WINE.PRICE + ICE_CREAM.PRICE,
        },
        {
            orderMenus: `${ICE_CREAM.NAME}-1`,
            totalPrice: ICE_CREAM.PRICE,
        },
        {
            orderMenus: `${ICE_CREAM.NAME}-1,${CHOCOLATE_CAKE.NAME}-1`,
            totalPrice: ICE_CREAM.PRICE + CHOCOLATE_CAKE.PRICE,
        },
        {
            orderMenus: `${BARBECUE_RIB.NAME}-3,${SEAFOOD_PASTA.NAME}-2,${CHRISTMAS_PASTA.NAME}-1,${MUSHROOM_SOUP.NAME}-1`,
            totalPrice: BARBECUE_RIB.PRICE * 3 + SEAFOOD_PASTA.PRICE * 2 + CHRISTMAS_PASTA.PRICE + MUSHROOM_SOUP.PRICE,
        },
        {
            orderMenus: `${CHAMPAGNE.NAME}-3,${CAESAR_SALAD.NAME}-2`,
            totalPrice: CHAMPAGNE.PRICE * 3 + CAESAR_SALAD.PRICE * 2,
        },
    ])('주문한 메뉴 할인 전 전체 가격 계산', (input) => {
        console.log(input);
        const order = new Order(MENUS, input.orderMenus, 3);
        expect(order.getTotalPrice()).toBe(input.totalPrice);
    });
});
