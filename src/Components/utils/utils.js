const API_KEY=import.meta.env.VITE_API_KEY

export const fetchHeadingData = async (currency) => {
  try {
    
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${currency}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': API_KEY
      }
    };
    
    const response = await fetch(url, options)
    
    if (!response.ok)
      throw new Error("Response status ", response)

    const data = await response.json()

    return data;
  } catch (err) {
    console.log(err)
    return
  }
}


export const fetchDataOnDate = async (date, currency) => {  
  
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${currency}/ohlc?vs_currency=usd&days=${date}`

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': API_KEY
      }
    };

    const response = await fetch(url, options)

    if (!response.ok)
      throw new Error("Response status ", response)

    const data = await response.json()

    return data;
  } catch (err) {
    console.log(err)
    return
  }

}

export function filterData(data) {
  const newData = [];

  Object.values(data.response).map((i) => {
    let o = Number(i["o"]);
    let h = Number(i["h"]);
    let l = Number(i["l"]);
    let c = Number(i["c"]);
    let d = Number(i["t"]) * 1000

    newData.push({
      o,
      h,
      l,
      c,
      d
    });
  });
  return newData;
}

export function filterOHLCData(data) {
  const newData = []
  data.map(i => {
    newData.push({
      "t": i[0],
      "o": i[1],
      "h": i[2],
      "l": i[3],
      "c": i[4]
    })
  })
  return newData;
}
export function filterOHLCDataForVolume(data) {
  const newData = []
  data.map(i => {
    
    newData.push({
      "t": i[0],
      v: Math.abs(i[1] - i[4])
    })
  })
  return newData;
}

export function filterDataForGrids(data, curr) {
  const newData = []
  data.map((i, index) => {
    newData.push({
      "id": (index + 1),
      "Currency": curr,
      "Open": i[1],
      "High": i[2],
      "Low": i[3],
      "Close": i[4]
    })
  })
  return newData;
}