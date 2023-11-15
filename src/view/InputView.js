import { Console } from '@woowacourse/mission-utils';

const MESSAGE = {
    ASK_DATE: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
    ASK_MENU: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

export const InputView = {
    async readOrderDate(validate) {
        const input = await this.readLineLoopAsync(MESSAGE.ASK_DATE, validate);

        return input;
    },
    async readOrderMenus(validate) {
        const input = await this.readLineLoopAsync(MESSAGE.ASK_MENU, validate);

        return input;
    },
    async readLineLoopAsync(message, validate) {
        while (true) {
            try {
                const input = await this.readLineTrimAsync(message);
                validate(input);
                return input;
            } catch (e) {
                Console.print(e.message);
            }
        }
    },
    async readLineTrimAsync(message) {
        const input = await Console.readLineAsync(message);

        return input.trim();
    },
};

export default InputView;
