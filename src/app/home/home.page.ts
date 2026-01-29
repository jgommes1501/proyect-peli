import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ListpeliComponent } from '../component/listpeli/listpeli.component';
import { HeaderComponent } from '../component/header/header.component';
import { Peliculas } from '../interface/peliculas';
import { PeliculasService } from '../services/peliculas';
import { SettingsService } from '../services/settings.service';
import { addIcons } from 'ionicons';
import { filmOutline, settingsOutline } from 'ionicons/icons';

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
  skeletonArray = Array(31);
  saludoUsuario: string = 'Hola';

  // --- Variables del formulario ---
  nuevaPelicula: Peliculas = {
    id: 0,
    nombre: '',
    autor: '',
    descripcion: '',
    img: ''
  };
  
  public listaDePeliculas: Peliculas[] = [];
  public terminoBusqueda: string = '';
  public ordenSeleccionado: 'recent' | 'az' | 'za' = 'recent';
  
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private peliculasService: PeliculasService,
    private settingsService: SettingsService,
    private loadingCtrl: LoadingController
  ) {
    addIcons({ filmOutline, settingsOutline });
  }

  // Cargar el saludo personalizado al iniciar el componente por primera vez
  async ngOnInit() {
    const nombre = await this.settingsService.get<string>('nombre_usuario') || 'Visitante';
    this.saludoUsuario = `Hola, ${nombre}`;
  }

  // Usar ionViewWillEnter en lugar de ngOnInit para recargar datos cada vez que se entra en la página
  async ionViewWillEnter() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando películas...',
      spinner: 'bubbles'
    });
    await loading.present();

    try {
      // Cargamos el nombre del usuario para mostrar saludo personalizado
      const nombre = await this.settingsService.get<string>('nombre_usuario') || 'Visitante';
      this.saludoUsuario = `Hola, ${nombre}`;

      // Ahora esperamos a que lleguen los datos del servidor
      this.cargando = true;
      const params = this.construirParametros();
      this.listaDePeliculas = await this.peliculasService.getPeliculas(params);
    } catch (error) {
      console.error('Error al cargar las películas:', error);
      await this.mostrarError('No se pudieron cargar las películas. Revisa tu conexión.');
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }

  construirParametros() {
    const params: { nombre_like?: string; _sort?: string; _order?: 'asc' | 'desc' } = {};

    if (this.terminoBusqueda && this.terminoBusqueda.trim().length > 0) {
      params.nombre_like = this.terminoBusqueda.trim();
    }

    switch (this.ordenSeleccionado) {
      case 'az':
        params._sort = 'nombre';
        params._order = 'asc';
        break;
      case 'za':
        params._sort = 'nombre';
        params._order = 'desc';
        break;
      case 'recent':
      default:
        // No añadimos sort/order para mostrar orden natural del servidor
        break;
    }

    console.log('Parámetros construidos:', params);
    return params;
  }

  async onBuscar(event: any) {
    this.terminoBusqueda = event?.detail?.value || '';
    console.log('Término de búsqueda:', this.terminoBusqueda);
    await this.cargarDatos();
  }

  async onOrdenar(event: any) {
    this.ordenSeleccionado = event?.detail?.value || 'recent';
    console.log('Orden seleccionado:', this.ordenSeleccionado);
    await this.cargarDatos();
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

  // --- Agregar película con avisos de Ionic ---
  async agregarPelicula() {
    // 1. Primero validamos que todos los campos estén completos
    if (!this.nuevaPelicula.nombre || !this.nuevaPelicula.autor || !this.nuevaPelicula.descripcion || !this.nuevaPelicula.img) {
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
            const loading = await this.loadingCtrl.create({ message: 'Guardando...' });
            await loading.present();

            try {
              // 3. Agregamos la película al servidor
              await this.peliculasService.agregarPelicula(this.nuevaPelicula);

              // 4. Limpiar campos
              this.nuevaPelicula = { id: 0, nombre: '', autor: '', descripcion: '', img: '' };

              // 5. Recargamos la lista desde el servidor
              await loading.dismiss();
              await this.cargarDatos();

              // 6. Mostrar aviso de éxito
              const toast = await this.toastController.create({
                message: 'Película añadida con éxito.',
                duration: 2000,
                position: 'bottom',
                color: 'success'
              });
              await toast.present();
            } catch (error) {
              console.error('Error al agregar película:', error);
              await loading.dismiss();
              await this.mostrarError('Error al guardar la película');
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
    const loading = await this.loadingCtrl.create({ message: 'Eliminando...' });
    await loading.present();

    try {
      // 1. Llamamos al servicio para eliminar la película del servidor
      await this.peliculasService.eliminarPelicula(pelicula.id);

      // 2. Recargamos la lista desde el servidor
      await this.cargarDatos();

      // 3. Mostramos un Toast de confirmación
      const toast = await this.toastController.create({
        message: `"${pelicula.nombre}" ha sido eliminada.`,
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    } catch (error) {
      console.error('Error al eliminar película:', error);
      await this.mostrarError('Error al eliminar la película');
    } finally {
      await loading.dismiss();
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