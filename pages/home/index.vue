<template>
  <view class="container">
    <!-- 微信登录提示 -->
    <view v-if="!userInfo">
      <button @click="onGetUserInfo">微信登录</button>
    </view>

    <!-- 首页内容 -->
    <view v-else>
      <!-- 热门服务列表 -->
      <view class="hot-services">
        <text class="title">热门服务</text>
        <view class="service-list">
          <view v-for="service in hotServices.slice(0, 4)" :key="service.id" class="service-item">
            <text>{{ service.name }}</text>
			<text>{{ service.price }}</text>
            <button @click="orderService(service)">订购</button>
          </view>
        </view>
      </view>

      <!-- 公司信息 -->
      <view class="company-info">
        <text class="title">公司信息</text>
        <view>
          <text>公司名称: {{ company.name }}</text>
          <text>地址: {{ company.address }}</text>
          <text>电话: {{ company.phone }}</text>
        </view>
        <button @click="goToCompanyDetail">其他</button>
      </view>

      <!-- 广告位轮播图 -->
      <view class="ad-carousel">
        <swiper class="swiper" autoplay="true" interval="3000" duration="500">
          <swiper-item v-for="ad in ads" :key="ad.id">
            <image :src="ad.image" class="ad-image" />
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import { login, getUserInfo, queryHotService } from '../../utils/api';

export default {
  data() {
    return {
      userInfo: null,
      hotServices: [],
      company: {
        name: '家政服务公司',
        address: '上海市浦东新区陆家嘴',
        phone: '123-456-7890',
      },
      currentPage: 1,
      pageSize: 10,
      isHot: true,
      ads: [
        { id: 1, image: '/static/image/ad1.png' },
        { id: 2, image: '/static/image/ad2.png' },
        { id: 3, image: '/static/image/ad3.png' },
      ],
    };
  },
  async onLoad() {
    // 自动触发微信登录
    if (!this.userInfo) {
      await this.onGetUserInfo();
    }
    // 获取热门服务
    await this.getHotServices();
  },
  methods: {
    async onGetUserInfo() {
      try {
        const res = await uni.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途
        });
        const { encryptedData, iv, rawData, signature } = res;
        // 调用后端接口进行登录
        const loginRes = await login({ encryptedData, iv, rawData, signature });
        if (loginRes.statusCode === 200) {
          this.userInfo = loginRes.data;
          console.log(this.userInfo);
        } else {
          uni.showToast({ title: '登录失败', icon: 'none' });
        }
      } catch (error) {
        uni.showToast({ title: '用户拒绝授权', icon: 'none' });
      }
    },
    async getHotServices() {
      const res = await queryHotService({
        current: this.currentPage,
        size: this.pageSize,
        isHot: this.isHot
      });
      if (res.statusCode === 200) {
        this.hotServices = res.data.records; // 假设后端返回的分页数据在`records`字段中
      } else {
        console.error('Failed to fetch hot services:', res.data.message);
        uni.showToast({ title: '获取热门服务失败', icon: 'none' });
      }
    },
    orderService(service) {
      uni.navigateTo({ url: `/pages/order/index?serviceId=${service.id}` });
    },
    goToCompanyDetail() {
      uni.navigateTo({ url: '/pages/companyDetail/index' });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.service-list {
  display: flex; /* 修改为纵向布局 */
  flex-direction: column; /* 项目纵向排列 */
  gap: 10px; /* 项目之间的间距 */
}
.service-item {
  display: flex; /* 项目内部也使用flex布局 */
  flex-direction: row; /* 内容水平排列 */
  justify-content: space-between; /* 内容两端对齐 */
  align-items: center; /* 内容垂直居中 */
}
.service-item text {
  margin-right: 10px; /* 文字和按钮之间的间距 */
}
.service-item button {
  padding: 5px 10px; /* 按钮的内边距 */
}
.ad-carousel {
  margin-top: 20px;
}
.swiper {
  width: 100%;
  height: 200px;
}
.ad-image {
  width: 100%;
  height: 100%;
}
</style>