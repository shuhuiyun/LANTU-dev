<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>
  <div class="ArticlesNew container-fluid">
    <p class="text-primary article__slot">{{ article.author }}</p>
    <h2 class="fs-1 fw-bold text-primary lh-base">
      {{ article.title }}
    </h2>
    <p class="text-end border-1 border-bottom pb-3 pe-2">
      {{ $filters.date(article.create_at) }}
    </p>
    <p class="pt-3">
      <span
        class="me-3 article__tag text-nowrap d-inline-block mb-3"
        v-for="(item, index) in article.tag"
        :key="`${item}${index+1}`"
        ><router-link
          to="/article/search_tag"
          @click.prevent="searchTag(item)"
          >{{ `#${item}` }}</router-link
        ></span
      >
    </p>
    <div class="row">
      <div class="col-12 col-md-6">
        <img
          :src="article.image"
          class="img-fluid w-100 h-100"
          :alt="`${article.title}`"
          style="max-height: 600px; object-fit: cover"
        />
      </div>
      <div
        class="col-12 col-md-6 article__content"
        v-html="article.content"
      ></div>
    </div>
    <div class="row">
      <div class="col text-center pt-5">
        <router-link
          to="/article/news"
          class="back__link text-primary fw-bold fs-5"
        >
          <i class="bi bi-arrow-left-circle-fill me-2"></i>返回文章列表
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import articlesList from '@/stores/articles';

export default {
  data() {
    return {
      isLoading: false,
      ArticleID: '',
    };
  },
  computed: {
    ...mapState(articlesList, [
      'article',
      'ArticleID',
      'articles',
      'isLoading',
    ]),
  },
  inject: ['emitter'],
  methods: {
    ...mapActions(articlesList, [
      'getArticle',
      'searchTag',
      'newArr',
      'getArticleList',
    ]),
  },
  created() {
    this.getArticleList();
    this.getArticle(this.$route.params.newId);
  },
};
</script>
