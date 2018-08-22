# UPorto Timetable Scraper

New JavaScript version using [Cheerio](https://cheerio.js.org/) and Test Driven Development. 
Running `npm test` will run the scraper against the HTML examples provided and can be used to test when new corner cases emerge.

## Running 

It is still not possible to run the whole pipeline.

### Notes about Sigarra Database
* A year represents the lowest number of a school year (e.g.: `2017` represents `2017/2018`);
* Faculties are indexed by their acronym (`feup`, `fcup`, etc.);
* Courses are identified by a course id and year;
* Course units are identified by a single id. Each year the id changes, even though its name and acronym may be the same
* Schedules are identified by the course unit id. 
