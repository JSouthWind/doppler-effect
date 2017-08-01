class Doppler {
  constructor(moveInterval, minInput, maxInput, opacity) {
    this.moveInterval = moveInterval;
    this.minInput = minInput;
    this.maxInput = maxInput;
    this.minPos = minInput + moveInterval;
    this.maxPos = maxInput + moveInterval;
    this.minLog = Math.log(-this.minPos);
    this.maxLog = Math.log(-this.maxPos);
    this.opacityMin = 0;
    this.opacityMax = opacity;
  }

  sliderToInput(pos) {
    var posLog = Math.log(-this.moveInterval - pos),
        inputVal = this.scaleAtoB(posLog, this.minLog, this.maxLog, this.minInput, this.maxInput);
    return {val: Math.round(inputVal * 10) / 10, 
            opacity: this.changeColor(inputVal)};
  }

  inputToSlider(val) {
    var posLog = this.scaleAtoB(val, this.minInput, this.maxInput, this.minLog, this.maxLog);
    var pos = -Math.exp(posLog) - this.moveInterval;
    return {pos: pos, opacity: this.changeColor(val)};
  }

  changeColor(num) {
    return {color: num > 0 ? 'red' : 'blue', 
            num: this.scaleAtoB(Math.abs(num), 0, this.maxInput, 0, this.opacityMax)};
  }

  //scale one interval to another
  scaleAtoB(x, minA, maxA, minB, maxB) {
    var scale = (maxB - minB) / (maxA - minA);
    return (x - minA) * scale + minB;
  }
}

export default Doppler;