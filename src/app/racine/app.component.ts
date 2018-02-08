import { Component } from '@angular/core';
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../Pokemon';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'pokemon-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PokemonsService]
})
export class AppComponent {

  constructor(private pokemonsService: PokemonsService, private route: ActivatedRoute, private router: Router) {}

}