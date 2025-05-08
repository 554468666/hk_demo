export const userMixin = {
  data() {
    return {
      userInfo: null,
    };
  },
  methods: {
    async fetchUserInfo() {
      const res = await getUserInfo();
      if (res[1].data.success) {
        this.userInfo = res[1].data.userInfo;
      }
    },
  },
};