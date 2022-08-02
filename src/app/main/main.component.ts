import { UpperCasePipe } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { kelime } from './words';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private http:HttpClient) { }
  area = [
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }],
    [{ tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }, { tus: '' }]]
  @ViewChildren('denenen') denenenSat!: QueryList<ElementRef>;
  satir = 0;
  sutun = 0;
  mesaj = "";
  cevap = this.kelimeSeç();
  url="https://sozluk.gov.tr/gts?ara="+this.cevap.toLocaleLowerCase();
  public sozluk:Array<any>[]=[];
  harfler = (Array.from(this.cevap));

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

  kelimeSeç() {
    var index = Math.floor(Math.random() * 5535)
    var cevap = kelime[index];
    return cevap
  }


  async bildir(sure: number) {
    const msg = document.getElementById('hideMe');

    if (msg != null) {
      msg.textContent=this.mesaj
      msg.style.opacity = '1';
      await new Promise(f => setTimeout(f, sure));
      msg.style.opacity = '0';
    }
  }

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
      this.area[this.satir][this.sutun] = { tus: '' }
    }
  }


  async gonder() {
    console.log(this.cevap)
    let veri = "";
    let verindex = new Array;

    if (this.sutun > 4) {
      for (let index = 0; index < 5; index++) {
        veri = veri + this.area[this.satir][index].tus
        verindex.push(this.area[this.satir][index].tus)
        // console.log(verindex[index])
        // console.log(this.harfler[index])
      }
      if (!kelime.includes(veri)) {
        this.mesaj = "Bu kelime geçersiz"
        this.bildir(1000)
        const denenensat = this.denenenSat.get(this.satir)?.nativeElement as HTMLElement;
        denenensat.classList.add('salla');
        setTimeout(() => {
          denenensat.classList.remove('salla')
        }, 500);
      }
      else {
        // const harfler:{[tus:string]:number}={};
        // for(const harf of this.cevap){
        //   const durum=harfler[harf];
        //   if(durum==null){
        //     harfler[harf]=0;
        //   } harfler[harf]++;
        // } console.log(harfler)
        if (veri === this.cevap) {
          fetch(this.url)
          .then(res=>res.json())
          this.mesaj = "Bravo"
          this.bildir(60000)
        }

        for (let index = 0; index < 5; index++) {
          this.area[this.satir].map(async (item, index) => {
            var box = document.getElementById("box_" + this.satir + index)
            if (this.cevap.includes(item.tus)) {
              if (item.tus == this.cevap[index]){
                box?.classList.add("yesil")
                await this.wait(180);}
                else{
              box?.classList.add("sari")
              await this.wait(180);}
              }
            else{
              box?.classList.add("gri")
              await this.wait(180);}
          }
          )
          await this.wait(180);
        }
        console.log(veri)
        this.satir++;
        this.sutun = 0;
      }
    }
    else {
      this.mesaj = "Yetersiz harf sayısı.";
      this.bildir(1000)
    }

  }
  private async wait(ms: number) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    })
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
    this.http.get<Array<any>>(this.url).subscribe(data=>{
      this.sozluk=data;
      
      
    })
    
  }

}
