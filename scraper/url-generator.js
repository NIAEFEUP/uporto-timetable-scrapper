function generateCourseUrl(facultyAcronym, courseType, year) {
  return `https://sigarra.up.pt/${facultyAcronym}/pt/cur_geral.cur_tipo_curso_view?pv_tipo_sigla=${courseType}&pv_ano_lectivo=${year}`;
}

module.exports = {
  generateCourseUrl
};
