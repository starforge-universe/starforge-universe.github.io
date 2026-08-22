export const HERO_SPHERE_SOLID_SECONDS = 15;
export const HERO_SPHERE_WIREFRAME_SECONDS = 5;
export const HERO_SPHERE_CYCLE_SECONDS =
  HERO_SPHERE_SOLID_SECONDS + HERO_SPHERE_WIREFRAME_SECONDS;

/** Seconds of signal-loss flicker centered on each phase change. */
export const HERO_SPHERE_GLITCH_SECONDS = 0.72;

type SphereDisplayMode = 'solid' | 'wireframe' | 'blank';

export interface SphereDisplayState {
  mode: SphereDisplayMode;
  glitchActive: boolean;
}

interface GlitchBoundary {
  glitch: boolean;
  toWireframe: boolean;
}

const GLITCH_HALF = HERO_SPHERE_GLITCH_SECONDS / 2;

/** Resolve solid / wireframe / blank frame for TV-style transition flicker. */
export function resolveSphereDisplay(
  cycleTime: number,
  elapsedSeconds: number
): SphereDisplayState {
  const boundary = detectGlitchBoundary(cycleTime);

  if (!boundary.glitch) {
    return {
      mode: cycleTime >= HERO_SPHERE_SOLID_SECONDS ? 'wireframe' : 'solid',
      glitchActive: false
    };
  }

  return {
    mode: glitchDisplayMode(elapsedSeconds, boundary.toWireframe),
    glitchActive: true
  };
}

function detectGlitchBoundary(cycleTime: number): GlitchBoundary {
  if (
    cycleTime >= HERO_SPHERE_SOLID_SECONDS - GLITCH_HALF &&
    cycleTime < HERO_SPHERE_SOLID_SECONDS + GLITCH_HALF
  ) {
    return {
      glitch: true,
      toWireframe: cycleTime >= HERO_SPHERE_SOLID_SECONDS
    };
  }

  if (cycleTime >= HERO_SPHERE_CYCLE_SECONDS - GLITCH_HALF || cycleTime < GLITCH_HALF) {
    return { glitch: true, toWireframe: false };
  }

  return { glitch: false, toWireframe: false };
}

function glitchDisplayMode(elapsedSeconds: number, toWireframe: boolean): SphereDisplayMode {
  const tick = Math.floor(elapsedSeconds * 11.5);
  const solid: SphereDisplayMode = 'solid';
  const wireframe: SphereDisplayMode = 'wireframe';
  const blank: SphereDisplayMode = 'blank';

  const solidToWireframe: readonly SphereDisplayMode[] = [
    solid,
    solid,
    blank,
    wireframe,
    blank,
    solid,
    wireframe,
    wireframe
  ];
  const wireframeToSolid: readonly SphereDisplayMode[] = [
    wireframe,
    wireframe,
    blank,
    solid,
    blank,
    wireframe,
    solid,
    solid
  ];

  const pattern = toWireframe ? solidToWireframe : wireframeToSolid;
  return pattern[tick % pattern.length];
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  depth: number;
}

const LAT_SEGMENTS = 28;
const LON_SEGMENTS = 36;
const TILT_X = 0.42;
const PERSPECTIVE = 3.6;
/** Match `.hero__core` / `.hero__planet` — full element radius (3D tilt reads slightly inset). */
const WIREFRAME_RADIUS_SCALE = 1;
/** Radians per second — shared by solid and wireframe so both phases spin at the same rate. */
const ANGULAR_SPEED = (Math.PI * 1.35) / HERO_SPHERE_SOLID_SECONDS;

function rotateX(point: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos
  };
}

function rotateY(point: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos
  };
}

function spherePoint(lat: number, lon: number): Vec3 {
  const cosLat = Math.cos(lat);
  return {
    x: cosLat * Math.cos(lon),
    y: Math.sin(lat),
    z: cosLat * Math.sin(lon)
  };
}

function transformPoint(point: Vec3, rotY: number): Vec3 {
  return rotateX(rotateY(point, rotY), TILT_X);
}

function project(point: Vec3, centerX: number, centerY: number, radius: number): ProjectedPoint {
  const depthScale = PERSPECTIVE / (PERSPECTIVE - point.z);
  return {
    x: centerX + point.x * radius * depthScale,
    y: centerY - point.y * radius * depthScale,
    depth: point.z
  };
}

function drawWireframeSphere(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  rotY: number
): void {
  ctx.strokeStyle = 'rgba(168, 212, 224, 0.82)';
  ctx.lineWidth = Math.max(0.75, radius * 0.018);

  const drawRing = (points: ProjectedPoint[]): void => {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.stroke();
  };

  for (let lat = 0; lat <= LAT_SEGMENTS; lat++) {
    const latitude = (lat / LAT_SEGMENTS) * Math.PI - Math.PI / 2;
    const ring: ProjectedPoint[] = [];

    for (let lon = 0; lon <= LON_SEGMENTS; lon++) {
      const longitude = (lon / LON_SEGMENTS) * Math.PI * 2;
      const point = transformPoint(spherePoint(latitude, longitude), rotY);
      ring.push(project(point, centerX, centerY, radius));
    }

    drawRing(ring);
  }

  for (let lon = 0; lon < LON_SEGMENTS; lon++) {
    const longitude = (lon / LON_SEGMENTS) * Math.PI * 2;
    const meridian: ProjectedPoint[] = [];

    for (let lat = 0; lat <= LAT_SEGMENTS; lat++) {
      const latitude = (lat / LAT_SEGMENTS) * Math.PI - Math.PI / 2;
      const point = transformPoint(spherePoint(latitude, longitude), rotY);
      meridian.push(project(point, centerX, centerY, radius));
    }

    ctx.beginPath();
    ctx.moveTo(meridian[0].x, meridian[0].y);
    for (let i = 1; i < meridian.length; i++) {
      ctx.lineTo(meridian[i].x, meridian[i].y);
    }
    ctx.stroke();
  }
}

function resolveWireframeLayout(width: number, height: number): {
  centerX: number;
  centerY: number;
  radius: number;
} {
  const centerX = width / 2;
  const centerY = height / 2;
  const half = Math.min(width, height) / 2;
  const radius = half * WIREFRAME_RADIUS_SCALE;
  return { centerX, centerY, radius };
}

function drawSignalGlitch(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  elapsedSeconds: number
): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 1.08, 0, Math.PI * 2);
  ctx.clip();

  const flicker = 0.55 + (Math.sin(elapsedSeconds * 48) + 1) * 0.2;
  ctx.fillStyle = `rgba(8, 14, 22, ${0.35 * flicker})`;
  ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

  const barCount = 5;
  const scroll = Math.floor(elapsedSeconds * 36);
  for (let i = 0; i < barCount; i++) {
    const y =
      centerY -
      radius +
      ((scroll + i * 13) % Math.max(1, Math.floor(radius * 2)));
    const alpha = i % 2 === 0 ? 0.09 : 0.04;
    ctx.fillStyle = `rgba(168, 212, 224, ${alpha})`;
    ctx.fillRect(centerX - radius * 1.05, y, radius * 2.1, Math.max(1, radius * 0.035));
  }

  ctx.restore();
}

export function drawHeroSphere(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsedSeconds: number
): SphereDisplayState {
  ctx.clearRect(0, 0, width, height);

  const { centerX, centerY, radius } = resolveWireframeLayout(width, height);
  const cycleTime = elapsedSeconds % HERO_SPHERE_CYCLE_SECONDS;
  const rotY = elapsedSeconds * ANGULAR_SPEED;
  const display = resolveSphereDisplay(cycleTime, elapsedSeconds);

  if (display.mode === 'solid') {
    return display;
  }

  if (display.mode === 'blank') {
    drawSignalGlitch(ctx, centerX, centerY, radius, elapsedSeconds);
    return display;
  }

  drawWireframeSphere(ctx, centerX, centerY, radius, rotY);
  return display;
}
