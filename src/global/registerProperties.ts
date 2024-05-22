import { type App } from 'vue'
import formatUtcTimeString from '@/utils/dateFormat'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filter = {
    name: 'vgri',
    formatTime: (value: string, format?: string) => {
      return formatUtcTimeString(value, format)
    }
  }
}
