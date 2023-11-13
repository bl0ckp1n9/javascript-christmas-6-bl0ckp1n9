import { Console } from '@woowacourse/mission-utils';

const OutputView = {
    printOrders(orders) {
        Console.print('<주문 메뉴>');
        orders.forEach((order) => {
            Console.print(`${order.name} ${order.count}개`);
        });
    },
};

export default OutputView;
