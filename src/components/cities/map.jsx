/** @jsx React.DOM */

var React = require('react'),
    City = require('./city.jsx'),
    _ = require('lodash'),
    Map;

Map = React.createClass({
    render: function() {
        var cities = this.props.cities,
            cityComponents = [],
            cityName,
            city;

        for (cityName in cities) {
            if (_.has(cities, cityName)) {
                city = cities[cityName];

                cityComponents.push(<City
                    city={city}
                    name={cityName}
                />);
            }
        }

        return (
            <div className="map">
                {cityComponents}
            </div>
        );
    }
});

module.exports = Map;
