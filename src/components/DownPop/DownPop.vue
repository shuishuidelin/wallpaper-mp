<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-29 20:54:44
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-06-06 23:53:35
-->
<template>
  <view class="bg">
    <view class="pop">
      <MyTopBar
        class="my_top_bar"
        v-if="topBar.length > 0"
        :arr="topBar"
        :defalut="currentPage"
        :defalutLeft="32"
        :fixWidth="60"
        @tab-click="tabClick"
        @change="change"
      />
      <image src="@/static/img/close.png" class="icon-close"></image>
      <scroll-view :scroll-y="true" class="scrollY">
        <view class="page1">
          <view class="page1-item">
            <image src="@/static/img/right.png" class="icon_right"></image>
            <image
              src="@/static/img/top_img.png"
              class="page1-image"
              mode="heightFix"
            ></image>
          </view>
          <view class="page1-item">
            <image src="@/static/img/right.png" class="icon_right"></image>
            <image
              src="@/static/img/g10-s.png"
              class="page1-image"
              mode="heightFix"
            ></image>
          </view>
          <view class="page1-item">
            <image
              src="@/static/img/g10-s.png"
              class="page1-image"
              mode="heightFix"
            ></image>
          </view>
          <view class="page1-item">
            <image
              src="@/static/img/top_img.png"
              class="page1-image"
              mode="heightFix"
            ></image>
          </view>
        </view>
      </scroll-view>
      <view class="pop_bottom row-around">
        <view class="btn_wispy">取消全选</view>
        <view class="btn_fill">保存到相册</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyTopBar from '@/components/MyTopBar/MyTopBar.vue'

export default defineComponent({
  name: 'DownPop',
  components: { MyTopBar },
  setup() {
    let currentPage = ref(0)
    function tabClick(id: number) {
      console.log('id', id)
    }
    function change(id: number) {
      currentPage.value = id
    }
    return {
      topBar: ['图片', '图标'],
      currentPage,
      tabClick,
      change,
    }
  },
})
</script>
<style lang="scss">
.bg {
  width: 750upx;
  height: 100vh;
  background: #0d0d0dc2;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.pop {
  width: 750upx;
  height: 1110upx;
  background: #ffffff;
  border-radius: 20upx 20upx 0px 0px;
  position: absolute;
  bottom: 0;
  .icon-close {
    position: absolute;
    top: 40upx;
    right: 40upx;
    width: 36upx;
    height: 36upx;
  }
  .scrollY {
    height: 814upx;
  }
  .page1 {
    padding: 0 40upx 40upx 40upx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -10px;
    .page1-item {
      overflow: hidden;
      border-radius: 20upx;
      margin-left: 10px;
      position: relative;
    }
    .page1-image {
      height: 300upx;
      width: 300upx;
      // background: #eeeeee;
      border-radius: 20upx;
    }
    .icon_right {
      width: 60upx;
      height: 36upx;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .pop_bottom {
    padding-top: 33upx;
    .btn_wispy {
      width: 335upx;
      height: 80upx;
      border-radius: 40upx 40upx 40upx 40upx;
      border: 2upx solid #135df2;
      box-sizing: border-box;
      font-size: 32upx;
      font-weight: 400;
      color: #135df2;
      line-height: 76upx;
      text-align: center;
    }
    .btn_fill {
      width: 335upx;
      height: 80upx;
      border-radius: 40upx 40upx 40upx 40upx;
      background: #135df2;
      font-size: 32upx;
      font-weight: 400;
      color: #ffffff;
      line-height: 80upx;
      text-align: center;
    }
  }
}
</style>
