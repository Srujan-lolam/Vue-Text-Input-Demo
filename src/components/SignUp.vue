<template>
  <div class="relative min-h-screen pt-16">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center filter blur-sm"
      :style="{
        backgroundImage: `url(${require('../assets/interview-experience-bg.jpg')})`,
      }"
    ></div>

    <!-- Color Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-green-900/70"
    ></div>

    <!-- Signup Card -->
    <div
      class="relative z-10 min-h-screen flex items-center justify-center px-4"
    >
      <div class="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <!-- User Icon -->
        <div
          class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow"
        >
          <span class="text-3xl">👤</span>
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-semibold text-center text-blue-700 mt-8 mb-6">
          Create Account
        </h2>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <BaseInput placeholder="First Name" v-model="form.firstName" />

          <BaseInput placeholder="Last Name" v-model="form.lastName" />

          <BaseInput
            type="email"
            placeholder="Email Address"
            v-model="form.email"
          />

          <BaseInput
            type="password"
            placeholder="Password"
            v-model="form.password"
          />

          <BaseInput
            type="password"
            placeholder="Confirm Password"
            v-model="form.confirmPassword"
          />

          <button
            type="submit"
            class="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";

export default {
  name: "SignUp",
  components: {
    BaseInput,
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log("Signup Data:", this.form);
    },
  },
};
</script>
