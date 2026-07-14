import { Controller, Get, Header } from '@nestjs/common';
import { CanvasService } from './canvas.service';

@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  /**
   * Returns the full canvas as raw, bit-packed bytes — not JSON.
   * Decoding into per-pixel colors is the frontend's responsibility.
   */
  @Get()
  @Header('Content-Type', 'application/octet-stream')
  async getCanvas(): Promise<Buffer> {
    return this.canvasService.getCanvas();
  }
}
