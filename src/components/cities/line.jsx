/** @jsx React.DOM */

var React = require('react'),
    Line;

Line = React.createClass({
    /**
     * taken from madox2 on stack overflow: http://stackoverflow.com/questions/4270485/drawing-lines-on-html-page
     */
    getLineEndpoints: function(x1, x2, y1, y2) {
        if(y1 < y2) {
            var pom = y1;
            y1 = y2;
            y2 = pom;
            pom = x1;
            x1 = x2;
            x2 = pom;
        }

        var a = Math.abs(x1-x2);
        var b = Math.abs(y1-y2);
        var c;
        var sx = (x1+x2)/2;
        var sy = (y1+y2)/2;
        var width = Math.sqrt(a*a + b*b );
        var x = sx - width/2;
        var y = sy;

        a = width / 2;

        c = Math.abs(sx-x);

        b = Math.sqrt(Math.abs(x1-x)*Math.abs(x1-x)+Math.abs(y1-y)*Math.abs(y1-y));

        var cosb = (b*b - a*a - c*c) / (2*a*c);
        var rad = Math.acos(cosb);
        var deg = (rad*180)/Math.PI;

        return {
            width: width,
            deg: deg,
            x: x,
            y: y
        };
    },

    render: function() {
        var transformObj = this.getLineEndpoints(this.props.x1, this.props.x2, this.props.y1, this.props.y2),
            style = {
                border: '1px solid black',
                width: transformObj.width,
                height: 0,
                WebkitTransform: 'rotate(' + transformObj.deg + 'deg)',
                MozTransform: 'rotate(' + transformObj.deg + 'deg)',
                position: 'fixed',
                top: transformObj.y + 'px',
                left: transformObj.x + 'px'
            };

        return (
            <div style={style}></div>
        );
    }
});

module.exports = Line;
