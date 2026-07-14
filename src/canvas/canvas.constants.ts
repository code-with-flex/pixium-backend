/**
 * Must match the indexer's `CANVAS_KEY`
 * (`pixium-indexer/src/canvas/canvas-cache.service.ts`) exactly — both
 * repos read/write the same Redis key on the same Redis instance.
 * There's no shared source of truth across repos, so keep these in sync
 * by hand if either side ever changes it.
 */
export const CANVAS_KEY = 'canvas';
