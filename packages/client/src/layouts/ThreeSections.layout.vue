<template>
  <div class="layout--three-sections">
    <header
      class="flex justify-between items-center h-20 px-6 shrink-0 bg-white rounded-t-lg"
    >
      <slot name="header"></slot>
    </header>

    <main class="flex flex-col grow overflow-y-hidden">
      <slot></slot>
    </main>

    <footer
      class="flex flex-row justify-between items-center h-20 px-3 gap-3 shrink-0 bg-white rounded-b-lg"
    >
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.layout--three-sections {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}

header {
  border-bottom: 1px solid var(--border-color);
}

footer {
  border-top: 1px solid var(--border-color);
}
</style>
