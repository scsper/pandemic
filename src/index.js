var React = require('react'),
    App = require('./components/app.jsx');

window.onload = () => {
    React.renderComponent(App(null), document.getElementById('container'));
};
