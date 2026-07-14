import { CanvasController } from './canvas.controller';
import { CanvasService } from './canvas.service';

describe('CanvasController', () => {
  it('returns whatever CanvasService.getCanvas resolves', async () => {
    const buffer = Buffer.from([9, 9, 9]);
    const canvasService = {
      getCanvas: jest.fn().mockResolvedValue(buffer),
    } as unknown as CanvasService;
    const controller = new CanvasController(canvasService);

    await expect(controller.getCanvas()).resolves.toBe(buffer);
  });
});
