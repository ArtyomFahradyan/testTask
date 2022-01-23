import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor (
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findOneByEmail (email: string) {
        return this.userModel.findOne({ email });
    }

    async findOneById (id: string) {
        const user = await this.userModel.findOne({ _id: id });

        return {
            ...user.toObject(),
            password: '',
            _id: user._id.toString()
        };
    }

    async findOneAndUpdate (id: string, body: any) {
        const user = await this.userModel.findByIdAndUpdate({ _id: id.replace(':','') }, body);

        return {
            ...body,
            _id: user._id.toString()
        };
    }

    async checkForExistingUserAndThrow (email: string): Promise<void> {
        const existingUser: User|null = await this.findOneByEmail(email);
        if (!existingUser) {
            return;
        }
        throw new HttpException('User with email already exists', HttpStatus.BAD_REQUEST);
    }

    async login ({ email, password }) {
        const user = await this.findOneByEmail(email);
        if (!user || user.password !== password) {
            throw new HttpException('User dosn\'t exist', HttpStatus.NOT_FOUND);
        }

        return {
            ...user.toObject(),
            password: '',
            _id: user._id.toString()
        };
    }

    async signUp (body) {
        const createdUser = new this.userModel(body);
        await createdUser.save();

        return {
            ...createdUser.toObject(),
            password: '',
            _id: createdUser._id.toString()
        };
    }
}
