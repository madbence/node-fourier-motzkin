/**
 * Normalize matrix
 *
 * Multiply every row with the first element of the row,
 * so the first column can contain only 1, -1 and 0.
 */
function normalize(mx) {
  return mx.map(function(row) {
    return row[0] > 0 ? row.map(function(field) { return  field/row[0]; }) :
           row[0] < 0 ? row.map(function(field) { return -field/row[0]; }) :
           row;
  });
}

/**
 * Remove first column from a matrix
 */
function removeFirstCol(mx) {
  return mx.map(function(row) {
    return row.slice(1);
  });
}

/**
 * Group normalized matrix rows by the first value
 */
function partition(mx) {
  return mx.reduce(function(parts, row) {
    parts[row[0]+1].push(row);
    return parts;
  }, [[],[],[]]);
}

/**
 * Vector addition
 */
function add(a, b) {
  return a.reduce(function(sum, ai, i) {
    sum[i] = ai + b[i];
    return sum;
  }, []);
}

/**
 * Create every possible pairing from `a` and `b`
 */
function pairs(a, b) {
  return !a.length ? [] : b.map(function(bi) {
    return add(a[0], bi);
  }).concat(pairs(a.slice(1), b));
}

/**
 * Fourier-Motzkin elimination
 *
 * FME can eliminate variables from a system of linear
 * inequalities, without changing the solution.
 *
 * @param {Array} mx System of linear inequalities in matrix form
 * @return {Boolean} False, if the system is not solvable
 */
function fourierMotzkin(mx) {
  var parts;
  while(mx[0].length > 2) {
    mx = normalize(mx);
    parts = partition(mx);
    mx = pairs(parts[0], parts[2]).concat(parts[1]);
    mx = removeFirstCol(mx);
  }
  mx = normalize(mx);
  parts = partition(mx);
  var min = parts[0]
    .map(function(row) { return row[1]; })
    .reduce(function(min, a) {
      return Math.min(min, a);
    }, parts[0][0][1]);
  var max = parts[2]
    .map(function(row) { return row[1]; })
    .reduce(function(max, a) {
      return Math.min(max, a);
    }, parts[2][0][1]);
  if(min !== undefined && max !== undefined) {
    return -min <= max;
  }
  return true;
}

module.exports = fourierMotzkin;
