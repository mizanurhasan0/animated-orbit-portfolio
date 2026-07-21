export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
) {
  const scale = Math.max(width / img.width, height / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  const x = (width - w) / 2;
  const y = (height - h) / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, x, y, w, h);
}

export function drawScaledCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  progress: number,
) {
  const scale = 1 + progress * 0.18;
  const yOffset = progress * -12;
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  const imgScale = Math.max(scaledWidth / img.width, scaledHeight / img.height);
  const w = img.width * imgScale;
  const h = img.height * imgScale;
  const x = (width - w) / 2;
  const y = (height - h) / 2 + yOffset;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, x, y, w, h);
}

export function setupCanvas(canvas: HTMLCanvasElement) {
  const wrapper = canvas.parentElement;
  if (!wrapper) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resize = () => {
    const rect = wrapper.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  return resize;
}

export function preloadImage(src: string) {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  return img.decode?.().catch(() => undefined).then(() => img) ?? Promise.resolve(img);
}

export function preloadFrames(
  getFramePath: (frame: number) => string,
  frameCount: number,
) {
  const images: HTMLImageElement[] = [];

  const promises = Array.from({ length: frameCount }, (_, i) => {
    const frame = i + 1;
    const img = new Image();
    img.decoding = "async";
    img.src = getFramePath(frame);
    images[frame] = img;
    return img.decode?.().catch(() => undefined) ?? Promise.resolve();
  });

  return Promise.all(promises).then(() => images);
}

export function drawMemberFrame(
  canvas: HTMLCanvasElement | null,
  frameCount: number,
  loopCount: number,
  images: HTMLImageElement[] | null,
  progress: number,
) {
  if (!canvas || !images) return;
  const wrapper = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  if (!wrapper || !ctx) return;

  const totalFrames = frameCount * loopCount;
  const absoluteIndex = Math.min(
    totalFrames - 1,
    Math.max(0, Math.floor(progress * totalFrames)),
  );
  const frameNumber = (absoluteIndex % frameCount) + 1;
  const img = images[frameNumber];

  if (img?.complete && img.naturalWidth) {
    drawCover(ctx, img, wrapper.clientWidth, wrapper.clientHeight);
  }
}

export function drawStaticPortrait(
  canvas: HTMLCanvasElement | null,
  img: HTMLImageElement | null,
  progress: number,
) {
  if (!canvas || !img) return;
  const wrapper = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  if (!wrapper || !ctx) return;

  if (img.complete && img.naturalWidth) {
    drawScaledCover(ctx, img, wrapper.clientWidth, wrapper.clientHeight, progress);
  }
}
