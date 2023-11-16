import { Order, Planner, PromotionCalendar, Promotions } from '../src/model/index.js';
import { MENUS, PROMOTION_MONTH, PROMOTION_YEAR, PROMOTIONS } from '../src/constant/index.js';

export const makePlanner = (menu, date) => {
    const order = new Order(MENUS, menu, date);
    const planner = new Planner(order, new PromotionCalendar(PROMOTION_YEAR, PROMOTION_MONTH, Promotions));
    return planner;
};

export const getPromotionsByOrderDate = (date) => {
    const planner = makePlanner(`${MENUS.T_BONE_STEAK.NAME}-1`, date);
    return planner.getPromotionsByOrderDate();
};

export const calculateChristmasPromotionPrice = (orderDate) => {
    const { BENEFIT_PRICE } = PROMOTIONS.CHRISTMAS;
    return PROMOTIONS.CHRISTMAS.BENEFIT_PRICE + BENEFIT_PRICE * 0.1 * (orderDate - 1);
};
