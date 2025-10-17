// Imports básicos de Angular y Ionic
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

// Imports de nuestra aplicación

import { CommonModule } from '@angular/common'; // Módulo necesario para usar *ngIf y *ngFor
import { Peliculas } from '../interface/peliculas';
import { ListpeliComponent } from '../component/listpeli/listpeli.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // Al ser un componente standalone, debemos importar aquí todo lo que usemos en la plantilla
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, // Componentes de Ionic
    CommonModule,
    ListpeliComponent // El módulo para las directivas
],
})
export class HomePage {

  // Esta es la lista de datos que mostraremos en la vista.
  // Es un array de objetos que deben cumplir la estructura de la interfaz 'Tarea'.
  listaDePeliculas: Peliculas[] = [
    { id: 1, /*img :"https://placehold.co/400x400/8d6e63/ffffff?text=Avatar",*/ nombre: "Gladiator", autor: "Ridley Scott", descripcion: "El general romano Máximo es el soporte más leal del emperador Marco Aurelio, que lo ha conducido de victoria en victoria. Sin embargo, Cómodo, el hijo de Marco Aurelio, está celoso del prestigio de Máximo y aún más del amor que su padre siente por él."  },
    { id: 2, /*img :"https://placehold.co/400x400/8d6e63/ffffff?text=Avatar2",*/ nombre: "Interestelar", autor: "Christopher Nolan", descripcion: "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí." },
    { id: 3, /*img :"https://placehold.co/400x400/8d6e63/ffffff?text=Avatar3",*/ nombre: "Prisioners", autor: "Denis Villeneuve", descripcion: "Keller Dover se enfrenta a la peor pesadilla para un padre: la desaparición de su hija de seis años junto a una amiga. Pese a ello, Keller todavía tiene una pista de la que puede tirar: una autocaravana que se encontraba aparcada en su calle." }
  ];

  constructor() {}
}