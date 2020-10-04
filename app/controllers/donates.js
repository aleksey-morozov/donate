const Donate = require('../models/donates');

const controller = {
    insert: async (ctx) => {
        const currencies = [
            {name: "US Dollar", code: "USD", symbol: "$", rate: 1},
            {name: "Euro", code: "EUR", symbol: "€", rate: 0.897597},
            {name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755},
            {name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993}
        ];

        try {
            const { amount, currency } = ctx.request.body;
            if (Number.isInteger(amount) && amount > 0 && currencies.some(item => item.code === currency)) {
                const donate = new Donate({
                    amount: amount,
                    currency: currency,
                });
                await donate.save();
                ctx.status = 201;
                ctx.body = { ok: true };
            } else {
                ctx.status = 400;
            }
        } catch (e) {
            ctx.status = 501;
            ctx.error = e.message;
        }
    },
}

module.exports = controller;