import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./user/user.module";
import { FeedModule } from "./feed/feed.module";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'), UserModule, FeedModule],
})
export class AppModule {}
