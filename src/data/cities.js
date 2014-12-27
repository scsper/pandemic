var cities = {
    "San Francisco": {
        "neighbors": [
            "Tokyo",
            "Manila",
            "Chicago",
            "Los Angeles"
        ],
        "location": {
            "x": 1,
            "y": 7
        },
        "color": "blue"
    },

    "Los Angeles": {
        "neighbors": [
            "San Francisco",
            "Sydney",
            "Chicago",
            "Mexico City"
        ],
        "location": {
            "x": 2,
            "y": 10
        },
        "color": "green"
    },

    "Chicago": {
        "neighbors": [
            "San Francisco",
            "Los Angeles",
            "Atlanta",
            "Mexico City",
            "Montreal"
        ],
        "location": {
            "x": 6,
            "y": 6
        },
        "color": "blue"
    },

    "Mexico City": {
        "neighbors": [
            "Los Angeles",
            "Chicago",
            "Miami",
            "Bogota",
            "Lima"
        ],
        "location": {
            "x": 6,
            "y": 12
        },
        "color": "green"
    },

    "Atlanta": {
        "neighbors": [
            "Chicago",
            "Washington",
            "Miami"
        ],
        "location": {
            "x": 8,
            "y": 9
        },
        "color": "blue"
    },

    "Miami": {
        "neighbors": [
            "Washington",
            "Atlanta",
            "Mexico City",
            "Bogota"
        ],
        "location": {
            "x": 10,
            "y": 11
        },
        "color": "green"
    },

    "Montreal": {
        "neighbors": [
            "Chicago",
            "Washington",
            "New York"
        ],
        "location": {
            "x": 10,
            "y": 6
        },
        "color": "blue"
    },

    "Washington": {
        "neighbors": [
            "New York",
            "Montreal",
            "Atlanta",
            "Miami"
        ],
        "location": {
            "x": 12,
            "y": 9
        },
        "color": "blue"
    },

    "New York": {
        "neighbors": [
            "Washington",
            "Montreal",
            "London",
            "Madrid"
        ],
        "location": {
            "x": 13,
            "y": 6
        },
        "color": "blue"
    },

    "Bogota": {
        "neighbors": [
            "Miami",
            "Mexico City",
            "Lima",
            "Buenos Aires",
            "Sao Paulo"
        ],
        "location": {
            "x": 10,
            "y": 15
        },
        "color": "green"
    },

    "Lima": {
        "neighbors": [
            "Bogota",
            "Mexico City",
            "Santiago"
        ],
        "location": {
            "x": 9,
            "y": 19
        },
        "color": "green"
    },

    "Santiago": {
        "neighbors": [
            "Lima"
        ],
        "location": {
            "x": 9,
            "y": 23
        },
        "color": "green"
    },

    "Buenos Aires": {
        "neighbors": [
            "Sao Paulo",
            "Bogota"
        ],
        "location": {
            "x": 13,
            "y": 22
        },
        "color": "green"
    },

    "Sao Paulo": {
        "neighbors": [
            "Buenos Aires",
            "Bogota",
            "Madrid",
            "Lagos"
        ],
        "location": {
            "x": 15,
            "y": 19
        },
        "color": "green"
    },

    "Madrid": {
        "neighbors": [
            "New York",
            "London",
            "Paris",
            "Algiers",
            "Sao Paulo"
        ],
        "location": {
            "x": 20,
            "y": 8
        },
        "color": "blue"
    },

    "London": {
        "neighbors": [
            "Essen",
            "Paris",
            "Madrid",
            "New York"
        ],
        "location": {
            "x": 21,
            "y": 4
        },
        "color": "blue"
    },

    "Paris": {
        "neighbors": [
            "Essen",
            "Milan",
            "Algiers",
            "Madrid",
            "London"
        ],
        "location": {
            "x": 24,
            "y": 6
        },
        "color": "blue"
    },

    "Essen": {
        "neighbors": [
            "London",
            "Paris",
            "Milan",
            "St. Petersburg"
        ],
        "location": {
            "x": 25,
            "y": 3
        },
        "color": "blue"
    },

    "Milan": {
        "neighbors": [
            "Essen",
            "Paris",
            "Istanbul"
        ],
        "location": {
            "x": 27,
            "y": 5
        },
        "color": "blue"
    },

    "St. Petersburg": {
        "neighbors": [
            "Essen",
            "Moscow",
            "Istanbul"
        ],
        "location": {
            "x": 30,
            "y": 2
        },
        "color": "blue"
    },

    "Lagos": {
        "neighbors": [
            "Khartoum",
            "Kinshasa",
            "Sao Paulo"
        ],
        "location": {
            "x": 23,
            "y": 14
        },
        "color": "green"
    },

    "Kinshasa": {
        "neighbors": [
            "Lagos",
            "Khartoum",
            "Johannesburg"
        ],
        "location": {
            "x": 25,
            "y": 17
        },
        "color": "green"
    },

    "Johannesburg": {
        "neighbors": [
            "Khartoum",
            "Kinshasa"
        ],
        "location": {
            "x": 28,
            "y": 20
        },
        "color": "green"
    },

    "Khartoum": {
        "neighbors": [
            "Cairo",
            "Lagos",
            "Kinshasa",
            "Johannesburg"
        ],
        "location": {
            "x": 28,
            "y": 13
        },
        "color": "green"
    },

    "Algiers": {
        "neighbors": [
            "Madrid",
            "Paris",
            "Istanbul",
            "Cairo"
        ],
        "location": {
            "x": 25,
            "y": 10
        },
        "color": "black"
    },

    "Cairo": {
        "neighbors": [
            "Algiers",
            "Istanbul",
            "Baghdad",
            "Riyadh",
            "Khartoum"
        ],
        "location": {
            "x": 28,
            "y": 11
        },
        "color": "black"
    },

    "Istanbul": {
        "neighbors": [
            "Algiers",
            "Milan",
            "St. Petersburg",
            "Moscow",
            "Baghdad",
            "Cairo"
        ],
        "location": {
            "x": 28,
            "y": 8
        },
        "color": "black"
    },

    "Moscow": {
        "neighbors": [
            "St. Petersburg",
            "Istanbul",
            "Tehran"
        ],
        "location": {
            "x": 31,
            "y": 5
        },
        "color": "black"
    },

    "Baghdad": {
        "neighbors": [
            "Cairo",
            "Istanbul",
            "Tehran",
            "Karachi",
            "Riyadh"
        ],
        "location": {
            "x": 31,
            "y": 10
        },
        "color": "black"
    },

    "Riyadh": {
        "neighbors": [
            "Cairo",
            "Baghdad",
            "Karachi"
        ],
        "location": {
            "x": 32,
            "y": 11
        },
        "color": "black"
    },

    "Tehran": {
        "neighbors": [
            "Moscow",
            "Baghdad",
            "Karachi",
            "Delhi"
        ],
        "location": {
            "x": 35,
            "y": 7
        },
        "color": "black"
    },

    "Karachi": {
        "neighbors": [
            "Riyadh",
            "Baghdad",
            "Tehran",
            "Delhi",
            "Mumbai"
        ],
        "location": {
            "x": 36,
            "y": 11
        },
        "color": "black"
    },

    "Mumbai": {
        "neighbors": [
            "Karachi",
            "Delhi",
            "Chennai"
        ],
        "location": {
            "x": 36,
            "y": 14
        },
        "color": "black"
    },

    "Delhi": {
        "neighbors": [
            "Tehran",
            "Karachi",
            "Mumbai",
            "Chennai",
            "Kolkata"
        ],
        "location": {
            "x": 39,
            "y": 9
        },
        "color": "black"
    },

    "Chennai": {
        "neighbors": [
            "Mumbai",
            "Delhi",
            "Kolkata",
            "Bangkok",
            "Jakarta"
        ],
        "location": {
            "x": 39,
            "y": 16
        },
        "color": "black"
    },

    "Kolkata": {
        "neighbors": [
            "Delhi",
            "Chennai",
            "Bangkok",
            "Hong Kong"
        ],
        "location": {
            "x": 41,
            "y": 10
        },
        "color": "black"
    },

    "Bangkok": {
        "neighbors": [
            "Chennai",
            "Kolkata",
            "Hong Kong",
            "Ho Chi Minh City",
            "Jakarta"
        ],
        "location": {
            "x": 42,
            "y": 14
        },
        "color": "red"
    },

    "Jakarta": {
        "neighbors": [
            "Chennai",
            "Bangkok",
            "Ho Chi Minh City",
            "Sydney"
        ],
        "location": {
            "x": 42,
            "y": 19
        },
        "color": "red"
    },

    "Ho Chi Minh City": {
        "neighbors": [
            "Jakarta",
            "Bangkok",
            "Hong Kong",
            "Manila",
            "Sydney"
        ],
        "location": {
            "x": 44,
            "y": 17
        },
        "color": "red"
    },

    "Sydney": {
        "neighbors": [
            "Jakarta",
            "Manila",
            "Los Angeles"
        ],
        "location": {
            "x": 51,
            "y": 22
        },
        "color": "red"
    },

    "Manila": {
        "neighbors": [
            "Sydney",
            "Ho Chi Minh City",
            "Hong Kong",
            "Taipei",
            "San Francisco"
        ],
        "location": {
            "x": 48,
            "y": 17
        },
        "color": "red"
    },

    "Hong Kong": {
        "neighbors": [
            "Shanghai",
            "Taipei",
            "Manila",
            "Ho Chi Minh City",
            "Bangkok",
            "Kolkata"
        ],
        "location": {
            "x": 44,
            "y": 12
        },
        "color": "red"
    },

    "Taipei": {
        "neighbors": [
            "Osaka",
            "Manila",
            "Hong Kong",
            "Shanghai"
        ],
        "location": {
            "x": 47,
            "y": 12
        },
        "color": "red"
    },

    "Shanghai": {
        "neighbors": [
            "Beijing",
            "Seoul",
            "Tokyo",
            "Taipei",
            "Hong Kong"
        ],
        "location": {
            "x": 44,
            "y": 9
        },
        "color": "red"
    },

    "Osaka": {
        "neighbors": [
            "Taipei",
            "Tokyo"
        ],
        "location": {
            "x": 50,
            "y": 11
        },
        "color": "red"
    },

    "Beijing": {
        "neighbors": [
            "Shanghai",
            "Seoul"
        ],
        "location": {
            "x": 44,
            "y": 6
        },
        "color": "red"
    },

    "Seoul": {
        "neighbors": [
            "Beijing",
            "Shanghai",
            "Tokyo"
        ],
        "location": {
            "x": 47,
            "y": 6
        },
        "color": "red"
    },

    "Tokyo": {
        "neighbors": [
            "Seoul",
            "Shanghai",
            "San Francisco",
            "Osaka"
        ],
        "location": {
            "x": 50,
            "y": 8
        },
        "color": "red"
    }
};

module.exports = cities;
