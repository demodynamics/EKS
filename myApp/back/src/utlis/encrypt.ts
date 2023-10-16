import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

export function compareHash(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
}