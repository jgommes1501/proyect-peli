import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';
import { PhotoService } from 'src/app/services/photo.service';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cameraOutline, locate, map } from 'ionicons/icons';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class AjustesPage implements OnInit {
  
  modoOscuro: boolean = false; // Valor por defecto
  nombre: string = ''; // Nombre del usuario

  constructor(
    private settingsService: SettingsService,
    public photoService: PhotoService,
    public locationService: LocationService,
    private toastController: ToastController
  ) {
    addIcons({ cameraOutline, locate, map });
  }

  async obtenerGPS() {
    try {
      await this.locationService.obtenerPosicionActual();
    } catch (error) {
      console.error('El usuario denegó el permiso o el GPS está apagado', error);
    }
  }

  async addPhoto() {
    try {
      await this.photoService.addNewToGallery();
      const toast = await this.toastController.create({
        message: 'Foto de perfil actualizada.',
        duration: 1500,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();
    } catch (error: any) {
      const fueCancelado = `${error?.message || ''}`.toLowerCase().includes('cancel');
      if (!fueCancelado) {
        const toast = await this.toastController.create({
          message: 'No se pudo abrir la cámara/galería.',
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        });
        await toast.present();
      }
    }
  }

  async ionViewWillEnter() {
    await this.photoService.loadSavedPhoto();
    this.modoOscuro = await this.settingsService.get<boolean>('modo_oscuro') || false;
    this.aplicarTema(this.modoOscuro);
  }

  // ¡IMPORTANTE! Añadimos 'async' para poder usar 'await' dentro
  async ngOnInit() {
    // Al entrar, cargamos los valores guardados
    // Si no existe (es la primera vez), settingsService.get devuelve null, 
    // así que usamos '|| false' para que sea false por defecto.
    this.modoOscuro = await this.settingsService.get<boolean>('modo_oscuro') || false;
    this.nombre = await this.settingsService.get<string>('nombre_usuario') || '';
    await this.photoService.loadSavedPhoto();
    
    // Aplicamos el tema inmediatamente al entrar por si acaso
    this.aplicarTema(this.modoOscuro);
  }

  // Guardar nombre en la base de datos
  async guardarNombre() {
    await this.settingsService.set('nombre_usuario', this.nombre);
  }

  // También debe ser async porque settingsService.set devuelve una promesa
  async cambiarModoOscuro() {
    // 1. Guardamos el nuevo valor en la base de datos
    await this.settingsService.set('modo_oscuro', this.modoOscuro);
    
    // 2. Aplicamos el cambio visualmente
    this.aplicarTema(this.modoOscuro);
  }

  async alternarModoOscuro() {
    this.modoOscuro = !this.modoOscuro;
    await this.cambiarModoOscuro();
  }

  aplicarTema(esOscuro: boolean) {
    // Añadimos o quitamos la clase 'dark' al elemento raíz (html)
    if (esOscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}