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
            this.dispatch({
                action: action
            });
        }
    };
})();
