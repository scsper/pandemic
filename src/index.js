var React = require('react'),
    GameActions = require('./actions/game.js'),
    App = require('./components/app.jsx');

window.onload = () => {
    React.renderComponent(App(null), document.getElementById('container'));
    GameActions.start();
};
