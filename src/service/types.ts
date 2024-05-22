export interface IDataType<T = any> {
  data: T
  code: number
}

export interface IDataLoginRes {
  code: number
  token: string
}

export interface IDataValidRes {
  code: number
  imgFile: string
}
