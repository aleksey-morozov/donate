<template>
  <div>
    <div v-for="(val, index) in processedPresets" :key="val">
      <button class="amount-btn" v-bind:class="{ active: val === amount }" type="button" v-on:click="setAmount(val)">
        {{ selectedCurrencyParams.symbol }}{{ format(val) }}
      </button>
      <div v-if="index === 2" class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import { LOAD_PRESETS, PROCESS_AMOUNT } from "../store/action.type";
import { mapState } from 'vuex';
const intl = new Intl.NumberFormat('en');
export default {
  name: "AppButtons",
  created() {
    this.loadPresets();
  },
  computed: {
    ...mapState([
      'currencies',
      'presets',
      'currencyCode',
      'amount',
    ]),
    selectedCurrencyParams() {
      return this.currencies.find(item => item.code === this.currencyCode);
    },
    processedPresets() {
      return this.presets.map(val => {
        const converted = val * this.selectedCurrencyParams.rate;
        let roundCoeff = 10;
        if (converted > 100) {
          const x = converted / 10;
          const xLength = Math.round(x).toString().length - 1;
          const y = 5 * (Math.pow(10, xLength));
          roundCoeff = x + (y - (x % y));
        }
        return roundCoeff * Math.round(converted / roundCoeff);
      });
    }
  },
  methods: {
    format(val) {
      return intl.format(val);
    },
    setAmount(value) {
      this.$store.dispatch(PROCESS_AMOUNT, value);
    },
    async loadPresets() {
      await this.$store.dispatch(LOAD_PRESETS);
    },
  },
}
</script>