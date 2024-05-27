<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>
  <div class="article-list">
    <h2 class="fw-bold text-primary mb-5">最新文章列表</h2>
    <ul class="p-0">
      <li v-for="(item) in articles" :key="item.id">
        <div>
          <div class="row py-3">
            <div class="col-md-6 mb-3 mb-0-md">
              <a
                href="#"
                aria-label="article"
                @click.prevent="toArticle(item.id)"
              >
                <img
                  :src="item.image"
                  class="img-fluid w-100"
                  :alt="item.title"
                  style="max-height: 200px; object-fit: cover"
                />
              </a>
            </div>
            <div
              class="col-md-6 ps-5-md p-auto text-dark d-flex flex-column justify-content-center"
            >
              <p class="fs-6">
                <span class="me-3 article__sort text-primary">{{
                  item.author
                }}</span
                >{{ $filters.date(item.create_at) }}
              </p>
              <h5 class="text-primary lh-sm">
                <a
                  href="#"
                  aria-label="article"
                  class="fw-bold"
                  @click.prevent="toArticle(item.id)"
                >
                  {{ item.title }}
                </a>
              </h5>
              <p class="m-0">
                <router-link
                  class="me-3 text-dark text-opacity-50"
                  v-for="(tag, index) in item.tag"
                  :key="`${tag}${index+1}`"
                  to="/article/search_tag"
                  @click.prevent="searchTag(tag)"
                >
                  {{ `#${tag}` }}</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import articlesList from '@/stores/articles';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(articlesList, ['articles', 'isLoading']),
  },
  inject: ['emitter'],
  methods: {
    ...mapActions(articlesList, ['getArticleList', 'searchTag']),

    toArticle(id) {
      this.$router.push(`/article/new/${id}`);
    },
  },
  created() {
    this.getArticleList();
  },
  mounted() {},
};
</script>
