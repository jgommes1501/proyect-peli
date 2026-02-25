import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public latitud: number | undefined;
  public longitud: number | undefined;

  constructor() { }

  async obtenerPosicionActual(): Promise<void> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();

      this.latitud = coordinates.coords.latitude;
      this.longitud = coordinates.coords.longitude;

      console.log('Posición actual:', this.latitud, this.longitud);
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
      throw error;
    }
  }
}