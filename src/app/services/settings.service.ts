import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // 1. Importamos Storage
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Variable privada para guardar la instancia de la base de datos
  private _storage: Storage | null = null;
  private _initFailed = false;

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
    if (this._storage != null || this._initFailed) {
      return;
    }

    try {
      // Creamos la instancia
      const storage = await this.storage.create();
      this._storage = storage;
    } catch {
      // Fallback para despliegues web donde IndexedDB/Storage falle
      this._initFailed = true;
    }
  }

  /**
   * Guarda un valor en la base de datos asociado a una clave.
   * @param key La clave única (ej: 'modo_oscuro')
   * @param value El valor a guardar (ej: true, 'Javier', etc.)
   */
  public async set<T>(key: string, value: T): Promise<void> {
    // Nos aseguramos de que esté iniciada
    await this.init();

    if (this._storage) {
      await this._storage.set(key, value);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Recupera un valor de la base de datos.
   * @param key La clave a buscar
   * @returns El valor guardado o null si no existe
   */
  public async get<T>(key: string): Promise<T | null> {
    await this.init();

    if (this._storage) {
      const valor = await this._storage.get(key);
      return (valor ?? null) as T | null;
    }

    const raw = localStorage.getItem(key);
    if (raw == null) {
      return null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }
  
  /**
   * Elimina un valor de la base de datos.
   */
  public async remove(key: string): Promise<void> {
    await this.init();

    if (this._storage) {
      await this._storage.remove(key);
      return;
    }

    localStorage.removeItem(key);
  }
}
