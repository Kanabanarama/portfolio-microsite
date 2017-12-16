// Scroll bound line animation
//import * as d3 from "d3";
//var d3 = require("d3");

module.exports = class PathAnimation {

    constructor() {
        let w = 1920; // resolution the viewbox scaling is based on
        let h = 1080;

        let svg = d3
            .select('#svg-1');

        let path = [
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

        let bezierLine = d3
            .line()
            .x(function(d) {
                return d[0];
            })
            .y(function(d) {
                return d[1];
            })
            .curve(d3.curveBasis);

        this.progress = 0;

        this.stroke = svg.selectAll('line')
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
    }

    animate() {
        this.stroke
            .attr('stroke-dashoffset', function() {
                let posY = window.pageYOffset;
                //var forwardOnlyProgress = Math.min(progress, this.getTotalLength()-posY);
                //var progressWithLimit = Math.max(0, forwardOnlyProgress);
                let lineSpeed = 4;
                if(Foundation.MediaQuery.current === 'medium') {
                    lineSpeed = 9;
                }
                if(Foundation.MediaQuery.current === 'small') {
                    lineSpeed = 20;
                }
                let progress = this.getTotalLength()-posY*lineSpeed;

                // event when path has reached its full length
                if(progress < 0) {
                    let endEvent = new Event('pathEnd');
                    window.dispatchEvent(endEvent);
                }

                return progress;
            });
    }

};
