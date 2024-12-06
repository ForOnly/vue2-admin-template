import Vue from "vue";
import SvgIcon from "@/components/CommonIcon/SvgIcon"; // svg component

// register globally
// Vue.component("svg-icon", SvgIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
let aaa = requireAll(req);
console.log("@Ppp2", aaa);
