<template>
  <view class="content">
    <image
      src="@/static/img/top_img.png"
      class="top_img"
      @click="navApplyLogin"
    ></image>
    <view class="recommend">
      <view class="title">优质创作者推荐</view>
      <scroll-view scroll-x class="scrollView">
        <view class="row" :style="'width:' + userList.length * 138 + 'rpx'">
          <view
            class="area"
            v-for="(item, i) in userList"
            :key="i"
            @click="navCreator(item)"
          >
            <image :src="item.headImg" class="logo"></image>
            <view class="name">{{ item.title }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="search">
      <view class="un row" v-if="!showSearch" @click="inputFocus">
        <image src="@/static/img/icon_search.png" class="icon"></image>
        <text>搜索原创作者ID</text>
      </view>
      <view class="put row" v-else>
        <image
          src="@/static/img/icon_search.png"
          :class="showAnm ? 'icon icon_anm' : ' icon'"
        ></image>
        <input
          type="text"
          confirm-type="search"
          placeholder="搜索原创作者ID"
          :placeholder-style="`color: #8c9eff;font-size: ${inputSize}px;`"
          :class="showAnm ? 'flex-1' : ''"
          v-model="searchValue"
          @blur="inputBlur"
          :focus="showSearch && showAnm"
          @confirm="confirmInput"
        />
        <image
          src="@/static/img/icon_clear.png"
          class="icon icon_clear"
          v-if="searchValue"
          @click="searchValue = ''"
        ></image>
      </view>
    </view>
    <view class="creation-block" v-for="(item, i) in imgList" :key="i">
      <view class="info row">
        <image
          :src="item.userInfo.headImg"
          class="avatar"
          @click="navCreator(item)"
        ></image>
        <view>
          <view class="row">
            <view class="name" @click="navCreator(item)">{{
              item.userInfo.number
            }}</view>
            <view class="copy row" @click="copyUserId(item.userInfo.userId)">
              <image src="@/static/img/icon_copy.png" class="icon_copy"></image>
              复制ID
            </view>
          </view>
          <view class="row amount">
            <view> <text>作品</text>{{ item.userInfo.worksNum }} </view>
            <view> <text>获赞</text>{{ item.action.likeNum }} </view>
            <view> <text>收藏</text>{{ item.action.collectNum }} </view>
          </view>
        </view>
      </view>
      <view class="gallery">
        <image
          :src="works.content"
          class="item_img"
          :lazy-load="true"
          mode="aspectFill"
          v-for="works in item.worksList"
          :key="works.uuid"
          @click="navPrivateDetail(item, works)"
        ></image>
      </view>
    </view>
    <LoadPage :pagination="pagination" />
  </view>
</template>
<script lang="ts">
import { RecommendUser, UserWallpaper, UserWork } from '@/bean/Wallpaper'
import { Api } from '@/Const/ConstValue'
import FetchManager from '@/NetWork/FetchManage'
import store from '@/store'
import { Pagination } from '@/utils/Pages'
import { navDetail } from '@/utils/StaticFunUtils'
import { defineComponent, reactive, ref } from 'vue'
import LoadPage from '@/components/LoadPage/LoadPage.vue'

export default defineComponent({
  name: '',
  components: {
    LoadPage,
  },
  setup() {
    function navCreator(item: UserWork | RecommendUser) {
      let userid =
        ((<UserWork>item).userInfo && (<UserWork>item).userInfo.userId) ||
        (<RecommendUser>item).userId
      uni.navigateTo({
        url: '../creator/creator?userId=' + userid,
      })
    }
    function navApplyLogin() {
      uni.navigateTo({
        url: '../apply-login/apply-login',
      })
    }
    let imgList = reactive<UserWork[]>([])
    let pagination = reactive(
      new Pagination<UserWork>({
        postCommon(o) {
          return FetchManager.postCommon(Api.userList, o)
        },
        callback(res, type) {
          if (type === 'reStart') imgList.length = 0
          imgList.push(...res.data)
        },
      })
    )
    pagination.reStart()
    function copyUserId(id: string) {
      uni.setClipboardData({
        data: id,
        success: function () {
          uni.showToast({
            title: '已复制ID',
          })
        },
      })
    }
    function navPrivateDetail(item: UserWork, works: UserWallpaper) {
      // works.userInfo = item.userInfo;
      navDetail(works)
    }
    let showSearch = ref(false),
      showAnm = ref(false),
      searchValue = ref('')
    function inputFocus() {
      showSearch.value = true
      setTimeout(() => {
        showAnm.value = true
      }, 0)
    }
    function inputBlur() {
      console.log('触发视角时间')

      // setTimeout(() => {
      //   showSearch.value = false
      // }, 300)
      // showAnm.value = false
      // searchValue.value = ''
    }
    function confirmInput() {
      console.log(searchValue.value)
      if (searchValue.value) {
        uni.navigateTo({
          url:
            '../creator/creator?userId=' +
            searchValue.value +
            '&inviteCode=' +
            searchValue.value,
        })
      }
    }
    let userList = reactive<RecommendUser[]>([])
    FetchManager.postCommon<RecommendUser>(Api.recommendUserList).then(
      (res) => {
        userList.push(...res.data)
      }
    )
    return {
      confirmInput,
      inputBlur,
      inputFocus,
      showSearch,
      showAnm,
      searchValue,
      navPrivateDetail,
      navApplyLogin,
      navCreator,
      imgList,
      copyUserId,
      pagination,
      userList,
      inputSize: 12,
    }
  },
  onReachBottom() {
    this.pagination.nextPage()
  },
})
</script>
<style lang="scss">
.content {
  padding-bottom: 300upx;
}
.top_img {
  width: 750upx;
  height: 300upx;
}
.creation-block {
  margin: 20upx 40upx 40upx 40upx;
}
.info {
  .avatar {
    width: 75upx;
    height: 75upx;
    margin-right: 16upx;
    border-radius: 50%;
  }
  .name {
    font-size: 28upx;
    color: #0d0d0d;
    margin-right: 12upx;
  }
  .copy {
    color: #707070;
    font-size: 16upx;
  }
  .icon_copy {
    width: 16upx;
    height: 20upx;
    margin-right: 4upx;
  }
  text {
    font-size: 20upx;
    color: #135df2;
  }
  .amount {
    font-size: 20upx;
    color: #707070;
    margin-top: 12upx;
    view {
      padding-right: 30upx;
    }
    text {
      display: inline-block;
      padding-right: 12upx;
    }
  }
}
.gallery {
  margin-left: -20upx;
  .item_img {
    width: 210upx;
    height: 450upx;
    border-radius: 8upx;
    margin: 20upx 0 0 20upx;
    background: #eeeeee;
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
    height: 114upx;
    overflow: auto;
    white-space: nowrap;
    text-align: left;
  }
  .area {
    display: inline-block;
    width: 130upx;
    height: 114upx;
    background: #f9f9f9;
    border-radius: 10upx;
    opacity: 1;
    text-align: center;
    margin-right: 8upx;
    .name {
      color: #9f9f9f;
      font-size: 18upx;
    }
    .logo {
      width: 60upx;
      height: 60upx;
      border-radius: 50%;
      margin-top: 12upx;
    }
  }
}
.search {
  width: 670upx;
  height: 60upx;
  background: #ffffff;
  border-radius: 30upx;
  opacity: 1;
  border: 2upx solid #8c9eff;
  margin: 30upx auto;
  line-height: 60upx;
  font-size: 24upx;
  font-weight: 300;
  color: #5f7cf9;

  .icon {
    width: 30upx;
    height: 30upx;
    margin-right: 12upx;
  }
  .icon_clear {
    opacity: 0.7;
  }
  .un {
    justify-content: center;
  }
  .put {
    justify-content: center;
    .icon {
      margin-left: 12upx;
    }
  }
  input {
    height: 60upx;
    width: 166upx;
    transition: all 0.3s;
  }
}
</style>
