import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Sidebar from 'primevue/sidebar';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-dark-blue/theme.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue);
app.component('InputText', InputText);
app.component('Sidebar', Sidebar);
app.component('TreeTable', TreeTable);
app.component('Column', Column);
app.component('Button', Button);
app.mount('#app')