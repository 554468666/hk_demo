<template>
  <view class="container">
    <view>
      <input v-model="newService.name" placeholder="服务名称" />
      <input v-model="newService.price" placeholder="价格" type="number" />
      <button @click="addService">添加服务</button>
    </view>
    <view>
      <button @click="deleteService(service.id)">删除</button>
      <button @click="updateService(service)">修改</button>
    </view>
    <view>
      <input v-model="query.name" placeholder="搜索服务名称" />
      <button @click="queryService">查询</button>
    </view>
    <view>
      <view v-for="service in services" :key="service.id">
        {{ service.name }} - {{ service.price }}
      </view>
    </view>
  </view>
</template>

<script>
import { addService, deleteService, updateService, queryService } from '../../utils/api';

export default {
  data() {
    return {
      newService: { name: '', price: 0 },
      query: { name: '' },
      services: [],
    };
  },
  methods: {
    async addService() {
      const res = await addService(this.newService);
      if (res[1].data.success) {
        uni.showToast({ title: '服务添加成功' });
        this.services.push(this.newService);
        this.newService = { name: '', price: 0 };
      }
    },
    async deleteService(id) {
      const res = await deleteService(id);
      if (res[1].data.success) {
        uni.showToast({ title: '服务删除成功' });
        this.services = this.services.filter(service => service.id !== id);
      }
    },
    async updateService(service) {
      const res = await updateService(service);
      if (res[1].data.success) {
        uni.showToast({ title: '服务修改成功' });
      }
    },
    async queryService() {
      const res = await queryService(this.query);
      if (res[1].data.success) {
        this.services = res[1].data.services;
      }
    },
  },
};
</script>