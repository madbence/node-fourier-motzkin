var motzkin = require('../lib/fourierMotzkin');
var assert = require('assert');

var goodMx =
[[ 1,  1,  1,  1],
 [-2,  1, -1, -1],
 [-1, -4,  1, -2],
 [-1,  0,  0,  0],
 [ 0, -1,  0,  0],
 [ 0,  0, -1,  0]];

var badMx =
[[ 1,  2,  2],
 [-1,  2,  1],
 [-1, -4, -5]];

assert.equal(motzkin(goodMx), true);
assert.equal(motzkin(badMx), false);
