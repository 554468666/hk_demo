<template>
  <view class="app">
    <navigator url="/pages/home/index" class="nav-item">首页</navigator>
    <navigator url="/pages/userManage/index" class="nav-item">用户管理</navigator>
    <navigator url="/pages/serviceList/index" class="nav-item">服务列表</navigator>
    <navigator url="/pages/order/index" class="nav-item">订购页面</navigator>
    <navigator url="/pages/evaluate/index" class="nav-item">服务评价</navigator>
    <navigator url="/pages/serviceManage/index" class="nav-item">服务管理</navigator>
    <navigator url="/pages/orderRecord/index" class="nav-item">订购记录</navigator>
    <navigator url="/pages/orderDetail/index" class="nav-item">订购记录详情</navigator>
    <navigator url="/pages/mine/index" class="nav-item">我的</navigator>
    <navigator url="/pages/member/index" class="nav-item">办理会员</navigator>
    <navigator url="/pages/feedback/index" class="nav-item">意见反馈</navigator>
    <navigator url="/pages/contact/index" class="nav-item">联系我们</navigator>
  </view>
</template>

<script>
export default {
  name: 'App',
  onLaunch: function() {
    console.log('App Launch');
    this.globalData = {
		
	  userRole: null,
      service: null,
      userId: null,
      // 其他全局变量
    };
  }
};
</script>

<style>
@import './styles/common.css';
	
/* 设置全局背景颜色 */
.app {
  background-color: #f5f5f5; /* 全局背景颜色 */
  min-height: 90vh; /* 确保背景颜色覆盖整个屏幕 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* 导航链接样式 */
.nav-item {
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  color: #333;
  font-size: 16px;
  text-decoration: none;
  width: 80%; /* 设置宽度，使导航链接看起来更美观 */
}

.nav-item:hover {
  background-color: #f0f0f0;
}

/* 引入公共样式 */

</style>