import { createApp } from "vue";
import { createBootstrap } from "bootstrap-vue-next";
import { createRouter, createWebHistory } from "vue-router";
import Articles from "./pages/Articles.vue";
import NewArticles from "./pages/NewArticles.vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

const routes = [
  { path: "/articles", component: Articles },
  { path: "/", component: Articles },
  { path: "/addNewArticle", component: NewArticles },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(createBootstrap());
app.use(router);
app.mount("#app");
