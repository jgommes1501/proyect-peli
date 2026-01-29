import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonInput, IonTextarea, AlertController, ToastController, LoadingController } from '@ionic/angular/standalone';
import { Peliculas } from 'src/app/interface/peliculas';
import { PeliculasService } from 'src/app/services/peliculas';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonInput, IonTextarea, CommonModule, FormsModule]
})
export class DetalleTareaPage implements OnInit {
  pelicula?: Peliculas;
  cargando: boolean = true;
  editando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculasService: PeliculasService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
      await loading.present();
      try {
        // Esperamos la respuesta del servidor
        this.pelicula = await this.peliculasService.getPeliculaById(id);
      } catch (error) {
        console.error('Película no encontrada', error);
        this.router.navigate(['/home']);
        await this.mostrarError('Elemento no encontrado');
      } finally {
        this.cargando = false;
        await loading.dismiss();
      }
    }
  }

  /**
   * Guarda todos los cambios de la película (Caso C: Múltiples campos)
   * Se envía el objeto completo con todos los cambios ya aplicados.
   */
  async guardarCambios() {
    if (!this.pelicula) {
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Guardando...' });
    await loading.present();

    try {
      // Enviamos el objeto entero con todos los campos modificados
      await this.peliculasService.updatePelicula(this.pelicula);
      console.log('Todos los cambios guardados');

      // Salimos del modo edición
      this.editando = false;

      // Mostrar confirmación
      await this.mostrarToast('Película actualizada correctamente');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      await this.mostrarError('Error al guardar los cambios');
    } finally {
      await loading.dismiss();
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
            const loading = await this.loadingCtrl.create({ message: 'Eliminando...' });
            await loading.present();
            try {
              // Mejora 2: Borrar desde el servidor y redirigir
              if (this.pelicula) {
                await this.peliculasService.eliminarPelicula(this.pelicula.id);
                await this.mostrarToast('Película eliminada');
                this.router.navigate(['/home']);
              }
            } catch (error) {
              console.error('Error al eliminar:', error);
              await this.mostrarError('Error al eliminar la película');
            } finally {
              await loading.dismiss();
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

  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
      icon: 'alert-circle-outline'
    });
    await toast.present();
  }
}
