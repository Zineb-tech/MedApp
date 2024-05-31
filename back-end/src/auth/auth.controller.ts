/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards,Get, Param, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto} from './AuthDTO/auth.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { User } from './interfaces/User.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}
    
    @Post('/signUp')
    signUp(@Body() authDto:AuthDto):Promise<void>{
        return this.authService.signUp(authDto);
    }
    @Post('/login')
    login(@Body() authDto:AuthDto):Promise<{access_token: string }>{
        return this.authService.signIn(authDto);
    }
    @Post('/pwdReset')
    pwdReset(@Body() authDto:AuthDto){
        return this.authService.pwdReset(authDto);
    }

    @Get('/users')
    @UseGuards(AuthorizationGuard)
    async getUsers(): Promise<User[]> { 
        return await this.authService.findAll();
    }
    @Get('/userdetails/:id') 
    @UseGuards(AuthorizationGuard)
    async getUserDetails(@Param('id') id: string , @Headers('authorization') authorization: string): Promise<User> {
        try {
            const token = authorization.split(' ')[1];
            console.log(token)
            return await this.authService.getUserDetails(id, token);
        } catch (error) {
            throw new HttpException('Failed to retrieve user details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
     
  
}
