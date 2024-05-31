/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './AuthDTO/auth.dto';
import { Auth } from './auth.schema';
import { JwtService } from '@nestjs/jwt';
import { User } from './interfaces/User.interface';

@Injectable()
export class AuthService {
   

    constructor(
        @InjectModel(Auth.name) private signUpModel: Model<Auth>,
        private jwtService: JwtService ) {}
    /*async signUp(user: User){
        const newUser = new this.signUpModel({
            username:user.username,
            email:user.email,
            password: await bcrypt.hash(user.password,10),
        })
        try{
            await newUser.save();
        }
        catch(error){
            console.log(error) 
        }
    }*/
    async signUp(user: AuthDto): Promise<void> {
        const { username, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.signUpModel({
            username,
            email,
            password: hashedPassword,
        });
       
        try {
            await newUser.save();
        } catch (error) {
            throw new HttpException('Failed to sign up user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      
    }

    async signIn(signInDto: AuthDto): Promise<{access_token: string}> {
        const { email, password } = signInDto;
        const user = await this.signUpModel.findOne({ email }).exec();
        
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await bcrypt.compare(password, user.password);
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: user.id };
        
        return { 
            access_token: await this.jwtService.signAsync(payload),
        };

    }

    async pwdReset(signInDto: AuthDto): Promise<{ message: string }> {
        const { email, password, newPassword } = signInDto;

        const user = await this.signUpModel.findOne({ email }).exec();
       
        if(!user){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return { message: "Password reset successful" };
    }
    async findAll(): Promise<User[]> {
        try {
            const users = await this.signUpModel.find().exec();
            return users.map(user => ({
                username: user.username,
                email: user.email,
            }));
        } catch (error) {
            throw new HttpException('Failed to retrieve users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserDetails(id: string, token: string): Promise<User> {
        try {
            // Verify and decode the token to get user information
            const decodedToken = this.jwtService.verify(token);
            console.log("decded tken",decodedToken)

            const userId = decodedToken.sub;
            console.log("userid",userId)

            // Retrieve user details based on the ID and return them
            const user = await this.signUpModel.findById(userId).exec();
            
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return {
                username: user.username,
                email: user.email,
            };
        } catch (error) {
            throw new HttpException('Failed to retrieve user details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


 
}
