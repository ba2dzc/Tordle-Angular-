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

  constructor(private http: HttpClient) { }
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
  url = "https://sozluk.gov.tr/gts?ara=" + this.cevap.toLocaleLowerCase();
  public sozluk: Array<any>[] = [];
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

  tahmin:Array<string[]>= [[], [], [], [], [], []]
  paylas(){
    var d=""
    this.tahmin.forEach(element => {
      d+=element
    });
  }

  kelimeSeç() {
    var index = Math.floor(Math.random() * 5535)
    var cevap = kelime[index];
    return cevap
  }

yenile():void{
  window.location.reload();
}

  async bildir(sure: number) {
    var kopyala=this.tahmin
    const msg = document.getElementById('hideMe');
    var txt=document.createElement("h6")
    

    if (msg != null && sure<6000) {
      txt.textContent=this.mesaj
      msg.appendChild(txt)
      msg.style.opacity = '1';
      await new Promise(f => setTimeout(f, sure));
      msg.style.opacity = '0';
      msg.removeChild(txt)
    }
    else if(msg != null && sure>6000){
      txt.textContent=this.mesaj+" Cevap : "+this.cevap
      msg.appendChild(txt)
      var br=document.createElement("hr")
      msg.appendChild(br)

      var paylas=document.createElement("button")
      paylas.textContent="Paylaş"
      var cevap=this.cevap
      paylas.className="btn btn-outline-light"
      paylas.onclick=function copy(){
        var d="Tordle sonucum.\n" + cevap + "\n"
        var a=""
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 5; j++) {
            if(kopyala[i][j]!=null)
            a+=kopyala[i][j]
          }
          d+=a + "\n"
          a=""
          txt.textContent="Sonuçlar panoya kopyalandı."
        };
        navigator.clipboard.writeText(d).then().catch(e => console.error(e));
        console.log(d)
      }
      paylas.style.marginRight="10px"

      var yenile=document.createElement("button")
      yenile.textContent="Yeni Oyun"
      yenile.className="btn btn-outline-light"
      yenile.onclick= function yenile(){window.location.reload();}
      msg.appendChild(paylas)
      msg.appendChild(yenile)
      await new Promise(f => setTimeout(f, 1500));
      msg.style.opacity = '1'
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

        for (let index = 0; index < 5; index++) {
          this.area[this.satir].map(async (item, index) => {
            var box = document.getElementById("box_" + this.satir + index)
            if (this.cevap.includes(item.tus)) {
              if (item.tus == this.cevap[index]) {
                box?.classList.add("yesil")
                this.tahmin[this.satir][index]="🟩"
                 
              }
              else {
                box?.classList.add("sari")
                this.tahmin[this.satir][index]="🟨"
              }
            }
            else {
              box?.classList.add("gri")
              this.tahmin[this.satir][index]="⬛️"
            }
          }
          )
        }

        if (veri === this.cevap) {
          fetch(this.url)
            .then(res => res.json())
          this.mesaj = "Bravo doğru cevabı buldun."
          this.bildir(60000)
          this.satir = 6;
          this.sutun=6
          console.log(this.tahmin)
        }

        console.log(veri)
        this.satir++;
        if (this.satir == 6) {
          this.mesaj = "Malesef bilemedin."
          this.bildir(60000)
          console.log(this.tahmin)
        }
        this.sutun = 0;
      }
    }
    else {
      if(this.satir<6){
      this.mesaj = "Yetersiz harf sayısı.";
      this.bildir(1000)}
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
    this.http.get<Array<any>>(this.url).subscribe(data => {
      this.sozluk = data;


    })

  }

}
