<template>
  <view class="custom-content">
    <view class="topbar row">
      <view
        :class="[selectID == i ? 'select-item item' : 'item']"
        v-for="(item, i) in arr"
        :key="item"
        @click="clickTab(i)"
        :id="'item' + i"
        >{{ item }}</view
      >
    </view>
    <view class="select-line" :style="slidingDistance"></view>
  </view>
</template>

<script lang="ts">
import Utils from '@/utils/utils'
import { defineComponent, nextTick, ref, watch } from 'vue'
export default defineComponent({
  name: 'Topbar',
  props: {
    arr: Array,
    defalut: Number,
    defalutWidth: Number,
    defalutLeft: Number,
    fixWidth: Number,
  },
  setup(prop, context) {
    let that: any
    let selectID = ref(prop.defalut)
    let slidingDistance = ref(
      `margin-left: ${prop.defalutLeft || 16}rpx;width:${
        prop.fixWidth
          ? prop.fixWidth
          : prop.defalutWidth
          ? prop.defalutWidth / 2
          : 32
      }rpx;`
    )

    watch(
      () => prop.defalut,
      (n) => {
        if (n != undefined) {
          switchItem(n)
        }
      }
    )
    function clickTab(i: number) {
      context.emit('change', i)
    }
    function switchItem(i: number, ifEmit: boolean = true) {
      selectID.value = i
      switchBar(i, ifEmit)
    }
    let barLeftDistance = 0
    function getTopBarLeftDistance() {
      const query: WechatMiniprogram.SelectorQuery = that.createSelectorQuery()
      if (query) {
        query
          .select('.custom-content')
          .boundingClientRect((rect) => {
            barLeftDistance = rect.left
          })
          .exec()
      }
    }
    function switchBar(i: number, ifEmit: boolean = true) {
      if (!that) return
      if (ifEmit) context.emit('tab-click', i)
      const query: WechatMiniprogram.SelectorQuery = that.createSelectorQuery()
      if (query)
        query
          .select('#item' + i)
          .boundingClientRect((rect) => {
            const left = rect.left - barLeftDistance,
              barWidth = prop.fixWidth
                ? Utils.UpxToPx(prop.fixWidth)
                : rect.width / 2,
              itemWidth = rect.width
            slidingDistance.value = `margin-left: ${
              (itemWidth - barWidth) / 2 + left
            }px;width:${barWidth}px;transition: all 0.5s ease;`
          })
          .exec()
    }
    function onMounted(target: any) {
      that = target
      nextTick(() => {
        getTopBarLeftDistance()
        if (selectID.value != undefined) {
          switchBar(selectID.value)
        }
      })
    }
    return {
      switchItem,
      selectID,
      slidingDistance,
      switchBar,
      onMounted,
      clickTab,
    }
  },
  mounted() {
    this.onMounted(this)
  },
})
</script>

<style lang="scss">
.custom-content {
  padding: 30upx 0;
}
.select-line {
  background: #135df2;
  width: 32upx;
  height: 4upx;
  transition: none;
  margin-left: 22upx;
  border-radius: 8upx;
}
.select-item {
  color: #135df2;
  font-weight: bold;
}
.topbar {
  font-size: 32upx;
  color: $uni-bg-color-grey-second;
  .item {
    margin-left: 30upx;
  }
}
</style>
