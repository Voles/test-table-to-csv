import parseResultatentabel from "./parse-resultatentabel.js";

const cheerio = require('cheerio');
const axios = require('axios');

export const handler = async (event) => {
  const link = event.queryStringParameters.link;
  const data = await loadHtmlFromAtletieknu(decodeURI(link))

  const $ = cheerio.load(data)

  // tijdschema parsen
  const rows = $('table.chronoloogtabel tbody').children('tr')

  let res = []
  const hrefs = []

  rows.each((i, ele) => {
    const $onderdeelEle = $(ele).find('td:nth-child(3) a')
    const href = $onderdeelEle.attr('href')

    const onderdeelText = $onderdeelEle.find('span.hidden-xs').contents().first().text()
    const onderdeelTextCleaned = onderdeelText.trim().replaceAll('  ', ' ')

    if (!hrefs.includes(href)) {
      res.push({
        'onderdeel': onderdeelTextCleaned,
        'href': href
      })

      hrefs.push(href)
    }
  })



  let dataForCsv = []

  res = res.filter((v, i) => typeof v.href !== "undefined")

  console.table(res)

  const promises = res.map(async (value, index) => {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        const eventData = await loadHtmlFromAtletieknu(value.href)
        const a =  parseResultatentabel(value.onderdeel, eventData)
        dataForCsv = dataForCsv.concat(a)

        resolve()
      }, Math.round(Math.random() * 1000))
    })
  })

  await Promise.all(promises)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: dataForCsv
    })
  }
}

// https://www.atletiek.nu/wedstrijd/chronoloog/39076/
const loadHtmlFromAtletieknu = async (link) => {
  const { data, status, statusText } = await axios.get(link, {
    headers: {
      Cookie: "atletieknu_preferredlanguage=nl;"
    }
  });

  console.log('request:', link, status, statusText)

  return data
}
