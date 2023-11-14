import InputView from './InputView.js';
import OutputView from './OutputView.js';

import Planner from './Planner.js';
import Order from './Order.js';
import PromotionCalendar from './PromotionCalendar.js';
import { Promotions } from './Promotion.js';

import { MENUS, PROMOTION_MONTH, PROMOTION_YEAR } from './constant.js';

class App {
    #planner;
    #orders;
    async run() {
        await this.reserve();
        await this.preview();
    }

    async reserve() {
        const orderDate = await InputView.readOrderDate((input) => Order.validateDate(input));
        const order = await InputView.readOrderMenus((input) => Order.validateOrder(input));
        this.#orders = new Order(MENUS, order, orderDate);
        this.#planner = new Planner(this.#orders, new PromotionCalendar(PROMOTION_YEAR, PROMOTION_MONTH, Promotions));
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
