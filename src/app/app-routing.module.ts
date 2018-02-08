import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ListPokemonComponent } from './listPokemons/ListPokemon.component';
import { DetailPokemonComponent } from './detailPokemon/DetailPokemon.component';
import { PageNotFoundComponent } from './error/page-not-found.component';
import { EditPokemonComponent } from './forms-edit/edit-pokemon.component';
import { CreatePokemonComponent } from './forms-create/create-pokemon.component';
import { AuthGuard } from './auth-guard.service';


// routes
const appRoutes: Routes = [
	{ path: 'pokemon/create', component: CreatePokemonComponent },
	{ path: 'pokemons', component: ListPokemonComponent },
	{ path: 'pokemon/:id', component: DetailPokemonComponent },
	{ path: 'pokemon/edit/:id', component: EditPokemonComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	],
	providers: []
})
export class AppRoutingModule { }
