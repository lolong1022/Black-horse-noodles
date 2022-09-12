<template>
  <div id="houseCondition">
    <van-search
      v-model="value2"
      show-action
      style="position: absolute; top: 0; left: 0; z-index: 1000; width: 100%"
      label="北京"
      background="rgb(20, 192, 161)"
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
    <!--! 导航栏 -->
    <van-dropdown-menu toolbar-position="bottom">
      <!-- 第一个 -->
      <van-dropdown-item>
        <template #title>
          <span>区域</span>
        </template>
        <template #default>
          <van-picker
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
            :columns="columns"
            show-toolbar
            toolbar-position="bottom"
          />
        </template>
      </van-dropdown-item>
      <!-- 第二个 -->
      <van-dropdown-item>
        <template #title>
          <span>方式</span>
        </template>
        <template #default>
          <van-picker
            :columns="columns2"
            show-toolbar
            toolbar-position="bottom"
          />
        </template>
      </van-dropdown-item>
      <!-- 第三个 -->
      <van-dropdown-item>
        <template #title>
          <span>租金</span>
        </template>
        <template #default>
          <van-picker
            :columns="columns3"
            show-toolbar
            toolbar-position="bottom"
          />
        </template>
      </van-dropdown-item>
      <!-- 第四个 -->
      <van-dropdown-item>
        <template #title>
          <span @click="show = true">筛选</span>
        </template>
        <template #default>
          <van-popup
            z-index="100000"
            get-container="#app"
            v-model="show"
            position="right"
            :style="{ height: '100%', width: '70%' }"
          >
            <ul class="filterbbox">
              <li v-for="(item, index) in columns4" :key="index">
                <p>{{ columns4RightTitle[index] }}</p>
                <button
                  v-for="(item, index) in item"
                  :key="index"
                  :class="{
                    currenBtn: !(getPopuotnVal.indexOf(item.text) < 0)
                  }"
                  @click="getRIghtPopuptns(item.text, index)"
                >
                  {{ item.text }}
                </button>
              </li>
            </ul>
          </van-popup>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 渲染房子具体信息 -->
    <van-grid
      direction="horizontal"
      :column-num="1"
      v-for="(item, index) in getHouseInfo"
      :key="index"
    >
      <van-grid-item>
        <template #icon>
          <img :src="'http://liufusong.top:8080' + item.houseImg" />
        </template>
        <template #text>
          <p>{{ item.desc }}</p>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Toast } from 'vant'
import {
  getCityHouseApi,
  getFilterhouseInfo,
  getCityHouseID
} from '@/api/house'
export default {
  data() {
    return {
      value2: '',
      value: 0,
      show: true,
      value1: 1,
      columns: [],
      columns2: [],
      columns3: [],
      columns4: [],
      // 获取房屋接口数据
      params: {
        cityId: 'AREA|19b39d4f-8a36-d6f8',
        area: '', // 地区
        subway: '', // 地铁
        rentType: '', //   整租
        price: '', //   价格
        more: '', //   复合查询
        roomType: '', //   房屋类型
        oriented: '', //   朝向
        characteristic: '', //   标签
        floor: '', //   楼层
        start: '', //   开始项
        end: '' //   结束项
      },
      // 房屋信息
      getHouseInfo: [],
      columns4RightTitle: ['户型', '朝向', '楼层', '房屋亮点'],
      getPopuotnVal: [],
      newobj: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ]
    }
  },
  created() {
    this.getCityHouse()
    this.getFilterhouseInfoApi()
    getCityHouseID().then(({ data }) => {
      console.log(data)
    })
  },
  methods: {
    async getFilterhouseInfoApi() {
      try {
        const { data } = await getFilterhouseInfo(this.params)
        this.getHouseInfo = data.body.list
        console.log(123, data)
      } catch (error) {}
    },
    onSearch() {
      this.$router.push('/map')
    },
    // 递归修改label改为text
    changeLabel(body, newobj) {
      for (const key in body) {
        if (body[key] instanceof Array) {
          newobj[key] = []
          this.changeLabel(body[key], newobj[key])
        } else if (body[key] instanceof Object) {
          newobj[key] = {}
          this.changeLabel(body[key], newobj[key])
        } else {
          if (key === 'label') {
            newobj.text = body[key]
          } else {
            newobj[key] = body[key]
          }
        }
      }
    },
    // 判断自身又没有children属性，没有就加上
    hasChildren(item) {
      const everyHasChildren = Object.prototype.hasOwnProperty.call(
        item,
        'children'
      )
      if (!everyHasChildren) {
        item.children = [{ text: '不限', value: 'null' }]
      } else {
        for (const key in item.children) {
          this.hasChildren(item.children[key])
        }
      }
    },
    // text值筛选出来
    filterISaNav(oldArr, newArr) {
      oldArr.forEach((item) => {
        newArr.push(item.text)
      })
    },
    async getCityHouse() {
      const { data } = await getCityHouseApi()
      this.changeLabel(data.body, this.newobj)
      console.log(data.body)
      this.hasChildren(this.newobj.area)
      this.hasChildren(this.newobj.subway)
      this.columns = [this.newobj.area, this.newobj.subway]
      this.filterISaNav(this.newobj.rentType, this.columns2)
      this.filterISaNav(this.newobj.price, this.columns3)
      // console.log(this.columns3)
      this.columns4.push(
        this.newobj.roomType,
        this.newobj.oriented,
        this.newobj.floor,
        this.newobj.characteristic
      )
      console.log(this.columns4)
    },
    // 获取弹出层的按钮值
    getRIghtPopuptns(val) {
      const valIndex = this.getPopuotnVal.indexOf(val)
      console.log(valIndex)
      if (valIndex < 0) {
        this.getPopuotnVal.push(val)
      } else {
        this.getPopuotnVal.splice(valIndex, 1)
      }
      console.log(this.getPopuotnVal)
    },
    onConfirm(value, index) {
      console.log(1)
      Toast(`当前值：${value}, 当前索引：${index}`)
    },
    onChange(picker, value, index) {
      console.log(value)
      // this.params=
      Toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel() {
      Toast('取消')
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-grid-item__content--center) {
  justify-content: start;
}
.changeNav {
  margin-top: 45px;
  height: 50px;
  display: flex;
  line-height: 30px;
  font-size: 14px;
  justify-content: space-around;
}
#houseCondition {
  padding: 50px 0 50px;
}
.filterbbox {
  width: 100%;
  height: 400px;
  li {
    padding: 0 15px;
    p {
      margin: 15px 0;
      font-size: 16px;
      color: #777;
    }
    button {
      width: 70px;
      height: 35px;
      margin: 10px 5px 10px 30px;
      background-color: #fff;
      font-size: 12px;
      color: #777;
      border: 1px solid #ccc;
    }
  }
  .currenBtn {
    border: 1px solid #21b97a;
    color: #21b97a;
    background-color: #defaef;
  }
}
.van-grid-item__icon-wrapper {
  height: 100px;
  img {
    height: 100px;
    width: 100px;
  }
}
</style>
