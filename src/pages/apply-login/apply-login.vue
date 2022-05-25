<template>
  <view class="content">
    <view class="title">我们鼓励原创，鼓励创作者为用户奉献最优秀的作品和体验！</view>
    <view class="title t2">如果您能够：</view>
    <!--  #ifdef MP-TOUTIAO -->
    <view class="ui">* 遵守抖音的内容运营规范</view>
    <!--  #endif -->
    <!--  #ifdef MP-WEIXIN -->
    <view class="ui">* 遵守微信的内容运营规范</view>
    <!--  #endif -->
    <view class="ui">* 遵守我们的内容审核规范</view>
    <view class="main_title">
      欢迎注册登记
    </view>
    <view class="row my_row">
      <view class="name">手机号码</view>
      <view class="input">
        <input type="number" v-model="phone" placeholder="输入手机号码" placeholder-style="color: #707070;">
      </view>
    </view>
    <view class="row my_row">
      <view class="name">搜索口令</view>
      <view class="input">
        <input type="number" v-model="code" placeholder="输入搜索口令" placeholder-style="color: #707070;">
      </view>
    </view>
    <!--  #ifdef MP-TOUTIAO -->
    <view class="row my_row">
      <view class="name">抖音号</view>
      <view class="input">
        <input type="number" placeholder="输入您的抖音号" placeholder-style="color: #707070;">
      </view>
    </view>
    <!--  #endif -->
    <!--  #ifdef MP-WEIXIN -->
    <view class="row my_row">
      <view class="name">微信号</view>
      <view class="input">
        <input type="number" v-model="wxCode" placeholder="输入您的微信号" placeholder-style="color: #707070;">
      </view>
    </view>
    <!--  #endif -->
    <view class="submit" @click="sub">提交申请</view>
  </view>
</template>
 <script lang="ts">
import { Api } from "@/Const/ConstValue";
import FetchManager from "@/NetWork/FetchManage";
import Utils from "@/utils/utils";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "apply-login",
  setup() {
    let phone = ref(""),
      code = ref(""),
      wxCode = ref("");
    function sub() {
      if (!Utils.phoneFun(phone.value)) {
        return Utils.showToast("请输入正确的手机号");
      }
      FetchManager.postCommon<string>(Api.worksApply, {
        phone: phone.value,
        number: code.value,
        account: wxCode.value,
      }).then((res) => {
        uni.showModal({
          title: "系统提示",
          content: res.data[0],
          showCancel: false,
          success(ref) {
            if (ref.confirm) {
              uni.navigateBack({
                delta: 1,
              });
            }
          },
        });
      });
    }
    return {
      sub,
      phone,
      code,
      wxCode,
    };
  },
});
</script>
 <style lang="scss">
.content {
  padding: 30upx;
  .title {
    font-size: 28upx;
    color: #0d0d0d;
  }
  .t2 {
    margin: 60upx 0 30upx 0;
  }
  .ui {
    color: #9f9f9f;
    font-size: 28upx;
  }
  .main_title {
    font-size: 32upx;
    font-weight: 500;
    color: #0d0d0d;
    margin: 60upx 0 30upx 0;
  }
  .name {
    font-size: 32upx;
    font-weight: 500;
    color: #0d0d0d;
    width: 130upx;
  }
  .input {
    width: 502upx;
    height: 86upx;
    background: #eeeeee;
    border-radius: 20upx;
    font-size: 28upx;
    color: #707070;
    font-weight: 400;
    margin-left: 20upx;
    padding-left: 20upx;
  }
  input {
    width: 100%;
    height: 100%;
  }
  .my_row {
    margin-bottom: 30upx;
  }
  .submit {
    width: 480upx;
    height: 80upx;
    background: #135df2;
    border-radius: 40upx;
    line-height: 80upx;
    color: #fff;
    text-align: center;
    font-size: 32upx;
    margin: 84upx auto 0 auto;
  }
}
</style>
