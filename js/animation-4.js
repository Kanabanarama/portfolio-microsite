// Third animation
var AnimatedSheet = require("./animated-sheet");

module.exports = new AnimatedSheet('#svg-4', {
    config: {
        height: 1000,
    },
    keyframes: [
        {
            from: 0,
            to: 1000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let path = [
                    [w/2-580, -150],
                    [w/2-580, 1400]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    });

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-dasharray', function() {
                        let strokeLength = this.getTotalLength();
                        this.progress = this.getTotalLength() - window.pageYOffset;
                        return strokeLength + ' ' + strokeLength;
                    })
                    .attr('stroke-dashoffset', function() {
                        return this.getTotalLength() - window.pageYOffset;
                    });

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                this.element
                    .attr('stroke-dashoffset', function() {
                        let progress = this.getTotalLength()-this.getTotalLength()*interpolatePercent+500;
                        //console.log(this.getTotalLength());
                        return Math.max(0, progress);
                    });
            }
        },
        {
            from: 0,
            to: 1300,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                this.element = svg
                    .selectAll('text')
                    .data([window.pageYOffset])
                    .enter()
                    .append('text')
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .attr("font-weight", "bold")
                    .attr("fill", "white")
                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                this.element
                    .text(function(d) {
                        return '◅ '+(window.pageYOffset+window.innerHeight) + ' px';
                    })
                    .attr('transform', function(d) {
                        let rotation = 0-90 * interpolatePercent;
                        let translateX = 925 - interpolatePercent*500;
                        let translateY = -300 + interpolatePercent*1125;
                        return 'translate('+translateX+', '+translateY+') rotate('+rotation+' 0 0)';
                    })
            },
        },
    ],
});
