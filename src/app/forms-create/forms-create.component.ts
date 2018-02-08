import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../Pokemon';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'pokemon-form-create',
  templateUrl: './forms-create.component.html',
  styleUrls: ['./forms-create.component.css']
})
export class FormsCreateComponent implements OnInit {

  @Input()pokemon: Pokemon; // Initilize object
  private types: Array<string>; // types possibles d'un pokémon : 'Eau', 'Feu', etc ...

  constructor(private pokemonsService: PokemonsService, private router: Router) { 

  }

  public ngOnInit() {
    // Initialisation de la propriété types
    this.types = this.pokemonsService.getPokemonTypes();
  }

  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  private hasType(type: string): boolean {
    let index = this.pokemon.types.indexOf(type);
    /* L'opérateur ~ est un raccourci de JavaScript qui permet de vérifier qu'une variable est supérieure à -1 */
    if (~index) return true;
    return false;
  }

  // valide le nombre de 1-3 types par pokémon
  private isTypesValid(type: string): boolean {
    if(this.pokemon.types.length > 3 && !this.hasType(type)) {
        return false; 
    }
    return true;
  }

  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
  private selectType($event: any, type: string): void {
    let checked = $event.target.checked;
    if ( checked ) {
        this.pokemon.types.push(type);
    } else {
      let index = this.pokemon.types.indexOf(type);
      if (~index) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  // La méthode appelée lorsque le formulaire est soumis.
  private onSubmit(): void {
    this.pokemonsService.addPokemon(this.pokemon)
    .subscribe(() => {
        let link = ['/pokemons'];
        this.router.navigate(link);
    });
  }

  // Return back to page
  private goToBack(): void {
      window.history.back();
  }

}