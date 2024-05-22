import { type App } from 'vue'
import registerProperties from './registerProperties'

export function globalRegister(app: App) {
  app.use(registerProperties)
}
