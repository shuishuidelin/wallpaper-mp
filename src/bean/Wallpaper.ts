/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-06 00:16:31
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-22 17:35:58
 */

export interface UserInfo {
  userId: string
  headImg: string;
  collectNum: number;
  likeNum: number
  worksNum: number
  number: number
}
export interface UserWork {
  userInfo: UserInfo;
  worksList: UserWallpaper[]
}
export interface worksTitle {
  name: string,
  worksType: number
}
export interface UserDetail {
  userInfo: UserInfo;
  worksTitleList: worksTitle[]
}
export interface UserWallpaper {
  userInfo: UserInfo;
  sortDesc: string;
  title: string
  urlList: string[]
  uuid: string
  worksType: number;
  collectNum: number;
  likeNum: number;
  isCollect: number;
  isLike: number;
}
export interface RecommendTitle {
  dicId: string
  img: string
  title: string
}
export interface RecommendUser {
  headImg: string
  title: string
  userId: string
}