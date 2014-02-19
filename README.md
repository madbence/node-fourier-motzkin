# node-fourier-motzkin [![Build Status](https://travis-ci.org/madbence/node-fourier-motzkin.png?branch=master)](https://travis-ci.org/madbence/node-fourier-motzkin)

[Fourier-Motzkin Elimination](http://en.wikipedia.org/wiki/Fourier%E2%80%93Motzkin_elimination) can be used to determine whether an arbitrary system of linear inequalities has solutions or not.

## Install

```
npm install fourier-motzkin
```

## Usage

Let's say you have a linear system of inequalities:

![Original system](http://i.imgur.com/xtuv18W.png)

First, you have to transform it, so now you have a single matrix:

![Matrix form](http://i.imgur.com/OGpvwRX.png)

Now simply run the elimination algorithm:

```js
var fme = require('fourier-motzkin');
var mx =
[[ 1,  1,  1,  1],
 [-2,  1, -1, -1],
 [-1, -4,  1, -2],
 [-1,  0,  0,  0],
 [ 0, -1,  0,  0],
 [ 0,  0, -1,  0]];

console.log(fme(mx));
```

## Note

The algorithm has exponential complexity, but it works very well on smaller systems.

## TODO

- Improve performance (remove those slow `map`/`reduce` calls, switch to faster `Array` implementation)
- If the system is not solvable, provide proof ([Farkas' lemma](http://en.wikipedia.org/wiki/Farkas'_lemma))
- If the system has one solution, find it
- etc

## License

MIT
