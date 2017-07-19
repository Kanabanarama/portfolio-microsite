$(document).foundation();

// CSS Animations
function CssAnimations() {
  var animatedElements = $('.animated:visible');
  var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
  animatedElements.each(function(index, element) {
    // Popup animation triggered when icon is scrolled into view
    if($(element).attr('class').indexOf('animate-view-popup') !== -1) {
      var viewportTop = $(scrollElem).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      var elementTop = Math.round($(element).offset().top);
      if(elementTop +100 < viewportBottom) {
        $(element).addClass('animate-popup')
      }
    }
  });
}

window.addEventListener('scroll', CssAnimations);

// Scroll bound line animation
var w = window.innerWidth;
var h = window.innerHeight;
var posY = [window.pageYOffset];

var canvas = d3
  .select('#canvas')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

var path = [
  [w/2-5, 200],
  [w/2, 300],
  [w/2-50, 400],
  [w/2+50, 500],
  [w/2-50, 600],
  [w/2, 400],
  [w/2+300, 400],
  [w/2+200, h],
];

var bezierLine = d3
  .line()
  .x(function(d) {
    return d[0];
  })
  .y(function(d) {
    return d[1];
  })
  .curve(d3.curveBasis);

var pageSizeY =  $('.content-container')[0].getBoundingClientRect().height;
var progress = 0;

var stroke = canvas.selectAll('liner')
  .data([posY])
  .enter()
  .append('path')
  .attr('d', bezierLine(path))
  .attr('stroke', '#FFFFFF')
  .attr('stroke-width', 10)
  .attr('fill', 'none')
  .attr('stroke-dasharray', function(d) {
    var strokeLength = this.getTotalLength();
    progress = this.getTotalLength()-posY;
    return strokeLength+' '+strokeLength;
  })
  .attr('stroke-dashoffset', function(d) {
    return this.getTotalLength()-posY
  });

var animatePath = function() {
  stroke
    .attr('stroke-dashoffset', function(d) {
      progress = Math.min(progress, this.getTotalLength()-posY);
      var progressWithLimit = Math.max(0, progress);
      return progressWithLimit;
    });
}

// Scroll bound sectional animations
var testData = [{'id': 1}];

var keyframes = [
  {
    'position': 370,
    'start': function() {
      return canvas
        .selectAll('circle')
        .data(testData, function(d) { return d.id; })
        .enter()
          .append('circle')
          .attr('r', 30)
          .attr('cx', w/2-15)
          .attr('cy', 570)
          .attr('fill', '#FFFFFF');
    },
    'end': function() {
      return canvas
        .selectAll('circle')
        .data(testData, function(d) { return d.id; })
          .transition()
          .duration(300)
          .attr('r', 25)
          .attrTween('fill', function() {
            return function(t) {
              return (d3.interpolateRgb('#FFFFFF', '#FF6666'))(t)
            };
          });
    }
  }
];

var initSections = function() {
  keyframes.forEach(function(keyframe) {
    keyframe.start();
  });
}
initSections();

var animateSections = function() {
  keyframes.forEach(function(keyframe) {
    if(window.pageYOffset > keyframe.position && !keyframe.status) {
      keyframe.end().attr('data-animation-finished');
      keyframe.status = 1;
    }
  });
}

d3.select(window).on('scroll.scroller', function() {
  posY = window.pageYOffset;
  animatePath();
  animateSections();
});

var positionDisplay = d3
  .select("body")
  .append("div")
  .attr('data-allow-html', true)
  .attr('class', 'tooltip top')
  .style('display', 'none');
var centerOffsetDisplay = d3
  .select("body")
  .append("div")
  .attr('class', 'tooltip right')
  .style('display', 'none');

d3.select(window).on("mousemove", function() {
  positionDisplay
    .html('x: ' + d3.event.pageX + '<br /> y: ' + d3.event.pageY)
    .style("top", (d3.event.pageY - 100) + "px")
    .style("left", (d3.event.pageX - 34) + "px")
    .style('display', 'inline');
  var centerOffset =  d3.event.pageX - w/2;
  centerOffsetDisplay
    .html('center: ' + centerOffset)
    .style("top", (d3.event.pageY - 25) + "px")
    .style("left", (d3.event.pageX + 35) + "px")
    .style('display', 'inline');
});
