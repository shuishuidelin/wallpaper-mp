<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view v-for="(item,index) in list" :key="index" class="tab-bar-item" :data-path="item.pagePath" :data-index="index" @click="switchTab">
      <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath" :class="index == 2 ?'post-image':'cover-image'"></cover-image>
      <cover-view :style="selected === index ?'color:' + selectedColor :'color:' + color" class="cover-text">{{item.text}}</cover-view>
    </cover-view>
  </cover-view>

</template>
 <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomTabBar",
  props: {
    selected: Number,
  },
  setup() {
    const data = {
      //   selected: ref(store.state.selected),
      color: "#CCCCCC",
      selectedColor: "#FF881E",
      list: [
        {
          pagePath: "/pages/index/index",
          iconPath: "/static/tabbar/home.png",
          selectedIconPath: "/static/tabbar/home-s.png",
          text: "首页",
        },
        {
          pagePath: "/pages/warehouse/warehouse",
          iconPath: "/static/tabbar/house.png",
          selectedIconPath: "/static/tabbar/house-s.png",
          text: "剧本",
        },
        {
          pagePath: "/pages/createcar/createcar",
          iconPath: "/static/tabbar/post.png",
          selectedIconPath: "/static/tabbar/post.png",
          text: "",
        },
        {
          pagePath: "/pages/message/message",
          iconPath: "/static/tabbar/message.png",
          selectedIconPath: "/static/tabbar/message-s.png",
          text: "消息",
        },
        {
          pagePath: "/pages/my/my",
          iconPath: "/static/tabbar/my.png",
          selectedIconPath: "/static/tabbar/my-s.png",
          text: "我的",
        },
      ],
    };
    function switchTab(e: any) {
      const dataset = e.currentTarget.dataset;
      const url = dataset.path;
      if (dataset.index == 2) {
        wx.navigateTo({ url });
      } else {
        wx.switchTab({ url });
      }
    }
    return { ...data, switchTab };
  },
});
</script>
 <style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 999;
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item .cover-image {
  width: 27px;
  height: 27px;
}

.tab-bar-item .cover-text {
  font-size: 10px;
}
.tab-bar-item .post-image {
  width: 49px;
  height: 49px;
}
</style>
