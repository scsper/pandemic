/** @jsx React.DOM */

var React = require('react'),
    GRID_SIZE = 25,
    City;

City = React.createClass({
    render: function() {
        var location = this.props.location,
            x = location.x * GRID_SIZE,
            y = location.y * GRID_SIZE,
            locationStyle;

        locationStyle = {
            top: y + 'px',
            left: x + 'px',
            height: GRID_SIZE,
            width: GRID_SIZE,
            color: this.props.color,
            position: 'absolute'
        };

        return (
            <div style={locationStyle}>
                {this.props.name}
            </div>
        );
    }
});

module.exports = City;
