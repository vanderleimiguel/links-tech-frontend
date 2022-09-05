const request = require('request')
const cheerio = require('cheerio')
let titles = []

request('https://devgo.com.br/', function (err, res, body) {
  if (err) console.log('Erro: ' + err)

  const $ = cheerio.load(body)

  $('.blog-articles-container').each(function () {
    var size = $(this).find(`.blog-article-card h1 a`).length + 1

    for (var i = 1; i < size; i++) {
      let title = $(this)
        .find(`.blog-article-card:nth-of-type(${i}) h1 a`)
        .text()
        .trim()

      titles.push(title)
    }
  })
})

setTimeout(function () {
  console.log(titles)
}, 1000)
