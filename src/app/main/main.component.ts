import { Component, OnInit } from '@angular/core';

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

  klavye1 = [
    { tus: 'E' },    { tus: 'R' },    { tus: 'T' },    { tus: 'Y' },    { tus: 'U' },
    { tus: 'I' },    { tus: 'O' },    { tus: 'P' },    { tus: 'Ğ' },    { tus: 'Ü' }
  ]
  klavye2 = [
    { tus: 'A' },    { tus: 'S' },    { tus: 'D' },    { tus: 'F' },    { tus: 'G' },
    { tus: 'H' },    { tus: 'J' },    { tus: 'K' },    { tus: 'L' },    { tus: 'Ş' },
    { tus: 'İ' }
  ]
  klavye3 = [
    { tus: 'Enter' },    { tus: 'Z' },    { tus: 'C' },    { tus: 'V' },
    { tus: 'B' },    { tus: 'N' },    { tus: 'M' },    { tus: 'Ö' },    { tus: 'Ç' },
    { tus: 'Sil' }
  ]
  ngOnInit(): void {
  }

}
