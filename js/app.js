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

// D3 Path animation
var bezierLine = d3
  .line()
  .x(function(d) { return d[0]; })
  .y(function(d) { return d[1]; })
  .curve(d3.curveBasis);

var svg = d3
  .select('#canvas')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

var w = window.innerWidth;
var h = window.innerHeight;

var path = [
  [w/2-5, 200],
  [w/2, 300],
  [w/2-50, 400],
  [w/2+50, 500],
  [w/2-75, 600],
  [w/2+50, 400],
  [w/2+300, 400],
  [w/2+200, h],
];

svg.append('path')
  .attr('d', bezierLine(path))
  .attr('stroke', '#FFFFFF')
  .attr('stroke-width', 10)
  .attr('fill', 'none')
  .transition()
  .duration(3000)
  .attrTween('stroke-dasharray', function() {
    var len = this.getTotalLength();
    return function(t) {
      return (d3.interpolateString('0,' + len, len + ',0'))(t)
    };
  });
