import { PromotionCalendar } from '../src/model/index.js';

const MOCK_PROMOTIONS = [
    {
        TYPE: 'EVENT1',
        CONFIG: {
            TARGET_DATES: [1, 2, 3, 4, 5, 6, 7],
        },
    },
    {
        TYPE: 'EVENT2',
        CONFIG: {
            TARGET_DATES: [8, 9, 10, 11, 12, 13, 14],
        },
    },
    {
        TYPE: 'EVENT3',
        CONFIG: {
            TARGET_DATES: [15, 16, 17, 18, 19, 20, 21],
        },
    },
    {
        TYPE: 'EVENT4',
        CONFIG: {
            TARGET_DATES: [22, 23, 24, 25, 26, 27, 28],
        },
    },
    {
        TYPE: 'EVENT5',
        CONFIG: {
            TARGET_DATES: [29, 30],
        },
    },
    {
        TYPE: 'EVENT6',
        CONFIG: {
            TARGET_DATES: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        },
    },
];
const MOCK_YEAR = 2023;
const MOCK_MONTH = 11;
describe('PromotionCalendar 테스트', () => {
    const calendar = new PromotionCalendar(MOCK_YEAR, MOCK_MONTH, MOCK_PROMOTIONS);

    test.each([
        [[1, 'EVENT1,EVENT6']],
        [[2, 'EVENT1']],
        [[8, 'EVENT2']],
        [[11, 'EVENT2,EVENT6']],
        [[15, 'EVENT3,EVENT6']],
        [[16, 'EVENT3']],
        [[29, 'EVENT5']],
    ])('이벤트 날짜에 올바르게 설정 되는지 테스트', (input) => {
        const [date, expected] = input;
        const promotions = calendar.getPromotionsByDate(date);
        const promotionTypes = promotions.map((promotion) => promotion.TYPE).join(',');
        expect(promotionTypes).toBe(expected);
    });
});
