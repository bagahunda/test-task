<template>
  <div class="observer"></div>
</template>

<script>
export default {
  name: "scrollObserver",
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    }, options);
    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped></style>
