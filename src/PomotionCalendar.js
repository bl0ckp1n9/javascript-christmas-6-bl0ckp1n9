class PromotionCalendar {
    #dateMemory = new Map();
    #endDate;
    #startDate;
    constructor(year, month) {
        const promotionDate = new Date(year, month, 0);
        this.#endDate = new Date(year, month, promotionDate.getDate());
        this.#startDate = new Date(year, month, 1);
        this.#initalizeDate();
    }

    #initalizeDate() {
        const start = this.#startDate.getDate();
        const end = this.#endDate.getDate();
        for (let date = start; date <= end; date += 1) {
            this.#dateMemory.set(date, []);
        }
    }

    setPromotionToCalendar(date, event) {
        const eventList = this.#dateMemory.get(date);
        eventList.push(event);
        this.#dateMemory.set(date, eventList);
    }

    setPromotionsToCalendar(promotions) {
        const start = this.#startDate.getDate();
        const end = this.#endDate.getDate();

        for (let date = start; date <= end; date += 1) {
            promotions.forEach((promotion) => {
                const { CONFIG } = promotion;
                const { SPECIAL_DATES } = CONFIG;
                if (SPECIAL_DATES.includes(date)) {
                    this.setPromotionToCalendar(date, promotion);
                }
            });
        }
    }

    getCalendarByDate(date) {
        return this.#dateMemory.get(date);
    }
}

export default PromotionCalendar;
