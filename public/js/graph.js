
// get sub-key values (see public/data/data.json to get a sense of the 'data' argument)
const getDates = (data, skey) => { 
  return Object.keys(data).map(key => data[key][skey])
}

// get tuples of values corresponding to key1 and key2, e.g. [ [1,2], [3,4] ... ] from
// the object { "0":{"key1": 1, "key2": 2, ...}, "1":{"key1": 3, "key2": 4,} ... }
const getTuples = (data, key1, key2) => { 
  return Object.keys(data).map(key => 
      [ data[key][key1], data[key][key2] ]
  )
}

const fetchData = () => {
    fetch('/api/data')
      .then(r => r.json())
      .then(json => {
          console.log(json) // object
          const startDates = getDates(json,"start")
          const startEndDates = getTuples(json,"start", "end")
          console.log(startDates)
          console.log(startEndDates)
          d3.select("body").selectAll("p")
            .data(startDates)
            .enter()
            .append("p")
            .text(d => d);
      })
}

fetchData()

// displays fine
d3.select("body").append("p").text("(some dates)");
