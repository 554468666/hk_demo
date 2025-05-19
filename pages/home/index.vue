<template>
  <view class="container">
    <!-- 微信登录提示 -->
    <view v-if="!userInfo">
      <button @click="onGetUserInfo">微信登录</button>
    </view>

    <!-- 首页内容 -->
    <view class="index-body" v-else>
		
		<view class="company-title">
			<image class="company-title-image" src="../../static/image/hk_logo.png"/>
			<view class="company-title-name">
				<text class="company-title-name-top">{{ company.name }}</text>
				<text class="company-title-name-bottom">{{ company.englishName }}</text>
			</view>
		</view>
		<!-- 公司信息 -->
		<view class="company-info">
			<image class="company-iamge" :src=company.bgImage />
		</view>
		
		
		<!-- 广告位轮播图 -->
		<view class="ad-carousel">
		  <swiper class="swiper" autoplay="true" interval="3000" duration="500" display-multiple-items="3">
			<swiper-item v-for="ad in ads" :key="ad.id">
			  <image :src="ad.image" class="ad-image" />
			</swiper-item>
		  </swiper>
		</view>
		
		<br>
		
      <!-- 热门服务列表 -->
      <view class="hot-services">
        <text class="hot-services-title">热门服务</text>
        <view class="service-list" >
          <view v-for="service in hotServices.slice(0, 4)" :key="service.id" class="service-item" @click="orderService(service)">
			<image class="service-item-image1" :src="service.imagePath"></image>
			<view class="service-item-text">
				<text class="service-item-text-name">{{ service.name }}</text>
				<text class="service-item-text-price">￥：{{ service.price }}</text>
				<text class="service-item-text-message">{{ service.describes }}</text>
			</view>
			<image class="service-item-image2" src="../../static/image/select.png"></image>
          </view>
        </view>
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
        name: '洁洁家政',
		englishName: 'JJ housewifery',
        address: '上海市浦东新区陆家嘴',
        phone: '123-456-7890',
		bgImage: 'https://img.picui.cn/free/2025/05/14/6824958d2d34c.png',
      },
      currentPage: 1,
      pageSize: 10,
      isHot: true,
      ads: [
        { id: 1, image: '/static/image/ad1.png' },
        { id: 2, image: '/static/image/ad2.png' },
        { id: 3, image: '/static/image/ad3.png' },
		{ id: 4, image: 'https://img.picui.cn/free/2025/05/14/6824958d2d34c.png' },
		{ id: 5, image: '/static/image/ad3.png' },
      ],
    };
  },
  onShow() {
      const app = getApp();
      const userRole = app.globalData.userRole;
  
      // 管理员角色显示所有 tabBar 项
      if (userRole === 'admin') {
        uni.showTabBar();
        uni.setTabBarItem({
          index: 1,
          text: '用户管理',
          iconPath: 'static/image/user.png',
          selectedIconPath: 'static/image/user-active.png'
        });
      } else {
        // 普通用户隐藏管理员 tab 项
        uni.setTabBarItem({
          index: 1,
          text: '',
          iconPath: 'static/image/transparent.png',
          selectedIconPath: 'static/image/transparent.png'
        });
      }
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
		console.log('1');
        const { encryptedData, iv, rawData, signature } = res;
        // 调用后端接口进行登录
        const loginRes = await login({ encryptedData, iv, rawData, signature });
        if (loginRes.statusCode === 200) {
          this.userInfo = loginRes.data;
		  app.globalData.userRole = this.userInfo.userRole; // 设置用户角色到全局变量
          console.log(this.userInfo);
		  // 根据角色动态设置 tabBar 项
		  this.onShow();
        } else {
			console.log('2');
          uni.showToast({ title: '登录失败', icon: 'none' });
        }
		this.$store.commit('setUserRole', this.userInfo.userRole)
		
		// 根据角色显示不同 tabBar
		if (userInfo.role === 'admin') {
		  this.setupAdminTabBar()
		}
      } catch (error) {
		console.log(error);
        uni.showToast({ title: '用户拒绝授权', icon: 'none' });
      }
    },
	setupAdminTabBar() {
	      // 恢复管理员 tabBar 配置
	      uni.setTabBarItem({
	        index: 2,
	        text: '用户管理',
	        iconPath: '././static/iamge/user.png',
	        selectedIconPath: '././static/iamge/user-active.png'
	      })
	    },
    async getHotServices() {
      const res = await queryHotService({
        current: this.currentPage,
        size: this.pageSize,
        isHot: this.isHot
      });
      if (res.statusCode === 200) {
        this.hotServices = res.data.records; // 假设后端返回的分页数据在`records`字段中
		console.log(this.hotServices);
      } else {
        console.error('Failed to fetch hot services:', res.data.message);
        uni.showToast({ title: '获取热门服务失败', icon: 'none' });
      }
    },
    orderService(service) {
		// 在跳转前设置全局变量
		getApp().globalData.service = service;
		console.log(service);
		wx.navigateTo({ url: '/pages/order/index' });
    },
    goToCompanyDetail() {
		uni.navigateTo({ url: '/pages/companyDetail/index' });
    },
  },
};
</script>

<style scoped>
.title {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 10px;
}
.index-body {
	width: 100%;
}
.company-title {
	height: 80px;
	display: flex;
	align-items: center; /* 垂直居中 */
	justify-content: flex-start; /* 水平起始对齐 */
	padding: 20px 0px 0px 0px;
}

.company-title-image {
	width: 100rpx;
    height: 100rpx;
    margin-right: 10rpx;
}

.company-title-name {
	display: flex;
	flex-direction: column; /* 子元素垂直排列 */
	justify-content: center; /* 垂直居中 */
}
.company-iamge{
	padding: 30px 0px 0px 0px;
	width: 98%;
	position: relative;
	left: 1%;
	border-radius: 15px;
}
.company-info{
	display: flex;
	z-index: 1;
}
.company-title-name-top {
	font-weight: bolder;
	font-size: 37px; /* 设置顶部文字大小 */
	color: #333; /* 设置顶部文字颜色 */
}

.company-title-name-bottom {
	font-size: 28px; /* 设置底部文字大小 */
	color: #666; /* 设置底部文字颜色 */
	font-weight: bolder;
}
.service-list {
	position: relative;
	left: 20px;
	display: flex; /* 修改为纵向布局 */
	flex-direction: column; /* 项目纵向排列 */
	gap: 10px; /* 项目之间的间距 */
}
.service-item {
	display: flex; /* 项目内部也使用flex布局 */
	flex-direction: row; /* 内容水平排列 */
	align-items: center; /* 内容垂直居中 */
	padding: 10px 0px;
}
.service-item text {
	margin-right: 20px; /* 文字和按钮之间的间距 */
}
.service-item button {
	padding: 5px 10px; /* 按钮的内边距 */
}
.ad-carousel {
	border: 1px solid #555555;
    display: flex;
    z-index: 1;
    position: relative;
    border-radius: 10px;
    left: 1%;
    top: 1%;
    width: 98%;
    height: 200rpx;
}

.swiper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
}

.swiper-item {
display: flex;
    cursor: progress;
    position: relative;
    left: 20px;
    ex-direction: row;
    /* justify-content: space-between ; */
    align-items: center;
	padding: 6px 0px;
}

.ad-image {
	width: 100%; /* 图片宽度占满item */
	height: 100%; /* 图片高度占满item */
	object-fit: cover; /* 确保图片覆盖整个区域 */
	
}

.hot-services{
	position: relative;
	display: grid;
	top: 2%;
	border-radius: 10px;
	background-color: #fff;
	height: 52%;
	left: 1%;
	width: 98%;
	border: 1px solid #c5c5c5;
}
.hot-services-title{
	font-size: 50rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
	position: relative;
	left: 20px;
}
.service-item-text{
    display: flex;
    flex-direction: column;
    position: relative;
    left: 5%;
}
.service-item-text-name{
	font-weight: bold;
}
.service-item-text-price{
	font-size: 27rpx;
}
.service-item-text-message{
	font-size: 27rpx;
}
.service-item-image1{
	width: 100px;
	height: 100px;
	border-radius: 10px;
}
.service-item-image2{
	    left: 84%;
	    position: absolute;
	    justify-content: flex-end;
	    width: 40rpx;
	    height: 53rpx;
}
</style>