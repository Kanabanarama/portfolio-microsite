// Helper that shows x/y position of the cursor
module.exports = class PositionHelper {

    constructor() {
        this.positionDisplay = d3
            .select('body')
            .append('div')
            .attr('data-allow-html', true)
            .attr('class', 'tooltip top')
            .style('display', 'none');
        this.centerOffsetDisplay = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip right')
            .style('display', 'none');
        this.scrollDisplay = d3
            .select('body')
            .append('span')
            .attr('class', 'tooltip bottom')
            .style('width', '200px')
            .style('text-align', 'center')
            .style('display', 'none');
    }

    show() {
        var self = this;

        d3.select(window).on('mousemove', function() {
            self.positionDisplay
                .html('x: ' + d3.event.pageX + '<br /> y: ' + d3.event.pageY)
                .style('top', (d3.event.pageY - 100) + 'px')
                .style('left', (d3.event.pageX - 34) + 'px')
                .style('display', 'inline');
            let centerOffset =  d3.event.pageX - window.innerWidth/2;
            self.centerOffsetDisplay
                .html('center: ' + centerOffset)
                .style('top', (d3.event.pageY - 25) + 'px')
                .style('left', (d3.event.pageX + 35) + 'px')
                .style('display', 'inline');
        });

        d3.select(window).on('scroll', function() {
            self.scrollDisplay
                .html('scroll: ' + window.pageYOffset)
                .style('top', (window.pageYOffset + 100) + 'px')
                .style('left', ($(window).width()- 200) + 'px')
                .style('display', 'inline');
        });
    }

};