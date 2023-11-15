import { InputView, OutputView } from './view/index.js';
import { MENUS, PROMOTION_MONTH, PROMOTION_YEAR } from './constant/index.js';
import { Order, Planner, PromotionCalendar, PromotionFactory } from './model/index.js';

class App {
    #planner;
    #orders;
    async run() {
        OutputView.printGreetings();
        await this.reserve();
        OutputView.printPreviewMessage();
        await this.preview();
    }

    async reserve() {
        const orderDate = await InputView.readOrderDate((input) => Order.validateDate(input));
        const order = await InputView.readOrderMenus((input) => Order.validateOrder(input));
        this.#orders = new Order(MENUS, order, orderDate);
        this.#planner = new Planner(
            this.#orders,
            new PromotionCalendar(PROMOTION_YEAR, PROMOTION_MONTH, PromotionFactory.promotionList),
        );
    }

    async preview() {
        const orderMenuList = this.#orders.getOrderMenuList();
        const totalPriceWithoutDiscount = this.#orders.getTotalPrice();
        const promotions = this.#planner.getPromotionsByOrderDate();
        const totalBenefitPrice = this.#planner.getTotalBenefitPrice();
        const totalPriceWithDiscount = this.#planner.getTotalPriceWithDiscount();
        const badge = this.#planner.getBadge();
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
