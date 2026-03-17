import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Peliculas as PeliculasInterface } from '../interface/peliculas';
import { environment } from 'src/environments/environment';

const HTTP_TIMEOUT_MS = 50000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout: el servidor no respondió en ${ms / 1000}s`)), ms)
    )
  ]);
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  // Definimos la URL base de nuestra API (puerto 3000 por defecto de JSON Server)
  // Asegúrate de que '/Peliculas' coincide con la colección en tu db.json
  private _url = `${environment.apiUrl}/Peliculas`;
  private readonly useLocalMode = environment.production;
  private readonly localStorageKey = 'peliculas_local';
  private readonly localSeedUrl = 'assets/db.json';

  constructor(private http: HttpClient) { }

  private async getLocalPeliculas(): Promise<PeliculasInterface[]> {
    const stored = localStorage.getItem(this.localStorageKey);
    if (stored) {
      return JSON.parse(stored) as PeliculasInterface[];
    }

    const seed = await firstValueFrom(this.http.get<{ Peliculas: PeliculasInterface[] }>(this.localSeedUrl));
    const initial = seed?.Peliculas ?? [];
    localStorage.setItem(this.localStorageKey, JSON.stringify(initial));
    return initial;
  }

  private setLocalPeliculas(peliculas: PeliculasInterface[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(peliculas));
  }

  /**
   * Obtiene todas las películas del servidor (GET /peliculas)
   */
  async getPeliculas(params?: { _sort?: string; _order?: 'asc' | 'desc' }): Promise<PeliculasInterface[]> {
    if (this.useLocalMode) {
      return this.getLocalPeliculas();
    }

    // Nota: No usamos _order porque JSON Server tiene un bug con desc
    // La ordenación se hace client-side en el componente
    let httpParams = new HttpParams();
    
    return withTimeout(firstValueFrom(this.http.get<PeliculasInterface[]>(this._url, { params: httpParams })), HTTP_TIMEOUT_MS);
  }

  /**
   * Obtiene una película por su ID (GET /peliculas/ID)
   */
  async getPeliculaById(id: string | number): Promise<PeliculasInterface> {
    if (this.useLocalMode) {
      const peliculas = await this.getLocalPeliculas();
      const pelicula = peliculas.find(p => String(p.id) === String(id));
      if (!pelicula) {
        throw new Error('Película no encontrada');
      }
      return pelicula;
    }

    const urlEspecifica = `${this._url}/${id}`;
    return withTimeout(firstValueFrom(this.http.get<PeliculasInterface>(urlEspecifica)), HTTP_TIMEOUT_MS);
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

    if (this.useLocalMode) {
      const peliculas = await this.getLocalPeliculas();
      const maxId = peliculas.reduce((max, p) => {
        const current = Number.parseInt(String(p.id), 10);
        return Number.isNaN(current) ? max : Math.max(max, current);
      }, 0);

      const nueva = { ...pelicula, id: maxId + 1 };
      peliculas.push(nueva);
      this.setLocalPeliculas(peliculas);
      return nueva;
    }

    // Creamos una copia sin el ID para que JSON Server lo asigne automáticamente
    const { id, ...peliculaSinId } = pelicula;
    return withTimeout(firstValueFrom(this.http.post<PeliculasInterface>(this._url, peliculaSinId)), HTTP_TIMEOUT_MS);
  }

  /**
   * Actualiza una película existente (PUT /peliculas/ID)
   * Se envía el objeto completo con los cambios ya aplicados.
   */
  async updatePelicula(pelicula: PeliculasInterface): Promise<PeliculasInterface> {
    if (this.useLocalMode) {
      const peliculas = await this.getLocalPeliculas();
      const index = peliculas.findIndex(p => String(p.id) === String(pelicula.id));
      if (index === -1) {
        throw new Error('Película no encontrada');
      }

      peliculas[index] = { ...pelicula };
      this.setLocalPeliculas(peliculas);
      return peliculas[index];
    }

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
    if (this.useLocalMode) {
      const peliculas = await this.getLocalPeliculas();
      const filtered = peliculas.filter(p => String(p.id) !== String(id));
      this.setLocalPeliculas(filtered);
      return;
    }

    const urlEspecifica = `${this._url}/${id}`;
    return withTimeout(firstValueFrom(this.http.delete<void>(urlEspecifica)), HTTP_TIMEOUT_MS);
  }
}

