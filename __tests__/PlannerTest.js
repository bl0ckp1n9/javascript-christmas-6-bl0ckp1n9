import Planner from '../src/Planner';
import { MENU_LIST } from '../src/constant.js';

describe('Planner 테스트', () => {
    const planner = new Planner(MENU_LIST);

    describe('예약 날짜 테스트', () => {
        test('유효한 날짜', () => {
            for (let i = 1; i <= 31; i++) {
                expect(() => planner.isValidDate(i)).toBeTruthy();
            }
        });
        test.each([[0], [32], ['-1'], [''], ['a'], ['1a'], ['a1']])('유효하지 않은 날짜', (input) => {
            expect(() => planner.isValidDate(input)).toThrow();
        });
    });

    describe('주문 테스트', () => {
        test.each([
            ['티본스테이크-1'],
            ['티본스테이크-1,제로콜라-1'],
            ['티본스테이크-1,제로콜라-1,타파스-1'],
            ['티본스테이크-1,제로콜라-1,타파스-1,와인-1'],
            ['티본스테이크-10,타파스-10'],
            [' 티본스테이크-10 , 제로콜라-10 '],
        ])('주문이 유효할 때', (input) => {
            console.log(input);
            expect(() => planner.isValidOrders(input)).toBeTruthy();
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
        ])('주문이 유효하지 않을 때', (input) => {
            expect(() => planner.isValidOrders(input)).toThrow();
        });
    });
});
