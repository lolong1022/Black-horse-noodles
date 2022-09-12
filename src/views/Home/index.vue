<template>
  <div>
    <!-- 二级路由页面 -->
    <router-view></router-view>
    <!-- 底部 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home/page">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/house">找房</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/home/message"
        >咨询</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/home/profile"
        >个人</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped></style>
