<template>
  <view class="container">
    <view>
      <text>公司名称: {{ company.name }}</text>
      <text>地址: {{ company.address }}</text>
      <text>电话: {{ company.phone }}</text>
      <text>简介: {{ company.description }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      company: {
        name: '家政服务公司',
        address: '上海市浦东新区陆家嘴',
        phone: '123-456-7890',
        description: '我们是一家专业的家政服务公司，提供各种家政服务。',
      },
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>