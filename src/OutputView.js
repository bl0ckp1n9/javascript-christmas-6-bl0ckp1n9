import { Console } from '@woowacourse/mission-utils';

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
    printEventBenefits(event) {
        Console.print('<혜택 내역>');
    },
    printBadge(badge) {
        Console.print('<12월 이벤트 배지>');
    },
    printTotalPriceWithDiscount(totalPriceWithDiscount) {
        Console.print('<할인 후 예상 결제 금액>');
    },
    printGiveWayMenu(giftMenu) {
        const { PRODUCT, promotionBenefitPrice } = giftMenu;
        const isApplied = promotionBenefitPrice > 0;

        Console.print('<증정 메뉴>');
        Console.print(isApplied ? `${PRODUCT.NAME} 1개` : '없음');
    },
};

export default OutputView;
