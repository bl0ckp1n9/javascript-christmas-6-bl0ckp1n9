import { Console } from '@woowacourse/mission-utils';
import { PROMOTION_CATEGORIES } from '../constant/index.js';

const MESSAGE = {
    GREETINGS: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
    INTRO_PREVIEW: '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n',
    ORDER_MENU_TITLE: '<주문 메뉴>',
    TOTAL_PRICE_WITHOUT_DISCOUNT_TITLE: '<할인 전 총주문 금액>',
    BENEFIT_DETAILS_TITLE: '<혜택 내역>',
    TOTAL_PRICE_WITH_DISCOUNT_TITLE: '<할인 후 예상 결제 금액>',
    GIFT_TITLE: '<증정 메뉴>',
    BENEFIT_TOTAL_PRICE_TITLE: '<총혜택 금액>',
    BADGE_TITLE: '<12월 이벤트 배지>',
    NONE: '없음',
    MENU: (name, count) => `${name} ${count}개`,
    PRICE: (price) => `${price.toLocaleString()}원`,
    GIFT: (name, count) => `${name} ${count}개`,
    DISCOUNT: (name, price) => `${name} 할인: -${price.toLocaleString()}원`,
    TOTAL_BENEFIT_PRICE: (price) => (price > 0 ? `-${price.toLocaleString()}원` : '0원'),
};

const OutputView = {
    printGreetings() {
        Console.print(MESSAGE.GREETINGS);
    },
    printPreviewMessage() {
        Console.print(MESSAGE.INTRO_PREVIEW);
        Console.print('');
    },
    printOrderMenus(orders) {
        Console.print(MESSAGE.ORDER_MENU_TITLE);

        orders.forEach((order) => {
            Console.print(MESSAGE.MENU(order.name, order.count));
        });

        Console.print('');
    },
    printTotalPriceWithoutDiscount(totalPrice) {
        Console.print(MESSAGE.TOTAL_PRICE_WITHOUT_DISCOUNT_TITLE);
        Console.print(MESSAGE.PRICE(totalPrice));
        Console.print('');
    },
    printBenefitDetails(promotions) {
        Console.print(MESSAGE.BENEFIT_DETAILS_TITLE);

        const printData = [];

        promotions.forEach((promotion) => {
            const { NAME, promotionBenefitPrice } = promotion;
            const isApplied = promotionBenefitPrice > 0;
            if (isApplied) printData.push(MESSAGE.DISCOUNT(NAME, promotionBenefitPrice));
        });
        if (printData.length === 0) printData.push(MESSAGE.NONE);

        Console.print(printData.join('\n'));
        Console.print('');
    },
    printTotalPriceWithDiscount(totalPriceWithDiscount) {
        Console.print(MESSAGE.TOTAL_PRICE_WITH_DISCOUNT_TITLE);
        Console.print(MESSAGE.PRICE(totalPriceWithDiscount));
        Console.print('');
    },
    printGiveWayMenu(promotions) {
        const giftMenu = promotions.find((promotion) => promotion.EVENT === PROMOTION_CATEGORIES.GIFT);
        const { PRODUCT, promotionBenefitPrice } = giftMenu;
        const isApplied = promotionBenefitPrice > 0;

        Console.print(MESSAGE.GIFT_TITLE);
        Console.print(isApplied ? MESSAGE.GIFT(PRODUCT.NAME, 1) : MESSAGE.NONE);
        Console.print('');
    },
    printTotalBenefitPrice(totalBenefitPrice) {
        Console.print(MESSAGE.BENEFIT_TOTAL_PRICE_TITLE);
        Console.print(MESSAGE.TOTAL_BENEFIT_PRICE(totalBenefitPrice));
        Console.print('');
    },
    printBadge(badge) {
        Console.print(MESSAGE.BADGE_TITLE);
        Console.print(badge);
    },
};

export default OutputView;
