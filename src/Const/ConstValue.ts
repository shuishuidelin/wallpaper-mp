/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-02 10:40:32
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-22 20:39:15
 */
import { WebViewModel } from "@/bean/Model";

/** 请求路径 */
export interface UriInfo {
  uri: string;
  showLog?: boolean;
  /**关闭菊花图动画 */
  hiddenLoadingAnm?: boolean;
  /**超时时长 */
  timeout?: number;
}
export const Api = {

  /**注册 */
  xcxWxReg: { uri: "/xcx/user/reg/wx", },
  xcxDyReg: { uri: "/xcx/user/reg/dy", },
  xcxKsReg: { uri: "/xcx/user/reg/ks", },

  /**店铺信息 */
  store: { uri: "/na/home/info/store", },


  /**首页作品推荐 */
  recommend: { uri: "/author/recommend/workList", },
  /**推荐标题*/
  recommendTitle: { uri: "/author/recommend/workTitle", },
  /**创作者推荐*/
  recommendUserList: { uri: "/author/recommend/userList", },


  
  /**创作中心-用户详情 */
  userDetail: { uri: "/author/user/userDetail", },
  /**创作中心-列表*/
  userList: { uri: "/author/user/userList", },
  /**创作中心-用户各类型作品列表*/
  userWorkList: { uri: "/author/user/workList", },
  /**创作中心-壁纸详情*/
  worksDetail: { uri: "/author/user/worksDetail", },
  /**创作中心-用户申请*/
  worksApply: { uri: "/author/user/apply", },


  /**点赞 */
  actionLike: { uri: "/author/action/like", },
  /**收藏*/
  actionCollect: { uri: "/author/action/collect", },
  /**点赞 */
  likeList: { uri: "/author/action/likeList", },
  /**收藏*/
  collectList: { uri: "/author/action/collectList", },
  /**行为收集-用户下载*/
  actionDown: { uri: "/author/action/down", },


}
export class ConstValue {
  public static isDev(): boolean {
    if (process.env.NODE_ENV === 'development') {
      console.log('开发环境')
      return true;
    } else {
      console.log('生产环境')
      return false;
    }
  }
  public static isDebug: boolean = ConstValue.isDev();
  public static isTest: boolean = false;
  public static readonly localBaseUrl = "https://widget.slwhb.com";
  // public static readonly localBaseUrl = "http://47.112.150.18:8081";
  // public static readonly localBaseUrl = "https://widget.slwhb.com";
  public static readonly testBaseUrl = "http://192.168.2.3:8195";
  public static readonly serverBaseUrl = "https://widget.slwhb.com";
  public static readonly serverUploadUrl = "https://xcx.szlzyd.com/api/file/upload/feedback";

  public static readonly userInfo = "userInfo";
  public static readonly STOREUUID = "storeUuid";
  public static readonly INVITE_CODE = "INVITE_CODE";
}
export enum ListerName {
  /**支付成功刷新数据 */
  PAY_UP_CAR,
  /**支付失败 */
  PAY_FAII,
  /**车次信息修改 */
  CAR_UP,
}

export enum webLinkType {
  /** 入驻协议*/
  rzxy,
  /** 拼场协议*/
  pcxy,
}
export const webLink: { [key: number]: WebViewModel } = {
  [webLinkType.rzxy]: { link: "/html/rzxy.html", title: "零宇宙商家入驻协议" },
  [webLinkType.pcxy]: { link: "/html/pcxy.html", title: "拼场协议" }
}
