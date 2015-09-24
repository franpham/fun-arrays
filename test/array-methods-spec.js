var chai = require('chai');
chai.should();

var arrayMethods = require('../array-methods');

describe('Array Methods', function() {

  describe('hundredThousandairs', function() {

    it('should be an array with accounts from bankBalances that are greater than 100000.00', function() {
      arrayMethods.hundredThousandairs.should.have.length(93);
      arrayMethods.hundredThousandairs.every(function (account){ return account.amount > 100000; }).should.be.true;
    });

  });

  describe('roundedDollar', function() {

    it('should be an array of accounts with an added key `rounded`', function() {
      arrayMethods.roundedDollar.should.have.length(100);
      arrayMethods.roundedDollar.every(function (account){ return account.hasOwnProperty('rounded'); }).should.be.true;
    });

    it('each accounts `rounded` value should be rounded to the nearest dollar', function() {
      arrayMethods.roundedDollar[0].rounded.should.be.equal(822371);
      arrayMethods.roundedDollar[7].rounded.should.be.equal(231272);
      arrayMethods.roundedDollar[9].rounded.should.be.equal(683737);
      arrayMethods.roundedDollar[10].rounded.should.be.equal(913216);
      arrayMethods.roundedDollar[99].rounded.should.be.equal(196086);
    });

  });

  describe('roundedDime', function() {

    it('should be an array of accounts with a modified `amount` value', function() {
      arrayMethods.roundedDime.should.have.length(100);
      arrayMethods.roundedDime.every(function (account){ return account.hasOwnProperty('amount'); }).should.be.true;
      arrayMethods.roundedDime.every(function (account){ return account.hasOwnProperty('rounded'); }).should.be.true;
    });

    it('each accounts `amount` value should be rounded to the nearest dime', function() {
      arrayMethods.roundedDime[0].amount.should.be.equal(822370.7);
      arrayMethods.roundedDime[7].amount.should.be.equal(231272);
      arrayMethods.roundedDime[99].amount.should.be.equal(196085.9);
    });

  });

  describe('sumOfBankBalances', function() {

    it('should be the sum of all amounts in bankBalances, rounded to the nearest cent', function() {
      arrayMethods.sumOfBankBalances.should.be.equal(55502603.80);
    });

  });

  describe('sumOfInterests', function() {

    it('should be the sum the 18.9% interest for all amounts in bankBalances, in the selected states, rounded to the nearest cent', function() {
      arrayMethods.sumOfInterests.should.be.equal(2504611.28);
    });

  });

  describe('stateSums', function() {

    it('should be a hash table', function() {
      chai.assert.isObject(arrayMethods.stateSums);
    });

    it('should have a key for each state', function() {
      Object.keys(arrayMethods.stateSums).should.have.length(37);
      Object.keys(arrayMethods.stateSums).should.contain('ME');
      Object.keys(arrayMethods.stateSums).should.contain('WI');
      Object.keys(arrayMethods.stateSums).should.contain('ID');
      Object.keys(arrayMethods.stateSums).should.contain('HI');
    });

    it('should have a keys with values being the sum for each state, rounded to the nearest cent', function() {
      arrayMethods.stateSums.ME.should.be.equal(2783817.70);
      arrayMethods.stateSums.WI.should.be.equal(2958669.10);
      arrayMethods.stateSums.ID.should.be.equal(461647.50);
      arrayMethods.stateSums.HI.should.be.equal(901770.4);
    });

  });

  describe('lowerSumStates', function() {

    it('should be an Array', function() {
      chai.assert.isArray(arrayMethods.lowerSumStates);
    });

    it('should contain only abbreviations of states who have sums of amounts that are less than 1,000,000', function() {
      arrayMethods.lowerSumStates.should.have.same.members([ 'MI', 'MD', 'IN', 'CA', 'MS', 'MT', 'MO', 'KY', 'AK', 'HI', 'ID' ]);
    });

  });

  describe('higherStateSums', function() {

    it('should be the sum of all amounts of every state, where the sum of amounts in the state is greater than 1,000,000', function() {
      arrayMethods.higherStateSums.should.be.equal(48629879);
    });

  });

  describe('areStatesInHigherStateSum should be true if all of these states have a sum of account values greater than 2,550,000', function() {

    it('should be the sum of all amounts of every state, where the sum of amounts in the state is greater than 1,000,000', function() {
      arrayMethods.areStatesInHigherStateSum.should.be.false;
    });

  });

  describe('anyStatesInHigherStateSum should be true if any of these states have a sum of account values greater than 2,550,000', function() {

    it('should be the sum of all amounts of every state, where the sum of amounts in the state is greater than 1,000,000', function() {
      arrayMethods.anyStatesInHigherStateSum.should.be.true;
    });

  });

  // describe('sumOfHighInterests', function() {

  //   it('should be the sum the 18.9% interest for all amounts in bankBalances, where the amount of the sum of interests in that state is greater than 50,000, in the selected states, rounded to the nearest cent', function() {
  //     arrayMethods.sumOfHighInterests.should.be.equal(7935913.99);
  //   });

  // });
});
