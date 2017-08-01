import Constants from './Constants';
import Doppler from './Doppler';

class PutToHtml {
  constructor() {
    this.input = document.getElementById('input');
    this.slider = document.getElementById('slider');
    this.overlay = document.getElementById('overlay');
    this.consts = new Constants();
    this.doppler = new Doppler(this.consts.moveInterval, this.consts.minInput, this.consts.maxInput, this.consts.opacityMax);
    this.setMaxMinControls();
    
    //connect input to slider
    this.doppler.inputToSlider(0);
    
    this.events();
  }
  
  events(){
    this.input.oninput = this.setSlider.bind(this);
    this.slider.oninput = this.setInput.bind(this);
  }
  
  setSlider(){
    var obj = this.doppler.inputToSlider(this.limitInput(this.input.value));
    this.overlay.style.opacity = obj.opacity.num;
    this.overlay.className = obj.opacity.color;
    this.slider.value = obj.pos;
  }
  
  setInput(){
    var obj = this.doppler.sliderToInput(this.slider.value);
    this.overlay.style.opacity = obj.opacity.num;
    this.overlay.className = obj.opacity.color;
    this.input.value = obj.val;
  }
  
  setMaxMinControls() {
    this.slider.setAttribute('min', this.consts.minInput);
    this.slider.setAttribute('max', this.consts.maxInput);
    this.input.setAttribute('min', this.consts.minInput);
    this.input.setAttribute('max', this.consts.maxInput);
  }
  
  //limit input
  limitInput(val) {
    if (val > this.consts.maxInput) {
      val = this.consts.maxInput
    } else if (val < this.consts.minInput) val = this.consts.minInput;
    this.input.value = val;
    return val;
  }
  
}

export default PutToHtml;