<template>
  <div class="article">
    <BySkeleton :loading="loading">
      <div>
        <h4>Ant Design Vue, a design language</h4>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      </div>
    </BySkeleton>
    <button :disabled="loading" @click="showSkeleton">
      Show Skeleton
    </button>
    <BySkeleton active avatar/>
  </div>
</template>
<script>
import BySkeleton from './skeleton'
export default {
    components:{
        BySkeleton
    },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    showSkeleton() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>
<style>
.article h4 {
  margin-bottom: 16px;
}
.article button {
  margin-top: 16px;
}
</style>
