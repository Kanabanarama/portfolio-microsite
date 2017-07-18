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

d3.select(window).on('scroll.scroller', function() {
  posY = window.pageYOffset;
  animatePath();
});