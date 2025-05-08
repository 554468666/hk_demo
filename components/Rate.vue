<template>
  <view class="rate">
    <view v-for="index in 5" :key="index" @click="setRate(index)">
      <image :src="index <= value ? activeStar : inactiveStar" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      activeStar: 'static/star-active.png',
      inactiveStar: 'static/star-inactive.png',
    };
  },
  methods: {
    setRate(rate) {
      this.$emit('input', rate);
    },
  },
};
</script>

<style scoped>
.rate {
  display: flex;
}
.rate image {
  width: 40px;
  height: 40px;
}
</style>