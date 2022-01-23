import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Feed, FeedSchema } from "./feed.schema";
import { UserModule } from "../user/user.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema }]), UserModule],
  controllers: [FeedController],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule { }
