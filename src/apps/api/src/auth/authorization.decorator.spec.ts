import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY, Public } from './authorization.decorator';

describe('Authorization Decorator', () => {
  it('should set metadata for public routes', () => {
    const metadata = Reflect.getMetadata(IS_PUBLIC_KEY, Public());
    expect(metadata).toBe(true);
  });
});
