<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-29 15:56:39
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-29 17:02:56
-->
<template>
  <view class="poster-area">
    <image
      :src="works.bigUrl"
      class="poster"
      :lazy-load="true"
      mode="aspectFill"
      @click="$emit('detail', works)"
    ></image>
    <view class="group row">
      <image src="@/static/img/group_img.png" class="group_img"></image>
      <text>3</text>
    </view>
  </view>
</template>
<script lang="ts">
import { UserWallpaper } from '@/bean/Wallpaper'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Poster',
  props: {
    works: {
      type: Object as PropType<UserWallpaper>,
    },
  },
  setup() {},
})
</script>
<style lang="scss">
.poster-area {
  display: inline-block;
  position: relative;
  margin: 10upx;

  .poster {
    width: 210upx;
    height: 450upx;
    border-radius: 8upx;
    background: #eeeeee;
    vertical-align: top;
    position: relative;
  }
  .group {
    background: rgba(13, 13, 13, 0.3);
    border-radius: 16upx;
    width: 60upx;
    height: 30upx;
    text-align: center;
    justify-content: center;
    position: absolute;
    right: 8upx;
    bottom: 5upx;
    .group_img {
      width: 20upx;
      height: 20upx;
      padding-right: 5upx;
    }
    text {
      color: #fff;
      font-size: 20upx;
    }
  }
}
</style>
