import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@qa/server/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  public async create(createUserDto: CreateUserDto): Promise<any> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return this.userRepository.save(newUser);
  }

  // private async getOneById(id: number): Promise<UserEntity> {
  //   try {
  //     const user = await this.userRepository.findOneOrFail(id);
  //     return user;
  //   } catch (error) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  // }

  // public async update(id, { username, email }: UserDTO): Promise<UserEntity> {
  //   const user = await this.getOneById(id);

  //   user.username = username;
  //   user.email = email;

  //   return this.userRepository.save(user);
  // }

  // public async delete(id: number): Promise<UserEntity> {
  //   const user = await this.getOneById(id);

  //   return this.userRepository.remove(user);
  // }
}
