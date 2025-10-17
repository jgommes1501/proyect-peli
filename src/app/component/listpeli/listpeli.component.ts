import { Component, Input, OnInit } from '@angular/core';
import { Peliculas } from 'src/app/interface/peliculas';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listpeli',
  templateUrl: './listpeli.component.html',
  styleUrls: ['./listpeli.component.scss'],

  imports: [CommonModule, IonicModule]
})
export class ListpeliComponent  implements OnInit {
 @Input() peliculas!: Peliculas;

  constructor() { }

  ngOnInit() {}

}
