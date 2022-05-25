<template>
  <view class="content">
    <view class="my_bar_area">
      <MyTopBar class="my_top_bar" v-if="topBar.length > 0" :arr="topBar" :defalut="currentPage" :defalutWidth="32" :defalutLeft="46" @tab-click="tabClick" @change="change" />
    </view>
    <view class="gallery">
      <image :src="works.urlList[0]" class="item_img" :lazy-load="true" mode="aspectFill" v-for="(works) in imgArr" :key="works.uuid" @click="navDetail(works)"></image>
      <LoadPage :pagination="pagination" />
    </view>
  </view>
</template>
 <script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import MyTopBar from "@/components/MyTopBar/MyTopBar.vue";
import { Pagination } from "@/utils/Pages";
import FetchManager from "@/NetWork/FetchManage";
import { Api } from "@/Const/ConstValue";
import { UserDetail, UserWallpaper } from "@/bean/Wallpaper";
import LoadPage from "@/components/LoadPage/LoadPage.vue";
import User from "@/utils/User";
import { navDetail } from "@/utils/StaticFunUtils";
export default defineComponent({
  name: "my-star",
  components: {
    MyTopBar,
    LoadPage,
  },
  setup() {
    let currentPage = ref(0);
    let topBar = reactive<string[]>([]);

    function change(i: number) {
      currentPage.value = i;
    }
    function tabClick(i: number) {}
    let userWork = reactive({}) as UserDetail;
    function getUserInfo(userId: string) {
      FetchManager.postCommon<UserDetail>(Api.userDetail, {
        userId,
      }).then((res) => {
        Object.assign(userWork, res.data[0]);
        let titleArr = userWork.worksTitleList.map((item) => item.name);
        console.log(titleArr);
        topBar.length = 0;
        topBar.push(...titleArr);
        pagination.reStart();
      });
    }
    getUserInfo(User.getInstance().getCustomKey() || "4454143832");
    let imgArr = reactive<UserWallpaper[]>([]);
    let pagination = reactive(
      new Pagination<UserWallpaper>({
        postCommon(o) {
          if (o) {
            o.worksType = userWork.worksTitleList[currentPage.value].worksType;
          }
          return FetchManager.postCommon(Api.collectList, o);
        },
        callback(res, type) {
          if (type == "reStart") imgArr.length = 0;
          imgArr.push(...res.data);
        },
      })
    );
    return {
      currentPage,
      topBar,
      change,
      tabClick,
      pagination,
      imgArr,
      navDetail,
    };
  },
  onReachBottom() {
    this.pagination.nextPage();
  },
});
</script>
 <style lang="scss">
.custom-content .select-line {
  height: 6upx;
  border-radius: 20upx;
  margin-top: 8upx;
}
.declare {
  float: right;
  padding: 30upx 0;
  font-size: 24upx;
  font-weight: 500;
  color: #0d0d0d;
  padding-right: 40upx;
  .icon_desc {
    width: 20upx;
    height: 24upx;
    margin-right: 8upx;
  }
}
.my_top_bar {
  float: left;
}
.my_bar_area {
  overflow: hidden;
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
    position: relative;
  }
}
</style>
