import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Font Awesome css icon
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

// Bootstrap css and js
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";


import "../src/styles.css"

createApp(App).use(store).use(router).mount('#app')
