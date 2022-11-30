<script setup lang="ts">
import ThreeSections from "@/layouts/ThreeSections.layout.vue";
import MyButton from "@/components/MyButton.vue";
</script>

<template>
  <ThreeSections>
    <template #header>
      <h1>Multiroom Messaging App</h1>
      <RouterLink to="/">Logout</RouterLink>
    </template>

    <template #default>
      <form action="">
        <main>
          <section>
            <h3>Room's name</h3>

            <div>9</div>
          </section>
        </main>
      </form>
    </template>

    <template #footer>
      <footer>
        <MyButton type="submit">Create room</MyButton>
      </footer>
    </template>
  </ThreeSections>
</template>
