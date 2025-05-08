<template>
  <view class="container">
    <view v-for="service in services" :key="service.id">
      <text>{{ service.name }}</text>
      <button @click="orderService(service)">订购</button>
    </view>
  </view>
</template>

<script>
import { queryService } from '../../utils/api';

export default {
  data() {
    return {
      services: [],
    };
  },
  mounted() {
    this.queryService();
  },
  methods: {
    async queryService() {
      const res = await queryService();
      if (res[1].data.success) {
        this.services = res[1].data.services;
      }
    },
    orderService(service) {
      uni.navigateTo({ url: `/pages/order/index?serviceId=${service.id}` });
    },
  },
};
</script>