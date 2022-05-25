/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-22 19:50:18
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-22 19:59:56
 */
interface Action {
  likeNum: number;
  isLike: number;
  isCollect: number;
  collectNum: number;
}

export interface WorksDetail {
  works: Works;
  action: Action;
  userInfo: UserInfo;
}

interface UserInfo {
  userId: string;
  number: string;
  headImg: string;
  worksNum: number;
  likeNum: number;
  collectNum: number;
}

interface Works {
  urlList: string[];
  worksType: number;
  uuid: string;
  title: string;
  sortDesc: string;
  likeNum: number;
  collectNum: number;
  isLike: number;
  isCollect: number;
  userInfo: string;
}

