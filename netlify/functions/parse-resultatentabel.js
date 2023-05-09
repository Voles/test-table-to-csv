const cheerio = require('cheerio');

const parseResultatenTabel = (onderdeel, htmlSingleEventPage) => {
    const $ = cheerio.load(htmlSingleEventPage)
    const rows = $('#uitslagenContainer table tbody').children('tr')

    const res = []

    let resultColumnIndex = 0
    const headers = $('table:eq(0) thead tr > *')
    headers.each((i, el) => {
      const text = $(el).text()
      const textCleaned = text.trim().replaceAll('  ', ' ')

      if (textCleaned === 'ResultaatRes') {
        resultColumnIndex = i
      }
    })

    rows.each((i, ele) => {
      const $posEle = $(ele).find('td:nth-child(1) b')
      const postText = $posEle.contents().first().text()
      const posTextCleaned = postText.trim().replaceAll('  ', ' ')

      const $nameEle = $(ele).find('td:nth-child(2) a')
      const nameText = $nameEle.contents().first().text()
      const nameTextCleaned = nameText.trim().replaceAll('  ', ' ')

      const $verenigingEle = $(ele).find('td:nth-child(3) a')
      const verenigingText = $verenigingEle.contents().first().text()
      const verenigingTextCleaned = verenigingText.trim().replaceAll('  ', ' ')

      const $resultEle = $(ele).find(`td:nth-child(${resultColumnIndex + 1}) span.tipped`)
      const resultText = $resultEle.contents().first().text()
      const resultTextCleaned = resultText.trim().replaceAll('  ', ' ')

      res.push([
        onderdeel,
        posTextCleaned,
        nameTextCleaned,
        verenigingTextCleaned,
        resultTextCleaned
      ])
    })

    return res
}

export default parseResultatenTabel
