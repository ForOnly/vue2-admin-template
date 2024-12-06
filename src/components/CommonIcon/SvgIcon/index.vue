<template>
  <i :class="svgIconStyle" :style="iconStyle">
    <svg aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
  </i>
</template>

<script>
import { SVG_PREFIX } from "@/settings";
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      default: "",
    },
    iconStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    console.log(this.iconStyle);
  },

  computed: {
    svgIconStyle() {
      return "i-icons svg-icon";
    },
    symbolId() {
      return `#${SVG_PREFIX}${this.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.i-icons {
  overflow: hidden;
  vertical-align: middle;
  margin-right: 5px;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: inherit;
}
</style>
