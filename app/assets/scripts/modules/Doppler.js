import Constants from './Constants';
class Doppler {
  constructor() {
    this.consts = new Constants();
    this.minPos = this.consts.minInput + this.consts.moveInterval;
    this.maxPos = this.consts.maxInput + this.consts.moveInterval;
    this.minLog = Math.log(-this.minPos);
    this.maxLog = Math.log(-this.maxPos);
    this.opacityMin = 0;
    this.opacityMax = this.consts.opacity;
    
  }

  sliderToInput(pos) {
    var posLog = Math.log(-this.consts.moveInterval - pos),
        inputVal = this.scaleAtoB(posLog, this.minLog, this.maxLog, this.consts.minInput, this.consts.maxInput);
    return {val: Math.round(inputVal * 10) / 10, 
            opacity: this.changeColor(inputVal)};
  }

  inputToSlider(val) {
    var posLog = this.scaleAtoB(val, this.consts.minInput, this.consts.maxInput, this.minLog, this.maxLog);
    var pos = -Math.exp(posLog) - this.consts.moveInterval;
    return {pos: Math.round(pos), opacity: this.changeColor(val)};
  }

  changeColor(num) {
    return {color: num > 0 ? 'red' : 'blue', 
            num: this.scaleAtoB(Math.abs(num), 0, this.consts.maxInput, 0, this.consts.opacityMax)};
    
  }

  //scale one interval to another
  scaleAtoB(x, minA, maxA, minB, maxB) {
    var scale = (maxB - minB) / (maxA - minA);
    return (x - minA) * scale + minB;
  }
}

export default Doppler;