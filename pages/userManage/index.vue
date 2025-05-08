<template>
  <view class="container">
    <view>
      <input v-model="newUser.name" placeholder="用户名" />
      <input v-model="newUser.email" placeholder="邮箱" />
      <button @click="addUser">添加用户</button>
    </view>
    <view>
      <button @click="deleteUser(user.id)">删除</button>
      <button @click="updateUser(user)">修改</button>
    </view>
    <view>
      <input v-model="query.name" placeholder="搜索用户名" />
      <button @click="queryUser">查询</button>
    </view>
    <view>
      <view v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </view>
    </view>
  </view>
</template>

<script>
import { addUser, deleteUser, updateUser, queryUser } from '../../utils/api';

export default {
  data() {
    return {
      newUser: { name: '', email: '' },
      query: { name: '' },
      users: [],
    };
  },
  methods: {
    async addUser() {
      const res = await addUser(this.newUser);
      if (res[1].data.success) {
        uni.showToast({ title: '添加成功' });
        this.users.push(this.newUser);
        this.newUser = { name: '', email: '' };
      }
    },
    async deleteUser(id) {
      const res = await deleteUser(id);
      if (res[1].data.success) {
        uni.showToast({ title: '删除成功' });
        this.users = this.users.filter(user => user.id !== id);
      }
    },
    async updateUser(user) {
      const res = await updateUser(user);
      if (res[1].data.success) {
        uni.showToast({ title: '修改成功' });
      }
    },
    async queryUser() {
      const res = await queryUser(this.query);
      if (res[1].data.success) {
        this.users = res[1].data.users;
      }
    },
  },
};
</script>