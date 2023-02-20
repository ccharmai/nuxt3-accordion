import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'
import { name } from '../package.json'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: { name },
  setup () {
    const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'SlideUpDown',
      filePath: resolver.resolve('runtime/SlideUpDown.vue'),
    })
  }
})
