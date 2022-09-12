<template>
  <div>
    <!-- head部分 -->
    <van-nav-bar title="账号登录" left-arrow >
      <template #left> <van-icon name="arrow-left" @click="$router.push('/home/profile')" /></template>
    </van-nav-bar>
    <!-- 登录框 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" style="border-radius: 0"
          >提交</van-button
        >
      </div>
    </van-form>
    <div class="loginBottom" @click="goRegistered">还没有账号，去注册~</div>
  </div>
</template>

<script>
import { getLogin } from '@/api/login'
import { Dialog } from 'vant'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    goRegistered() {
      this.$router.push('/home/page')
    },
    async onSubmit() {
      try {
        const { data } = await getLogin(this.username, this.password)
        if (data.status === 200) {
          this.$router.push('/home/profile')
          localStorage.setItem('token', JSON.stringify(data.body.token))
          this.SET_TOKEN(data.body.token)
        }
        if (data.status === 400) return Dialog({ message: '账号或密码有误' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__title {
  color: #fff;
}
.van-hairline--bottom {
  background-color: rgb(0, 185, 150);
}
.van-ellipsis {
  color: #fff !important;
}
.loginBottom {
  text-align: center;
  margin-top: 50px;
  color: rgb(102, 102, 101);
  font-size: 14px;
}
</style>
