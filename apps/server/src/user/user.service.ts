import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnvFields } from "@qa/server/typeorm/config/env-fields.model";
import { getEnvFieldValue } from '@qa/server/typeorm/config/get-env-value.util';
import { UserEntity } from '@qa/server/user/user.entity';
import { getHashedString } from '@qa/server/user/utils/hash-string.util';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException('Such email or username are already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return this.userRepository.save(newUser);
  }

  public buildCreateUserResponse(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token: this.generateJwt(user),
    };
  }

  public generateJwt(user: UserEntity): string {
    return sign({
      id: user.id,
      username: user.username,
      email: user.email,
    },
      getEnvFieldValue(EnvFields.SECRET_KEY),
    );
  }

  public async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'salt', 'password'],
    });

    if (!userByEmail) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const { hashedString } = getHashedString(loginUserDto.password, userByEmail.salt);
    const isPasswordCorrect = hashedString === userByEmail.password;

    if (!isPasswordCorrect) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete userByEmail.password;
    delete userByEmail.salt;

    return userByEmail;
  }

  public async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  public async update(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(userId);

    const userByEmail = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
    const isAnyOtherUserWithSuchEmail = userByEmail && userByEmail.id !== userId;
    if (isAnyOtherUserWithSuchEmail) {
      throw new HttpException('Such email is already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const userByUsername = await this.userRepository.findOne({ where: { username: updateUserDto.username } });
    const isAnyOtherUserWithSuchUserName = userByUsername && userByUsername.id !== userId;
    if (isAnyOtherUserWithSuchUserName) {
      throw new HttpException('Such username is already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }
}
