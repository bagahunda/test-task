<template>
  <div class="search">
    <form class="search__form" @submit.prevent>
      <label class="search__icon" for="search">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.54"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.502 11H11.708L11.432 10.726C12.407 9.58897 13 8.11497 13 6.49997C13 2.90997 10.09 -3.24249e-05 6.5 -3.24249e-05C2.91 -3.24249e-05 0 2.90997 0 6.49997C0 10.09 2.91 13 6.5 13C8.115 13 9.588 12.408 10.725 11.434L11.001 11.708V12.5L15.999 17.491L17.49 16L12.502 11ZM6.5 11C4.014 11 2 8.98597 2 6.49997C2 4.01497 4.014 1.99997 6.5 1.99997C8.985 1.99997 11 4.01497 11 6.49997C11 8.98597 8.985 11 6.5 11Z"
            fill="black"
          />
        </svg>
      </label>
      <input
        type="text"
        ref="search"
        id="search"
        class="search__input"
        placeholder="search"
        :value="this.$route.params.query || ''"
        @input="debouncedHandler($event.target.value)"
      />
    </form>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
export default {
  name: "appSearch",
  mounted() {
    this.$nextTick(() => {
      this.$refs.search.focus();
    });
  },
  created() {
    this.debouncedHandler = debounce((value) => {
      this.$emit("search", value);
    }, 500);
  },
  beforeDestroy() {
    this.debouncedHandler.cancel();
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
}

.search__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
}

.search__input {
  width: 100%;
  height: 48px;
  padding: 12px 50px 7px;
  font-size: 24px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.75);
  background: #fafafa;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
}
</style>
