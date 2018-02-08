import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { POKEMONS } from '../Mock-pokemons';
import { PokemonsService } from '../pokemons.service';

@Component({
    selector: 'detail-pokemon',
    templateUrl: './DetailPokemon.component.html',
    styleUrls: ['./DetailPokemon.component.css']
})
export class DetailPokemonComponent implements OnInit {

    private pokemons: Pokemon[] = null;
    private pokemon: Pokemon = null;

    /**
     * initialisation constructor avec router
     * @param route 
     * @param router 
     */
    public constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService) {

    }

    /**
     * Récupération de tout les pokemons, et stockage du pokemons avec le meme id dans
     * variable pokemon
     */
    public ngOnInit(): void {
        this.getPokemon();
    }

    private getPokemon(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.pokemonsService.getPokemon(id)
            .subscribe(pokemon => this.pokemon = pokemon);
    }

    private goEdit(pokemon: Pokemon): void {
        let link = ['/pokemon/edit', pokemon.id];
        this.router.navigate(link);
    }

    private deletePokemon(pokemon: Pokemon): void {
        this.pokemonsService.destroyPokemon(pokemon)
            .subscribe(() => {
                let link = ['pokemons'];
                this.router.navigate(link);
            });
    }

    /**
     * Method return to page url=/pokemons
     * return to back page history = window.history.back();
     */
    private goBack(): void {
        this.router.navigate(['/pokemons']);
    }

}