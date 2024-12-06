<template v-if="isShow">
  <i v-if="isElIcon" :class="elIconClass" :style="mergeStyle"></i>
  <SvgIcon v-else :name="name" :iconStyle="mergeStyle"></SvgIcon>
</template>

<script>
import { SVG_PREFIX } from "@/settings";
import SvgIcon from "./SvgIcon/index.vue";
export default {
  name: "CommonIcon",
  components: { SvgIcon },
  props: {
    name: {
      type: String,
      default: "",
    },
    size: {
      type: [Number, String],
      default: 16,
    },
    color: {
      type: String,
      default: "",
    },
    iconStyle: {
      type: Object,
      default: () => ({ fill: "#909399", color: "#909399" }),
    },
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.name);
  },
  computed: {
    iconSize() {
      const sizeVal = this.size;
      const reg = /[^0-9.]/;
      return sizeVal && !reg.test(String(sizeVal)) ? `${sizeVal}px` : sizeVal;
    },
    mergeStyle() {
      let size = this.iconSize.value ? this.iconSize.value + "px" : "16px";
      let color = this.color ? this.color : "";
      let svgStyle = {
        width: size,
        height: size,
        fill: color,
        color: color,
      };
      let result = {};
      for (let key in svgStyle) {
        if (svgStyle[key] && svgStyle[key] !== "") {
          result[key] = svgStyle[key];
        }
      }
      if (this.iconStyle) {
        svgStyle = { ...this.iconStyle, ...result };
      }
      return svgStyle;
    },
    elIconClass() {
      return `${this.name} i-icons sub-el-icon`;
    },

    isElIcon() {
      return this.name && this.name.startsWith("el-icon");
    },
    isShow() {
      return this.name && (this.name.startsWith("el-icon") || this.name.startsWith(SVG_PREFIX));
    },
  },
};
</script>

<style lang="scss" scoped>
.el-icon-cus {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
