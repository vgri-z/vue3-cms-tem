export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filter: {
      name: string
      formatTime: (value: string, format?: string) => string
      // 添加其他属性和方法的类型声明，如果有的话
    }
  }
}
