import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Peliculas as PeliculasInterface } from '../interface/peliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  // Definimos la URL base de nuestra API (puerto 3000 por defecto de JSON Server)
  // Asegúrate de que '/Peliculas' coincide con la colección en tu db.json
  private _url = 'http://localhost:3000/Peliculas';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las películas del servidor (GET /peliculas)
   */
  async getPeliculas(): Promise<PeliculasInterface[]> {
    return firstValueFrom(this.http.get<PeliculasInterface[]>(this._url));
  }

  /**
   * Obtiene una película por su ID (GET /peliculas/ID)
   */
  async getPeliculaById(id: string | number): Promise<PeliculasInterface> {
    const urlEspecifica = `${this._url}/${id}`;
    return firstValueFrom(this.http.get<PeliculasInterface>(urlEspecifica));
  }

  /**
   * Añade una nueva película al servidor (POST /peliculas)
   */
  async agregarPelicula(pelicula: PeliculasInterface): Promise<PeliculasInterface> {
    // Validamos que todos los campos requeridos estén completos
    if (
      pelicula.nombre.trim().length === 0 ||
      pelicula.autor.trim().length === 0 ||
      pelicula.descripcion.trim().length === 0 ||
      pelicula.img.trim().length === 0
    ) {
      throw new Error('Completa todos los campos requeridos');
    }

    // Creamos una copia sin el ID para que JSON Server lo asigne automáticamente
    const { id, ...peliculaSinId } = pelicula;
    return firstValueFrom(this.http.post<PeliculasInterface>(this._url, peliculaSinId));
  }

  /**
   * Actualiza una película existente (PUT /peliculas/ID)
   * Se envía el objeto completo con los cambios ya aplicados.
   */
  async updatePelicula(pelicula: PeliculasInterface): Promise<PeliculasInterface> {
    // Construimos la URL específica con el ID de la película
    const urlEspecifica = `${this._url}/${pelicula.id}`;

    // Hacemos la petición PUT enviando el objeto modificado
    return firstValueFrom(
      this.http.put<PeliculasInterface>(urlEspecifica, pelicula)
    );
  }

  /**
   * Elimina una película del servidor (DELETE /peliculas/ID)
   */
  async eliminarPelicula(id: number): Promise<void> {
    const urlEspecifica = `${this._url}/${id}`;
    return firstValueFrom(this.http.delete<void>(urlEspecifica));
  }
}

