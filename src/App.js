import { InputView, OutputView } from './view/index.js';
import { MENUS, PROMOTION_MONTH, PROMOTION_YEAR } from './constant/index.js';
import { Order, Planner, PromotionCalendar, Promotions } from './model/index.js';

class App {
    async run() {
        OutputView.printGreetings();
        const { order, planner } = await this.reserve();
        OutputView.printPreviewMessage();
        await this.preview(order, planner);
    }

    async reserve() {
        const orderDate = await InputView.readOrderDate((input) => Order.validateDate(input));
        const orderMenu = await InputView.readOrderMenus((input) => Order.validateOrder(input));
        const order = new Order(MENUS, orderMenu, orderDate);
        const planner = new Planner(order, new PromotionCalendar(PROMOTION_YEAR, PROMOTION_MONTH, Promotions));

        return {
            order,
            planner,
        };
    }

    async preview(order, planner) {
        const orderMenuList = order.getOrderMenuList();
        const totalPriceWithoutDiscount = order.getTotalPrice();
        const promotions = planner.getPromotionsByOrderDate();
        const totalBenefitPrice = planner.getTotalBenefitPrice();
        const totalPriceWithDiscount = planner.getTotalPriceWithDiscount();
        const badge = planner.getBadge();
        OutputView.printOrderMenus(orderMenuList);
        OutputView.printTotalPriceWithoutDiscount(totalPriceWithoutDiscount);
        OutputView.printGiveWayMenu(promotions);
        OutputView.printBenefitDetails(promotions);
        OutputView.printTotalBenefitPrice(totalBenefitPrice);
        OutputView.printTotalPriceWithDiscount(totalPriceWithDiscount);
        OutputView.printBadge(badge);
    }
}

export default App;
