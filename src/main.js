import { createApp, markRaw } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import App from './App.vue';

import TitleMixin from './mixins/TitleMixin';
import lui from './plugins/lui/lui';
import SvgIcon from './components/SvgIcon.vue';
import Shareables from './components/Shareables.vue';
import './assets/style.scss';


const app = createApp(App);
const pinia = createPinia();

pinia.use(() => ({
    router: markRaw(router)
}));

app.use(router);
app.use(pinia);
app.mixin(TitleMixin);
app.use(lui);
app.component('SvgIcon', SvgIcon);
app.component('Shareables', Shareables);
app.mount('#app');
