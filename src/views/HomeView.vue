<template>
  <div class="home">
    <div class="profiles-container">
      <div class="search-form">
        <app-search @search="onSearch" />
      </div>
      <div class="search-results" ref="searchResults">
        <template v-if="users.length">
          <profile-card
            v-for="(user, index) in users"
            :key="`${index}user.email`"
            :user="user"
            :searchQuery="searchQuery"
          />
        </template>
        <div class="search-results__message" v-if="isLoading">Loading...</div>
        <div class="search-results__message" v-if="!isLoading && !users.length">
          Nothing found (
        </div>
        <scroll-observer
          :options="{ root: observerRoot, rootMargin: '0px 0px -100px 0px' }"
          @intersect="intersected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppSearch from "@/components/AppSearch.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import ScrollObserver from "@/components/ScrollObserver.vue";
export default {
  name: "HomeView",
  components: { AppSearch, ProfileCard, ScrollObserver },
  data() {
    return {
      searchQuery: "",
    };
  },
  created() {
    this.searchQuery = this.$route.params.query || "";
  },
  watch: {
    $route: {
      handler(newVal) {
        this.searchQuery = newVal.params.query || "";
        this.getUsers({ page: 1, query: newVal.params.query || "" });
        this.$refs.searchResults.scrollTo(0, 0);
      },
    },
  },
  methods: {
    ...mapActions({
      getUsers: "getUsers",
    }),
    intersected() {
      if (this.pagination.isLastPage) {
        return;
      }
      this.getUsers({
        page: this.pagination.activePage + 1,
        query: this.searchQuery,
      });
    },
    onSearch($event) {
      this.searchQuery = $event;
      this.$refs.searchResults.scrollTo(0, 0);
      if ($event.length) {
        this.$router.push(`/search/${$event}`);
      } else {
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapGetters({
      users: "getUsers",
      isLoading: "getLoadingStatus",
      pagination: "getPagination",
    }),
    observerRoot() {
      return document.querySelector(".search-results");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  overflow: hidden;
}

.profiles-container {
  width: 90%;
  height: 80vh;
  max-width: 564px;
  max-height: 643px;
  overflow: hidden;
  padding: 19px 0 19px 12px;
  background-color: white;
}

.search-form {
  margin-bottom: 20px;
  padding-right: 28px;
}

.search-results {
  padding-bottom: 20px;
  padding-right: 28px;
  overflow-y: auto;
  height: calc(100% - 70px);
}

.search-results__message {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

::v-deep {
  .profile-card + .profile-card {
    margin-top: 20px;
  }
}
</style>
