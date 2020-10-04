<template>
  <div class="amount-field">
    <div class="table">
      <label class="cell currency" v-if="selectedCurrencyItem">{{ selectedCurrencyItem.symbol }}</label>
      <div class="cell">
        <input type="text" class="price" v-model="amountFormatted" v-on:keydown="validateAmountInput($event)">
      </div>
      <div class="cell">
        <select name="currency" class="currency-select" v-model="selectedCurrency">
          <option v-for="item in currencies" :key="item.code" :value="item.code">{{ item.code }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_CURRENCIES, PROCESS_AMOUNT, SELECT_CURRENCY } from '../store/action.type';
const intl = new Intl.NumberFormat('en');

export default {
  name: 'AppMainInput',
  created() {
    this.loadCurrencies();
  },
  computed: {
    currencies() {
      return this.$store.state.currencies;
    },
    currentRate() {
      return this.currencies.find(item => item.code === this.selectedCurrency).rate;
    },
    amountFormatted: {
      get() {
        return this.$store.state.amount ? intl.format(this.$store.state.amount) : ''
      },
      set(value) {
        if (value) {
          this.amount = parseInt(value.toString().replace(new RegExp(',', 'g'), ''));
        } else {
          this.amount = 0;
        }
      },
    },
    amount: {
      get() {
        return this.$store.state.amount;
      },
      set(value) {
        this.$store.dispatch(PROCESS_AMOUNT, value);
      }
    },
    selectedCurrency: {
      get() {
        return this.$store.state.currencyCode;
      },
      set(code) {
        if (this.amount) {
          this.amount = this.convertAmount(this.amount, code);
        }
        this.$store.dispatch(SELECT_CURRENCY, code);
      },
    },
    selectedCurrencyItem() {
      return this.currencies.find(item => item.code === this.selectedCurrency);
    },
  },
  methods: {
    async loadCurrencies() {
      await this.$store.dispatch(LOAD_CURRENCIES);
    },
    convertAmount(value, newCurrency) {
      const newRate = this.currencies.find(item => item.code === newCurrency).rate;
      return Math.round(value / this.currentRate * newRate);
    },
    validateAmountInput(event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if ([8,37,39].includes(charCode) || (charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105)) {
        return true;
      }
      event.preventDefault();
    },
  },
}
</script>