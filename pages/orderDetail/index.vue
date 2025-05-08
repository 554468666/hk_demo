<template>
  <view class="container">
    <view>
      <text>服务名称: {{ order.serviceName }}</text>
      <text>价格: {{ order.price }}</text>
      <text>评价信息: {{ order.evaluateMessage }}</text>
      <text>服务员工: {{ order.employeeName }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      order: {},
    };
  },
  onLoad(query) {
    this.order = JSON.parse(query.order);
  },
};
</script>