<template>
  <view class="container">
    <!-- 筛选条件输入框 -->
    <input v-model="searchName" placeholder="输入服务名称筛选" class="search-input" @confirm="refreshServiceList" />
    <view v-for="service in services" :key="service.id" class="service-item">
      <text>{{ service.name }}</text>
	  <text>{{ service.price }}</text>
      <button @click="orderService(service)">订购</button>
    </view>
    <!-- 加载更多提示 -->
    <view v-if="loadingMore" class="loading-more">加载中...</view>
    <view v-if="!loadingMore && !hasMore" class="no-more">没有更多数据了</view>
  </view>
</template>

<script>
import { queryService } from '../../utils/api';

export default {
  data() {
    return {
      services: [], // 存储服务列表
      searchName: '', // 筛选条件：服务名称
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      hasMore: true, // 是否还有更多数据
      loadingMore: false, // 是否正在加载更多数据
    };
  },
  methods: {
    // 定义查询服务的方法
    async queryService() {
      this.loadingMore = true; // 开始加载更多数据
      const res = await queryService({
		  current: this.currentPage,
		  size: this.pageSize,
		  name: this.searchName
	  });
      console.log(res);
	  if (res.statusCode === 200) {
        if (this.currentPage === 1) {
          this.services = res.data.records; // 第一页时直接赋值
        } else {
          this.services = [...this.services, ...res.data.records]; // 后续页追加数据
        }
        this.hasMore = res.data.records.length === this.pageSize; // 判断是否还有更多数据
      } else {
        console.error('查询失败:', res.errMsg); // 如果查询失败，打印错误信息
      }
      this.loadingMore = false; // 结束加载更多数据
    },
    // 定义订购服务的方法
    orderService(service) {
      uni.navigateTo({ url: `/pages/order/index?serviceId=${service.id}` }); // 跳转到订单页面，并传递服务ID
    },
    // 刷新服务列表
    refreshServiceList() {
      this.currentPage = 1; // 重置页码
      this.hasMore = true; // 重置是否有更多数据
      this.queryService(); // 重新查询服务列表
    },
  },
  onReachBottom() {
    // 滚动到底部时触发
    if (!this.loadingMore && this.hasMore) {
      this.currentPage += 1; // 加载下一页
      this.queryService();
    }
  },
  mounted() {
    this.queryService(); // 在组件挂载时调用查询服务的方法
  },
};
</script>

<style>
.container {
  padding: 10px;
}
.search-input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.service-item {
  margin-bottom: 10px;
}
.loading-more, .no-more {
  text-align: center;
  color: #999;
  margin-top: 10px;
}
</style>