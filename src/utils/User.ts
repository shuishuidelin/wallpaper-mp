import { UserReg } from "@/bean/UserModel";
import { Api, ConstValue } from "@/Const/ConstValue";
import FetchManager from "@/NetWork/FetchManage";
import store from "@/store";

export default class User {
    private static instance: User;
    private customKey: string = "";
    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User()
        }
        return User.instance;
    }
    public initUser() {
        const that = this;
        let userInfo = this.getUserInfo();
        if (!userInfo || !userInfo.userId) return this.userReg();
        uni.checkSession({
            success() {
                that.setCustomKey(userInfo.userId)
                // that.getSeveryUserInfo();
            },
            fail() {
                that.userReg();
            }
        })
    }
    // @ts-ignore
    //#ifdef MP-TOUTIAO
    public userReg() {
        const that = this;
        console.log("调toutiaologin");
        uni.login({
            success(res) {
                const code = res.code;
                FetchManager.postCommon<UserReg>(Api.xcxDyReg, {
                    code
                }).then(res => {
                    if (res.data[0] && res.data[0].userId) {
                        that.setCustomKey(res.data[0].userId);
                        // that.getSeveryUserInfo();
                        that.setUserInfo(res.data[0])
                    }
                })
            }
        })
    }
    //#endif
    // @ts-ignore
    //#ifdef MP-WEIXIN
    public userReg() {
        const that = this;
        console.log("调用wxlogin");
        uni.login({
            success(res) {
                const code = res.code;
                FetchManager.postCommon<UserReg>(Api.xcxWxReg, {
                    code
                }).then(res => {
                    if (res.data[0] && res.data[0].userId) {
                        that.setCustomKey(res.data[0].userId);
                        // that.getSeveryUserInfo();
                        that.setUserInfo(res.data[0])
                    }
                })
            }
        })
    }
    //#endif
	// @ts-ignore
	//#ifdef MP-KUAISHOU
	public userReg() {
	    const that = this;
	    uni.login({
	        success(res) {
	            const code = res.code;
	            FetchManager.postCommon<UserReg>(Api.xcxKsReg, {
                jsCode:code
	            }).then(res => {
	                if (res.data[0] && res.data[0].userId) {
	                    that.setCustomKey(res.data[0].userId);
	                    // that.getSeveryUserInfo();
	                    that.setUserInfo(res.data[0])
	                }
	            })
	        }
	    })
	}
	//#endif

    /**用户授权 */
    // public userAuth(): Promise<void> {
    //     return wx.getUserProfile({ desc: "为了我们能更好为您提供服务" }).then(info => {
    //         console.log(info);
    //         const userInfo = {
    //             nickName: info.userInfo.nickName,
    //             avatarUrl: info.userInfo.avatarUrl,
    //             gender: info.userInfo.gender
    //         }
    //         return FetchManager.postCommon<AuthData>(Api.xcxAuthReg, {
    //             authInfo: {
    //                 iv: info.iv,
    //                 encryptedData: info.encryptedData,
    //                 sessionKey: "",
    //                 userInfo
    //             }
    //         })
    //     }).then(res => {
    //         this.setCustomKey(res.data[0].customKey);
    //         this.setUserInfo(res.data[0]);
    //         return Promise.resolve()
    //     }).catch(err => {
    //         return Promise.resolve()
    //     })
    // }
    public getSeveryUserInfo() {
        // FetchManager.postCommon(Api.userinfos, {
        //     storeUuid: store.state.storeUuid
        // }).then(res => {
        //     this.setUserInfo(res.data[0])
        // }).catch(() => {
        //     uni.removeStorageSync(ConstValue.userInfo)
        // })
    }
    public getCustomKey() {
        let customKey = this.customKey;
        if (!customKey) {
            let userInfo = this.getUserInfo();
            if (userInfo && userInfo.userId) this.customKey = customKey = userInfo.userId;
        }
        return customKey;
    };
    public setCustomKey(customKey: string): void {
        if (!customKey) return;
        this.customKey = customKey;
        let userInfo = this.getUserInfo();
        userInfo.userId = customKey;
        this.setUserInfo(userInfo);
    }
    public setUserInfo(userInfo: UserReg): void {
        console.log(userInfo);
        store.commit("editUsername", userInfo.userName || "去登录");
        store.commit("editHeadImg", userInfo.headImg || "");
        uni.setStorageSync(ConstValue.userInfo, userInfo)
    }
	
	
	
    public getUserInfo(): UserReg { return uni.getStorageSync(ConstValue.userInfo) || {} }
    /**
     * ifAuth
     */
    public ifAuth(): boolean {
        let userInfo = this.getUserInfo();
        if (userInfo.userName && userInfo.headImg) {
            return false
        }
        return true
    }
}