import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export class Hashing {
  static async generate(password: string): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
  }
  static async compare(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
