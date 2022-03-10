// import third-party library
let d3s = document.createElement('script')
d3s.src = 'https://d3js.org/d3.v5.min.js'
d3s.type = 'text/javascript'
document.body.appendChild(d3s)

let jqs = document.createElement('script')
jqs.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
jqs.type = 'text/javascript'
document.body.appendChild(jqs)
// end import

// load new archive
let posts = []
let start_index = []
let links = []
let nodes = []

const i18n_temp = {
  'zh-CN': {
    'produced': '创作了',
    'date': '具体日期',
    'when': '在'
  }
}

let lang = 'zh-CN'

window.addEventListener('load', () => {
  // read datas
  nodes.push({
    'name': $('.site-author-name').text(),
    'type': 'author'
  })
  let all_info = $('.post-content').children().slice(1, $('.post-content').children().length)
  let check = []
  let checked = true
  let years = $('div.collection-year')
  for (item of years) start_index.push($.inArray(item, all_info))
  for (let index = 0; index < start_index.length; index ++ ) {
    let posts_part = all_info.slice(start_index[index], start_index[index + 1])
    let year = 0
    check = []
    for (item of posts_part) {
      checked = true
      if ($(item).hasClass('collection-year')) {
        year = $(item).children('span.collection-header').text()
        links.push({
          'source': $('.site-author-name').text(),
          'target': year,
          'relationship': i18n_temp[lang].when,
          'value': 1.5
        })
        nodes.push({
          'name': year,
          'type': 'year'
        })
      }
      else {
        links.push({
          'source': year + '-' + $(item).children('header').children('div.post-meta-container').children('time').text().trim(),
          'target': $(item).children().children().children().children().text(),
          'relationship': i18n_temp[lang].produced,
          'value': 1.5
        })
        links.push({
          'source': year,
          'target': year + '-' + $(item).children('header').children('div.post-meta-container').children('time').text().trim(),
          'relationship': i18n_temp[lang].date,
          'value': 1.5
        })
        let date = {
          'name': year + '-' + $(item).children('header').children('div.post-meta-container').children('time').text().trim(),
          'type': 'date'
        }
        for (node of check) {
          if (node.name === date.name) {
            checked = false
            break
          }
        }
        check.push(date)
        if (checked) {
          nodes.push(date)
        }
        nodes.push({
          'name':  $(item).children().children().children().children().text(),
          'type': 'article',
          'url': $(item).children().children().children('a.post-title-link').attr('href')
        })
      }
    }
  }

  // draw
  let height = 600
  let width = 600
  let margin = 30
  const svg = d3.select('#new-archive')
  svg.attr('viewBox', [0, 0, width, height]).style('font', '10px sans-serif')
  let g = svg.append('g').attr('transform','translate('+ margin +','+ margin +')')
  let scaleColor = d3.scaleOrdinal().domain(d3.range(nodes.length)).range(d3.schemeCategory10)
  let forceSimulation = d3.forceSimulation()
    .force("link", d3.forceLink().id((d) => d.name)).force("charge", d3.forceManyBody()).force("center", d3.forceCenter())
  forceSimulation.nodes(nodes).on('tick',linksTick)
  forceSimulation.force('link').links(links).distance(function (d, i) { return d.value * 75 })
  forceSimulation.force('center').x(width / 2).y(height / 2)
  let edges = g.append('g').selectAll('line').data(links)
    .enter().append('line').attr('stroke',function (d, i) { return scaleColor(i) }).attr('storke-width','1')
  let linksText = g.append('g').selectAll('text').data(links)
    .enter().append('text').text(function (d, i) { return d.relationship }).attr('font-size', 14)
  let gs = g.selectAll('.circle').data(nodes)
    .enter().append('g').attr('transform',function (d) { return 'translate('+ d.x +','+ d.y +')' }).call(
      d3.drag().on('start', start).on('drag', drag).on('end', end))
  svg.call(d3.zoom().on('zoom', () => { svg.attr('transform', d3.event.transform) }))
  gs.append('circle').attr('r', 15).attr('fill', function (d, i) { return scaleColor(i) })
  gs.append('text').text(function (d) { return d.name }).attr('font-size', 14)
  function linksTick() {
    edges.attr("x1", function (d) { return d.source.x })
        .attr("y1", function (d) { return d.source.y })
        .attr("x2", function (d) { return d.target.x })
        .attr("y2", function (d) { return d.target.y })
    linksText.attr("x", function (d) { return (d.source.x + d.target.x) / 2 })
        .attr("y" , function (d) { return (d.source.y + d.target.y) / 2 })
    gs && gs.attr('transform', function (d) { return 'translate('+ d.x +','+ d.y +')' })
  }
  function start (d) {
    if (!d3.event.active) forceSimulation.alphaTarget(0.8).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function drag (d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  function end (d) {
    if (!d3.event.active) forceSimulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }
  // end draw

  // interaction
  for (c of $('circle')) {
    if (c.__data__.type === 'article') {
      $(c).on('click', function () {
        window.location.href = c.__data__.url
      })
    }
  }
  // end interaction
})