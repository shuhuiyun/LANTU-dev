import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('Articles List', {
  state: () => ({
    tag: '',
    tempArticles: [],
    articles: {},
    article: {},
    ArticleID: '',
    articleContentArr: [],
    isLoading: false,
  }),

  getters: {
    getTag(state) {
      const newArr = state.articles.filter((item) => item.tag === this.tag);

      return newArr;
    },
  },

  actions: {
    searchTag(tagToSearch) {
      this.tag = tagToSearch;
      const articlesArray = this.articles;
      const filterArticle = articlesArray.filter((article) => {
        const foundTag = article.tag.find(
          (articleTag) => articleTag === this.tag,
        );
        return foundTag !== undefined;
      });
      this.tempArticles = filterArticle;
    },

    getArticleList(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/articles/?page=${page}`;
      axios.get(api).then((res) => {
        this.articles = res.data.articles;
        this.getContentArr();
        this.isLoading = false;
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    getArticle(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/article/${id}`;
      axios.get(api).then((res) => {
        this.article = res.data.article;
        this.isLoading = false;
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    getContent(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/article/${id}`;
      const content = axios.get(api).then((res) => res.data.article.content).catch((error) => {
        console.error('錯誤:', error);
      });
      return content;
    },
    async getContentArr() {
      try {
        const idArr = [];
        for (let i = 0; i < this.articles.length; i += 1) {
          const { id } = this.articles[i];
          idArr.push(this.getContent(id));
        }
        Promise.all(idArr).then((res) => {
          this.articleContentArr = res;
        }).catch((error) => {
          console.error('錯誤:', error);
        });
      } catch {
        console.log('錯誤');
      }
    },
  },
});
