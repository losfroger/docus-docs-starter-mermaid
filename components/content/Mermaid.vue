<template>
  <div v-show="!rendered">
    Loading...
  </div>
  <pre
    v-show="rendered"
    ref="mermaidHtmlContainer"
    class="mermaid"
  />
  <p v-if="errorMermaid">
    {{ errorMermaid }}
  </p>
</template>


<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

const uuid = ref(uuidv4())

const mermaidHtmlContainer = ref<HTMLElement|null>(null)
const rendered = ref(false)

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const { $mermaid } = useNuxtApp()
const errorMermaid = ref('')

async function render() {
  try {
    // Reset error, before rendering
    errorMermaid.value = ''

    if (!mermaidHtmlContainer.value) {
      throw new Error('Unexpected error, no container')
    }

    rendered.value = true

    const resSvg = await $mermaid().render(`mermaidSvg-${uuid.value}`, props.content, mermaidHtmlContainer.value)
    mermaidHtmlContainer.value.innerHTML = resSvg.svg

  } catch (error: any) {
    console.error('Mermaid error', error)
    errorMermaid.value = error?.message ?? 'Uknown error'
  }
}

onMounted(() => {
  render()
})

// Rerender mermaid when content changes
watch(() => props.content, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (!mermaidHtmlContainer.value) {
      return
    }

    rendered.value = false
    mermaidHtmlContainer.value.innerHTML = props.content

    render()
  }
})

</script>
