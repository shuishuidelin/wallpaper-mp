/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-02 10:40:32
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-22 20:35:56
 */
import { UserWallpaper } from '@/bean/Wallpaper';
import { createStore, Store } from 'vuex'
interface InitStoreBean {
  age: number;
  username: string;
  headImg: string;
  address: string;
  /**安全距离 */
  safetyTop: number;
  safetyBottom: number;
  /**屏幕rpx于px的宽比例 */
  screenScale: number;
}
const store: Store<InitStoreBean> = createStore({
  state: {// 存放状态
    "username": "未登录",
    "headImg": "",
    "age": 18,
    "address": "哈尔滨",
    "safetyTop": 0,
    "safetyBottom": 0,
    "screenScale": 1
  },
  mutations: {
    editUsername(state: InitStoreBean, newName: string) {
      state.username = newName;
    },
    editHeadImg(state: InitStoreBean, headImg: string) {
      state.headImg = headImg;
    },
    editAddress(state: InitStoreBean, newAddress: string) {
      state.address = newAddress;
    },
    editSafetyTop(state: InitStoreBean, safetyTop: number) {
      state.safetyTop = safetyTop;
    },
    editSafetyBottom(state: InitStoreBean, safetyBottom: number) {
      state.safetyBottom = safetyBottom;
    },
    editScreenScale(state: InitStoreBean, screenScale: number) {
      state.screenScale = screenScale;
    }
  },
  strict: true
})

export default store