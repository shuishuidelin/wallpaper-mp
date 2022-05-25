<template>
  <view class="">
    <view class="noMore" v-if="pagination.state == 0">拼命加载中...</view>
    <view class="noMore" v-else-if="pagination.state == 2">没有更多数据了</view>
  </view>
</template>
 <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    pagination: Object,
  },
  name: "LoadPage",
  setup() {},
});
</script>
 <style lang="scss">
</style>
