<template>
  <div>
    <input class="donate-btn" type="button" v-on:click="addDonate" value="Donate">
  </div>
</template>

<script>
import { donate } from '../services';
export default {
  name: "AppDonateBtn",
  computed: {
    amount() {
      return this.$store.state.amount;
    },
    currency() {
      return this.$store.state.currencyCode;
    },
  },
  methods: {
    async addDonate() {
      if (!this.amount) {
        alert('empty amount');
        return;
      }

      try {
        const { data, status } = await donate(this.amount, this.currency);
        if (status === 201 && data.ok) {
          alert('Thank you for your donation!');
        }
      } catch(e) {
        console.error('error: ', e);
      }
    },
  },
}
</script>