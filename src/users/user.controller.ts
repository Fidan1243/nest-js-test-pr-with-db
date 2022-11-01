/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Inject, CACHE_MANAGER, Delete, Put  } from "@nestjs/common";
import { UserService } from "./user.service";
import {Cache} from 'cache-manager';

@Controller('users')
export class UserController{
    constructor(private UserService: UserService, @Inject(CACHE_MANAGER) private cacheManager: Cache){}
    @Get()
    async getAllNews(){
        const val = await this.cacheManager.get('users');
        if(val){
            console.log("from redis " + val);
            return val;
        }
        const result = await this.UserService.GetUsers();
        await this.cacheManager.set('users', result, { ttl: 1000 });
        return result;
    }
    @Get("/user/:userId")
    async getUserById(@Param("userId") user:string){
        const val = await this.cacheManager.get(user);
        if(val){
            console.log("from redis" + val);
            return val;
        }
        const result = await this.UserService.GetUserById(user);
        await this.cacheManager.set(user, result, { ttl: 1000 });
        return result;    
    }
    @Delete("/:userId")
    async deleteUser(@Param("userId") user:string){
        const val = await this.cacheManager.get(user);
        if(val){
            console.log("from redis" + val);
            return val;
        }
        const result = await this.UserService.DeleteUser(user);
        await this.cacheManager.set(user, result, { ttl: 1000 });
        return result;    
    }
    @Put("/:userId")
    async updateUser(@Param("userId") user:string, @Body() name:object){
        const val = await this.cacheManager.get(user);
        if(val){
            console.log("from redis" + val);
            return val;
        }
        const result = await this.UserService.UpdateUser(user,name);
        await this.cacheManager.set(user, result, { ttl: 1000 });
        return result;    
    }
    @Get("/:roleId")
    async getUserByRole(@Param("role") category:string){
        const val = await this.cacheManager.get(category);
        if(val){
            console.log("from redis" + val);
            return val;
        }
        const result = await this.UserService.GetUserByRole(category);
        await this.cacheManager.set(category, result, { ttl: 1000 });
        return result;    
    }
    @Post()
    async Add(@Body() name:string){
        const result = await this.UserService.Add(name);
        return result;
    }
}