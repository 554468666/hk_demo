<template>
  <view class="container">
    <view>
      <text>清洁程度:</text>
      <rate v-model="cleanliness"></rate>
    </view>
    <view>
      <text>服务态度:</text>
      <rate v-model="attitude"></rate>
    </view>
    <view>
      <textarea v-model="message" placeholder="评价留言"></textarea>
    </view>
    <button @click="submitEvaluate">提交评价</button>
  </view>
</template>

<script>
import { addEvaluate } from '../../utils/api';
import Rate from '../../components/Rate.vue';

export default {
  components: {
    Rate,
  },
  data() {
    return {
      cleanliness: 0,
      attitude: 0,
      message: '',
    };
  },
  methods: {
    async submitEvaluate() {
      const evaluateData = {
        cleanliness: this.cleanliness,
        attitude: this.attitude,
        message: this.message,
      };
      const res = await addEvaluate(evaluateData);
      if (res[1].data.success) {
        uni.showToast({ title: '评价提交成功' });
        uni.navigateBack();
      } else {
        uni.showToast({ title: '评价提交失败', icon: 'none' });
      }
    },
  },
};
</script>