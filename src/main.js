import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// pivot + JQ
import jquery from 'jquery';
// import 'pivottable/dist/pivot.js';
import './mixin/pivot.js';
import '@/mixin/vue-pivottable.css';
// import 'pivottable/dist/pivot.min.css';
// import 'jquery-ui-dist/jquery-ui.js';
// import 'jquery-ui-dist/jquery-ui.min.css';

// EChart
import ECharts from "vue-echarts";

// Naive UI
import naive from "naive-ui";

// Pinia
import { createPinia } from 'pinia';
const pinia = createPinia();

import "bootstrap";
import "bootstrap/scss/bootstrap.scss";

let app = createApp(App);
app.use(jquery);
app.use(router);
app.use(naive);
app.use(pinia);
app.component("v-chart", ECharts);
app.mount('#app');