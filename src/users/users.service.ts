import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async findById(id:number){
        const user = await this.prisma.user.findUnique({
            where:{id:id}
        });

        if(!user){
            throw new NotFoundException({
                message:"user not found"
            })
        }

        return user;
    }

    async create(data:CreateUserInput){
        return await this.prisma.user.create({
            data:data
        });
    }

    async update({id, ...data}:UpdateUserInput){
        const user = await this.prisma.user.update({
            where:{id},
            data
        });

        if(!user){
            throw new NotFoundException({
                message:"user not found"
            })
        }

        return user;
    }

    async list(){
        return await this.prisma.user.findMany();
    }

    async delete(id:number){
        const user = await this.prisma.user.delete({
            where:{id}
        });

        if(!user){
            throw new NotFoundException({
                message:"user not found"
            })
        }

        return true;
    }
}
