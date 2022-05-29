<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-29 20:54:44
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-30 00:31:21
-->
<template>
  <view class="bg">
    <view class="pop">
      <MyTopBar
        class="my_top_bar"
        v-if="topBar.length > 0"
        :arr="topBar"
        :defalut="currentPage"
        @tab-click="tabClick"
        @change="change"
      />
      <image src="@/static/img/close.png" class="icon-close"></image>
      <view class="page1">
        <view class="page1-item">
          <image
            src="@/static/img/top_img.png"
            class="page1-image"
            mode="aspectFit"
          ></image>
        </view>
        <view class="page1-item">
          <image
            src="@/static/img/g10-s.png"
            class="page1-image"
            mode="aspectFit"
          ></image>
        </view>
        <view class="page1-item">
          <image
            src="@/static/img/g10-s.png"
            class="page1-image"
            mode="aspectFit"
          ></image>
        </view>
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
  .page1 {
    padding: 40upx;
    .page1-image {
      height: 300upx;
      // background: #eeeeee;
      border-radius: 20upx;
    }
  }
}
</style>
