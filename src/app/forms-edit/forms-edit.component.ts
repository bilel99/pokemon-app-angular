import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../Pokemon';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'pokemon-form',
  templateUrl: './forms-edit.component.html',
  styleUrls: ['./forms-edit.component.css']
})
export class FormsEditComponent implements OnInit {

  @Input() pokemon: Pokemon; // propriété d'entrée du composant
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
    this.pokemonsService.updatePokemon(this.pokemon)
      .subscribe(() => {
        let link = ['/pokemon', this.pokemon.id];
        this.router.navigate(link);
      });
  }

  // Return to back page
  private goToBack(pokemon: Pokemon): void {
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}