import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from '../login-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from './app.component';
import { ListPokemonComponent } from '../listPokemons/ListPokemon.component';
import { DetailPokemonComponent } from '../detailPokemon/DetailPokemon.component';
import { ShadowCardDirective } from '../listPokemons/shadow-card.directive';
import { PokemonTypeColorPipe } from '../listPokemons/pokemon-type-color.pipe';
import { PageNotFoundComponent } from '../error/page-not-found.component';
// Importations pour charger et configurer l'API simulée.
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search.component';
import { LoaderComponent } from '../loader/loader.component';
import { EditPokemonComponent } from '../forms-edit/edit-pokemon.component';
import { FormsEditComponent } from '../forms-edit/forms-edit.component';
import { CreatePokemonComponent } from '../forms-create/create-pokemon.component';
import { FormsCreateComponent } from '../forms-create/forms-create.component';
import { AuthGuard } from '../auth-guard.service';
import { PokemonsService } from '../pokemons.service';
import { AuthComponent } from '../auth/auth.component';



@NgModule({
  declarations: [
    AppComponent, ShadowCardDirective, PokemonTypeColorPipe, ListPokemonComponent, DetailPokemonComponent, PageNotFoundComponent, EditPokemonComponent, FormsEditComponent, PokemonSearchComponent, LoaderComponent, CreatePokemonComponent, FormsCreateComponent, AuthComponent
  ],
  imports: [
    BrowserModule, LoginRoutingModule, AppRoutingModule, FormsModule, HttpClientModule, InMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [PokemonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
