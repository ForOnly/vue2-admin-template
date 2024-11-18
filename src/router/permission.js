import store from "@/store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { SysUtils, Auth } from "@/utils"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

/**
 * 路由权限配置
 * @param { 路由} router
 */
function setupRouterGuard(router) {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    // set page title
    document.title = SysUtils.getPageTitle(to.meta.title);

    // determine whether the user has logged in
    const hasToken = Auth.getToken();

    if (hasToken) {
      if (to.path === "/login") {
        // if is logged in, redirect to the home page
        next({ path: "/" });
        NProgress.done();
      } else {
        const hasGetUserInfo = store.getters.name;
        if (hasGetUserInfo) {
          next();
        } else {
          try {
            // get user info
            await store.dispatch("user/getInfo");
            next();
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch("user/resetToken");
            Message.error(error || "Has Error");
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    // finish progress bar
    NProgress.done();
  });
}

export default setupRouterGuard;
