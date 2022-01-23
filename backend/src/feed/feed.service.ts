import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FeedDocument, Feed } from "./feed.schema";
import { UserService } from "../user/user.service";

@Injectable()
export class FeedService {
    constructor (
      @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
      private userService: UserService
    ) {}

    async getFeeds () {
        const returnedFeeds = [];
        const feeds = await this.feedModel.find();
        for await (const feed of feeds) {
            const createdBy = await this.userService.findOneById(feed.createdBy.toString());
            returnedFeeds.push({
                ...feed.toObject(),
                _id: feed._id.toString(),
                createdBy
            })
        }

        return returnedFeeds.reverse();
    }

    async deleteFeed (id: string): Promise<void> {
        await this.feedModel.deleteOne({ _id: id.replace(':', '') });
    }

    async addFeed (body) {
        const createdFeed = new this.feedModel(body);
        await createdFeed.save();

        const createdBy = await this.userService.findOneById(createdFeed.createdBy.toString());

        return {
            ...createdFeed.toObject(),
            createdBy,
            _id: createdFeed._id.toString()
        };
    }
}
