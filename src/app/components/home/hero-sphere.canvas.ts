export const HERO_SPHERE_SOLID_SECONDS = 15;
export const HERO_SPHERE_WIREFRAME_SECONDS = 5;
export const HERO_SPHERE_CYCLE_SECONDS =
  HERO_SPHERE_SOLID_SECONDS + HERO_SPHERE_WIREFRAME_SECONDS;

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

interface SphereFace {
  points: ProjectedPoint[];
  depth: number;
  shade: number;
}

const LAT_SEGMENTS = 28;
const LON_SEGMENTS = 36;
const TILT_X = 0.38;
const LIGHT: Vec3 = { x: -0.45, y: 0.35, z: 0.82 };
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

function normalize(point: Vec3): Vec3 {
  const length = Math.hypot(point.x, point.y, point.z) || 1;
  return { x: point.x / length, y: point.y / length, z: point.z / length };
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
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
  const perspective = 3.6;
  const depthScale = perspective / (perspective - point.z);
  return {
    x: centerX + point.x * radius * depthScale,
    y: centerY - point.y * radius * depthScale,
    depth: point.z
  };
}

function shadeToColor(shade: number): string {
  const highlight = { r: 238, g: 247, b: 252 };
  const mid = { r: 94, g: 156, b: 176 };
  const shadow = { r: 20, g: 54, b: 64 };

  const clamped = Math.max(0.08, Math.min(1, shade));
  const mix = (from: number, to: number, t: number) => from + (to - from) * t;

  if (clamped > 0.55) {
    const t = (clamped - 0.55) / 0.45;
    return `rgb(${Math.round(mix(mid.r, highlight.r, t))} ${Math.round(mix(mid.g, highlight.g, t))} ${Math.round(mix(mid.b, highlight.b, t))})`;
  }

  const t = clamped / 0.55;
  return `rgb(${Math.round(mix(shadow.r, mid.r, t))} ${Math.round(mix(shadow.g, mid.g, t))} ${Math.round(mix(shadow.b, mid.b, t))})`;
}

function buildSolidFaces(
  centerX: number,
  centerY: number,
  radius: number,
  rotY: number
): SphereFace[] {
  const faces: SphereFace[] = [];

  for (let lat = 0; lat < LAT_SEGMENTS; lat++) {
    const latA = (lat / LAT_SEGMENTS) * Math.PI - Math.PI / 2;
    const latB = ((lat + 1) / LAT_SEGMENTS) * Math.PI - Math.PI / 2;

    for (let lon = 0; lon < LON_SEGMENTS; lon++) {
      const lonA = (lon / LON_SEGMENTS) * Math.PI * 2;
      const lonB = ((lon + 1) / LON_SEGMENTS) * Math.PI * 2;

      const corners = [
        transformPoint(spherePoint(latA, lonA), rotY),
        transformPoint(spherePoint(latA, lonB), rotY),
        transformPoint(spherePoint(latB, lonB), rotY),
        transformPoint(spherePoint(latB, lonA), rotY)
      ];

      const latMid = (latA + latB) / 2;
      const lonMid = (lonA + lonB) / 2;
      const normal = transformPoint(spherePoint(latMid, lonMid), rotY);
      const projected = corners.map((corner) => project(corner, centerX, centerY, radius));
      const avgDepth =
        corners.reduce((sum, corner) => sum + corner.z, 0) / corners.length;
      const shade = Math.max(0, dot(normalize(normal), normalize(LIGHT)));

      faces.push({ points: projected, depth: avgDepth, shade });
    }
  }

  return faces.sort((a, b) => a.depth - b.depth);
}

function drawSolidSphere(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  rotY: number
): void {
  const faces = buildSolidFaces(centerX, centerY, radius, rotY);

  for (const face of faces) {
    ctx.beginPath();
    ctx.moveTo(face.points[0].x, face.points[0].y);
    for (let i = 1; i < face.points.length; i++) {
      ctx.lineTo(face.points[i].x, face.points[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = shadeToColor(face.shade);
    ctx.fill();
  }
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

function drawGlow(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const glow = ctx.createRadialGradient(
    centerX,
    centerY,
    radius * 0.2,
    centerX,
    centerY,
    radius * 1.35
  );
  glow.addColorStop(0, 'rgba(126, 182, 201, 0.22)');
  glow.addColorStop(1, 'rgba(126, 182, 201, 0)');

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();
}

export function drawHeroSphere(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsedSeconds: number
): void {
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.42;

  const cycleTime = elapsedSeconds % HERO_SPHERE_CYCLE_SECONDS;
  const wireframePhase = cycleTime >= HERO_SPHERE_SOLID_SECONDS;
  const rotY = elapsedSeconds * ANGULAR_SPEED;

  drawGlow(ctx, centerX, centerY, radius);

  if (wireframePhase) {
    drawWireframeSphere(ctx, centerX, centerY, radius, rotY);
  } else {
    drawSolidSphere(ctx, centerX, centerY, radius, rotY);
  }
}
