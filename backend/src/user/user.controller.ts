import {
    Controller,
    Inject,
    Post,
    Body,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpStatus, HttpCode, Get, Param, Put
} from "@nestjs/common";
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor (private readonly userService: UserService) { }

    @Post('signup')
    async signup (@Body() signup) {
        await this.userService.checkForExistingUserAndThrow(signup.email);
        return this.userService.signUp(signup);
    }

    @Get(':id')
    async getUser(@Param('id') id) {
        return this.userService.findOneById(id.replace(':', ''));
    }

    @Put(':id')
    async updateUser(@Param('id') id, @Body() user) {
        return this.userService.findOneAndUpdate(id, user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login (@Body() body) {
        return this.userService.login(body);
    }
}
