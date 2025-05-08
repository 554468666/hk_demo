<template>
  <view class="container">
    <view>
      <text>服务名称: {{ service.name }}</text>
      <text>价格: {{ price }}</text>
    </view>
    <view>
      <text>卫生程度:</text>
      <picker @change="onHygieneChange" :range="['简单', '中等', '困难']"></picker>
    </view>
    <view>
      <checkbox-group @change="onMemberChange">
        <label>
          <checkbox value="member" />会员
        </label>
      </checkbox-group>
    </view>
    <view>
      <input v-model="address" placeholder="填写地址" />
    </view>
    <view>
      <picker mode="date" @change="onDateChange"></picker>
    </view>
    <view>
      <input v-model="remark" placeholder="填写备注" />
    </view>
    <button @click="submitOrder">提交订单</button>
  </view>
</template>

<script>
import { addOrder } from '../../utils/api';

export default {
  data() {
    return {
      service: {},
      hygiene: '简单',
      isMember: false,
      address: '',
      date: '',
      remark: '',
      price: 0,
    };
  },
  onLoad(query) {
    this.service = JSON.parse(query.service);
    this.price = this.service.price;
  },
  methods: {
    onHygieneChange(e) {
      this.hygiene = e.detail.value;
      this.calculatePrice();
    },
    onMemberChange(e) {
      this.isMember = e.detail.value.includes('member');
      this.calculatePrice();
    },
    onDateChange(e) {
      this.date = e.detail.value;
    },
    calculatePrice() {
      let multiplier = 1;
      switch (this.hygiene) {
        case '简单':
          multiplier = 0.9;
          break;
        case '中等':
          multiplier = 1;
          break;
        case '困难':
          multiplier = 1.1;
          break;
      }
      if (this.isMember) {
        multiplier *= 0.85;
      }
      this.price = this.service.price * multiplier;
    },
    async submitOrder() {
      const orderData = {
        serviceId: this.service.id,
        hygiene: this.hygiene,
        isMember: this.isMember,
        address: this.address,
        date: this.date,
        remark: this.remark,
        price: this.price,
      };
      const res = await addOrder(orderData);
      if (res[1].data.success) {
        uni.showToast({ title: '订单提交成功' });
        uni.navigateBack();
      } else {
        uni.showToast({ title: '订单提交失败', icon: 'none' });
      }
    },
  },
};
</script>