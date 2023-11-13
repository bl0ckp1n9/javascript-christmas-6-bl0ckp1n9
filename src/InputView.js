import { Console } from '@woowacourse/mission-utils';

const MESSAGE = {
    ASK_DATE:
        '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
    ASK_MENU:
        '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
};

export const InputView = {
    async readDate() {
        const input = await this.readLineTrimAsync(MESSAGE.ASK_DATE);

        return input.trim();
    },
    async readMenu() {
        const input = await this.readLineTrimAsync(MESSAGE.ASK_MENU);

        return input.trim();
    },

    async readLineTrimAsync(message) {
        const input = await Console.readLineAsync(message);

        return input.trim();
    },
};

export default InputView;
