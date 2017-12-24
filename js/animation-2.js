// Second animation
var AnimatedSheet = require("./animated-sheet");

module.exports = new AnimatedSheet('#svg-2', {
    keyframes: [
        {
            from: 0,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let path = [
                    [w/2+800, -150],
                    [w/2+800, 600],
                    [w/2+100, 600],
                    [w/2-280, 980],
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
                        let startY = $(svg.node()).offset().top;
                        let posY = Math.max(0, window.pageYOffset+window.innerHeight/2-startY)
                        let lineSpeed = 1.5;

                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 4;
                        }
                        if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 5;
                        }
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('path2End');
                            window.dispatchEvent(endEvent);
                        }

                        return progress;
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
            from: 0,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let path = [
                    [w/2-230, 1000],
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
                        let svgY = $(svg.node()).offset().top;

                        let lineSpeed = 1.5;
                        let startY = svgY + 900;
                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 3.90;
                            startY = svgY + 100;
                        } else if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 4;
                            startY = svgY;
                        }

                        let posY = Math.max(0, window.pageYOffset-startY);
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('path2End');
                            window.dispatchEvent(endEvent);
                        }

                        return progress;
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
                        this.progress = this.getTotalLength() - window.pageYOffset;
                        return strokeLength + ' ' + strokeLength;
                    })
                    .attr('stroke-dashoffset', function() {
                        return this.getTotalLength() - window.pageYOffset;
                    });

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                var self = this;
                this.element
                    .attr('stroke-dashoffset', function() {
                        let svgY = $(svg.node()).offset().top;

                        let lineSpeed = 1.5;
                        let startY = svgY + 900;
                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 3.90;
                            startY = svgY + 100;
                        } else if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 4;
                            startY = svgY-50;
                        }

                        let posY = Math.max(0, window.pageYOffset-startY);
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('path2End');
                            window.dispatchEvent(endEvent);
                        }

                        return progress;
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
                var self = this;
                this.element
                    .attr('stroke-dashoffset', function() {
                        let svgY = $(svg.node()).offset().top;

                        let lineSpeed = 1.5;
                        let startY = svgY + 900;
                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 3.90;
                            startY = svgY + 100;
                        } else if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 4;
                            startY = svgY-50;
                        }

                        let posY = Math.max(0, window.pageYOffset-startY);
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('path2End');
                            window.dispatchEvent(endEvent);
                        }

                        return progress;
                    });
            }
        },
    ]
});
