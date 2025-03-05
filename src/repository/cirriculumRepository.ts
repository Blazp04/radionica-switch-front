import apiConfig from "../config/axiosConfig";
import type { CurriculumWeekRequestModel } from "../model/request/CurriculumWeekRequestModel";
import type { CurriculumWeekResponseModel } from "../model/response/CurriculumWeekResponseModel";

async function fetchAllCurriculum(): Promise<CurriculumWeekResponseModel[]> {
  const response = await apiConfig.get("/cirriculum");
  const data = await response.data;

  const weeks: CurriculumWeekResponseModel[] = data;
  return weeks;
}

async function postCurriculum(week: CurriculumWeekRequestModel) {
  const response = await apiConfig.post("/cirriculum", week);
  const data = await response.data;
  const weeks: CurriculumWeekResponseModel[] = data;
  return weeks;
}

async function deleteCurriculum(id: number) {
  const response = await apiConfig.delete(`/curriculum/${id}`);
  const data = await response.data;
  const weeks: CurriculumWeekResponseModel[] = data;
  return weeks;
}

export { fetchAllCurriculum, postCurriculum, deleteCurriculum };
