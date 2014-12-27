/** @jsx React.DOM */

var React = require('react'),
    CityStore = require('../stores/city.js'),
    Map = require('./cities/map.jsx'),
    bean = require('bean'),
    App;

App = React.createClass({
    getInitialState: function() {
        return {
            cities: CityStore.getCities()
        };
    },

    componentDidMount: function() {
        bean.on(CityStore, 'changed', this.handleChange);
    },

    componentWillUnmount: function () {
        bean.off(CityStore, 'changed', this.handleChange);
    },

    handleChange: function() {
        this.setState({
            cities: this.CityStore.getCities()
        });
    },

    render: function() {
        return (
            <Map cities={this.state.cities} />
        );
    }
});

module.exports = App;
