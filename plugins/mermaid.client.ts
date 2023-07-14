import mermaid from "mermaid"
import { Mermaid } from "mermaid"

declare module '#app' {
  interface NuxtApp {
    $mermaid(): Mermaid
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'dark'
  })

  nuxtApp.provide('mermaid', () => mermaid)
})