import { createApp } from 'vue'

import router from './router'
import { createPinia } from 'pinia/dist/pinia'
import { markRaw } from 'vue'
import TitleMixin from './mixins/TitleMixin'
import lui from './plugins/lui/lui'
import SvgIcon from './components/SvgIcon.vue'
import './assets/style.scss'
import App from './App.vue'


const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mixin(TitleMixin)
app.use(lui)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
