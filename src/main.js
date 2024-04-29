import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// pivot + JQ
import jquery from 'jquery';
// import 'pivottable/dist/pivot.js';
import './mixin/pivot.js';
import 'pivottable/dist/pivot.min.css';
import 'jquery-ui-dist/jquery-ui.js';
import 'jquery-ui-dist/jquery-ui.min.css';

let app = createApp(App);
app.use(jquery);
app.use(router);
app.mount('#app');
