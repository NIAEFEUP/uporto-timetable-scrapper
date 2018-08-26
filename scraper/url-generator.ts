import { CourseType, Period } from "./models";

export function generateFacultyUrl() {
  return "https://sigarra.up.pt/up/pt/web_base.gera_pagina?p_pagina=escolas";
}

export function generateCoursesUrl(
  facultyAcronym: string,
  courseType: CourseType,
  year: number
) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_tipo_curso_view?pv_tipo_sigla=${courseType}&pv_ano_lectivo=${year}`;
}

export function generateCourseUrl(
  facultyAcronym: string,
  courseId: number,
  year: number
) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_view?pv_ano_lectivo=${year}&pv_curso_id=${courseId}`;
}

export function generateClassesUrl(
  facultyAcronym: string,
  courseId: number,
  year: number,
  periodId: Period
) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/hor_geral.lista_turmas_curso?pv_ano_lectivo=${year}&pv_curso_id=${courseId}&pv_periodos=${periodId}`;
}

export function generateCourseUnitSearchUrl(
  facultyAcronym: string,
  courseId: number,
  year: number,
  periodId: Period,
  pageNo: number
) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/ucurr_geral.pesquisa_ocorr_ucs_list?pv_ano_lectivo=${year}&pv_uc_periodo=${periodId}&pv_curso_id=${courseId}&pv_num_pag=${pageNo}`;
}

export function generateCourseUnitInfoUrl(
  facultyAcronym: string,
  courseUnitId: number
) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=${courseUnitId}`;
}

export function generateCourseUnitScheduleUrl(
  facultyAcronym: string,
  courseUnitId: number
) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/hor_geral.ucurr_view?pv_ocorrencia_id=${courseUnitId}`;
}

export function generateClassScheduleUrl(
  facultyAcronym: string,
  year: number,
  periodId: Period,
  classId: number
) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/hor_geral.turmas_view?pv_turma_id=${classId}&pv_ano_lectivo=${year}&pv_periodos=${periodId}`;
}
