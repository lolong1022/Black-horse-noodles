<template>
  <div>
    <!-- 头部 -->
    <van-search
      v-model="value"
      show-action
      style="position: absolute; top: 10px; left: 0; z-index: 1000; width: 100%"
      label="北京"
      background="transparent"
      placeholder="请输入小区或地址"
      @focus="$router.push('/city')"
    >
      <template #action>
        <div @click="onSearch">
          <van-icon class="address" name="location-o" />
        </div>
      </template>
      <template #label>
        <span @click="$router.push('/city')">杭州</span
        ><van-icon name="arrow-down" />
      </template>
    </van-search>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item
        class="swipeims"
        v-for="item in getFigureList"
        :key="item.id"
      >
        <img :src="'http://liufusong.top:8080' + item.imgSrc"
      /></van-swipe-item>
    </van-swipe>
    <!--! 租房方式列表 -->
    <div class="chooseHouse">
      <ul>
        <li @click="goLookRome" v-for="item,index in chooseHouseList" :key="index">
          <img :src="item.path" alt="" />
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <!--! 租房小组 -->
    <div class="morNavBar">
      <p class="left">租房小组</p>
      <p class="right">更多</p>
    </div>
    <!-- ! 宫格  -->
    <van-grid direction="horizontal" icon-size="50px" :column-num="2">
      <van-grid-item
        :icon="'http://liufusong.top:8080' + item.imgSrc"
        v-for="item in getGroupslist"
        :key="item.id"
      >
        <template #text>
          <div>
            <div>{{ item.desc }}</div>
            <div>{{ item.title }}</div>
          </div>
        </template></van-grid-item
      >
    </van-grid>
  </div>
</template>

<script>
import { getFigure, getGrops } from '../../api/homepage'
export default {
  data() {
    return {
      value: '',
      getFigureList: [],
      getGroupslist: [],
      chooseHouseList: [
        {
          path: require('@/assets/imgs/1.png'),
          text: '收藏'
        },
        {
          path: require('@/assets/imgs/2.png'),
          text: '合租'
        },
        {
          path: require('@/assets/imgs/3.png'),
          text: '看房记录'
        },
        {
          path: require('@/assets/imgs/4.png'),
          text: '成为房主'
        }
      ]
    }
  },
  created() {
    this.getFigure()
    this.getGropsApi()
  },
  methods: {
    onSearch() {
      this.$router.push('/map')
    },
    async getFigure() {
      try {
        const { data } = await getFigure()
        this.getFigureList = data.body
      } catch (error) {
        alert('刷新重试')
      }
    },
    async getGropsApi() {
      try {
        const { data } = await getGrops()
        this.getGroupslist = data.body
        console.log(data)
      } catch (error) {
        alert('刷新重试')
      }
    },
    goLookRome() {
      this.$router.push('/home/house')
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.swipeims {
  width: 100%;
  height: 212px !important;
  img {
    width: 100%;
    height: 100%;
  }
}
.address {
  font-size: 25px;
  margin-top: 10px;
}
.chooseHouse {
  ul {
    display: flex;
    text-align: center;
    justify-content: space-around;
    padding-top: 10px;
    img {
      width: 60px;
    }
    p {
      font-size: 14px;
      margin: 0;
    }
  }
}
.morNavBar {
  display: flex;
  margin-top: 20px;
  padding: 0 30px;
  justify-content: space-between;
  font-size: 14px;
  .right {
    font-size: 12px;
    color: #999;
    line-height: 30px;
  }
}
/deep/.van-grid-item__content--horizontal {
  justify-content: space-evenly;
  .van-grid-item__text {
    font-size: 14px;
  }
}
</style>
