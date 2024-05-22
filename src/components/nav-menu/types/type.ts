export interface IMenuItem {
  displayName: string
  hasUrl: boolean
  icon: string
  id: string
  isLeaf: boolean
  name: string
  order: number
  parentId: string
  permission: string
  url: string
  children: IMenuItem[]
}
