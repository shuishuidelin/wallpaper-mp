/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mingshuai.yuan
 * @Date: 2022-05-02 10:40:32
 * @LastEditors: mingshuai.yuan
 * @LastEditTime: 2022-05-22 20:57:09
 */
import { UserWallpaper } from "@/bean/Wallpaper";
import { ConstValue } from "@/Const/ConstValue";

export function navDetail(item: UserWallpaper) {
  console.log(item);
  uni.navigateTo({
    url: `../wallpaper-detail/wallpaper-detail?uuid=${item.uuid}&worksType=${item.worksType}`,
  });
}
export function getInviteCode(): string {
  return uni.getStorageSync(ConstValue.INVITE_CODE)
}
export function saveInviteCode(inviteCode: string) {
  uni.setStorageSync(ConstValue.INVITE_CODE, inviteCode)
}