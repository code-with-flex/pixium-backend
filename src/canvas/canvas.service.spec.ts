import { ServiceUnavailableException } from '@nestjs/common';
import { RedisService } from '../db/redis.service';
import { CanvasService } from './canvas.service';

describe('CanvasService', () => {
  let getBuffer: jest.Mock;
  let service: CanvasService;

  beforeEach(() => {
    getBuffer = jest.fn();
    const redis = { client: { getBuffer } } as unknown as RedisService;
    service = new CanvasService(redis);
  });

  it('returns the raw canvas buffer from Redis', async () => {
    const buffer = Buffer.from([1, 2, 3]);
    getBuffer.mockResolvedValue(buffer);

    await expect(service.getCanvas()).resolves.toBe(buffer);
    expect(getBuffer).toHaveBeenCalledWith('canvas');
  });

  it('throws ServiceUnavailableException if the canvas key is missing', async () => {
    getBuffer.mockResolvedValue(null);

    await expect(service.getCanvas()).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });
});
