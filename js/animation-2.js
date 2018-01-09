// Second animation
var AnimatedSheet = require("./animated-sheet");

module.exports = new AnimatedSheet('#svg-2', {
    keyframes: [
        {
            from: 500,
            to: 1550,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let path = [
                    [w/2+800, -150],
                    [w/2+800, 600],
                    [w/2+100, 600],
                    [w/2-100, 800],
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    })

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
                    //.attr('stroke-linecap', 'round')
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
                        let progress = this.getTotalLength()-this.getTotalLength()*interpolatePercent;
                        return Math.max(0, progress);
                    });
            }
        },
        {
            from: 1450,
            to: 1550,
            remove: false,
            create: function(svg) {
                this.element = svg
                    .select('#chip').attr('z-index', 99)
                    .moveToFront();

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                var color = d3.interpolate('gray', 'white');
                return this.element.style('fill', color(interpolatePercent));
            }
        },
        {
            from: 1550,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let path = [
                    [w/2-230, 930],
                    [w/2-500, 1200],
                    [w/2-500, 2150]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    })

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
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
                        let progress = this.getTotalLength()-this.getTotalLength()*interpolatePercent;
                        return Math.max(0, progress);
                    });
            }
        },
        {
            from: 1550,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let path = [
                    [w/2-200, 970],
                    [w/2-450, 1220],
                    [w/2-450, 2150]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    })

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
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
                        let progress = this.getTotalLength()-this.getTotalLength()*interpolatePercent;
                        return Math.max(0, progress);
                    });
            }
        },
        {
            from: 1550,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let path = [
                    [w/2-160, 1000],
                    [w/2-400, 1250],
                    [w/2-400, 2150]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    })

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
                    .attr('stroke-dasharray', function() {
                        let strokeLength = this.getTotalLength();
                        //this.progress = this.getTotalLength() - window.pageYOffset;
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
                        let progress = this.getTotalLength()-this.getTotalLength()*interpolatePercent;
                        return Math.max(0, progress);
                    });
            }
        },
        {
            from: 1550,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let path = [
                    [w/2-120, 1030],
                    [w/2-350, 1270],
                    [w/2-350, 2150]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    })

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
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
                        let progress = this.getTotalLength()-this.getTotalLength()*interpolatePercent;
                        return Math.max(0, progress);
                    });
            }
        },
    ]
});
