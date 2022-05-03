<template>
  <div class="profile-card" :class="{ 'profile-card--siutable': isSiutable }">
    <div class="profile-card__avatar">
      <img :src="user.avatar" alt="" />
    </div>
    <div class="profile-card__info">
      <div class="profile-card__name profile-card-header">
        <span class="profile-card-header__name" v-html="highlight(user.name)">
        </span>
        <span class="profile-card-header__email" v-html="highlight(user.email)">
        </span>
      </div>
      <div class="profile-card__title" v-html="highlight(user.title)"></div>
      <div class="profile-card__address" v-html="highlight(address)"></div>
      <div class="profile-card__action">
        <button class="profile-card__button" type="button" @click="setSiutable">
          {{ isSiutable ? "skip selection" : "mark as suitable" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "profileCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },

  computed: {
    ...mapGetters({
      isUserSiutable: "isUserSiutable",
    }),

    isSiutable() {
      return this.isUserSiutable(this.user.email);
    },

    address() {
      return `${this.user.address}, ${this.user.city}`;
    },
  },

  methods: {
    ...mapActions({
      addSiutableUser: "addSiutableUser",
      removeSiutableUser: "removeSiutableUser",
    }),
    setSiutable() {
      if (this.isSiutable) {
        this.removeSiutableUser(this.user.email);
      } else {
        this.addSiutableUser(this.user.email);
      }
    },
    highlight(text) {
      if (this.searchQuery === "") {
        return text;
      }
      return text.replace(new RegExp(this.searchQuery, "gi"), (match) => {
        return `<span style="background-color: #FFF73B">${match}</span>`;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-card {
  display: flex;
  position: relative;
  background-color: #fafafa;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  overflow: hidden;

  &--siutable {
    &:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #4765ff;
      border-radius: 3px;
      pointer-events: none;
    }
  }
}

.profile-card__avatar {
  position: relative;
  width: 134px;
  min-width: 134px;
  background-color: rgba(0, 0, 0, 0.25);

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
    object-fit: cover;

    &:before {
      content: " ";
      display: block;
      position: absolute;
      top: -10px;
      left: 0;
      height: calc(100% + 10px);
      width: 100%;
      background-color: rgb(230, 230, 230);
      border: 2px dotted rgb(200, 200, 200);
      border-radius: 5px;
    }

    &:after {
      content: "Image not found";
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-style: normal;
      color: rgb(100, 100, 100);
      position: absolute;
      top: 5px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.profile-card__info {
  flex-grow: 1;
  padding-top: 10px;
}

.profile-card__name {
  padding-left: 27px;
  font-size: 24px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.87);
}

.profile-card-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.profile-card-header__email {
  padding: 0 9px;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.54);
}

.profile-card__title {
  margin-top: 1px;
  padding-left: 27px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.543846);
}

.profile-card__address {
  margin-top: 1px;
  padding-left: 27px;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.54);
}

.profile-card__action {
  margin-top: 3px;
  padding: 14px 0 19px 27px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.profile-card__button {
  width: 137px;
  text-transform: uppercase;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: #009688;

  &:hover {
    text-decoration: underline;
  }
}
</style>
