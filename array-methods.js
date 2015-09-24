var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100,000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(function(obj) {
  return Number(obj.amount) > 100000;
});

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = dataset.bankBalances.map(function(obj) {
  obj.rounded = Math.round(Number(obj.amount));
  return obj;
});
/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.49 => 1347584.9 => 1347585,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = dataset.bankBalances.map(function(obj) {
  obj.amount = Math.round(Number(obj.amount) * 10) / 10;
  return obj;
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = Math.round(
  dataset.bankBalances.reduce(function(prev, curr, index) {
    return {amount : Number(prev.amount) + Number(curr.amount)};
  }).amount * 100) / 100;

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = Math.round(
  dataset.bankBalances.filter(function(obj) {
    return obj.state === 'WI' || obj.state === 'IL' || obj.state === 'WY' ||
           obj.state === 'OH' || obj.state === 'GA' || obj.state === 'DE';
  }).map(function(obj) {
    return Math.round(0.189 * Number(obj.amount) * 100) / 100;
  }).reduce(function(prev, curr) {
    return prev + curr;
  }) * 100) / 100;

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */

var stateSums = {};
var higherStateSums = null;
var areStatesInHigherStateSum = null;
var anyStatesInHigherStateSum = null;

dataset.bankBalances.forEach(function(obj, index, list) {
  if (stateSums[obj.state])
    return;
  var stateTotal = list.filter(function(item) {
    return item.state === obj.state;
  }).map(function(item) {
    return Math.round(Number(item.amount) * 100) / 100;
  }).reduce(function(prev, curr) {
    return prev + curr;
  });
  stateSums[obj.state] = Math.round(stateTotal * 100) / 100;
  if (stateSums[obj.state] > 1000000)
    higherStateSums += stateSums[obj.state];
  var max = Math.max(stateSums['WI'], stateSums['IL'], stateSums['WY'], stateSums['OH'], stateSums['GA'], stateSums['DE']);
  anyStatesInHigherStateSum = max > 2550000;
  areStatesInHigherStateSum = 2550000 * 6 < stateSums['WI'] + stateSums['IL'] + stateSums['WY'] + stateSums['OH'] + stateSums['GA'] + stateSums['DE'];
});

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
 var lowerSums = {};
dataset.bankBalances.forEach(function(obj) {
  if (!lowerSums[obj.state])
    lowerSums[obj.state] = 0;
  lowerSums[obj.state] += obj.amount;
});
var lowerSumStates = Object.keys(lowerSums).filter(function(state) {
  return lowerSums[state] < 1000000;
});

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
// SEE CODE FOR stateSums 2 BLOCKS ABOVE;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */


/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in each state is
  greater than 50,000 except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */

var states = {};
var sumOfHighInterests = Math.round(
  dataset.bankBalances.filter(function(obj) {
    return (obj.state !== 'WI' && obj.state !== 'IL' && obj.state !== 'WY' &&
        obj.state !== 'OH' && obj.state !== 'GA' && obj.state !== 'DE');
//    return !(obj.state === 'WI' || obj.state === 'IL' || obj.state === 'WY' ||
//             obj.state === 'OH' || obj.state === 'GA' || obj.state === 'DE');
  }).filter(function(obj, index, list) {
    if (states[obj.state])
      return true;
    var stateTotal = list.filter(function(item) {
      return item.state === obj.state;
    }).map(function(item) {
      return Math.round(0.189 * Number(item.amount) * 100) / 100;
    }).reduce(function(prev, curr) {
      return prev + curr;
    });
    if (stateTotal > 50000)
      states[obj.state] = stateTotal;
    return stateTotal > 50000;
  }).reduce(function(prev, curr) {
    return {amount : prev.amount + curr.amount}; })
.amount * 100) / 100;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};