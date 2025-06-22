import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

/**
 * Pagination Data Transfer Object (DTO) for handling pagination parameters.
 * It includes optional fields for limit and offset, with validation rules.
 */
export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsInt()
  offset?: number;
}
