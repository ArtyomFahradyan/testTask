import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpStatus,
    HttpCode,
    Param
} from "@nestjs/common";
import { FeedService } from './feed.service';

@Controller('feed')
@UseInterceptors(ClassSerializerInterceptor)
export class FeedController {
    constructor (private readonly feedService: FeedService) { }

    @Get('')
    async getFeeds() {
        return this.feedService.getFeeds();
    }

    @Delete(':id')
    async deleteFeed(@Param('id') id) {
        return this.feedService.deleteFeed(id);
    }

    @Post('')
    @HttpCode(HttpStatus.OK)
    async addFeed (@Body() body) {
        return this.feedService.addFeed(body);
    }
}
