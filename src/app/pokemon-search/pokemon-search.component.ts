import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 import { Pokemon } from '../Pokemon';
import { PokemonsService } from '../pokemons.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pokemon-search',
    templateUrl: './pokemon-search.component.html',
    styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
    pokemons$: Observable<Pokemon[]>;
    private searchTerm = new Subject<string>();
    
    constructor(private pokemonsService: PokemonsService, private router: Router) {}

    // Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
    private search(term: string): void {
        this.searchTerm.next(term);
    }
    
    public ngOnInit(): void {
        this.pokemons$ = this.searchTerm.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) => this.pokemonsService.searchPokemons(term))
        );
    }

    /**
     * Return to detail in Pokemon
     * @param pokemon 
     */
    private goToDetail(pokemon: Pokemon): void {
        let link = ['/pokemon', pokemon.id];
        this.router.navigate(link);
    }

}