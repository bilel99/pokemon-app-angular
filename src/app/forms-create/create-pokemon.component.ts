import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pokemon } from '../Pokemon';

@Component({
  selector: 'create-pokemon',
  template: `
    <h2 class="header center">Création </h2>
    <pokemon-form-create [pokemon]="pokemon"></pokemon-form-create>
  `,
})
export class CreatePokemonComponent implements OnInit {
  private pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.pokemon = new Pokemon();
      this.pokemon.types = [];
      this.pokemon.created = new Date();
    }

}