<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-06-04 22:34:00
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-06-04 22:55:30
-->
<template>
  <view class="bg">
    <view class="pop">
      <image
        src="@/static/img/close.png"
        class="icon-close"
        @click="closePop"
      ></image>
      <view class="pop-state-title">保存成功~</view>
      <view class="pop-sub-title">桌面美化超级工具</view>
      <view class="pop-sub-desc"
        >自定义桌面主题 · 同色系桌面 · 好友互动组件</view
      >
      <image src="@/static/img/guide_2.png" class="pop-guide_2"></image>
      <view class="pop-save-btn">查看安装教程</view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'saveSuccess',
  setup() {},
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
  .pop-state-title {
    font-size: 48upx;
    font-weight: 500;
    color: #135df2;
    padding: 60upx;
  }
  .pop-sub-title {
    font-size: 36upx;
    font-weight: bold;
    color: #0d0d0d;
    padding: 0upx 0 0 60upx;
  }
  .pop-sub-desc {
    font-size: 24upx;
    font-weight: 400;
    padding: 0upx 0 0 60upx;
  }
  .pop-guide_2 {
    width: 677upx;
    height: 620upx;
    margin-top: 75upx;
    vertical-align: bottom;
  }
  .pop-save-btn {
    width: 690upx;
    height: 100upx;
    background: #135df2;
    border-radius: 50upx;
    font-size: 32upx;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 100upx;
    margin: 0 auto;
  }
}
</style>
