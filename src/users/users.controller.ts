import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value&age=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('interns') // Get /users/intern
  findAllInterns() {
    return [];
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {

    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, userUpdateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
