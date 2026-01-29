import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SettingsService } from './services/settings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, CommonModule],
})
export class AppComponent {
  isDarkMode: boolean = false;
  
  constructor(private settingsService: SettingsService) {}

  // Angular ejecutará este método automáticamente al iniciar, 
  // aunque no implementemos la interfaz OnInit explícitamente.
  // ¡IMPORTANTE! Añadimos 'async' para esperar a la base de datos.
  async ngOnInit() {
    await this.cargarPreferencias();
  }

  async cargarPreferencias() {
    // Leemos el ajuste guardado
    const modoOscuro = await this.settingsService.get<boolean>('modo_oscuro');
    
    // Si era true, activamos el modo oscuro inmediatamente
    if (modoOscuro) {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }
}