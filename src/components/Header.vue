<template>
  <header class="bg-blue-50 shadow-sm">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div>
        <router-link
          to="/"
          class="text-blue-500 font-medium hover:text-blue-800"
        >
          Home
        </router-link>
      </div>

      <div>
        <ul class="flex space-x-6">
          <li>
            <router-link to="/users" class="text-gray-600 hover:text-blue-600">
              Users
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="text-gray-600 hover:text-blue-600">
              About Us
            </router-link>
          </li>
          <li>
            <router-link
              to="/contact"
              class="text-gray-600 hover:text-blue-600"
            >
              Contact Us
            </router-link>
          </li>
          <li>
            <router-link to="/SignUp" class="text-gray-600 hover:text-blue-600">
              SignUp
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
