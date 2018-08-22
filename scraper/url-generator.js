function generateFacultyUrl() {
  return "https://sigarra.up.pt/up/pt/web_base.gera_pagina?p_pagina=escolas";
}

function generateCoursesUrl(facultyAcronym, courseType, year) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_tipo_curso_view?pv_tipo_sigla=${courseType}&pv_ano_lectivo=${year}`;
}

function generateCourseUrl(facultyAcronym, courseId, year) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_view?pv_ano_lectivo=${year}&pv_curso_id=${courseId}`;
}

function generateCourseUnitSearchUrl(facultyAcronym, courseId, year, pageNo) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/ucurr_geral.pesquisa_ocorr_ucs_list?pv_num_pag=${pageNo}&pv_ano_lectivo=${year}&pv_uc_nome=&pv_curso_id=${courseId}`;
}

function generateCourseUnitInfoUrl(facultyAcronym, courseUnitId) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=${courseUnitId}`;
}

function generateScheduleUrl(facultyAcronym, courseUnitId) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/hor_geral.ucurr_view?pv_ocorrencia_id=${courseUnitId}`;
}

module.exports = {
  generateFacultyUrl,
  generateCoursesUrl,
  generateCourseUrl,
  generateCourseUnitSearchUrl,
  generateCourseUnitInfoUrl,
  generateScheduleUrl
};
