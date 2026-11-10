/**
 * Capture a screenshot of every deployed project and write it to
 * public/previews/<id>.png, so the project cards serve their own images
 * instead of hotlinking a third-party screenshot service at render time.
 *
 *   npm run previews            capture every project with a live URL
 *   npm run previews -- pitik   capture just the ones whose id matches
 *
 * Needs a Chromium: `npx playwright install chromium` once, or point
 * PLAYWRIGHT_CHROMIUM_PATH at an existing binary.
 *
 * Run it from a machine that can reach the deployed sites. Re-run it whenever
 * a project's UI changes; the committed PNGs are what visitors actually see.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "previews");

/** 16:9, matching the aspect the card reserves. Retina-scaled on capture. */
const WIDTH = 1280;
const HEIGHT = 720;

/**
 * Pull { id, name, live } out of src/lib/data/projects.ts without importing TypeScript.
 * The project entries are plain object literals, so a scan is enough and keeps
 * this script dependency-free.
 */
async function readProjects() {
  const src = await readFile(path.join(ROOT, "src", "lib", "data", "projects.ts"), "utf8");
  const body = src.slice(
    src.indexOf("export const projects"),
    src.indexOf("export const projectCategories"),
  );
  const out = [];
  const idRe = /id:\s*"([^"]+)"/g;
  let m;
  while ((m = idRe.exec(body))) {
    const entry = body.slice(m.index, body.indexOf("\n  },", m.index));
    const live = entry.match(/live:\s*"([^"]*)"/);
    const name = entry.match(/name:\s*"([^"]+)"/);
    if (live?.[1]) out.push({ id: m[1], name: name?.[1] ?? m[1], live: live[1] });
  }
  return out;
}

async function main() {
  const filters = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const all = await readProjects();
  const targets = filters.length
    ? all.filter((p) => filters.some((f) => p.id.includes(f)))
    : all;

  if (!targets.length) {
    console.error("No matching projects with a live URL.");
    process.exitCode = 1;
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  // Playwright resolves its own download by default; the override is for
  // sandboxes and CI images that ship Chromium somewhere else.
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  let failed = 0;

  for (const project of targets) {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 2,
      colorScheme: "dark",
    });
    try {
      await page.goto(project.live, { waitUntil: "networkidle", timeout: 45_000 });
      // Let entrance animations and web fonts settle before the shutter.
      await page.waitForTimeout(2500);
      const buffer = await page.screenshot({ type: "png" });
      await writeFile(path.join(OUT_DIR, `${project.id}.png`), buffer);
      console.log(`  captured  ${project.id.padEnd(16)} ${project.live}`);
    } catch (error) {
      failed += 1;
      console.error(`  FAILED    ${project.id.padEnd(16)} ${error.message.split("\n")[0]}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(
    `\n${targets.length - failed}/${targets.length} written to public/previews/`,
  );
  if (failed) process.exitCode = 1;
}

main();
