<template>
  <view class="container bg-gray-50 min-h-screen px-4 pt-6">
    <!-- 加载状态 -->
    <view v-if="isLoading" class="loading-container flex justify-center items-center h-screen">
      <view class="loading-content bg-white p-6 rounded-xl shadow-lg">
        <text class="text-primary text-5xl"><i class="fa fa-circle-o-notch fa-spin"></i></text>
        <text class="block mt-4 text-gray-600">加载中...</text>
      </view>
    </view>

    <!-- 主内容 -->
    <view v-else>
      <!-- 错误提示 -->
      <view v-if="loadError" class="error-container p-6 bg-red-50 rounded-xl shadow-md mb-6">
        <text class="text-red-600 flex items-center">
          <i class="fa fa-exclamation-circle mr-2"></i> 加载失败，请重试
        </text>
        <button @click="reloadService" class="mt-3 text-primary">重新加载</button>
      </view>

      <!-- 头部信息卡片 -->
      <view class="service-card bg-white rounded-xl shadow-md mb-6">
        <view class="p-6 pt-20">
			<image
			  v-if="service.imagePath" 
			  class="service-card-image mr-4"
			  :src="service.imagePath"
			  style="width:100px;height:100px;box-shadow:0 4px 12px rgba(0,0,0,0.1);object-fit:cover;"
			/>
          <view class="flex items-center mb-4 mb-41">
            <view class="flex-1">
              <text class="text-2xl font-bold text-gray-800 mb-2">
                {{ service.name || '未选择服务' }}
              </text>
              <view class="flex items-center">
                <text class="text-gray-500 line-through">¥{{ formatPrice(service.price) }}</text>
              </view>
			  <view  class="flex items-center mz-3">
				  <text class="text-gray-500 md-3">{{ service.describes || 'Hot热门服务' }}</text>
			  </view>
            </view>
          </view>

        </view>
      </view>

      <!-- 表单卡片 -->
      <view class="form-card bg-white rounded-xl shadow-md mb-6 p-6">
        <text class="text-lg font-semibold text-gray-800 mb-5 order-info">订单信息</text>
		<view class="form-card-body ">
			<!-- 卫生程度选择 -->
			<view class="mb-5">
			  <text class="text-gray-700 font-medium mb-2">卫生程度:</text>
			  <picker 
				@change="onHygieneChange" 
				:range="hygieneOptions" 
				:value="hygieneOptions.indexOf(hygiene)"
				class="border rounded-lg px-4 py-3 w-full appearance-none bg-white focus:outline-none"
			  >
				<view class="flex justify-between items-center py-2">
				  <text class="text-gray-600">{{ hygiene || '请选择' }}</text>
				  <text class="text-gray-400"><i class="fa fa-chevron-down"></i></text>
				</view>
			  </picker>
			</view>

			<!-- 日期选择 -->
			<view class="mb-5">
			  <text class="text-gray-700 font-medium mb-2">预约日期:</text>
			  <view class="relative">
				<picker 
				  mode="date" 
				  @change="onDateChange"
				  :value="date"
				  class="border rounded-lg px-4 py-3 w-full"
				  @blur="handleBlur('date')"
				>
				  <view class="flex justify-between items-center py-2 select-date">
					<text class="text-gray-600">{{ date || '请选择日期' }}</text>
					<text class="text-gray-400"><i class="fa fa-calendar"></i></text>
				  </view>
				</picker>
			  </view>
			</view>
			
			<!-- 地址输入 -->
			<view class="mb-5">
			  <text class="text-gray-700 font-medium mb-2">服务地址:</text>
			  <view class="relative">
				<input 
				  v-model="address" 
				  placeholder="请输入详细地址"
				  class="border rounded-lg px-4 py-3 w-full"
				  @blur="handleBlur('address')"
				/>
				<text v-if="!address && touched.address" class="absolute -bottom-5 left-0 text-red-500 text-xs-addrs">请填写服务地址</text>
			  </view>
			</view>

			<!-- 备注信息 -->
			<view class="mb-5">
			  <text class="text-gray-700 font-medium mb-2">备注信息:</text>
			  <textarea 
				v-model="remark" 
				placeholder="有什么特殊要求可以告诉我们"
				class="border rounded-lg px-4 py-3 w-full h-28 resize-vertical"
			  ></textarea>
			</view>
		</view>
      </view>

      <!-- 价格明细卡片 -->
      <view class="price-card bg-white rounded-xl shadow-md mb-10 p-6">
        <text class="text-lg font-semibold text-gray-800 mb-4">价格明细</text>
        <view class="space-y-3">
            <!-- 会员选择 -->
			<view class="mb-5">
				<label class="flex items-center cursor-pointer">
				<checkbox :checked="isMember" class="checkbox-custom mr-3" @change="onMemberChange" />
			
				<text class="text-gray-700">开通会员 (享受85折优惠)</text>
				</label>
			</view>
          <view class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <text class="text-lg font-semibold text-gray-800">预估金额</text>
            <text class="text-xl font-bold text-primary">¥{{ formatPrice(price) }}</text>
          </view>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-section fixed bottom-0 left-0 right-0 bg-white shadow-lg p-6">
        <button 
          @click="submitOrder"
          class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg shadow-lg"
          :disabled="!isFormValid"
        >
          {{ loading ? '提交中...' : '提交订单' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { addOrder } from '../../utils/api';

export default {
  data() {
    return {
      service: {},
      hygiene: '简单',
      hygieneOptions: ['简单', '中等', '困难'],
      isMember: false,
      address: '',
      date: '',
      remark: '',
      price: 0,
      loading: false,
      isLoading: true,
      loadError: false,
      touched: {
        address: false,
        date: false
      }
    };
  },
  computed: {
    isFormValid() {
      return this.address && this.date;
    }
  },
  onLoad(query) {
    this.loadService();
  },
  methods: {
    formatPrice(value) {
      return (value || 0).toFixed(2);
    },
    loadService() {
      try {
        const someData = getApp().globalData.service;
        if (!someData || !someData.price) throw new Error('服务数据不完整');
        this.service = someData;
        this.price = this.service.price;
        this.isLoading = false;
      } catch (error) {
        console.error('加载失败:', error);
        this.loadError = true;
        this.isLoading = false;
      }
    },
    reloadService() {
      this.isLoading = true;
      this.loadError = false;
      this.loadService();
    },
    onHygieneChange(e) {
      this.hygiene = this.hygieneOptions[e.detail.value];
      this.calculatePrice();
    },
    onMemberChange(e) {
      this.isMember = e.detail.value.includes('member');
      this.calculatePrice();
    },
    onDateChange(e) {
      this.date = e.detail.value;
      this.touched.date = true;
    },
    calculatePrice() {
      const multiplier = { 简单: 0.9, 中等: 1, 困难: 1.1 }[this.hygiene] || 1;
      this.price = (this.service.price || 0) * multiplier * (this.isMember ? 0.85 : 1);
    },
    getHygieneMultiplierText() {
      return { 简单: '0.9倍', 中等: '1.0倍', 困难: '1.1倍' }[this.hygiene] || '1.0倍';
    },
    handleBlur(field) {
      this.touched[field] = true;
    },
    async submitOrder() {
      if (!this.isFormValid) {
        this.touched.address = !this.address;
        this.touched.date = !this.date;
        return uni.showToast({ title: '请完成必填信息', icon: 'none' });
      }
      this.loading = true;
      try {
        const res = await addOrder({
          serviceId: this.service.id,
          hygiene: this.hygiene,
          isMember: this.isMember,
          address: this.address,
          date: this.date,
          remark: this.remark,
          price: this.price
        });
        if (res[1].data.success) {
          uni.showToast({ title: '订单提交成功', icon: 'success', duration: 2000 });
          setTimeout(() => uni.navigateBack(), 2000);
        } else {
          uni.showToast({ title: res[1].data.message || '订单提交失败', icon: 'none' });
        }
      } catch (error) {
        console.error('提交失败:', error);
        uni.showToast({ title: '网络错误，请稍后再试', icon: 'none' });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
/* 移除所有 CSS 变量，使用具体颜色值 */
.container {
  padding-bottom: 120rpx;
  background-color: #f5f7fa;
}

.service-card {
	margin: 0 -4px 24px;
	border-radius: 20px;
	border: 1px solid #e5e5e5;
	box-shadow: 0 8px 16px rgba(0,0,0,0.08);
	background-color: white;
	height: 17%
}
.mb-41{
    position: relative;
    left: 54%;
    bottom: 190rpx;
}
.select-date{
	position: relative;
    left: 30%;
    bottom: 42rpx;
}
.form-card, .price-card {
	margin: 0 -4px 24px;
	border-radius: 70px;
	border: 1px solid #e5e5e5;
	box-shadow: 0 8px 16px rgba(0,0,0,0.08);
	background-color: white;
	padding: 30rpx;
}
.appearance-none{
	position: relative;
	left: 30%;
    bottom: 42rpx;
}
.service-card .p-6 {
  padding-top: 20px;
  padding: 24px;
}

.service-card-image {
	position: relative;
	left: 6%;
	border-radius: 21px;
	margin-right: 16px;
	border: 1px solid #af9c9c;

}
.order-info{
	font-weight: bold;
	font-size: 45rpx;
	position: relative;
	left: 35%;
	bottom: 18rpx;
}
.checkbox-custom {
  transform: scale(1.3);
  color: #165DFF;
  transform: scale(0.8);
}
.mz-3{
	width: 210rpx;
	border-radius: 8px;
}
.md-3{
	  word-wrap: break-word; /* 允许长单词或无法使用断点的URL强制换行 */
	  white-space: normal; /* 保留空白符，允许换行 */
	  font-size: 25rpx;
}
.picker, input, textarea {
  margin-top: 8px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px 16px;
}

.submit-section {
  padding: 24px;
  background-color: white;
}

button {
  background-color: #165DFF;
  color: white;
  border-radius: 10px;
  padding: 14px 24px;
  font-weight: 500;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #104ab3;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-container {
  background-color: #ffebee;
  border-color: #ffcdd2;
}

.text-red-600 {
  color: #d32f2f;
}

.text-primary {
  color: #165DFF;
}
</style>