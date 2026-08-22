import {
  HERO_SPHERE_CYCLE_SECONDS,
  HERO_SPHERE_GLITCH_SECONDS,
  HERO_SPHERE_SOLID_SECONDS,
  HERO_SPHERE_WIREFRAME_SECONDS,
  resolveSphereDisplay
} from './hero-sphere.canvas';

describe('resolveSphereDisplay', () => {
  it('should stay solid before the transition window', () => {
    expect(resolveSphereDisplay(HERO_SPHERE_SOLID_SECONDS - 1, 0).mode).toBe('solid');
    expect(resolveSphereDisplay(HERO_SPHERE_SOLID_SECONDS - 1, 0).glitchActive).toBeFalse();
  });

  it('should stay wireframe in the middle of the wireframe phase', () => {
    const midWireframe = HERO_SPHERE_SOLID_SECONDS + HERO_SPHERE_WIREFRAME_SECONDS / 2;
    expect(resolveSphereDisplay(midWireframe, 0).mode).toBe('wireframe');
    expect(resolveSphereDisplay(midWireframe, 0).glitchActive).toBeFalse();
  });

  it('should flicker during the solid to wireframe transition', () => {
    const modes = new Set<string>();

    for (let frame = 0; frame < 24; frame++) {
      const elapsed = frame * 0.02;
      const cycleTime = HERO_SPHERE_SOLID_SECONDS - HERO_SPHERE_GLITCH_SECONDS / 4 + elapsed;
      const display = resolveSphereDisplay(cycleTime, elapsed);
      expect(display.glitchActive).toBeTrue();
      modes.add(display.mode);
    }

    expect(modes.has('solid')).toBeTrue();
    expect(modes.has('wireframe')).toBeTrue();
    expect(modes.has('blank')).toBeTrue();
  });

  it('should flicker when the cycle wraps back to solid', () => {
    const modes = new Set<string>();

    for (let frame = 0; frame < 24; frame++) {
      const elapsed = frame * 0.02;
      const cycleTime =
        HERO_SPHERE_CYCLE_SECONDS - HERO_SPHERE_GLITCH_SECONDS / 4 + elapsed;
      const display = resolveSphereDisplay(cycleTime % HERO_SPHERE_CYCLE_SECONDS, elapsed);
      expect(display.glitchActive).toBeTrue();
      modes.add(display.mode);
    }

    expect(modes.has('solid')).toBeTrue();
    expect(modes.has('wireframe')).toBeTrue();
    expect(modes.has('blank')).toBeTrue();
  });
});
