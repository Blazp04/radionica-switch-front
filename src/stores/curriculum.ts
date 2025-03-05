import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CurriculumWeek } from "../model/local/CurriculumWeekModel";
import { fetchAllCurriculum } from "../repository/cirriculumRepository";

export const useCurriculumStore = defineStore("curriculum", () => {
  const weeks = ref<CurriculumWeek[]>([]);

  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const showAll = ref(false);

  const createWeek = async (week: CurriculumWeek) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      weeks.value.push(week);
      weeks.value.sort((a, b) => a.week - b.week);
    } catch (e) {
      error.value = "Failed to create week";
    } finally {
      isLoading.value = false;
    }
  };

  const updateWeek = async (updatedWeek: CurriculumWeek) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const index = weeks.value.findIndex((w) => w.week === updatedWeek.week);
      if (index !== -1) {
        weeks.value[index] = updatedWeek;
      }
    } catch (e) {
      error.value = "Failed to update week";
    } finally {
      isLoading.value = false;
    }
  };

  const visibleWeeks = computed(() => {
    return showAll.value ? weeks.value : weeks.value.slice(0, 3);
  });

  const fetchCurriculum = async () => {
    try {
      let response = await fetchAllCurriculum();
      let curriculumDto: CurriculumWeek[] = response.map((item: any) => ({
        week: item.week,
        title: item.title,
        description: item.description,
      }));

      weeks.value = curriculumDto.reverse();
      isLoading.value = true;
      error.value = null;
    } catch (e) {
      error.value = "Failed to fetch curriculum";
    } finally {
      isLoading.value = false;
    }
  };

  const toggleShowAll = () => {
    showAll.value = !showAll.value;
  };

  return {
    weeks,
    visibleWeeks,
    isLoading,
    error,
    showAll,
    fetchCurriculum,
    toggleShowAll,
    createWeek,
    updateWeek,
  };
});
