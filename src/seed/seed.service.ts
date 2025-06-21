import { Injectable } from '@nestjs/common';
import { PokeResponse, Result } from './interface/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {
  constructor(readonly pokemonsService: PokemonService) {}
  async executeSeed() {
    await this.pokemonsService.deleteAll();
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=600');
    const data: PokeResponse = await response.json();
    const createPokemonPromises = data.results.map((poke: Result) => {
      const segments = poke.url.split('/');
      const id = segments[segments.length - 2];
      const createPokemonDto = {
        name: poke.name.toLowerCase(),
        no: +id,
      };
      return this.pokemonsService.create(createPokemonDto);
    });
    await Promise.all(createPokemonPromises);
  }
}
