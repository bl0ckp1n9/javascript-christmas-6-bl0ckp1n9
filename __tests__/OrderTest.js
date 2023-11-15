import Order from '../src/Order.js';

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
});
