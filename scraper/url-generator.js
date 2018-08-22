function generateFacultyUrl() {
  return "https://sigarra.up.pt/up/pt/web_base.gera_pagina?p_pagina=escolas";
}

function generateCoursesUrl(facultyAcronym, courseType, year) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_tipo_curso_view?pv_tipo_sigla=${courseType}&pv_ano_lectivo=${year}`;
}

function generateCourseUrl(facultyAcronym, courseId, year) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_view?pv_ano_lectivo=${year}&pv_curso_id=${courseId}`;
}

function generatePlanUrl(facultyAcronym, planId, year) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_planos_estudos_view?pv_plano_id=${planId}&pv_ano_lectivo=${year}`;
}

module.exports = {
  generateFacultyUrl,
  generateCoursesUrl,
  generateCourseUrl,
  generatePlanUrl
};
