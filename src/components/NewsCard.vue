<template>
  <el-card class="news-card">
    <template #header>
      <h4 class="news-title" :title="title">{{ title }}</h4>
    </template>
    <div class="news-image-container">
      <img :src="image" alt="No Image" class="news-image" />
    </div>
    <p>{{ descriptionPreview }}</p>
    <p>{{ dateLine }}</p>
    <a v-if="link" :href="link">Далее</a>
  </el-card>
</template>

<script>
import { getDateLine } from "@/utils/date";

export default {
  name: "NewsCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "No description",
    },
    image: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
  },
  maxDescriptionLength: 250,
  computed: {
    descriptionPreview() {
      if (this.description.length <= this.$options.maxDescriptionLength) {
        return this.description;
      }

      const trimmedDesc = this.description.substring(
        0,
        this.$options.maxDescriptionLength - 1
      );
      return trimmedDesc + "…";
    },
    dateLine() {
      if (this.date == null) return "No date";

      return getDateLine(this.date, ",");
    },
  },
};
</script>

<style scoped>
.news-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.news-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.news-image {
  height: 200px;
}
</style>
