<template>
  <div class="bg-gradient-to-b from-blue-50 to-green-50 min-h-screen">
    <!-- HERO -->
    <section class="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
        Built for Students. Powered by Real Experiences.
      </h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        A platform that helps CBIT students understand campus placements through
        honest interview experiences shared by alumni.
      </p>
    </section>

    <!-- STATS -->
    <section class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white rounded-xl shadow-sm p-6 transform hover:-translate-y-1 transition"
        >
          <p class="text-3xl font-bold text-green-600">{{ stat.value }}+</p>
          <p class="text-gray-600 mt-2">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- WHY -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-semibold text-blue-700 mb-6">
        Why this platform exists
      </h2>
      <p class="text-gray-700 max-w-4xl leading-relaxed">
        Students often prepare blindly for placements — unsure about which
        companies visit campus, what interview rounds look like, or what skills
        truly matter.
        <br /><br />
        This platform reduces uncertainty by sharing real interview journeys,
        helping students prepare smarter instead of harder.
      </p>
    </section>

    <!-- HOW IT HELPS (INTERACTIVE CARDS) -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-semibold text-green-700 mb-10 text-center">
        How it helps students
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="item in helpItems"
          :key="item.title"
          class="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-200 transition"
          >
            {{ item.icon }}
          </div>

          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            {{ item.title }}
          </h3>
          <p class="text-gray-600">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </section>

    <!-- COMPANY FOCUS -->
    <section class="max-w-6xl mx-auto px-6 py-16 bg-white rounded-xl shadow-sm">
      <h2 class="text-3xl font-semibold text-blue-700 mb-6">
        Company-focused preparation
      </h2>
      <p class="text-gray-700 leading-relaxed max-w-4xl">
        Instead of generic preparation advice, students can explore experiences
        specific to companies that visit CBIT — understanding expectations,
        interview patterns, and preparation strategies.
      </p>
    </section>

    <!-- FOOTER -->
    <footer class="mt-20 py-8 text-center text-gray-500 text-sm">
      © {{ new Date().getFullYear() }} Interview Experiences Platform. All
      rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      stats: [
        { label: "Interview Experiences", target: 200, value: 0 },
        { label: "Companies Covered", target: 100, value: 0 },
        { label: "Students Benefited", target: 1000, value: 0 },
      ],
      helpItems: [
        {
          icon: "📘",
          title: "Real Experiences",
          desc: "Learn directly from alumni who cleared actual interviews.",
        },
        {
          icon: "🎯",
          title: "Focused Preparation",
          desc: "Understand what to study and what to ignore.",
        },
        {
          icon: "🚀",
          title: "Confidence Boost",
          desc: "Walk into interviews knowing what to expect.",
        },
      ],
    };
  },
  mounted() {
    this.animateCounters();
  },
  methods: {
    animateCounters() {
      this.stats.forEach((stat) => {
        const increment = Math.ceil(stat.target / 50);

        const interval = setInterval(() => {
          if (stat.value < stat.target) {
            stat.value += increment;
          } else {
            stat.value = stat.target;
            clearInterval(interval);
          }
        }, 30);
      });
    },
  },
};
</script>
