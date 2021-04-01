d3.csv('cities_and_population_area.csv')
.then(data => {
  data.map(d => {
    d.x = parseInt(d.x)
    d.y = parseInt(d.y)
    d.area = parseFloat(d.area)
    d.population = parseInt(d.population)
  })

  vis(data)
})
  .catch(e => {
    console.log(e)
  })

function vis(data) {

  const body = d3.select('body')

  const margin = {top: 30, bottom: 50, left: 80, right: 50}
  const widthCanvas = 700
  const heightCanvas = 500

  const svg = body.append('svg')
    .attr('width', widthCanvas)
    .attr('height', heightCanvas)

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  body.append('p')
    .text("the number of EU countries:" + data.length)

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.area)])
    .range([0, widthCanvas - margin.left - margin.right])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, heightCanvas - margin.top - margin.bottom])

  const xAxis = d3.axisTop(xScale)

  const yAxis = d3.axisLeft(yScale)

  chart.append('g')
    .call(xAxis)

  chart.append('g')
    .call(yAxis)

  chart.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('cx', d => xScale(d.area))
    .attr('cy', d => yScale(d.population))
    .attr('r', d => {
      if(d.population > 1000000){
        return 8
      } else {
        return 4
      }
    })

  chart.append('g').selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => xScale(d.area)+10)
    .attr('y', d => yScale(d.population)+6)
    .text(d => d.city)
    .attr('class', 'city-label')

  body.select('#add-knox').on('click', e => {
    data.push({country: "United States", city: "Knoxville", population: 186173, area: 104.3})
    chart.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', d => xScale(d.area))
      .attr('cy', d => yScale(d.population))
      .attr('r', d => {
        if(d.population > 1000000){
          return 8
        } else {
          return 4
        }
      })
    chart.append('g').selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => xScale(d.area)+10)
      .attr('y', d => yScale(d.population)+6)
      .text(d => d.city)
      .attr('class', 'city-label')
  })
}
