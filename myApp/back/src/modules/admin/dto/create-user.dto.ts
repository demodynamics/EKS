import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export default class {
    @IsNotEmpty()
    public readonly login : string

    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 
        { message: "Passwords should contain three of the four character types: Uppercase letters: A-Z. Lowercase letters: a-z. Numbers: 0-9." }
    )
    public readonly password : string
}