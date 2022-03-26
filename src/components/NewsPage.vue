<template>
  <div class="news-grid">
    <news-card
      v-for="newsItem in news"
      :key="newsItem.id"
      :title="newsItem.title"
      :image="newsItem.image"
      :description="newsItem.description"
      :date="newsItem.date"
      :link="newsItem.link"
      class="news-grid__item"
    />
  </div>
</template>

<script>
import NewsCard from "./NewsCard.vue";

export default {
  name: "NewsPage",
  components: {
    NewsCard,
  },
  props: {
    news: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.news-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;

  &__item {
    height: 600px;
  }
}
</style>
