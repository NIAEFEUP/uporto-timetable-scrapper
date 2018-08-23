function generateFacultyUrl() {
  return "https://sigarra.up.pt/up/pt/web_base.gera_pagina?p_pagina=escolas";
}

function generateCoursesUrl(facultyAcronym, courseType, year) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_tipo_curso_view?pv_tipo_sigla=${courseType}&pv_ano_lectivo=${year}`;
}

function generateCourseUrl(facultyAcronym, courseId, year) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_view?pv_ano_lectivo=${year}&pv_curso_id=${courseId}`;
}

function generateClassesUrl(facultyAcronym, courseId, year, periodId) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/hor_geral.lista_turmas_curso?pv_ano_lectivo=${year}&pv_curso_id=${courseId}&pv_periodos=${periodId}`;
}

function generateCourseUnitSearchUrl(facultyAcronym, courseId, year, pageNo) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/ucurr_geral.pesquisa_ocorr_ucs_list?pv_num_pag=${pageNo}&pv_ano_lectivo=${year}&pv_uc_nome=&pv_curso_id=${courseId}`;
}

function generateCourseUnitInfoUrl(facultyAcronym, courseUnitId) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=${courseUnitId}`;
}

function generateCourseUnitScheduleUrl(facultyAcronym, courseUnitId) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/hor_geral.ucurr_view?pv_ocorrencia_id=${courseUnitId}`;
}

/**
 * @param periodId 1 for annual, 2 for first semester, 3 for second semester
 * @return {string}
 */
function generateClassScheduleUrl(facultyAcronym, year, periodId, classId) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/hor_geral.turmas_view?pv_turma_id=${classId}&pv_ano_lectivo=${year}&pv_periodos=${periodId}`;
}

module.exports = {
  generateFacultyUrl,
  generateCoursesUrl,
  generateCourseUrl,
  generateCourseUnitSearchUrl,
  generateCourseUnitInfoUrl,
  generateCourseUnitScheduleUrl,
  generateClassScheduleUrl,
  generateClassesUrl
};
