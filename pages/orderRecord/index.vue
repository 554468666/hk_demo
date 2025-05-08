<template>
  <view class="container">
    <view>
      <input v-model="query.status" placeholder="搜索订单状态" />
      <button @click="queryOrder">查询</button>
    </view>
    <view>
      <view v-for="order in orders" :key="order.id">
        <text>服务名称: {{ order.serviceName }}</text>
        <text>订购时间: {{ order.orderTime }}</text>
        <text>服务地址: {{ order.address }}</text>
        <text>服务金额: {{ order.price }}</text>
        <text>订购状态: {{ order.status }}</text>
        <button @click="viewOrderDetail(order.id)">详情</button>
      </view>
    </view>
  </view>
</template>

<script>
import { queryOrder } from '../../utils/api';

export default {
  data() {
    return {
      query: { status: '' },
      orders: [],
    };
  },
  methods: {
    async queryOrder() {
      const res = await queryOrder(this.query);
      if (res[1].data.success) {
        this.orders = res[1].data.orders;
      }
    },
    viewOrderDetail(orderId) {
      uni.navigateTo({ url: `/pages/orderDetail/index?orderId=${orderId}` });
    },
  },
};
</script>