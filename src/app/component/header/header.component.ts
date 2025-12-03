import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HeaderComponent  implements OnInit {

  @Input() titulo: string = 'Lista de Películas';
  @Input() subtitulo: string = 'Tu colección de cine';

  constructor() { }

  ngOnInit() {}

}
