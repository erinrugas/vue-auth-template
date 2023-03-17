import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './css/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

/* Default title tag */
const defaultDocumentTitle = "Vue Auth Template";

/* Set document title from route meta */
router.afterEach((to) => {
    document.title = to.meta?.title
        ? `${defaultDocumentTitle} - ${to.meta.title}`
        : defaultDocumentTitle;
});