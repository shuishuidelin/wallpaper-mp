<template>
  <view class="content">
    <!--  #ifndef  MP-TOUTIAO -->
    <view class="back" :style="safetyTop" @click="back">
      <image src="@/static/img/icon_return.png" class="icon_return"></image>
    </view>
    <!--  #endif -->
    <swiper class="wallpaper">
      <swiper-item>
        <image
          mode="aspectFill"
          :src="worksDetail.works.content"
          class="wallpaper"
          v-if="worksDetail.works.content"
        ></image
      ></swiper-item>
    </swiper>
    <view class="indicator row">
      <view class="indicator-item indicator-item-current">1</view>
      <view class="indicator-item">2</view>
      <view class="indicator-item">3</view>
    </view>
    <!-- <view class="guide row">
      <image src="@/static/img/paixu.png" class="left"></image>
      <view class="text">滑动查看其他效果图</view>
      <image src="@/static/img/paixu.png" class="right"></image>
    </view> -->
    <view class="plane">
      <view class="avatar_area row" @click="navUserDetail">
        <image :src="worksDetail.userInfo.headImg" class="avatar"></image>
        <view class="amount">{{ worksDetail.userInfo.number }}</view>
      </view>
      <view class="like" @click="clickLike">
        <image src="@/static/img/g10-s.png" class="icon" v-if="ifLike"></image>
        <image src="@/static/img/g10.png" class="icon" v-else></image>
        <view class="amount">{{ worksDetail.action.likeNum }}</view>
      </view>
      <view class="like star" @click="clickStar">
        <image
          src="@/static/img/layer2-s.png"
          class="icon"
          v-if="isStar"
        ></image>
        <image src="@/static/img/layer2.png" class="icon" v-else></image>
        <view class="amount">{{ worksDetail.action.collectNum }}</view>
      </view>
      <view class="like down" @click="down()">
        <image src="@/static/img/down.png" class="icon"></image>
        <view class="amount">下载</view>
      </view>
    </view>
    <DownPop v-if="showDownPop" />
    <SaveSuccess v-if="showSaveSuccess" @closePop="showSaveSuccess = false" />
  </view>
</template>
<script lang="ts">
import { UserWallpaper } from '@/bean/Wallpaper'
import { WorksDetail } from '@/bean/WorksDetail'
import { Api } from '@/Const/ConstValue'
import FetchManager from '@/NetWork/FetchManage'
import store from '@/store'
import Utils from '@/utils/utils'
import { defineComponent, reactive, ref } from 'vue'
import DownPop from '@/components/DownPop/DownPop.vue'
import SaveSuccess from '@/components/SaveSuccess/SaveSuccess.vue'

export default defineComponent({
  name: 'wallpaper-detail',
  components: {
    DownPop,
    SaveSuccess,
  },
  setup() {
    let ifLike = ref(false),
      isStar = ref(false),
      showDownPop = ref(false),
      showSaveSuccess = ref(true)
    let _isLoaded = false

    let worksDetail = reactive({}) as WorksDetail

    async function initHandle(uuid: string, worksType: string) {
      if (!uuid || !worksType) return
      let { data } = await FetchManager.postCommon<WorksDetail>(
        Api.worksDetail,
        {
          uuid: uuid,
          worksType: worksType,
        }
      )
      if (!data || !data[0]) return
      Object.assign(worksDetail, data[0])
      ifLike.value = worksDetail.action.isLike == 1
      isStar.value = worksDetail.action.isCollect == 1
    }
    function clickLike() {
      if (!worksDetail.works) return
      FetchManager.postCommon(Api.actionLike, {
        uuid: worksDetail.works.uuid,
        worksType: worksDetail.works.worksType,
      })
      ifLike.value = !ifLike.value
      worksDetail.action.likeNum =
        worksDetail.action.likeNum + (ifLike.value ? 1 : -1)
    }
    function clickStar() {
      if (!worksDetail.works) return
      FetchManager.postCommon(Api.actionCollect, {
        uuid: worksDetail.works.uuid,
        worksType: worksDetail.works.worksType,
      })
      isStar.value = !isStar.value
      worksDetail.action.collectNum =
        worksDetail.action.collectNum + (isStar.value ? 1 : -1)
      Utils.showToast(isStar.value ? '已收藏' : '已取消收藏')
    }
    function back() {
      uni.navigateBack({
        delta: 1,
      })
    }

    function saveImg(path: string) {
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success() {
          uni.showToast({
            title: '已保存',
          })
          FetchManager.postCommon(Api.actionDown, {
            uuid: worksDetail.works.uuid,
            worksType: worksDetail.works.worksType,
          })
        },
        fail() {
          uni.showToast({
            title: '保存失败~,请检查是否打开相册保存权限',
          })
        },
      })
    }
    function navUserDetail() {
      uni.navigateTo({
        url: '../creator/creator?userId=' + worksDetail?.userInfo.userId,
      })
    }
    let rewardedVideoAd: UniApp.RewardedVideoAdContext,
      endedCallback: () => void
    function _onReady() {
      _isLoaded = false
      let adUnitId = ''
      // #ifdef MP-TOUTIAO
      adUnitId = '9nmvllaitrivx1mvn8'
      // #endif
      // #ifdef MP-WEIXIN
      adUnitId = ''
      // Utils.showToast('未配置广告')
      // #endif
      // #ifdef MP-KUAISHOU
      adUnitId = ''
      // Utils.showToast('未配置广告')
      // #endif
      rewardedVideoAd = uni.createRewardedVideoAd({
        adUnitId: adUnitId,
      })
      rewardedVideoAd.onLoad(() => {
        _isLoaded = true
        console.log('onLoad event')
        // 当激励视频被关闭时，默认预载下一条数据，加载完成时仍然触发 `onLoad` 事件
      })
      rewardedVideoAd.onError((err) => {
        console.log('onError event', err)
        endedCallback()
      })
      rewardedVideoAd.onClose((res: { count: number; isEnded: boolean }) => {
        console.log('onClose event', res)
        if (res.isEnded) {
          endedCallback()
        } else {
          Utils.showToast('观看完整视频才能获得下载机会')
        }
      })
    }
    function showRewardedVideo() {
      if (_isLoaded) {
        rewardedVideoAd.show()
        Utils.showToast('观看完整视频才能获得下载机会')
      } else {
        console.log('暂无视频...')
        // Utils.showToast("暂无视频");
        endedCallback()
      }
    }
    function down() {
      endedCallback = () => {
        if (!worksDetail.works) return
        uni.showLoading({
          title: '下载中...',
        })
        uni.getImageInfo({
          src: worksDetail.works.content,
          success(res) {
            if (res.path) saveImg(res.path)
          },
        })
      }

      // #ifdef MP-TOUTIAO
      uni.showModal({
        title: '提示',
        content: '需要观看广告才能解锁哦',
        success: function (res) {
          if (res.confirm) {
            showRewardedVideo()
          }
        },
      })
      // #endif
      // #ifndef MP-TOUTIAO
      //暂时没广告 除了头条都直接下载
      endedCallback()
      // #endif
      // showRewardedVideo();
    }
    return {
      ifLike,
      isStar,
      clickLike,
      clickStar,
      safetyTop: `top:${store.state.safetyTop}px`,
      back,
      down,
      navUserDetail,
      _onReady,
      worksDetail,
      initHandle,
      showDownPop,
      showSaveSuccess,
    }
  },
  onLoad(query) {
    if (query && query.uuid && query.worksType) {
      this.initHandle(query.uuid, query.worksType)
    }
  },
  onReady() {
    // @ts-ignore
    this._onReady()
  },
})
</script>
<style lang="scss">
.content {
  height: 100vh;
  overflow: hidden;
}
.wallpaper {
  // width: 750upx;
  // height: 1624upx;
  width: 100vw;
  height: 100vh;
}
.plane {
  position: absolute;
  right: 10upx;
  top: 44%;
}
.avatar_area {
  width: 88upx;
  height: 88upx;
  background: #fff;
  justify-content: center;
  position: relative;
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  border-radius: 50%;
  .avatar {
    width: 80upx;
    height: 80upx;
    border-radius: 50%;
  }
  .amount {
    width: 90upx;
    height: 30upx;
    background: #fa405b;
    border-radius: 15upx;
    opacity: 0.7;
    color: #fff;
    font-size: 20upx;
    line-height: 30upx;
    text-align: center;
    position: absolute;
    bottom: -15upx;
    left: 50%;
    margin-left: -45upx;
  }
}
.like {
  position: relative;
  text-align: center;
  padding-top: 50upx;
  .icon {
    width: 60upx;
    height: 60upx;
    margin-bottom: 12upx;
  }
  .amount {
    font-size: 24upx;
    font-weight: 500;
    color: #ffffff;
    position: absolute;
    width: 100%;
    left: 0upx;
    bottom: -12upx;
    display: block;
  }
}
.icon_return {
  width: 19upx;
  height: 33upx;
}
.back {
  position: absolute;
  top: 0;
  left: 30upx;
  width: 80upx;
  height: 56upx;
  text-align: center;
  padding-top: 23.5upx;
}
.indicator {
  position: fixed;
  bottom: 14%;
  left: 0%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .indicator-item {
    width: 30upx;
    height: 30upx;
    background: rgba(255, 255, 255, 0.7);
    font-size: 20upx;
    font-weight: bold;
    color: #9f9f9f;
    line-height: 30upx;
    text-align: center;
    border-radius: 50%;
    margin: 0 24upx 0 0;
  }
  .indicator-item-current {
    width: 60upx;
    height: 60upx;
    background: rgba(19, 93, 242, 0.7);
    border: 4upx solid #fff;
    font-size: 40upx;
    color: #fff;
    line-height: 52upx;
    box-sizing: border-box;
  }
}
.guide {
  justify-content: center;
  width: 750upx;
  height: 100vh;
  background: #0d0d0dc2;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .text {
    font-size: 48upx;
    font-weight: bold;
    color: #ffffff;
    padding: 0 9upx;
  }
  .left {
    width: 130upx;
    height: 90upx;
    transform: rotate(180deg);
    opacity: 0.3;
  }
  .right {
    width: 130upx;
    height: 90upx;
  }
}
.my_top_bar .custom-content .topbar {
  justify-content: space-between;
}
.my_top_bar .custom-content .select-line {
  margin-top: 12upx;
}
.my_top_bar .custom-content {
  margin-left: 189upx;
  margin-right: 189upx;
}
</style>
