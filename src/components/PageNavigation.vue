<template>
  <nav aria-label="Page navigation example ">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          @click.prevent="prePage(pages.current_page)"
          >Previous</a
        >
      </li>
      <li
        class="page-item"
        style="border-radius: 5px"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ 'active': page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{
          page
        }}</a>
      </li>

      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          @click.prevent="nextPage(pages.current_page)"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emit-page', page);
    },
    nextPage(page) {
      this.$emit('emit-page', `${page + 1}`);
    },
    prePage(page) {
      this.$emit('emit-page', `${page - 1}`);
    },
  },
};
</script>
