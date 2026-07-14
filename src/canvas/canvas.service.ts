import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { RedisService } from '../db/redis.service';
import { CANVAS_KEY } from './canvas.constants';

/**
 * Reads the canvas state the indexer maintains in Redis. Read-only —
 * writing to Redis is the indexer's job, not the backend's.
 */
@Injectable()
export class CanvasService {
  private readonly logger = new Logger(CanvasService.name);

  constructor(private readonly redis: RedisService) {}

  /**
   * Returns the full canvas as its raw, bit-packed byte buffer (see the
   * indexer's `CanvasCacheService` for the exact encoding: 4 bits per
   * pixel, row-major, `BITFIELD`-written). Decoding is left to the
   * caller (the frontend) rather than done here, to avoid producing a
   * much larger JSON response for every request.
   */
  async getCanvas(): Promise<Buffer> {
    const canvas = await this.redis.client.getBuffer(CANVAS_KEY);

    if (!canvas) {
      // Expected only if the indexer hasn't run yet (it initializes
      // this key on startup) — not a normal "missing resource".
      this.logger.error('Canvas key missing in Redis');
      throw new ServiceUnavailableException(
        'Canvas is not yet initialized — is the indexer running?',
      );
    }

    return canvas;
  }
}
