import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@qa/server/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {
  }

  private async getOneById(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }


  public async create({ username, email }: UserDTO): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      username,
      email,
    });

    return this.userRepository.save(newUser);
  }

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
