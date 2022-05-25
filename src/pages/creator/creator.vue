<template>
  <view class="content">
    <view class="info row">
      <image :src="userWork.userInfo.headImg"
             class="avatar"></image>
      <view class="flex-1 name">{{userWork.userInfo.number}}</view>
      <view class="i_block">
        <view class="amount">{{userWork.userInfo.worksNum}}</view>
        <view class="desc">作品</view>
      </view>
      <view class="line"></view>
      <view class="i_block">
        <view class="amount">{{userWork.userInfo.likeNum}}</view>
        <view class="desc">获赞</view>
      </view>
      <view class="line"></view>
      <view class="i_block">
        <view class="amount">{{userWork.userInfo.collectNum}}</view>
        <view class="desc">收藏</view>
      </view>
    </view>
    <view class="my_bar_area">
      <MyTopBar class="my_top_bar"
                :arr="topBar"
                :defalut="currentPage"
                :defalutWidth="32"
                :defalutLeft="46"
                @tab-click="tabClick"
                @change="change"
                v-if="topBar.length>0" />
      <view class="declare row"
            @click="statement">
        <image src="@/static/img/icon_desc.png"
               class="icon_desc"></image>
        声明
      </view>
    </view>
    <view class="gallery">
      <image :src="works.urlList[0]"
             class="item_img"
             :lazy-load="true"
             mode="aspectFill"
             v-for="(works) in imgArr"
             :key="works.uuid"
             @click="navDetail(works)"></image>
      <LoadPage :pagination="pagination" />
    </view>
  </view>
</template>
 <script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import MyTopBar from "@/components/MyTopBar/MyTopBar.vue";
import LoadPage from "@/components/LoadPage/LoadPage.vue";
import FetchManager from "@/NetWork/FetchManage";
import { Api } from "@/Const/ConstValue";
import { UserDetail, UserWallpaper } from "@/bean/Wallpaper";
import { Pagination } from "@/utils/Pages";
import { navDetail, saveInviteCode } from "@/utils/StaticFunUtils";
export default defineComponent({
  name: "creator",
  components: {
    MyTopBar,
    LoadPage,
  },
  onLoad(query) {
    if (query && query.userId) {
      this.getUserInfo(query.userId);
    }
    if (query && query.inviteCode) {
      this.inviteCode = query.inviteCode;
    }
  },
  setup() {
    let currentPage = ref(0);
    let topBar = reactive<string[]>([]),
      inviteCode = ref("");
    function change(i: number) {
      currentPage.value = i;
    }
    function tabClick(i: number) {
      console.log("我被触发了", i);
    }
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
        saveInviteCode(inviteCode.value);
      });
    }
    let imgArr = reactive<UserWallpaper[]>([]);
    let pagination = reactive(
      new Pagination<UserWallpaper>({
        postCommon(o) {
          if (o) {
            o["worksType"] =
              userWork.worksTitleList[currentPage.value].worksType;
            o["userId"] = userWork.userInfo.userId;
          }
          return FetchManager.postCommon(Api.userWorkList, o);
        },
        callback(res, type) {
          if (type == "reStart") imgArr.length = 0;
          imgArr.push(...res.data);
        },
      })
    );
    function statement() {
      uni.showModal({
        title: "声明",
        content:
          "创作者上传至唯美取图小程序的作品均已申明为作者本人原创或已获得版权方授权，如您发现任何侵权行为，请及时发送邮件到：xyj_173@163.com,我们将及时核实并处理侵权作品。",
        showCancel: false,
        confirmColor: "#135df2",
      });
    }
    return {
      currentPage,
      change,
      tabClick,
      getUserInfo,
      userWork,
      topBar,
      pagination,
      imgArr,
      statement,
      navDetail,
      inviteCode,
    };
  },
  onReachBottom() {
    this.pagination.nextPage();
  },
});
</script>
 <style lang="scss">
.info {
  width: 730upx;
  height: 230upx;
  background: #7e8dad;
  color: #fff;
  padding-left: 20upx;
  .avatar {
    width: 110upx;
    height: 110upx;
    border-radius: 50%;
    margin-left: 20upx;
    margin-right: 20upx;
  }
  .name {
    font-size: 36upx;
  }
  .amount {
    font-size: 28upx;
  }
  .desc {
    font-size: 24upx;
  }
  .line {
    width: 2upx;
    height: 42upx;
    background: #fff;
  }
  .i_block {
    width: 120upx;
    text-align: center;
  }
}
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
  .top_tag::before {
    content: "置顶";
    position: absolute;
    width: 70upx;
    height: 32upx;
    background: #135df2;
    border-radius: 8upx 0px 8upx 0px;
    opacity: 1;
    line-height: 34upx;
    color: #fff;
    text-align: center;
    font-size: 20upx;
    font-weight: 500;
    top: 10upx;
  }
}
</style>
