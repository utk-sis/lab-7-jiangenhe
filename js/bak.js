d3.csv('cities_and_population_area.csv')
  .then(data => {
    data.map(d => {
      d.x = parseInt(d.x)
      d.y = parseInt(d.y)
      d.area = parseInt(d.area)
      d.population = parseInt(d.population)
    })

    vis(data)
  })
  .catch(e => {
    console.log(e)
  })

function vis(data) {
  const containerWidth = 700;
  const containerHeight = 500;
  const margin = {top: 25, right: 20, bottom: 20, left: 100};
  const body = d3.select('body')
  const svg = body.append('svg')
    .attr('width', containerWidth)
    .attr('height', containerHeight)
  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  body.append('p')
    .text("the number of EU countries:" + data.length)

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.area)])
    .range([0, containerWidth - margin.left - margin.right])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, containerHeight - margin.top - margin.bottom])

  const xAxis = d3.axisTop(xScale)

  const yAxis = d3.axisLeft(yScale)




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

  svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => d.x+10)
    .attr('y', d => d.y+6)
    .text(d => d.city)
    .attr('display', d => {
      if (d.population > 1000000) {
        return 'inherit'
      } else {
        return 'none'
      }
    })
    .attr('class', 'city-label')
  chart.append('g').call(yAxis)
  chart.append('g').call(xAxis)

}
