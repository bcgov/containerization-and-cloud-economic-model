<template>
  <nav class="navigation-main">
    <div class="container">
      <ul>
        <li>
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BCGovNavBar'
};
</script>
