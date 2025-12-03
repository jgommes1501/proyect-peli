import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent} from '@ionic/angular/standalone';
import { Peliculas } from 'src/app/interface/peliculas';
import { PeliculasService } from 'src/app/services/peliculas';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, CommonModule, FormsModule]
})
export class DetalleTareaPage implements OnInit {
  pelicula?: Peliculas;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService
  ) { }

  ngOnInit() {
    // Obtenemos el ID de la película desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Obtenemos la película del servicio
    this.pelicula = this.peliculasService.getPeliculaById(id);
  }
}
