import { Console } from '@woowacourse/mission-utils';
import { PROMOTION_CATEGORIES } from './constant.js';

const OutputView = {
    printOrderMenus(orders) {
        Console.print('<주문 메뉴>');
        orders.forEach((order) => {
            Console.print(`${order.name} ${order.count}개`);
        });
    },
    printTotalPrice(totalPrice) {
        Console.print('<할인 전 총주문 금액>');
        Console.print(`${totalPrice.toLocaleString()}원`);
    },
    printBenefitDetails(promotions) {
        Console.print('<혜택 내역>');
        const printData = [];
        promotions.forEach((promotion) => {
            const { NAME, PRODUCT, promotionBenefitPrice } = promotion;
            const isApplied = promotionBenefitPrice > 0;
            if (isApplied) printData.push(`${NAME} 할인: -${promotionBenefitPrice.toLocaleString()}원`);
        });
        if (printData.length === 0) printData.push('없음');
        Console.print(printData.join('\n'));
    },
    printBadge(badge) {
        Console.print('<12월 이벤트 배지>');
    },
    printTotalPriceWithDiscount(totalPriceWithDiscount) {
        Console.print('<할인 후 예상 결제 금액>');
    },
    printGiveWayMenu(promotions) {
        const giftMenu = promotions.find((promotion) => promotion.EVENT === PROMOTION_CATEGORIES.GIFT);
        const { PRODUCT, promotionBenefitPrice } = giftMenu;
        const isApplied = promotionBenefitPrice > 0;

        Console.print('<증정 메뉴>');
        Console.print(isApplied ? `${PRODUCT.NAME} 1개` : '없음');
    },
};

export default OutputView;
