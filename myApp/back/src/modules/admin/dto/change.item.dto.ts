import { IsNotEmpty } from "class-validator";

export default class {
    @IsNotEmpty()
    public readonly price : number

    public readonly oldPrice : number
}