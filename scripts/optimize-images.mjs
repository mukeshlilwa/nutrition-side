import { rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");

/** @type {Array<{ src: string; dest?: string; width: number; quality: number }>} */
const targets = [
  {
    src: "public/images/hero-nutrition.png",
    dest: "public/images/hero-nutrition.webp",
    width: 1920,
    quality: 78,
  },
  {
    src: "public/images/services/meal-planner.jpg",
    width: 800,
    quality: 78,
  },
  {
    src: "public/images/services/clinical-tools-digital.jpg",
    width: 960,
    quality: 78,
  },
  {
    src: "public/images/services/resources-desk.jpg",
    width: 800,
    quality: 78,
  },
  {
    src: "public/images/services/recipes.png",
    dest: "public/images/services/recipes.jpg",
    width: 640,
    quality: 78,
  },
  {
    src: "public/images/services/blog.png",
    dest: "public/images/services/blog.jpg",
    width: 640,
    quality: 78,
  },
  {
    src: "public/images/contact.jpg",
    width: 960,
    quality: 78,
  },
];

async function optimize({ src, dest, width, quality }) {
  const input = path.join(root, src);
  const output = path.join(root, dest ?? src);
  const temp = `${output}.optimized`;

  const pipeline = sharp(input)
    .rotate()
    .resize(width, width, { fit: "inside", withoutEnlargement: true });

  if (output.endsWith(".webp")) {
    await pipeline.webp({ quality, effort: 4 }).toFile(temp);
  } else if (output.endsWith(".png")) {
    await pipeline
      .png({ quality, compressionLevel: 9, palette: true })
      .toFile(temp);
  } else {
    await pipeline
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toFile(temp);
  }

  if (dest && dest !== src) {
    await unlink(output).catch(() => undefined);
    await unlink(input).catch(() => undefined);
  } else {
    await unlink(output).catch(() => undefined);
  }

  await rename(temp, output);

  const { statSync } = await import("node:fs");
  const size = statSync(output).size;
  console.log(`${src} -> ${dest ?? src} (${Math.round(size / 1024)} KB)`);
}

for (const target of targets) {
  await optimize(target);
}
