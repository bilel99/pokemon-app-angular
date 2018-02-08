import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { POKEMONS } from '../Mock-pokemons';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PokemonsService } from '../pokemons.service';

@Component({
    selector: 'list-pokemon',
    templateUrl: './ListPokemon.component.html',
    styleUrls: ['./ListPokemon.component.css']
})
export class ListPokemonComponent implements OnInit {
    private title: string;
    private pokemons: Pokemon[] = null;

    /**
     * Constructor for class ListPokemonComponent
     * Injection du service PokemonService
     */ 
    public constructor(private router: Router, private pokemonsService: PokemonsService) {
        this.title = "Les Pokemons";
    }

    /**
     * Implémentation de la méthod ngOnInit de OnInit interface 
     * Angular Interface
     */
    public ngOnInit(): void {
        this.getPokemons();
    }

    /**
     * Method appel du service Pokemons.Service récupération de tout les pokemon en GET
     * GET STATUS
     */
    private getPokemons(): void {
        this.pokemonsService.getPokemons()
            .subscribe(pokemons => this.pokemons = pokemons);
    }

    /**
     * Method select for article in website redirectTo Page detail
     * @param pokemon 
     */
    private selectPokemon(pokemon: Pokemon) {
        let link = ['/pokemon', pokemon.id];
        this.router.navigate(link);
    }

    /**
     * Go to form Create Pokemon
     */
    private goCreatePokemon(): void {
        let link = ['pokemon/create'];
        this.router.navigate(link);
    }

    private deletePokemon(pokemon: Pokemon): void {
        // ajaxifi automatique la page grace à la ligne ci dessous
        this.pokemons = this.pokemons.filter(p => p !== pokemon);
        // Suppression de l'élement par l'API
        this.pokemonsService.destroyPokemon(pokemon).subscribe();
    }

}