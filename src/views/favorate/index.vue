<template>
  <div>
     <!-- head部分 -->
     <van-nav-bar title="账号登录" left-arrow >
      <template #left> <van-icon name="arrow-left" @click="$router.push('/home/profile')" /></template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
}

</script>

<style lang='less' scoped>
/deep/.van-nav-bar__title {
  color: #fff;
}
.van-hairline--bottom {
  background-color: rgb(0, 185, 150);
}
</style>
