import crypto from 'node:crypto';

import { ICodeGenerator } from '@/data/protocols/CodeGenerator';

export class CodeGeneratorAdapter implements ICodeGenerator {
  async generate(_value?: string): Promise<string> {
    const code = crypto.randomInt(100000, 1000000);

    return code.toString();
  }
}
