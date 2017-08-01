import Doppler from './Doppler';

class PutToHtml {
  constructor() {
    this.input = document.getElementById('input');
    this.slider = document.getElementById('slider');
    this.overlay = document.getElementById('overlay');
    
    //choose the right function interval
    this.moveInterval = -150;
    this.minInput = -100;
    this.maxInput = 100;
    this.opacityMax = 0.6;

    this.doppler = new Doppler(this.moveInterval, this.minInput, this.maxInput, this.opacityMax);
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
    this.slider.setAttribute('min', this.minInput);
    this.slider.setAttribute('max', this.maxInput);
    this.input.setAttribute('min', this.minInput);
    this.input.setAttribute('max', this.maxInput);
  }
  
  //limit input
  limitInput(val) {
    if (val > 100) {
      val = 100
    } else if (val < -100) val = -100;
    this.input.value = val;
    return val;
  }
  
}

export default PutToHtml;