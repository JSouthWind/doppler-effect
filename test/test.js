var assert = require('assert');
import Consts from '../app/assets/scripts/modules/Constants';
import Doppler from '../app/assets/scripts/modules/Doppler';

var consts = new Consts();
var d = new Doppler();

describe('Function #sliderToInput()', function() {
    it('should return {val: -100, opacity: {color: "blue", num : < 1}} when the value is -100', function() {
      assert.deepEqual({val: consts.minInput, opacity: {color: 'blue', num: consts.opacityMax}}, d.sliderToInput(consts.minInput));
    });
  
  it('should return val: 100, color: "red" when the value is 100', function() {
    assert.deepEqual({val: consts.maxInput, opacity: {color: 'red', num: consts.opacityMax}}, d.sliderToInput(consts.maxInput));
  });
});

describe('Function #inputToSlider()', function() {
  it('should return {val: -100, opacity: {color: "blue", num : < 1}} when the value is -100', function() {
    assert.deepEqual({pos: consts.minInput, opacity: {color: 'blue', num: consts.opacityMax}}, d.inputToSlider(consts.minInput));
  });

  it('should return val: 100, color: "red" when the value is 100', function() {
    assert.deepEqual({pos: consts.maxInput, opacity: {color: 'red', num: consts.opacityMax}}, d.inputToSlider(consts.maxInput));
  });
  
  it('should return true when position > 0 when the value is 0', function() {
    assert.equal( true , d.inputToSlider(0).pos > 0);
  });
});