<template>
  <div id="main">
    <app-buttons class="block block-buttons"></app-buttons>
    <app-main-input class="block block-main-input"></app-main-input>
    <app-donate-btn class="block block-donate-btn"></app-donate-btn>
  </div>
</template>
<script>
  import store from './store/index';
  import './less/main.less';
  import AppButtons from './components/AppButtons.vue';
  import AppMainInput from "./components/AppMainInput.vue";
  import AppDonateBtn from "./components/AppDonateBtn.vue";
  export default {
    store,
    components: {
      AppButtons,
      AppMainInput,
      AppDonateBtn,
    },
  }
</script>