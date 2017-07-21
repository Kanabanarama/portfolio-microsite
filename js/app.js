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
var posY = window.pageYOffset;

var svg = d3
  .select('#svg-1')
  .attr('width', '100%')
  .attr('height', '2000');

var path = [
  [w/2-5, 200],
  [w/2+30, 300],
  [w/2-70, 400],
  [w/2+100, 520],
  [w/2-100, 620],
  [w/2-960, 660],
  [w/2-940, 390],
  [w/2+50, 450],
  [w/2+160, 1410],
  [w/2+190, 1410],
  [w/2+450, 1300],
  [w/2+500, 1300],
  [w/2+1000, 5000]
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

var stroke = svg.selectAll('liner')
  .data([posY])
  .enter()
  .append('path')
  .attr('d', bezierLine(path))
  .attr('stroke', '#FFFFFF')
  .attr('stroke-width', 10)
  .attr('fill', 'none')
  .attr('stroke-linecap', 'round')
  .attr('stroke-dasharray', function() {
    var strokeLength = this.getTotalLength();
    progress = this.getTotalLength()-posY;
    return strokeLength+' '+strokeLength;
  })
  .attr('stroke-dashoffset', function() {
    return this.getTotalLength()-posY;
  });

var animatePath = function() {
  stroke
    .attr('stroke-dashoffset', function() {
      //var forwardOnlyProgress = Math.min(progress, this.getTotalLength()-posY);
      //var progressWithLimit = Math.max(0, forwardOnlyProgress);
      var catchUpFactor = 5;
      var progress = this.getTotalLength()-posY*catchUpFactor;
      return progress;
    });
}

// Scroll bound sectional animations
var keyframes = [
  {
    position: 636,
    selector: '.test rect',
    remove: false,
    start: function() {
      return svg
        .append('g')
        .attr('class', 'test')
        .attr('transform', 'translate('+(w/2-300)+', 1400)')
        .append('rect')
        .attr('width', 600)
        .attr('height', 50)
        .attr('opacity', 1)
        .attr('fill', '#FFFFFF');
    },
    end: function() {
      return svg
        .select('.test rect')
        .transition()
        .duration(2000)
        .ease(d3.easeBounce)
        .attrTween('transform', function() {
          var i = d3.interpolate(0, 180);
          return function(t) {
            return 'rotate(' + i(t) + ', 300, 25)';
          };
        });
    }
  },
  {
    position: 636,
    selector: '#icon-monitor',
    remove: true,
    start: function() {
      return svg
        .select('#icon-monitor')
        .attr('transform', 'translate('+(w/2-300)+', 1330)');
    },
    end: function() {
      return svg
        .select('#icon-monitor')
        .transition()
        .duration(700)
        .attr('transform', 'translate('+(w-85)+', 900)')
        .ease(d3.easeQuadOut)
        .transition()
        .duration(2000)
        .attr('transform', 'translate('+(w/2-300)+', 2500)')
        .ease(d3.easeQuadInOut);
    }
  },
  {
    position: 636,
    selector: '#icon-database',
    remove: true,
    start: function() {
      return svg
        .select('#icon-database')
        .attr('transform', 'translate('+(w/2-100-20)+', 1330)');
    },
    end: function() {
      return svg
        .select('#icon-database')
        .transition()
        .duration(800)
        .attr('transform', 'translate('+(w-85)+', 1000)')
        .ease(d3.easeQuadOut)
        .transition()
        .duration(2000)
        .attr('transform', 'translate('+(w/2-100)+', 2500)')
        .ease(d3.easeQuadInOut);
    }
  },
  {
    position: 636,
    selector: '#icon-cloud',
    remove: true,
    start: function() {
      return svg
        .select('#icon-cloud')
        .attr('transform', 'translate('+(w/2+100-40)+', 1330)');
    },
    end: function() {
      return svg
        .select('#icon-cloud')
        .transition()
        .duration(2000)
        .attr('transform', 'translate('+(w/2+300)+', 2500)')
        .ease(d3.easeQuadInOut);
    }
  },
  {
    position: 636,
    selector: '#icon-app',
    remove: true,
    start: function() {
      return svg
        .select('#icon-app')
        .attr('transform', 'translate('+(w/2+300-80)+', 1330)');
    },
    end: function() {
      return svg
        .select('#icon-app')
        .transition()
        .duration(2000)
        .attr('transform', 'translate('+(w/2+500)+', 2500)')
        .ease(d3.easeQuadInOut);
    }
  }
];

var initSections = function() {
  keyframes.forEach(function(keyframe) {
    keyframe.start().attr('visibility', 'visible');
    if(window.pageYOffset >= keyframe.position && !keyframe.status) {
      var keyframeElement = svg
        .select(keyframe.selector)
        .interrupt()
      if(keyframe.remove) {
        keyframeElement.remove()
      } else {
        keyframe.end().duration(0).attr('data-animation-finished');
      }
      keyframe.status = 1;
    }
  });
}

var animateSections = function() {
  keyframes.forEach(function(keyframe) {
    if(window.pageYOffset >= keyframe.position && !keyframe.status) {
      keyframe.end().attr('data-animation-finished');
      keyframe.status = 1;
    }
  });
}

initSections();

d3.select(window).on('scroll.scroller', function() {
  posY = window.pageYOffset;
  animatePath();
  animateSections();
});

// Helper that shows x/y position of the cursor
var initPositionHelper = function() {
  var positionDisplay = d3
    .select('body')
    .append('div')
    .attr('data-allow-html', true)
    .attr('class', 'tooltip top')
    .style('display', 'none');
  var centerOffsetDisplay = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip right')
    .style('display', 'none');
  var scrollDisplay = d3
    .select('body')
    .append('span')
    .attr('class', 'tooltip bottom')
    .style('width', '200px')
    .style('text-align', 'center');

  d3.select(window).on('mousemove', function() {
    positionDisplay
      .html('x: ' + d3.event.pageX + '<br /> y: ' + d3.event.pageY)
      .style('top', (d3.event.pageY - 100) + 'px')
      .style('left', (d3.event.pageX - 34) + 'px')
      .style('display', 'inline');
    var centerOffset =  d3.event.pageX - w/2;
    centerOffsetDisplay
      .html('center: ' + centerOffset)
      .style('top', (d3.event.pageY - 25) + 'px')
      .style('left', (d3.event.pageX + 35) + 'px')
      .style('display', 'inline');
  });

  d3.select(window).on('scroll', function() {
    scrollDisplay
      .html('scroll: ' + posY)
      .style('top', (posY + 100) + 'px')
      .style('left', ($(window).width()- 200) + 'px')
  });
}

initPositionHelper();