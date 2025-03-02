import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavigationStore = defineStore("navigation", () => {
  const navigation = [
    { name: "Početna", href: "#home" },
    { name: "Kurikulum", href: "#curriculum" },
    { name: "Predavači", href: "#instructors" },
    { name: "Novosti", href: "#news" },
  ];

  const activeSection = ref("");
  const observer = ref<IntersectionObserver | null>(null);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setupObserver = () => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = `#${entry.target.id}`;
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: [0.2, 0.8],
      }
    );

    navigation.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) {
        observer.value?.observe(section);
      }
    });
  };

  const cleanup = () => {
    observer.value?.disconnect();
  };

  return {
    navigation,
    activeSection,
    scrollToSection,
    setupObserver,
    cleanup,
  };
});
