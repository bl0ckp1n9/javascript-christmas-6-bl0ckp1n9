class PromotionCalendar {
    #calendar = new Map();
    #endDate;
    #startDate;

    constructor(year, month, promotions) {
        const promotionDate = new Date(year, month, 0);
        this.#endDate = new Date(year, month, promotionDate.getDate());
        this.#startDate = new Date(year, month, 1);
        this.#setPromotionsToCalendar(promotions);
    }

    getPromotionsByDate(date) {
        return this.#calendar.get(Number(date));
    }
    #setPromotionToCalendar(date, promotion) {
        const promotions = this.#calendar.get(date);
        promotions.push(promotion);
        this.#calendar.set(date, promotions);
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
