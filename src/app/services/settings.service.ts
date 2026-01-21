import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // 1. Importamos Storage
import { HttpClient } from '@angular/common/http'; // 1. Importar HttpClient
import { firstValueFrom } from 'rxjs';             // 1. Importar utilidad para Promesas
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Variable privada para guardar la instancia de la base de datos
  private _storage: Storage | null = null;

  // 2. Inyectamos el servicio Storage en el constructor
  constructor(private storage: Storage) {
    this.init(); // Iniciamos la base de datos al arrancar el servicio
  }

  /**
   * Inicializa la base de datos de Ionic Storage.
   * Es vital llamar a esto antes de intentar leer o escribir.
   */
  async init(): Promise<void> { // Añadimos el tipo de retorno explícito
    // Si ya está iniciada, no hacemos nada
    if (this._storage != null) {
      return;
    }

    // Creamos la instancia
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Guarda un valor en la base de datos asociado a una clave.
   * @param key La clave única (ej: 'modo_oscuro')
   * @param value El valor a guardar (ej: true, 'Javier', etc.)
   */
  public async set(key: string, value: any): Promise<void> {
    // Nos aseguramos de que esté iniciada
    await this.init();
    console.log(`Guardando ${key}:`, value);
    await this._storage?.set(key, value);
  }

  /**
   * Recupera un valor de la base de datos.
   * @param key La clave a buscar
   * @returns El valor guardado o null si no existe
   */
  public async get(key: string): Promise<any> {
    await this.init();
    const valor = await this._storage?.get(key);
    console.log(`Obteniendo ${key}:`, valor);
    return valor;
  }
  
  /**
   * Elimina un valor de la base de datos.
   */
  public async remove(key: string): Promise<void> {
    await this.init();
    await this._storage?.remove(key);
  }
}
