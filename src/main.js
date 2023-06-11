import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router.js'
import Toaster from '@meforma/vue-toaster';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)
app.use(router)
app.use(Toaster)
app.use(Bootstrap5Pagination )
app.mount('#app')
