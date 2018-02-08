export class Pokemon {
    id: number; // un identifiant unique sous forme de nombre
    hp: number; // le nombre de points de vie du pokémon
    cp: number; // le nombre de dégâts d'un pokémon
    name: string; // un nom
    picture: string; // l'url d'une image représentant le pokémon
    types: Array<string>; /* un tableau contenant les types du pokémon (Eau, Feu, Vol, etc...) */
    created: Date; // Date de création
}