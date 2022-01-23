import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";
import { User } from "../user/user.schema";

export type FeedDocument = Feed & Document;

@Schema()
export class Feed {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    createdBy: string;

    @Prop({ default: new Date() })
    createdAt?: Date;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);