<template>
  <view class="container">
    <textarea v-model="feedback" placeholder="请输入您的意见或建议"></textarea>
    <button @click="submitFeedback">提交</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      feedback: '',
    };
  },
  methods: {
    submitFeedback() {
      uni.showToast({ title: '感谢您的反馈' });
      this.feedback = '';
    },
  },
};
</script>