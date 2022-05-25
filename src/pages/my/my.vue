<template>
	<view class="content">
		<view class="top row">
			<image :src="headImg" class="avatar"></image>
			<view class="name">{{userName}}</view>
		</view>
		<view class="panel">
			<!-- <view class="item row">
        <image src="@/static/img/i1.png" class="icon i1"></image>
        <view class="text flex-1">消息通知</view>
        <image src="@/static/img/icon_next.png" class="icon_next"></image>
      </view> -->
			<view class="br"></view>
			<view class="item row" @click="navMyStar">
				<image src="@/static/img/i2.png" class="icon i2"></image>
				<view class="text flex-1">我的收藏</view>
				<image src="@/static/img/icon_next.png" class="icon_next"></image>
			</view>
			<view class="br"></view>
			<view class="item row relative item-2">
				<button open-type="share" class="share-button"></button>
				<image src="@/static/img/i3.png" class="icon i3"></image>
				<view class="text flex-1">邀请好友</view>
				<image src="@/static/img/icon_next.png" class="icon_next"></image>
			</view>
			<view class="br"></view>
			<!-- <view class="br"></view> -->
			<!-- <view class="item row">
        <image src="@/static/img/i4.png" class="icon i4"></image>
        <view class="text flex-1">在线客服</view>
        <image src="@/static/img/icon_next.png" class="icon_next"></image>
      </view> -->
		</view>
	</view>
</template>
<script lang="ts">
	import store from "@/store";
	import {
		computed,
		defineComponent,
		ref,
		watch
	} from "vue";

	export default defineComponent({
		name: "my",
		setup() {
			function navMyStar() {
				uni.navigateTo({
					url: "../my-star/my-star",
				});
			}

			function launchApp() {
				uni.setClipboardData({
					data: "https://widget.slwhb.com/widget/support/tag/down.html?uuid=a455f73bd2044211bb5196123d6d77e7",
					showToast: true,
					success: () => {
						console.log("粘贴成功...")
						uni.showToast({
							title: "复制成功,请粘贴到iOS手机自带的Safari浏览器打开,按照说明安装...",
							icon: "none"
						})
					}

				})
			}


			// let userName = ref(""),
			// headImg = ref("");
			let userName = computed(() => store.state.username);
			let headImg = computed(() => store.state.headImg);

			return {
				navMyStar,
				launchApp,
				userName,
				headImg,
			};



		},


		onShareAppMessage() {
			return {
				title: "精彩壁纸免费得",
				imageUrl: "../../static/img/top_img.png",
			};
		},
	});
</script>
<style lang="scss">
	.content {
		background: #f9f9f9;
	}

	.top {
		width: 750upx;
		height: 230upx;
		background: #ffffff;
	}

	.avatar {
		width: 110upx;
		height: 110upx;
		border-radius: 50%;
		margin: 0 20upx 0 40upx;
		background: #f9f9f9;
	}

	.name {
		font-size: 36upx;
		font-weight: 500;
		color: #0d0d0d;
	}

	.panel {
		background: #fff;
		margin: 20upx 0;
		padding: 10upx 40upx;
	}

	.item {
		padding: 30upx 0;

		.i1 {
			width: 30upx;
			height: 30upx;
			margin-right: 17upx;
		}

		.i2 {
			width: 30upx;
			height: 30upx;
			margin-right: 20upx;
		}

		.i3 {
			width: 27upx;
			height: 32upx;
			margin-right: 20upx;
		}

		.i4 {
			width: 32upx;
			height: 30upx;
			margin-right: 16upx;
		}

		.icon_next {
			width: 28upx;
			height: 28upx;
		}

		.text {
			font-size: 32upx;
			font-weight: 500;
			color: #0d0d0d;
		}
	}

	.br {
		height: 2upx;
		background: #dddddd66;
	}

	.share-button {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
</style>
