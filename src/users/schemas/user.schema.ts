import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document


@Schema({timestamps: true})
export class User {
    @Prop({required : true})
    name : string

    @Prop({unique : true , lowercase : true , required : true})
    email : string;

    @Prop({required : true , minLength : 6})
    password : string

}

export const UserSchema = SchemaFactory.createForClass(User);
