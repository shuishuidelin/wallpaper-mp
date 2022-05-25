<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-02 10:40:32
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-22 17:30:14
-->
<template>
  <view class="content">
    <view class="recommend">
      <scroll-view scroll-x
                   class="scrollView">
        <view class="row"
              :style="'width:'+tabList.length*128+'rpx'">
          <view class="area"
                v-for="(item,i) in tabList"
                :key="i"
                @click="tabDetail(item)">
            <image :src="item.img"
                   class="logo"></image>
            <view class="name">{{item.title}}</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="main_title">
      {{selectTab && selectTab.title || ''}}
    </view>
    <view class="gallery">
      <block v-for="(item,i) in imgList"
             :key="i">
        <image :src="item.urlList[0]"
               class="item_img"
               :lazy-load="true"
               mode="aspectFill"
               @click="navDetail(item)"></image>
      </block>
      <LoadPage :pagination="pagination" />
    </view>
  </view>
</template>
 <script lang="ts">
import { Api } from "@/Const/ConstValue";
import FetchManager from "@/NetWork/FetchManage";
import { computed, defineComponent, reactive, ref } from "vue";
import { Pagination } from "@/utils/Pages";
import { navDetail } from "@/utils/StaticFunUtils";
import { RecommendTitle, UserWallpaper } from "@/bean/Wallpaper";
import LoadPage from "@/components/LoadPage/LoadPage.vue";
import store from "@/store";

export default defineComponent({
  name: "index",
  components: {
    LoadPage,
  },
  setup() {
    let imgList = reactive<UserWallpaper[]>([]);
    let selectTab: RecommendTitle | undefined = reactive({}) as RecommendTitle;
    let pagination = reactive(
      new Pagination<UserWallpaper>({
        postCommon(o) {
          if (o && selectTab?.dicId) {
            o.dicId = selectTab.dicId;
          }
          return FetchManager.postCommon(Api.recommend, o);
        },
        callback(res, type) {
          if (type === "reStart") imgList.length = 0;
          imgList.push(...res.data);
        },
      })
    );
    pagination.reStart();
    let tabList = reactive<RecommendTitle[]>([]);
    FetchManager.postCommon<RecommendTitle>(Api.recommendTitle).then((res) => {
      tabList.push(...res.data);
    });
    function tabDetail(item: RecommendTitle) {
      if (item && item.dicId) Object.assign(selectTab, item);
      pagination.reStart();
    }
    return {
      navDetail,
      inputSize: uni.upx2px(24),
      imgList,
      pagination,
      tabList,
      tabDetail,
      selectTab,
    };
  },
  onReachBottom() {
    this.pagination.nextPage();
  },
});
</script>
 <style lang="scss">
.placeholder_style {
  color: #8c9eff;
  font-size: 24upx;
}
.main_title {
  font-size: 32upx;
  font-weight: 500;
  color: #0d0d0d;
  margin: 30upx 40upx;
}
.gallery {
  padding: 0 30upx;
  .item_img {
    width: 210upx;
    height: 450upx;
    border-radius: 8upx;
    margin: 10upx;
    background: #eeeeee;
    vertical-align: top;
  }
}
.recommend {
  font-size: 32upx;
  color: #0d0d0d;
  vertical-align: bottom;
  font-weight: 500;
  padding: 40upx 0 0upx 40upx;
  .title {
    padding-bottom: 20upx;
  }
  .scrollView {
    height: 120upx;
    overflow: auto;
    white-space: nowrap;
    text-align: left;
  }
  .area {
    display: inline-block;
    width: 120upx;
    height: 120upx;
    opacity: 1;
    text-align: center;
    margin-right: 8upx;
    border-radius: 20upx;
    position: relative;
    overflow: hidden;
    .name {
      color: #fff;
      font-size: 24upx;
      line-height: 120upx;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .logo {
      width: 100%;
      height: 100%;
    }
  }
  .area::after {
    content: " ";
    width: 100%;
    height: 100%;
    background: #000000bb;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>