<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <RouterLink :to="{ name: 'home' }" class="button">Home</RouterLink>
        <RouterLink :to="{ name: 'new-post' }" class="button"
          >New Post</RouterLink
        >
      </div>
    </div>
  </div>
</template>
