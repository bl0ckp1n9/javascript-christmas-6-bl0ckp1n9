class PromotionCalendar {
    #calendar = new Map();
    #endDate;
    #startDate;
    #promotion;

    constructor(year, month, promotion) {
        const promotionDate = new Date(year, month, 0);
        this.#endDate = new Date(year, month, promotionDate.getDate());
        this.#startDate = new Date(year, month, 1);
        this.#promotion = promotion;
        this.#setPromotionsToCalendar(this.#promotion.promotionList);
    }

    getPromotionsByDate(date) {
        return this.#calendar.get(Number(date));
    }

    getPromotionFactory() {
        return this.#promotion;
    }
    #setPromotionToCalendar(date, event) {
        const eventList = this.#calendar.get(date);
        eventList.push(event);
        this.#calendar.set(date, eventList);
    }
    #setPromotionsToCalendar(promotions) {
        const start = this.#startDate.getDate();
        const end = this.#endDate.getDate();

        for (let date = start; date <= end; date += 1) {
            this.#calendar.set(date, []);
            promotions.forEach((promotion) => {
                const { CONFIG } = promotion;
                if (CONFIG.TARGET_DATES.includes(date)) {
                    this.#setPromotionToCalendar(date, promotion);
                }
            });
        }
    }
}

export default PromotionCalendar;
