import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { UsersService } from './users.service';

@Resolver(()=>UserModel)
export class UsersResolver {

    constructor(
        private readonly userService:UsersService
    ){}

    @Query(()=>UserModel)
    async getUser(
        @Args("id", {type:()=>Int}) id:number
    ){
        return await this.userService.findById(id);
    }

    @Mutation(()=>UserModel)
    async createUser(
        @Args("data") data: CreateUserInput
    ){
        return await this.userService.create(data);
    }

    @Mutation(()=>UserModel)
    async updateUser(
        @Args("data") data: UpdateUserInput
    ){
        return this.userService.update(data);
    }

    @Query(()=>[UserModel])
    async listUsers(){
        return await this.userService.list();
    }

    @Mutation(()=>Boolean)
    async deleteUser(
        @Args("id", {type:()=>Int}) id:number
    ){
        return await this.userService.delete(id);
    }
}
