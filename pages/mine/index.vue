<template>
  <view class="container">
    <view>
      <image :src="userInfo.avatar" class="avatar" />
      <text>{{ userInfo.name }}</text>
    </view>
    <view>
      <text>是否会员: {{ userInfo.isMember ? '是' : '否' }}</text>
    </view>
    <button @click="goToMemberPage">办理会员</button>
    <button @click="goToFeedbackPage">意见反馈</button>
    <button @click="goToContactPage">联系我们</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: '',
        name: '',
        isMember: false,
      },
    };
  },
  methods: {
    goToMemberPage() {
      uni.navigateTo({ url: '/pages/member/index' });
    },
    goToFeedbackPage() {
      uni.navigateTo({ url: '/pages/feedback/index' });
    },
    goToContactPage() {
      uni.navigateTo({ url: '/pages/contact/index' });
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>