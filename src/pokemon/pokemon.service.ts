import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.haddleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let poke: Pokemon | null = null;

    // Search by no
    if (!isNaN(+term)) {
      poke = await this.pokemonModel.findOne({ no: term });
    }

    //search by mongoId
    if (!poke && isValidObjectId(term)) {
      poke = await this.pokemonModel.findById(term);
    }

    // Search by name
    if (!poke) {
      poke = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!poke) throw new NotFoundException('Pokemon not found');

    return poke;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name?.toLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.haddleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return;
  }

  private haddleExceptions(error: any) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 11000
    ) {
      throw new BadRequestException(
        `Pokemon already exists in DB ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Cant create Pokemon - Check server logs',
    );
  }
}
