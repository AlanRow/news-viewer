<template>
  <el-card :header="title">
    <img :src="image" alt="No Image" class="news-image" />
    <p>{{ descriptionPreview }}</p>
    <p>{{ dateLine }}</p>
    <a v-if="link" :href="link">Далее</a>
  </el-card>
</template>

<script>
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

      const dayLine = this.date.getDay().toString().padStart(2, "0");
      const monthLine = (this.date.getMonth() + 1).toString().padStart(2, "0");
      const yearLine = this.date.getFullYear().toString();
      return [dayLine, monthLine, yearLine].join(",");
    },
  },
};
</script>

<style>
.news-image {
  margin: auto;
  height: 300px;
}
</style>
