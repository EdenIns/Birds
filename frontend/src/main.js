import { createApp } from "vue";
import { createPinia } from "pinia";
import { createBootstrap } from "bootstrap-vue-next";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";
import Articles from "./pages/Articles.vue";
import NewArticles from "./pages/NewArticles.vue";
import Signup from "./pages/Signup.vue";
import Login from "./pages/Login.vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

const routes = [
  { path: "/articles", component: Articles },
  { path: "/", component: Articles },
  { path: "/addNewArticle", component: NewArticles },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
const pinia = createPinia();
const bootstrap = createBootstrap();

app.use(pinia);
app.use(bootstrap);
app.use(router);

const authStore = useAuthStore();

authStore.isUserConnected();

app.mount("#app");
