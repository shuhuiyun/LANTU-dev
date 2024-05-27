import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import 'vue-loading-overlay/dist/css/index.css';
import { createPinia } from 'pinia';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.vue';
import router from './router';
import { currency, date } from './methods/filters';
import $httpMessageState from './methods/pushMessageState';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zhTW }),
  validateOnInput: true,
});
setLocale('zhTW');
const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$filters = { currency, date };
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.provide('$httpMessageState', $httpMessageState);
app.use(VueAxios, axios);
app.use(pinia);
app.use(router);
app.component('LoadingSpinner', Loading);
app.mount('#app');
