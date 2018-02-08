import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { Pokemon } from './Pokemon';
import { POKEMONS } from './Mock-pokemons';

// Initialisation Header Http
const httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class PokemonsService {
    private pokemonsUrl = 'api/pokemons' // Url web API

    constructor(private http: HttpClient) { }

    /**
     * GET: ALL Pokemons from the server
     */
    public getPokemons(): Observable<Pokemon[]> {
        return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
            tap(pokemons => console.log(`fetched pokemons`)),
            catchError(this.handleError('getPokemons', []))
        );
    }

    /**
     * GET: ID Pokemon from the server
     */
    public getPokemon(id: number): Observable<Pokemon> {
        const url = `${this.pokemonsUrl}/${id}`;
        return this.http.get<Pokemon>(url).pipe(
            tap(_ => console.log(`Fetched pokemon id=${id}`)),
            catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
        );
    }

    public searchPokemons(term: string): Observable<Pokemon[]> {
        if(!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
            tap(_ => console.log(`Found pokemon matching "${term}"`)),
            catchError(this.handleError<Pokemon[]>('Search Pokemons', []))
        );
    }

    /**
     * Add Pokemon
     * POST: STATUS
     * @param pokemon 
     */
    public addPokemon(pokemon: Pokemon): Observable<Pokemon> {
        return this.http.post<Pokemon>(this.pokemonsUrl, pokemon, httpOption).pipe(
            tap((pokemon: Pokemon) => console.log(`Added Pokemon id=${pokemon.id}`)),
            catchError(this.handleError<Pokemon>('AddPokemon'))
        );
    }

    /**
     * Update pokemon (id)
     * PUT: Status
     * @param pokemon 
     */
    public updatePokemon(pokemon: Pokemon): Observable<any> {
        return this.http.put(this.pokemonsUrl, pokemon, httpOption).pipe(
            tap(_ => console.log(`updated pokemon id=${pokemon.id}`)),
            catchError(this.handleError<any>('updatePokemon'))
        );
    }

    public destroyPokemon(pokemon: Pokemon | number): Observable<Pokemon> {
        const id = typeof pokemon === 'number' ? pokemon : pokemon.id;
        const url = `${this.pokemonsUrl}/${id}`;

        return this.http.delete<Pokemon>(url, httpOption).pipe(
            tap(_ => console.log(`Deleted Pokemon id=${id}`)),
            catchError(this.handleError<Pokemon>('destroyPokemon'))
        );
    }
    

    // types de pokémons possible
    public getPokemonTypes(): Array<string> {
      return [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
      ];
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
    
}