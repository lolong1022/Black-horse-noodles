<template>
  <div style="background-color: rgb(255, 255, 252)">
    <!-- 登录头部 -->
    <div class="headreImg">
      <img
        :src="
          token
            ? 'http://liufusong.top:8080' + token.avatar
            : require('../../assets/imgs/bg.png')
        "
        alt=""
        width="100%"
        height="100%"
      />
      <div class="loginBtn">
        <div class="HeadPortraitBorder">
          <div class="HeadPortrait">
            <img
              :src="
                token
                  ? 'http://liufusong.top:8080' + token.avatar
                  : require('../../assets/imgs/avatar.png')
              "
              alt=""
            />
          </div>
        </div>
        <p class="loginnames" style="font-size: 12px">
          {{ token ? token.nickname : '游客' }}
        </p>
        <!-- 登录按钮 -->
        <van-button
          v-if="!token"
          @click="gologin"
          type="primary"
          style="border-radius: 10px"
          >登录</van-button
        >
        <div class="exit" v-else>
          <van-button @click="exiBtn" type="primary" style="border-radius: 10px"
            >退出</van-button
          >
          <p style="font-size: 12px">编辑个人资料</p>
        </div>
      </div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(item, index) in list"
        :key="index"
        :icon="item.icon"
        :text="item.text"
        @click="$router.push('/favorate')"
      >
      </van-grid-item>
    </van-grid>
    <!-- 底部banner -->
    <div class="ims">
      <img src="@/assets/imgs/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/Mys'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      token: JSON.parse(localStorage.getItem('token')),
      list: [
        { icon: 'star-o', text: '收藏' },
        { icon: 'home-o', text: '我的出租' },
        { icon: 'eye-o', text: '看房记录' },
        { icon: 'manager-o', text: '成为房主' },
        { icon: 'bar-chart-o', text: '个人的资料' },
        { icon: 'desktop-o', text: '联系我们' }
      ]
    }
  },
  created() {
    this.getUserInfoApi()
  },
  methods: {
    gologin() {
      this.$router.push('/login')
    },
    async getUserInfoApi() {
      const { data } = await getUserInfo(this.token)
      this.token = data.body
    },
    exiBtn() {
      Dialog.confirm({
        title: '登录',
        message: '是否退出登录'
      })
        .then(() => {
          // on confirm
          localStorage.removeItem('token')
          this.token = ''
        })
        .catch(() => {
          // on cancel
          console.log(222)
        })
    }
    // watch: {
    //   token() {

    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.headreImg {
  position: relative;
  height: 300px;
  // background-color: antiquewhite;
}
.loginBtn {
  position: absolute;
  bottom: 0;
  text-align: center;
  left: 8%;
  width: 20rem;
  height: 10.3125rem;
  background-color: #fff;
}
.loginnames {
  margin-top: 2.1875rem;
}
.HeadPortraitBorder {
  position: absolute;
  top: -2.1875rem;
  left: 50%;
  margin-left: -2.1875rem;
  width: 4.375rem;
  height: 4.375rem;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 3px 3px 3px #ccc;
}
.HeadPortrait {
  position: absolute;
  background-color: pink;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  margin-left: -1.875rem;
  margin-top: -1.875rem;
  img {
    height: 100%;
  }
}
.ims {
  width: 340px;
  height: 85px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
