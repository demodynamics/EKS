import { IsNotEmpty } from "class-validator";

export default class {
    @IsNotEmpty()
    public readonly name : string

    @IsNotEmpty()
    public readonly price : number

    @IsNotEmpty()
    public readonly img : string

    @IsNotEmpty()
    public readonly category : string | any
}