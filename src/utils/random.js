/**
 * Returns a random integer between 0 and length
 */
module.exports = function(length) {
    return Math.floor((Math.random() * length - 1) + 1);
};
