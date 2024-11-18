import Vue from "vue";
import App from "./App.vue";
import "normalize.css/normalize.css";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import "@/styles/index.scss"; // global css
import router from "./router";
import store from "./store";
import "@/icons"; // icon
import setupRouterGuard from "./router/permission";

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

Vue.use(ElementUI);

// 启动路由守卫配置
setupRouterGuard(router);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
