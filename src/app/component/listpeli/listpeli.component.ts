import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Peliculas } from 'src/app/interface/peliculas';
// 1. Importamos las herramientas para gestos
import { GestureController, Gesture } from '@ionic/angular/standalone';

@Component({
  selector: 'app-listpeli',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './listpeli.component.html',
  styleUrls: ['./listpeli.component.scss']
})
export class ListpeliComponent implements AfterViewInit {
  @Input() peliculas!: Peliculas;
  @Output() eliminar = new EventEmitter<Peliculas>();
  // 2. Obtenemos una referencia al elemento #card del HTML
  @ViewChild('card', { read: ElementRef }) card!: ElementRef;

  // 3. Inyectamos el GestureController
  constructor(private gestureCtrl: GestureController) { }

  // 4. Este método se ejecuta cuando la vista ya está lista
  ngAfterViewInit() {
    // 5. Creamos el gesto
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.card.nativeElement, // El elemento al que se aplica el gesto
      gestureName: 'swipe-delete',
      threshold: 15, // Mínimo de píxeles para que el gesto empiece
      onMove: ev => {
        // Mueve la tarjeta horizontalmente siguiendo el dedo del usuario
        // Solo permitimos mover hacia la izquierda (valor negativo)
        if (ev.deltaX < 0) {
          this.card.nativeElement.style.transform = `translateX(${ev.deltaX}px)`;
        }
      },
      onEnd: ev => {
        // Al levantar el dedo, decidimos qué hacer
        const swipeThreshold = this.card.nativeElement.offsetWidth * 0.4; // 40% del ancho

        if (Math.abs(ev.deltaX) > swipeThreshold) {
          // Si se ha deslizado lo suficiente, lo movemos fuera de la pantalla
          this.card.nativeElement.style.transform = `translateX(-100%)`;
          // Esperamos un poco para que se vea la animación y luego emitimos el evento
          setTimeout(() => {
            this.eliminar.emit(this.peliculas);
          }, 200);
        } else {
          // Si no, devolvemos la tarjeta a su posición original con una animación
          this.card.nativeElement.style.transition = '.2s ease-out';
          this.card.nativeElement.style.transform = `translateX(0px)`;
        }
      },
    });

    // 6. Activamos el gesto
    gesture.enable(true);
  }
}
