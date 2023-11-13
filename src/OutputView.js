import { Console } from '@woowacourse/mission-utils';

const OutputView = {
    printMenu(orders) {
        orders.forEach((order) => {
            Console.print(`${order.name} ${order.count}개`);
        });
    },
};

export default OutputView;
