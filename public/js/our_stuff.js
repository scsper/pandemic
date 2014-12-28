(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var _ = require('lodash'),
    InfectionConstants = require('../constants/infection.js'),
    Dispatcher = require('../dispatcher/dispatcher.js');
module.exports = {draw: function(city, diseaseCount) {
    Dispatcher.handleAction({
      actionType: InfectionConstants.DRAW,
      city: city,
      diseaseCount: diseaseCount
    });
  }};


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/actions/infection.js
},{"../constants/infection.js":8,"../dispatcher/dispatcher.js":10,"lodash":"lodash"}],2:[function(require,module,exports){
"use strict";
var GameStore = require('../stores/game.js'),
    InfectionStore = require('../stores/infection.js'),
    InfectionActions = require('../actions/infection.js');
module.exports = {start: function() {
    var card = InfectionStore.getTopCard(),
        i,
        CARDS_TO_DRAW = 3,
        cubesToPlace = 3;
    while (cubesToPlace > 0) {
      for (i = 0; i < CARDS_TO_DRAW; i++) {
        InfectionActions.draw(card, cubesToPlace);
        card = InfectionStore.getTopCard();
      }
      cubesToPlace--;
    }
  }};


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/actions/setup.js
},{"../actions/infection.js":1,"../stores/game.js":13,"../stores/infection.js":14}],3:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react'),
    CityStore = require('../stores/city.js'),
    InfectionStore = require('../stores/infection.js'),
    Map = require('./cities/map.jsx'),
    bean = require('bean'),
    App;

App = React.createClass({displayName: 'App',
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
            cities: CityStore.getCities()
        });
    },

    render: function() {
        return (
            Map({cities: this.state.cities})
        );
    }
});

module.exports = App;

},{"../stores/city.js":12,"../stores/infection.js":14,"./cities/map.jsx":6,"bean":"bean","react":"react"}],4:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react'),
    GRID_SIZE = 25,
    _ = require('lodash'),
    CityStore = require('../../stores/city.js'),
    Line = require('./line.jsx'),
    City;

City = React.createClass({displayName: 'City',
    drawLines: function() {
        var neighbors = this.props.neighbors,
            lineComponents = [],
            cityLocation = this.props.location,
            name = this.props.name;

        _.forEach(neighbors, function(neighbor) {
            var neighborLocation = CityStore.getLocation(neighbor);

            lineComponents.push(Line({
                x1: neighborLocation.x * GRID_SIZE, x2: cityLocation.x * GRID_SIZE, 
                y1: neighborLocation.y * GRID_SIZE, y2: cityLocation.y * GRID_SIZE}
            ));
        });

        return lineComponents;
    },

    drawCubes: function() {
        var diseaseCount = this.props.diseaseCount,
            diseaseComponents = [],
            diseaseStyle = {
                height: '5px',
                width: '5px',
                backgroundColor: this.props.color,
                display: 'inline-block'
            };

        for (var i = 0; i < diseaseCount; i++) {
            debugger;
            diseaseComponents.push(React.DOM.div({style: diseaseStyle}));
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
            React.DOM.div({style: locationStyle}, 
                React.DOM.span(null, this.props.name), 
                this.drawLines(), 
                this.drawCubes()
            )
        );
    }
});

module.exports = City;

},{"../../stores/city.js":12,"./line.jsx":5,"lodash":"lodash","react":"react"}],5:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react'),
    Line;

Line = React.createClass({displayName: 'Line',
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
            React.DOM.div({style: style})
        );
    }
});

module.exports = Line;

},{"react":"react"}],6:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react'),
    City = require('./city.jsx'),
    _ = require('lodash'),
    Map;

Map = React.createClass({displayName: 'Map',
    render: function() {
        var cities = this.props.cities,
            cityComponents = [],
            cityName,
            city;

        for (cityName in cities) {
            if (_.has(cities, cityName)) {
                city = cities[cityName];

                cityComponents.push(City({
                    neighbors: city.neighbors, 
                    color: city.color, 
                    location: city.location, 
                    name: cityName, 
                    diseaseCount: city.diseaseCount}
                ));
            }
        }

        return (
            React.DOM.div({className: "map"}, 
                cityComponents
            )
        );
    }
});

module.exports = Map;

},{"./city.jsx":4,"lodash":"lodash","react":"react"}],7:[function(require,module,exports){
"use strict";
var _ = require('lodash');
var GameConstants = {
  INITIAL: _.uniq(),
  ACTIONS: _.uniq(),
  DRAW_PLAYER_CARDS: _.uniq(),
  INFECT_CITIES: _.uniq(),
  START: _.uniq()
};


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/constants/game.js
},{"lodash":"lodash"}],8:[function(require,module,exports){
"use strict";
var _ = require('lodash');
module.exports = {DRAW: _.uniq()};


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/constants/infection.js
},{"lodash":"lodash"}],9:[function(require,module,exports){
"use strict";
var cities = {
  "San Francisco": {
    "neighbors": ["Tokyo", "Manila", "Chicago", "Los Angeles"],
    "location": {
      "x": 1,
      "y": 7
    },
    "color": "blue"
  },
  "Los Angeles": {
    "neighbors": ["San Francisco", "Sydney", "Chicago", "Mexico City"],
    "location": {
      "x": 2,
      "y": 10
    },
    "color": "green"
  },
  "Chicago": {
    "neighbors": ["San Francisco", "Los Angeles", "Atlanta", "Mexico City", "Montreal"],
    "location": {
      "x": 6,
      "y": 6
    },
    "color": "blue"
  },
  "Mexico City": {
    "neighbors": ["Los Angeles", "Chicago", "Miami", "Bogota", "Lima"],
    "location": {
      "x": 6,
      "y": 12
    },
    "color": "green"
  },
  "Atlanta": {
    "neighbors": ["Chicago", "Washington", "Miami"],
    "location": {
      "x": 8,
      "y": 9
    },
    "color": "blue"
  },
  "Miami": {
    "neighbors": ["Washington", "Atlanta", "Mexico City", "Bogota"],
    "location": {
      "x": 10,
      "y": 11
    },
    "color": "green"
  },
  "Montreal": {
    "neighbors": ["Chicago", "Washington", "New York"],
    "location": {
      "x": 10,
      "y": 6
    },
    "color": "blue"
  },
  "Washington": {
    "neighbors": ["New York", "Montreal", "Atlanta", "Miami"],
    "location": {
      "x": 12,
      "y": 9
    },
    "color": "blue"
  },
  "New York": {
    "neighbors": ["Washington", "Montreal", "London", "Madrid"],
    "location": {
      "x": 13,
      "y": 6
    },
    "color": "blue"
  },
  "Bogota": {
    "neighbors": ["Miami", "Mexico City", "Lima", "Buenos Aires", "Sao Paulo"],
    "location": {
      "x": 10,
      "y": 15
    },
    "color": "green"
  },
  "Lima": {
    "neighbors": ["Bogota", "Mexico City", "Santiago"],
    "location": {
      "x": 9,
      "y": 19
    },
    "color": "green"
  },
  "Santiago": {
    "neighbors": ["Lima"],
    "location": {
      "x": 9,
      "y": 23
    },
    "color": "green"
  },
  "Buenos Aires": {
    "neighbors": ["Sao Paulo", "Bogota"],
    "location": {
      "x": 13,
      "y": 22
    },
    "color": "green"
  },
  "Sao Paulo": {
    "neighbors": ["Buenos Aires", "Bogota", "Madrid", "Lagos"],
    "location": {
      "x": 15,
      "y": 19
    },
    "color": "green"
  },
  "Madrid": {
    "neighbors": ["New York", "London", "Paris", "Algiers", "Sao Paulo"],
    "location": {
      "x": 20,
      "y": 8
    },
    "color": "blue"
  },
  "London": {
    "neighbors": ["Essen", "Paris", "Madrid", "New York"],
    "location": {
      "x": 21,
      "y": 4
    },
    "color": "blue"
  },
  "Paris": {
    "neighbors": ["Essen", "Milan", "Algiers", "Madrid", "London"],
    "location": {
      "x": 24,
      "y": 6
    },
    "color": "blue"
  },
  "Essen": {
    "neighbors": ["London", "Paris", "Milan", "St. Petersburg"],
    "location": {
      "x": 25,
      "y": 3
    },
    "color": "blue"
  },
  "Milan": {
    "neighbors": ["Essen", "Paris", "Istanbul"],
    "location": {
      "x": 27,
      "y": 5
    },
    "color": "blue"
  },
  "St. Petersburg": {
    "neighbors": ["Essen", "Moscow", "Istanbul"],
    "location": {
      "x": 30,
      "y": 2
    },
    "color": "blue"
  },
  "Lagos": {
    "neighbors": ["Khartoum", "Kinshasa", "Sao Paulo"],
    "location": {
      "x": 23,
      "y": 14
    },
    "color": "green"
  },
  "Kinshasa": {
    "neighbors": ["Lagos", "Khartoum", "Johannesburg"],
    "location": {
      "x": 25,
      "y": 17
    },
    "color": "green"
  },
  "Johannesburg": {
    "neighbors": ["Khartoum", "Kinshasa"],
    "location": {
      "x": 28,
      "y": 20
    },
    "color": "green"
  },
  "Khartoum": {
    "neighbors": ["Cairo", "Lagos", "Kinshasa", "Johannesburg"],
    "location": {
      "x": 28,
      "y": 13
    },
    "color": "green"
  },
  "Algiers": {
    "neighbors": ["Madrid", "Paris", "Istanbul", "Cairo"],
    "location": {
      "x": 25,
      "y": 10
    },
    "color": "black"
  },
  "Cairo": {
    "neighbors": ["Algiers", "Istanbul", "Baghdad", "Riyadh", "Khartoum"],
    "location": {
      "x": 28,
      "y": 11
    },
    "color": "black"
  },
  "Istanbul": {
    "neighbors": ["Algiers", "Milan", "St. Petersburg", "Moscow", "Baghdad", "Cairo"],
    "location": {
      "x": 28,
      "y": 8
    },
    "color": "black"
  },
  "Moscow": {
    "neighbors": ["St. Petersburg", "Istanbul", "Tehran"],
    "location": {
      "x": 31,
      "y": 5
    },
    "color": "black"
  },
  "Baghdad": {
    "neighbors": ["Cairo", "Istanbul", "Tehran", "Karachi", "Riyadh"],
    "location": {
      "x": 31,
      "y": 10
    },
    "color": "black"
  },
  "Riyadh": {
    "neighbors": ["Cairo", "Baghdad", "Karachi"],
    "location": {
      "x": 32,
      "y": 11
    },
    "color": "black"
  },
  "Tehran": {
    "neighbors": ["Moscow", "Baghdad", "Karachi", "Delhi"],
    "location": {
      "x": 35,
      "y": 7
    },
    "color": "black"
  },
  "Karachi": {
    "neighbors": ["Riyadh", "Baghdad", "Tehran", "Delhi", "Mumbai"],
    "location": {
      "x": 36,
      "y": 11
    },
    "color": "black"
  },
  "Mumbai": {
    "neighbors": ["Karachi", "Delhi", "Chennai"],
    "location": {
      "x": 36,
      "y": 14
    },
    "color": "black"
  },
  "Delhi": {
    "neighbors": ["Tehran", "Karachi", "Mumbai", "Chennai", "Kolkata"],
    "location": {
      "x": 39,
      "y": 9
    },
    "color": "black"
  },
  "Chennai": {
    "neighbors": ["Mumbai", "Delhi", "Kolkata", "Bangkok", "Jakarta"],
    "location": {
      "x": 39,
      "y": 16
    },
    "color": "black"
  },
  "Kolkata": {
    "neighbors": ["Delhi", "Chennai", "Bangkok", "Hong Kong"],
    "location": {
      "x": 41,
      "y": 10
    },
    "color": "black"
  },
  "Bangkok": {
    "neighbors": ["Chennai", "Kolkata", "Hong Kong", "Ho Chi Minh City", "Jakarta"],
    "location": {
      "x": 42,
      "y": 14
    },
    "color": "red"
  },
  "Jakarta": {
    "neighbors": ["Chennai", "Bangkok", "Ho Chi Minh City", "Sydney"],
    "location": {
      "x": 42,
      "y": 19
    },
    "color": "red"
  },
  "Ho Chi Minh City": {
    "neighbors": ["Jakarta", "Bangkok", "Hong Kong", "Manila", "Sydney"],
    "location": {
      "x": 44,
      "y": 17
    },
    "color": "red"
  },
  "Sydney": {
    "neighbors": ["Jakarta", "Manila", "Los Angeles"],
    "location": {
      "x": 51,
      "y": 22
    },
    "color": "red"
  },
  "Manila": {
    "neighbors": ["Sydney", "Ho Chi Minh City", "Hong Kong", "Taipei", "San Francisco"],
    "location": {
      "x": 48,
      "y": 17
    },
    "color": "red"
  },
  "Hong Kong": {
    "neighbors": ["Shanghai", "Taipei", "Manila", "Ho Chi Minh City", "Bangkok", "Kolkata"],
    "location": {
      "x": 44,
      "y": 12
    },
    "color": "red"
  },
  "Taipei": {
    "neighbors": ["Osaka", "Manila", "Hong Kong", "Shanghai"],
    "location": {
      "x": 47,
      "y": 12
    },
    "color": "red"
  },
  "Shanghai": {
    "neighbors": ["Beijing", "Seoul", "Tokyo", "Taipei", "Hong Kong"],
    "location": {
      "x": 44,
      "y": 9
    },
    "color": "red"
  },
  "Osaka": {
    "neighbors": ["Taipei", "Tokyo"],
    "location": {
      "x": 50,
      "y": 11
    },
    "color": "red"
  },
  "Beijing": {
    "neighbors": ["Shanghai", "Seoul"],
    "location": {
      "x": 44,
      "y": 6
    },
    "color": "red"
  },
  "Seoul": {
    "neighbors": ["Beijing", "Shanghai", "Tokyo"],
    "location": {
      "x": 47,
      "y": 6
    },
    "color": "red"
  },
  "Tokyo": {
    "neighbors": ["Seoul", "Shanghai", "San Francisco", "Osaka"],
    "location": {
      "x": 50,
      "y": 8
    },
    "color": "red"
  }
};
module.exports = cities;


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/data/cities.js
},{}],10:[function(require,module,exports){
"use strict";
module.exports = (function() {
  var _callbacks = [];
  return {
    register: function(callback) {
      _callbacks.push(callback);
    },
    dispatch: function(payload) {
      console.log(payload);
      _callbacks.forEach(function(callback) {
        callback(payload);
      });
    },
    handleAction: function(action) {
      this.dispatch({action: action});
    }
  };
})();


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/dispatcher/dispatcher.js
},{}],11:[function(require,module,exports){
"use strict";
var React = require('react'),
    SetupActions = require('./actions/setup.js'),
    App = require('./components/app.jsx');
window.onload = (function() {
  React.renderComponent(App(null), document.getElementById('container'));
  SetupActions.start();
});


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/index.js
},{"./actions/setup.js":2,"./components/app.jsx":3,"react":"react"}],12:[function(require,module,exports){
"use strict";
var Dispatcher = require('../dispatcher/dispatcher.js'),
    InfectionConstants = require('../constants/infection.js'),
    cities = require('../data/cities.js'),
    _ = require('lodash'),
    bean = require('bean');
var CityStore = {
  cities: cities,
  initializeCities: function() {
    _.forEach(_.values(this.cities), function(city) {
      city.diseaseCount = 0;
    });
  },
  getCities: function() {
    return this.cities;
  },
  getLocation: function(city) {
    return this.cities[city].location;
  },
  register: function() {
    var _this = this;
    Dispatcher.register(function(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case InfectionConstants.DRAW:
          var city = action.city;
          _this.cities[city].diseaseCount += action.diseaseCount || 1;
          break;
        default:
          return true;
      }
      bean.fire(_this, 'changed');
      return true;
    });
  }
};
CityStore.initializeCities();
CityStore.register();
module.exports = CityStore;


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/stores/city.js
},{"../constants/infection.js":8,"../data/cities.js":9,"../dispatcher/dispatcher.js":10,"bean":"bean","lodash":"lodash"}],13:[function(require,module,exports){
"use strict";
var Dispatcher = require('../dispatcher/dispatcher.js'),
    GameConstants = require('../constants/game.js'),
    _ = require('lodash'),
    bean = require('bean');
var GameStore = {
  turn: '',
  turnState: GameConstants.INITIAL,
  actionsCompleted: 0,
  register: function() {
    var _this = this;
    Dispatcher.register(function(payload) {
      var action = payload.action;
      switch (action.actionType) {
        default:
          return true;
      }
      bean.fire(_this, 'changed');
      return true;
    });
  }
};
GameStore.register();
module.exports = GameStore;


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/stores/game.js
},{"../constants/game.js":7,"../dispatcher/dispatcher.js":10,"bean":"bean","lodash":"lodash"}],14:[function(require,module,exports){
"use strict";
var Dispatcher = require('../dispatcher/dispatcher.js'),
    InfectionConstants = require('../constants/infection.js'),
    _ = require('lodash'),
    cities = require('../data/cities.js'),
    bean = require('bean');
var InfectionStore = {
  infectionDeck: [],
  infectionDiscardPile: [],
  infectionRate: 0,
  _populateInfectionDeck: function() {
    var cards = _.keys(cities),
        deck = [],
        length = cards.length,
        randomIdx;
    for (var i = 0; i < length; i++) {
      randomIdx = Math.floor((Math.random() * cards.length - 1) + 1);
      deck.push(cards.splice(randomIdx, 1)[0]);
    }
    return deck;
  },
  getTopCard: function() {
    return this.infectionDeck[0];
  },
  setInfectionDeck: function() {
    this.infectionDeck = this._populateInfectionDeck();
  },
  register: function() {
    var _this = this;
    Dispatcher.register(function(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case InfectionConstants.DRAW:
          var card = _this.infectionDeck.shift();
          _this.infectionDiscardPile.push(card);
          break;
        default:
          return true;
      }
      bean.fire(_this, 'changed');
      return true;
    });
  }
};
InfectionStore.setInfectionDeck();
InfectionStore.register();
module.exports = InfectionStore;


//# sourceURL=/Users/ssperlin/Documents/coding/personal/pandemic/src/stores/infection.js
},{"../constants/infection.js":8,"../data/cities.js":9,"../dispatcher/dispatcher.js":10,"bean":"bean","lodash":"lodash"}]},{},[11]);
