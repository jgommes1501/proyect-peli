import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonToggle, IonButtons, IonBackButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonButtons, IonBackButton, 
    IonList, IonListHeader, IonItem, IonLabel, IonToggle, IonInput,
    FormsModule
  ]
})
export class AjustesPage implements OnInit {
  
  modoOscuro: boolean = false; // Valor por defecto
  nombre: string = ''; // Nombre del usuario

  constructor(private settingsService: SettingsService) { }

  // ¡IMPORTANTE! Añadimos 'async' para poder usar 'await' dentro
  async ngOnInit() {
    // Al entrar, cargamos los valores guardados
    // Si no existe (es la primera vez), settingsService.get devuelve null, 
    // así que usamos '|| false' para que sea false por defecto.
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    this.nombre = await this.settingsService.get('nombre_usuario') || '';
    
    // Aplicamos el tema inmediatamente al entrar por si acaso
    this.aplicarTema(this.modoOscuro);
  }

  // Guardar nombre en la base de datos
  async guardarNombre() {
    await this.settingsService.set('nombre_usuario', this.nombre);
    console.log('Nombre guardado:', this.nombre);
  }

  // También debe ser async porque settingsService.set devuelve una promesa
  async cambiarModoOscuro() {
    // 1. Guardamos el nuevo valor en la base de datos
    await this.settingsService.set('modo_oscuro', this.modoOscuro);
    
    // 2. Aplicamos el cambio visualmente
    this.aplicarTema(this.modoOscuro);
    
    // 3. Log para depuración
    console.log('Modo oscuro cambiado a:', this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    // Añadimos o quitamos la clase 'dark' al elemento raíz (html)
    if (esOscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    console.log('Clases en html:', document.documentElement.className);
  }
}