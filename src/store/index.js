import Vue from 'vue';
import Vuex from 'vuex';
import { getCurrencies, getPresets, suggest } from '../services';
import { LOAD_CURRENCIES, LOAD_PRESETS, PROCESS_AMOUNT, SELECT_CURRENCY } from './action.type';
import { SET_CURRENCIES, SET_PRESETS, SET_AMOUNT, SET_CURRENCY_CODE } from './mutation.type';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currencies: [],
        presets: [],
        amount: suggest,
        currencyCode: 'USD',
    },
    mutations: {
        [SET_CURRENCIES](state, currencies) {
            state.currencies = currencies
        },
        [SET_PRESETS](state, presets) {
            state.presets = presets
        },
        [SET_AMOUNT](state, amount) {
            state.amount = amount;
        },
        [SET_CURRENCY_CODE](state, code) {
            state.currencyCode = code;
        },
    },
    actions: {
        async [LOAD_CURRENCIES]({ commit }) {
            commit(SET_CURRENCIES, await getCurrencies())
        },
        async [LOAD_PRESETS]({ commit }) {
            commit(SET_PRESETS, await getPresets())
        },
        async [PROCESS_AMOUNT]({ commit }, amount) {
            commit(SET_AMOUNT, amount);
        },
        async [SELECT_CURRENCY]({ commit }, code) {
            commit(SET_CURRENCY_CODE, code);
        },
    },
})