import { Injectable } from '@angular/core';
import { Peliculas as PeliculasInterface } from '../interface/peliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private listaDePeliculas: PeliculasInterface[] = [
    {
      id: 1,
      nombre: "Gladiator",
      autor: "Ridley Scott",
      descripcion: "El general romano Máximo...",
      img: "assets/images/Gladiator.png"
    },
    {
      id: 2,
      nombre: "Interestelar",
      autor: "Christopher Nolan",
      descripcion: "Un grupo de científicos...",
      img: "assets/images/Int.jpg"
    },
    {
      id: 3,
      nombre: "Prisioners",
      autor: "Denis Villeneuve",
      descripcion: "Keller Dover se enfrenta a la peor pesadilla...",
      img: "assets/images/prisoners.jpg"
    },
    {
      id: 4,
      nombre: "Inception",
      autor: "Christopher Nolan",
      descripcion: "Dom Cobb es un ladrón...",
      img: "assets/images/Inception.jpg"
    },
    {
      id: 5,
      nombre: "Malditos Bastardos",
      autor: "Quentin Tarantino",
      descripcion: "Un grupo de soldados judíos busca venganza...",
      img: "assets/images/Malditos_bastard.jpg"
    },
    {
      id: 6,
      nombre: "Forrest Gump",
      autor: "Robert Zemeckis",
      descripcion: "La vida es como una caja de bombones...",
      img: "assets/images/Forrest_Gump.jpg"
    },
    {
      id: 7,
      nombre: "The Truman Show",
      autor: "Peter Weir",
      descripcion: "Un hombre descubre que su vida es un reality show...",
      img: "assets/images/the_truman_show.jpg"
    },
    {
      id: 8,
      nombre: "Coach Carter",
      autor: "Thomas Carter",
      descripcion: "Un entrenador de baloncesto de secundaria intenta transformar a sus jugadores problemáticos en un equipo exitoso.",
      img: "assets/images/Coach_Carter.JPG"
    },
    {
      id: 9,
      nombre: "Terminator 2",
      autor: "James Cameron",
      descripcion: "Un cyborg es enviado al pasado para proteger a un joven líder de la resistencia.",
      img: "assets/images/TERM.jpg"
    },
    {
      id: 10,
      nombre: "Million Dollar Baby",
      autor: "Clint Eastwood",
      descripcion: "Un entrenador de boxeo ayuda a una mujer a convertirse en campeona.",
      img: "assets/images/dollar.jpg"
    },
    {
      id: 11,
      nombre: "Seven",
      autor: "David Fincher",
      descripcion: "Dos detectives persiguen a un asesino en serie que utiliza los siete pecados capitales como modus operandi.",
      img: "assets/images/Seven.jpg"
    },
    {
      id: 12,
      nombre: "Cadena Perpetua",
      autor: "Frank Darabont",
      descripcion: "Un banquero es condenado a cadena perpetua en una prisión de máxima seguridad por el asesinato de su esposa.",
      img: "assets/images/CAD.jpg"
    },
    {
      id: 13,
      nombre: "Oldboy",
      autor: "Park Chan-wook",
      descripcion: "Un hombre es secuestrado y encarcelado durante 15 años sin razón aparente, y luego se le da la oportunidad de vengarse.",
      img: "assets/images/oldboy.jpg"
    },
    {
      id: 14,
      nombre: "El Padrino",
      autor: "Francis Ford Coppola",
      descripcion: "La historia de la familia mafiosa Corleone en Estados Unidos.",
      img: "assets/images/padrino.jpg"
    },
    {
      id: 15,
      nombre: "Alien",
      autor: "Ridley Scott",
      descripcion: "La tripulación de una nave espacial se encuentra con una forma de vida extraterrestre mortal.",
      img: "assets/images/Alien.webp"
    },
    {
      id: 16,
      nombre: "Taxi Driver",
      autor: "Martin Scorsese",
      descripcion: "Un veterano de Vietnam se convierte en un taxista solitario en Nueva York.",
      img: "assets/images/taxi_driver.jpg"
    },
    {
      id: 17,
      nombre: "Rocky",
      autor: "John G. Avildsen",
      descripcion: "Un boxeador de poca monta recibe una oportunidad inesperada para pelear por el título mundial.",
      img: "assets/images/rocky.jpg"
    },
    {
      id: 18,
      nombre: "Regreso al Futuro",
      autor: "Robert Zemeckis",
      descripcion: "Un adolescente viaja en el tiempo para asegurarse de que sus padres se conozcan.",
      img: "assets/images/regreso_futuro.jpg"
    },
    {
      id: 19,
      nombre: "El club de los poetas muertos",
      autor: "Peter Weir",
      descripcion: "Un grupo de estudiantes de una escuela preparatoria son inspirados por su nuevo profesor de inglés.",
      img: "assets/images/club_poeta.jpg"
    },
    {
      id: 20,
      nombre: "Scarface",
      autor: "Brian De Palma",
      descripcion: "Un ambicioso inmigrante cubano se convierte en un poderoso narcotraficante en Miami.",
      img: "assets/images/scarface.jpg"
    },
    {
      id: 21,
      nombre: "Pulp Fiction",
      autor: "Quentin Tarantino",
      descripcion: "Las vidas de dos asesinos a sueldo, un boxeador y la esposa de un gánster se entrelazan en esta película de culto.",
      img: "assets/images/pulp.jpg"
    },
    {
      id: 22,
      nombre: "El club de la lucha",
      autor: "David Fincher",
      descripcion: "Un grupo de hombres insatisfechos forman un club de lucha clandestino.",
      img: "assets/images/lucha.jpg"
    },
    {
      id: 23,
      nombre: "cinema_paradiso",
      autor: "Giuseppe Tornatore",
      descripcion: "Un famoso director regresa a su pueblo natal y revive su infancia y su amor por el cine.",
      img: "assets/images/cinema_paradiso.png"
    },
    {
      id: 24,
      nombre: "El pianista",
      autor: "Roman Polanski",
      descripcion: "La historia de un pianista judío que lucha por sobrevivir en Varsovia durante la Segunda Guerra Mundial.",
      img: "assets/images/pianista.webp"
    },
    {
      id: 25,
      nombre: "Matrix",
      autor: "Lana y Lilly Wachowski",
      descripcion: "Un programador informático descubre que la realidad que conoce es una simulación y se une a un grupo de rebeldes para luchar contra las máquinas.",
      img: "assets/images/matrix.jfif"
    },
    {
      id: 26,
      nombre: "El lobo de Wall Street",
      autor: "Martin Scorsese",
      descripcion: "La historia de un corredor de bolsa y su ascenso y caída en el mundo de las finanzas.",
      img: "assets/images/lobo.webp"
    },
    {
      id: 27,
      nombre: "Django sin cadenas",
      autor: "Quentin Tarantino",
      descripcion: "Un cazarrecompensas busca a una mujer secuestrada en esta película de venganza y redención.",
      img: "assets/images/django.jpg"
    },
    {
      id: 28,
      nombre: "La milla Verde",
      autor: "Frank Darabont",
      descripcion: "La historia de un hombre condenado a muerte que forma un vínculo especial con un guardia de prisión.",
      img: "assets/images/La_milla_verde.jpg"
    },
    {
      id: 29,
      nombre: "Memento",
      autor: "Christopher Nolan",
      descripcion: "Un hombre con pérdida de memoria busca venganza por la muerte de su esposa.",
      img: "assets/images/memento.jpg"
    },
    {
      id: 30,
      nombre: "The Hunt / La Caza",
      autor: "Thomas Vinterberg",
      descripcion: "Un hombre es falsamente acusado de abuso infantil en un pequeño pueblo danés.",
      img: "assets/images/caza.jpg"
    },
    {
      id: 31,
      nombre: "Mad Max: Furia en la carretera",
      autor: "George Miller",
      descripcion: "En un mundo post-apocalíptico, un grupo de guerreros lucha por la supervivencia.",
      img: "assets/images/mad_max_fury.jpg"
    },
    {
      id: 32,
      nombre: "El Renacido",
      autor: "Alejandro González Iñárritu",
      descripcion: "La historia de un hombre que es atacado por un oso y dejado por muerto por su equipo, y que lucha por sobrevivir y vengarse.",
      img: "assets/images/renacido.jpg"
    }
  ];
  constructor() { }

  /**
   * Método público para obtener todas las películas.
   * Devuelve una copia del array para proteger el original.
   */
  getPeliculas(): PeliculasInterface[] {
    return [...this.listaDePeliculas]; // Usamos '...' (spread syntax) para devolver una copia
  }

  /**
   * Método público para añadir una nueva película.
   * Recibe los datos de la nueva película como argumento.
   * @param pelicula Los datos de la nueva película.
   */
  agregarPelicula(pelicula: PeliculasInterface): boolean {
    // Verificamos que todos los campos requeridos estén completos
    if (
      pelicula.nombre.trim().length === 0 ||
      pelicula.autor.trim().length === 0 ||
      pelicula.descripcion.trim().length === 0 ||
      pelicula.img.trim().length === 0
    ) {
      return false; // Retornamos false si falta información
    }

    // Creamos la nueva película con un ID único
    const nuevaPelicula: PeliculasInterface = {
      id: this.listaDePeliculas.length + 1,
      nombre: pelicula.nombre,
      autor: pelicula.autor,
      descripcion: pelicula.descripcion,
      img: pelicula.img
    };

    // Añadimos la nueva película al final del array
    this.listaDePeliculas.push(nuevaPelicula);
    return true; // Retornamos true si se agregó con éxito
  }

  /**
   * Método público para eliminar una película.
   * @param id El ID de la película a eliminar.
   */
  eliminarPelicula(id: number): boolean {
    // Encontramos el índice de la película en el array
    const index = this.listaDePeliculas.findIndex(p => p.id === id);
    
    if (index !== -1) {
      // Eliminamos la película del array
      this.listaDePeliculas.splice(index, 1);
      return true;
    }
    
    return false;
  }

  /**
   * Método público para obtener una película por su ID.
   * @param id El ID de la película a buscar.
   * @returns La película encontrada o undefined si no existe.
   */
  getPeliculaById(id: number): PeliculasInterface | undefined {
    return this.listaDePeliculas.find(p => p.id === id);
  }
}
