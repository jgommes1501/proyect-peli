import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, AlertController, ToastController } from '@ionic/angular/standalone';
import { Peliculas } from 'src/app/interface/peliculas';
import { PeliculasService } from 'src/app/services/peliculas';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, CommonModule, FormsModule]
})
export class DetalleTareaPage implements OnInit {
  pelicula?: Peliculas;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculasService: PeliculasService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Obtenemos el ID de la película desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Obtenemos la película del servicio
    this.pelicula = this.peliculasService.getPeliculaById(id);

    // Mejora 5: Manejo de errores - si no existe la película, redirigir a home
    if (!this.pelicula) {
      this.router.navigate(['/home']);
      this.mostrarToast('Elemento no encontrado');
    }
  }

  /**
   * Mejora 2 y 4: Eliminar con confirmación
   */
  async eliminarPelicula() {
    // Mejora 4: Mostrar alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar "${this.pelicula?.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            // Mejora 2: Borrar y redirigir
            if (this.pelicula) {
              this.peliculasService.eliminarPelicula(this.pelicula.id);
              await this.mostrarToast('Película eliminada');
              this.router.navigate(['/home']);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Mostrar un toast (notificación temporal)
   */
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
