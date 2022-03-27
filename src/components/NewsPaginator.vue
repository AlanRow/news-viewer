<template>
  <el-pagination
    layout="prev, pager, next"
    :page-count="total"
    :current-page="current"
    :disabled="isLoading"
    class="paginator"
    @current-change="loadNews"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewsPaginator",
  computed: {
    ...mapGetters({
      current: "currentPage",
      total: "totalPages",
      isLoading: "areNewsLoading",
    }),
  },
  methods: {
    ...mapActions(["loadNews"]),
  },
};
</script>

<style></style>
