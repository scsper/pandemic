/** @jsx React.DOM */

var React = require('react');

DiseaseCubes = React.createClass({
    render: function() {
        var diseaseComponents = [],
            diseaseStyle = {
                backgroundColor: this.props.color,
            };

        for (var i = 0; i < this.props.count; i++) {
            diseaseComponents.push(<div className="disease-cube" style={diseaseStyle} />);
        }

        return <div>{diseaseComponents}</div>;
    }
});

module.exports = DiseaseCubes;
