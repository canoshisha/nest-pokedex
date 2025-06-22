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
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .sort({ no: 1 })
      .skip(offset)
      .limit(limit)
      .select('-__v');
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

  async deleteAll() {
    await this.pokemonModel.deleteMany({});
  }

  async createMany(pokemons: CreatePokemonDto[]) {
    try {
      await this.pokemonModel.insertMany(pokemons);
      return `${pokemons.length} pokemons created successfully`;
    } catch (error) {
      this.haddleExceptions(error);
    }
  }

  private haddleExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === 11000) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Pokemon already exists in DB ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Cant create Pokemon - Check server logs',
    );
  }
}
