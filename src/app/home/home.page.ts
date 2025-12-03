import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ListpeliComponent } from '../component/listpeli/listpeli.component';
import { HeaderComponent } from '../component/header/header.component';
import { Peliculas } from '../interface/peliculas';
import { PeliculasService } from '../services/peliculas'; // ¡Importante!
import { addIcons } from 'ionicons';
import { filmOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, ListpeliComponent, HeaderComponent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // --- Control de estado de carga ---
  cargando: boolean = true;
  skeletonArray = Array(31); // Array para generar 31 skeletons

  // --- Variables del formulario ---
  nuevaPelicula: Peliculas = {
    id: 0,
    nombre: '',
    autor: '',
    descripcion: '',
    img: ''
  };
  
  // Ya no definimos la lista aquí con datos.
  // Esta propiedad guardará la lista de películas QUE NOS DE EL SERVICIO
  public listaDePeliculas: Peliculas[] = [];
  
  // Inyectamos el servicio
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private peliculasService: PeliculasService // Inyección de dependencias
  ) {
    addIcons({ filmOutline });
  }

  // Usamos ngOnInit para cargar los datos iniciales
  ngOnInit() {
    // Simulamos una carga de datos de 2 segundos
    setTimeout(() => {
      this.cargarPeliculas();
      this.cargando = false; // Cambiamos el estado a "cargado"
    }, 2000);
  }

  /**
   * Pide las películas al servicio y actualiza la lista local
   */
  cargarPeliculas() {
    this.listaDePeliculas = this.peliculasService.getPeliculas();
  }

  // --- Agregar película con avisos de Ionic ---
  async agregarPelicula() {
    // 1. Primero validamos que todos los campos estén completos
    if (!this.nuevaPelicula.nombre || !this.nuevaPelicula.autor || !this.nuevaPelicula.descripcion || !this.nuevaPelicula.img) {
      // Mostrar Toast si falta información
      const toast = await this.toastController.create({
        message: 'Completa todos los campos antes de continuar.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
      return;
    }

    // 2. Mostrar alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas agregar esta película?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            // 3. Si el usuario acepta, agregamos la película al servicio
            const exito = this.peliculasService.agregarPelicula(this.nuevaPelicula);

            if (exito) {
              // 4. Limpiar campos
              this.nuevaPelicula = { id: 0, nombre: '', autor: '', descripcion: '', img: '' };

              // 5. Volvemos a pedir la lista actualizada al servicio para refrescar la vista
              this.cargarPeliculas();

              // 6. Mostrar aviso de éxito con Toast
              const toast = await this.toastController.create({
                message: 'Película añadida con éxito.',
                duration: 2000,
                position: 'bottom',
                color: 'success'
              });
              await toast.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async mostrarInformacionFormulario() {
    const alert = await this.alertController.create({
      header: '📋 Información de la Página',
      message: `Esta página te permite agregar y visualizar tus películas favoritas y añadir nuevas.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  // --- Eliminar película ---
  async eliminarPelicula(pelicula: Peliculas) {
    // 1. Le pedimos al servicio que elimine la película
    const exito = this.peliculasService.eliminarPelicula(pelicula.id);
    
    if (exito) {
      // 2. Volvemos a cargar la lista actualizada del servicio
      this.cargarPeliculas();
      
      // 3. Mostramos un Toast de confirmación
      const toast = await this.toastController.create({
        message: `"${pelicula.nombre}" ha sido eliminada.`,
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    }
  }

  // --- Ejemplo de alerta simple informativa ---
  async abrirModalDetalle() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Esta aplicación te permite agregar tus películas favoritas.',
      buttons: ['OK']
    });
    await alert.present();
  }
}