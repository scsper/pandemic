var React = require('react'),
    SetupActions = require('./actions/setup.js'),
    App = require('./components/app.jsx');

window.onload = () => {
    React.renderComponent(App(null), document.getElementById('container'));
    SetupActions.start();
};
