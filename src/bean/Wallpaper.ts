/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-06 00:16:31
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-22 17:35:58
 */

interface Action {
  likeNum: number;
  isLike: number;
  isCollect: number;
  collectNum: number;
}

/**
 * 创作者基本信息
 */
export interface UserInfo {
  userId: string;
  number: string;
  headImg: string;
  worksNum: number;
}

/**
 * 作品信息
 */
export interface UserWork {
  userInfo: UserInfo;
  action: Action;
  worksList: UserWallpaper[]
}

/**
 * 作品分类
 */
export interface worksTitle {
  name: string,
  worksType: number
}

/**
 * 用户详情
 */
export interface UserDetail {
  userInfo: UserInfo;
  action: Action;
  worksTitleList: worksTitle[]
}

/**
 * 作品-壁纸
 */
export interface UserWallpaper {
  content: string;
  bigUrl: string;
  worksType: number;
  uuid: string;
  title: string;
  sortDesc: string;
}

/*
首页-顶部推荐作品分类
*/
export interface RecommendTitle {
  dicId: string
  img: string
  title: string
}

/*
创作中心-顶部推荐作者
*/
export interface RecommendUser {
  headImg: string
  title: string
  userId: string
}