import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POKEMONS } from './Mock-pokemons';

export class InMemoryDataService implements InMemoryDbService {
	
	constructor() {

	}
	
	public createDb() {
		let pokemons = POKEMONS;
		return { pokemons };
	}
	
}
