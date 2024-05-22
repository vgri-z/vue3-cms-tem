import { IMenuItem } from '@/components/nav-menu/types/type'
import { IUserInfo } from '@/service/login/type'
import { ILoginAccount } from '@/views/login/types/type'

export interface ILoginState {
  loginAccount: ILoginAccount
  token: string
  userInfo: IUserInfo
  userMenus: IMenuItem[]
  codeImg: string
  codeText: string
}
