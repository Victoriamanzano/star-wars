import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchStarships, Starship, Pilot, Film } from '@app/core/interfaces/starships.interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private urlApi = ("https://swapi.py4e.com/api");
  constructor(private http: HttpClient) { }

getAllStarships(page: number): Observable<Starship[]> {
  const url = `${this.urlApi}/starships?page=${page}`;
   return this.http.get<FetchStarships>(url).pipe(map(this.transformStarshipsResult))

  }

private transformStarshipsResult(resp: FetchStarships) {
    const starshipsList: Starship[] = resp.results.map(ship => {
    const urlArr = ship.url.split('/');
    const id = urlArr[5];
    const imageURL = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;

      return {
        id,
        name: ship.name,
        model: ship.model,
        manufacturer: ship.manufacturer,
        cost_in_credits: ship.cost_in_credits,
        length: ship.length,
        max_atmosphering_speed: ship.max_atmosphering_speed,
        crew: ship.crew,
        passengers: ship.passengers,
        cargo_capacity: ship.cargo_capacity,
        consumables: ship.consumables,
        hyperdrive_rating: ship.hyperdrive_rating,
        MGLT: ship.MGLT,
        starship_class: ship.starship_class,
        pilots: ship.pilots,
        films: ship.films,
        created: ship.created,
        edited: ship.edited,
        url: ship.url,
        imageURL,
      }
    })

    return starshipsList;
  }

getDataStarships(starshipId: string): Observable<any> {
    const apiUrl = `${this.urlApi}/starships/${starshipId}`;
    const imageURL = `https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`;

    return this.http.get<any>(apiUrl).pipe(map(details => ({ details, imageURL })));
  }

getDataPilots(pilotUrl: string): Observable<Pilot> {
    return this.http.get<Pilot>(pilotUrl).pipe(map(pilot => {
        const urlParts = pilot.url.split('/');
        const id = urlParts[5];
        const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
         return { ...pilot, imageUrl };
      })
    );
  }

getDataFilms(filmUrl: string): Observable<Film> {
    return this.http.get<Film>(filmUrl).pipe(
      map(film => {
        const urlParts = film.url.split('/');
        const id = urlParts[5];
        const imageUrl = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
         return { ...film, imageUrl };
      })
    );
  }
}



