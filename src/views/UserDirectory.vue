<template>
  <div class="max-w-4xl mx-auto py-6">
    <UserList />
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";

export default {
  name: "UserDirectoryPage",
  components: {
    UserList,
  },
};
</script>
