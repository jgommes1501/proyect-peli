import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// 1. Importamos estas utilidades
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // 2. Configuramos Ionic Storage
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__mydb', // Nombre de la base de datos (puedes poner el nombre de tu app)
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage] // Orden de preferencia
      })
    ),
  ],
});