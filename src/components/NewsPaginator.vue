<template>
  <el-row>
    <!-- v-html is safe because data is received from server -->
    <span
      v-for="link in links"
      :key="link.label"
      :class="{
        'clickable-link': link.url !== null,
        'active-link': link.active,
      }"
      @click="handleLinkClick(link)"
      v-html="link.label"
    >
    </span>
  </el-row>
</template>

<script>
export default {
  name: "NewsPaginator",
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleLinkClick(link) {
      if (!link.url) return;
      this.$emit("pageChanged", link.url);
    },
  },
};
</script>

<style>
.clickable-link {
  color: "blue";
  cursor: pointer;
}

.active-link {
  text-decoration: underline;
  font-size: 1.1em;
}
</style>
