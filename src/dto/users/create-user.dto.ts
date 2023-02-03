export abstract class CreateUserDto{
    readonly email: string;
    readonly password: string;
    readonly surname: string;
    readonly name: string;
    readonly nickname?: string
}