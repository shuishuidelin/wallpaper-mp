<script lang="ts">
import { defineComponent } from "vue";
import { ConstValue } from "./Const/ConstValue";
import store from "./store";
import { saveInviteCode } from "./utils/StaticFunUtils";
import User from "./utils/User";
export default defineComponent({
  onLaunch(options: any) {
    uni.getSystemInfo({
      success: (res) => {
        // @ts-ignore
        let nav_top = res.statusBarHeight + 4;
        // @ts-ignore
        const nav_bottom = res.screenHeight - res.safeArea.bottom;
        const screenScale = res.screenWidth / 750;

        if (res.platform.toLowerCase() == "android") {
          nav_top += 4;
        }
        store.commit("editSafetyTop", nav_top);
        store.commit("editSafetyBottom", nav_bottom);
        store.commit("editScreenScale", screenScale);

        User.getInstance().initUser();
        if (options.query && options.query.inviteCode) {
          saveInviteCode(options.query.inviteCode);
        }
      },
    });
  },
});
</script>
<style lang="scss">
@import "./style/iconfont.css";
@import "./style/stylesheet.css";
page {
  background-color: $uni-bg-color;
}
/*每个页面公共css */
.content {
  min-height: 100vh;
}
.them-background {
  background-color: $uni-bg-color;
  color: $uni-text-color;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.row-between {
  @extend .row;
  justify-content: space-between;
}
.row-around {
  @extend .row;
  justify-content: space-around;
}
.round {
  border-radius: 50%;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.opacity-0 {
  opacity: 0;
}
.z-index-1 {
  z-index: 1;
}
.bold {
  font-weight: bold;
}
.pop {
  animation: post-list-row 0.3s;
}
/*自定义动画*/
@keyframes post-list-row {
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}
.unbtn {
  background: $btn-un !important;
}
.highlight {
  color: $color-highlight;
}
.gray {
  filter: grayscale(100%);
}
.flex-1 {
  flex: 1;
}
.noMore {
  color: #605d75;
  font-size: 28upx;
  text-align: center;
  padding: 70upx;
}
.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
