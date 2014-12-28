/** @jsx React.DOM */

var React = require('react'),
    GRID_SIZE = 25,
    _ = require('lodash'),
    CityStore = require('../../stores/city.js'),
    Line = require('./line.jsx'),
    City;

City = React.createClass({
    drawLines: function() {
        var neighbors = this.props.neighbors,
            lineComponents = [],
            cityLocation = this.props.location,
            name = this.props.name;

        _.forEach(neighbors, function(neighbor) {
            var neighborLocation = CityStore.getLocation(neighbor);

            lineComponents.push(<Line
                x1={neighborLocation.x * GRID_SIZE} x2={cityLocation.x * GRID_SIZE}
                y1={neighborLocation.y * GRID_SIZE} y2={cityLocation.y * GRID_SIZE}
            />);
        });

        return lineComponents;
    },

    drawCubes: function() {
        var diseaseCount = this.props.diseaseCount,
            diseaseComponents = [],
            diseaseStyle = {
                backgroundColor: this.props.color,
            };

        for (var i = 0; i < diseaseCount; i++) {
            debugger;
            diseaseComponents.push(<div className="disease-cube" style={diseaseStyle} />);
        }

        return diseaseComponents;
    },

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
                <span>{this.props.name}</span>
                {this.drawLines()}
                {this.drawCubes()}
            </div>
        );
    }
});

module.exports = City;
