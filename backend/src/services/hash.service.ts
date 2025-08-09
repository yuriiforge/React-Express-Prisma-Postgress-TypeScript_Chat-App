import bcrypt from 'bcryptjs';

export class HashService {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = parseInt(process.env.SALT_ROUNDS!);
  }

  public async compare(data: string, hashedData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedData);
  }

  public async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }
}

export const hashService = new HashService();
