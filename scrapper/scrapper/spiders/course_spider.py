import scrapy
from datetime import datetime
from urllib.parse import urlparse, parse_qs

from ..database import facultiesDb
from ..items import Course


class CourseSpider(scrapy.Spider):
    name = "courses"
    allowed_domains = ['sigarra.up.pt']
    login_page = 'https://sigarra.up.pt/feup/pt/'

    start_url = "https://sigarra.up.pt/{0}/pt/cur_geral.cur_tipo_curso_view?pv_tipo_sigla={1}&pv_ano_lectivo={2}"

    def start_requests(self):

        course_types = ['L', 'MI', 'M', 'D']
        year = 2017
        for i in range(len(facultiesDb)):
            faculty = facultiesDb[i]
            for course_type in course_types:
                url = self.start_url.format(faculty[1], course_type, year)
                yield scrapy.Request(url=url, meta={
                    # id is i + 1 because indexes in Python start at 0, but in MySQL they start at 1.
                    # In the future, this should be backend agnostic
                    'faculty_id': i + 1,
                    'course_type': course_type,
                    'year': year},
                                     callback=self.parse_get_url)

    def parse_get_url(self, response):
        for a in response.css('#conteudoinner ul#{0}_a li a:first-child'.format(response.meta['course_type'])):
            yield response.follow(a, meta=response.meta, callback=self.parse)

    def parse(self, response):
        for courseHtml in response.css('body'):
            if courseHtml.xpath(
                    '//*[@id="conteudoinner"]/div[1]/a').extract_first() is not None:  # tests if this page points to another one
                continue
            course = Course(
                acronym=courseHtml.css('span.pagina-atual::text').extract_first()[3:],
                course_id=int(parse_qs(urlparse(response.url).query)['pv_curso_id'][0]),
                course_type=response.meta['course_type'],
                faculty_id=response.meta['faculty_id'],
                last_updated=datetime.now(),
                name=courseHtml.css('#conteudoinner h1:last-of-type::text').extract_first(),
                plan_url=response.urljoin(courseHtml.xpath( '(//h3[text()="Planos de Estudos"]/following-sibling::div[1]//a)[1]/@href').extract_first()),
                url=response.url,
                year=response.meta['year'],
            )
            yield course
