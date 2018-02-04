# University of Porto Timetable Scrapper - *UPTS*
Python solution to extract the courses schedules from the different Faculties of University of Porto.

## Requirements
- docker-ce
- docker-compose

## Run
### Install containers
- `docker-compose build`

### Running
#### For development
- `docker-compose up -d`

#### For production
- `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

### Scraping 

First run the Docker containers, then follow the steps below:

- Wait for MySQL to initialize
- `docker-compose run scrapper bash`
- `scrapy crawl faculties`
- `scrapy crawl courses`
- `scrapy crawl course_units -a user=up123456789`
- `scrapy crawl schedules -a user=up123456789`

To inspect the scrapy engine, use `scrapy shell "url"`

Example:
```
root@00723f950c71:/scrapper# scrapy shell "https://sigarra.up.pt/fcnaup/pt/cur_geral.cur_planos_estudos_view?pv_plano_id=2523&pv_ano_lectivo=2017&pv_tipo_cur_sigla=D&pv_origem=CUR"
2017-10-24 20:51:35 [scrapy.utils.log] INFO: Scrapy 1.4.0 started (bot: scrapper)
...
>>> open('dump.html', 'wb').write(response.body)
63480
>>> response.xpath('//*[@id="anos_curr_div"]/div').extract()
```
