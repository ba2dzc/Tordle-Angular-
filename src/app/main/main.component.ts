import { UpperCasePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }
  area = [
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }]]

  satir = 0;
  sutun = 0;
  mesaj = "";
  klavye1 = [
    { tus: 'E' }, { tus: 'R' }, { tus: 'T' }, { tus: 'Y' }, { tus: 'U' },
    { tus: 'I' }, { tus: 'O' }, { tus: 'P' }, { tus: 'Ğ' }, { tus: 'Ü' }
  ]
  klavye2 = [
    { tus: 'A' }, { tus: 'S' }, { tus: 'D' }, { tus: 'F' }, { tus: 'G' },
    { tus: 'H' }, { tus: 'J' }, { tus: 'K' }, { tus: 'L' }, { tus: 'Ş' },
    { tus: 'İ' }
  ]
  klavye3 = [
    { tus: 'ENTER' }, { tus: 'Z' }, { tus: 'C' }, { tus: 'V' },
    { tus: 'B' }, { tus: 'N' }, { tus: 'M' }, { tus: 'Ö' }, { tus: 'Ç' },
    { tus: 'BACKSPACE' }
  ]
  keyboard = [...this.klavye1, ...this.klavye2, ...this.klavye3];

  catchbtn(tus: any) {
    if (this.sutun < 5) {
      
      this.area[this.satir][this.sutun] = { tus: tus }
      console.log({ area: this.area })
      this.sutun++;
    }
  }
  deletebtn() {
    if (this.sutun != 0) {
      this.sutun--;
      this.area[this.satir][this.sutun] = { tus: ' ' }
    }
  }
  async gonder() {
    let veri = "";
    if (this.sutun > 4) {
      for (let index = 0; index < 5; index++) {
        veri = veri + this.area[this.satir][index].tus
      }
      console.log(veri)
      this.satir++;
      this.sutun = 0;
      this.mesaj = "hobbidi"
    }
    else {
      this.mesaj = "Bu kelime geçersiz.";
    }
    const msg = document.getElementById('hideMe');
    
    if (msg!=null) {
      msg.style.opacity='1';
      await new Promise(f => setTimeout(f, 1000));
      msg.style.opacity='0';
    }
    
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    var key = event.key.toLocaleUpperCase('tr-TR')
    for (let index = 0; index < this.keyboard.length; index++) {
      var ctrl = this.keyboard[index].tus
      if (key === ctrl) {
        if (key == "BACKSPACE") {
          this.deletebtn()
        }
        else if (key == "ENTER") {
          this.gonder()
        }
        else {
          this.catchbtn(key);
        }
      };
    }
  }

  ngOnInit(): void {
  }

}
