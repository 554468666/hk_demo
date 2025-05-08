<template>
  <view class="container">
    <view>
      <text>是否会员: {{ isMember ? '是' : '否' }}</text>
      <text>所剩金额: {{ remainingAmount }}</text>
    </view>
    <view>
      <input v-model="rechargeAmount" placeholder="充值额度" type="number" />
      <button @click="handleRecharge">充值</button>
    </view>
  </view>
</template>

<script>
import { addMember, queryMember } from '../../utils/api';

export default {
  data() {
    return {
      isMember: false,
      remainingAmount: 0,
      rechargeAmount: 0,
    };
  },
  methods: {
    async handleRecharge() {
      const res = await addMember({ rechargeAmount: this.rechargeAmount });
      if (res[1].data.success) {
        uni.showToast({ title: '充值成功' });
        this.remainingAmount += this.rechargeAmount;
        this.rechargeAmount = 0;
      }
    },
  },
};
</script>