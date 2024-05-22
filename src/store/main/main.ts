import { defineStore } from 'pinia'
import { IMainStore } from './type'

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    name: 'main'
  }),
  actions: {}
})

export default useMainStore
