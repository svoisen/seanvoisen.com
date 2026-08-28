import path from "node:path";
import Image from "@11ty/eleventy-img";

/*
 * Shared by the eleventy-img transform plugin and by generateOrphanedImages()
 * below, so the two can't drift apart and start emitting different filenames.
 */
export const imageOptions = {
  formats: ['webp', 'jpeg'],
  widths: ['auto', 1280, 800, 640],
  urlPath: '/img/',
};

/*
 * Images no page links to any more, but that something outside this site —
 * an already-delivered Moonpointing email, an archived feed copy — still
 * hotlinks at their original /img/ URLs.
 *
 * The transform plugin only processes <img> tags it finds in built HTML, so
 * removing the post that carried an image also stops it being generated —
 * breaking it wherever it is still referenced. Building them directly keeps
 * the URLs alive without putting the posts back on the site.
 *
 * An output filename is a hash of the source bytes plus the sharp options
 * (which we never set), so the restored originals reproduce byte-identical
 * URLs — e.g. the_magpie yields /img/9i3HvxRNic-800.jpeg, as referenced by the
 * 2026-02-24 email.
 */
const orphanedImages = [
  // "The imp of optimization" moved to moonpointing.org, but it was the most
  // linked-to essay here and its /img/ URLs outlive it in feeds and elsewhere.
  "src/assets/images/watch_tri_wiranto_unsplash@1600.jpg",
  "src/assets/images/the_magpie@1600.webp",
  "src/assets/images/finger_moon_puzzle_creative.jpg",
  "src/assets/images/moon_over_trees.jpg",
  "src/assets/images/eink_typewriter.jpg",
  "src/assets/images/language_machines.jpg",
  "src/assets/images/invisible_cities.jpg",
  "src/assets/images/klara_and_the_sun.jpg",
  "src/assets/images/complete_cosmicomics.jpg",
  "src/assets/images/embassytown.jpg",
  "src/assets/images/small_angry_planet.jpg",
];

export const generateOrphanedImages = async ({ directories }) => {
  const outputDir = path.join(directories.output, "img");

  await Promise.all(orphanedImages.map((src) => Image(src, {
    ...imageOptions,
    outputDir,
  })));
};

export default { imageOptions, generateOrphanedImages };
