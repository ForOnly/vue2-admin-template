import Vue from "vue";
import CommonIcon from "@/components/CommonIcon"; // svg component

// register globally
Vue.component("common-icon", CommonIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);
