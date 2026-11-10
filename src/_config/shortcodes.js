/*
 * An inline screen recording, as a wide figure. Files live in
 * src/assets/videos as `<name>.mp4` beside a `<name>-poster.webp` taken from
 * the same recording, so a post names the clip once.
 *
 * Silent H.264 in an MP4 rather than a GIF: a GIF of the same clip runs ten
 * times the size at 256 colours, with no way to pause or scrub. No autoplay —
 * the reader starts it. preload="metadata" fetches only the header and the
 * poster until then; the MP4s are encoded with +faststart so that header sits
 * at the front of the file and playback can begin before the download ends.
 *
 * width/height are the encoded size, there so the box is reserved before the
 * poster arrives and the prose below does not jump.
 */
export const video = (name, caption, width = 1680, height = 1020) => {
  const base = `/assets/videos/${name}`;
  const figcaption = caption ? `<figcaption>${caption}</figcaption>` : "";
  return `<figure class="figure--wide figure--video"><video controls muted playsinline preload="metadata" width="${width}" height="${height}" poster="${base}-poster.webp"><source src="${base}.mp4" type="video/mp4"></video>${figcaption}</figure>`;
};

export default { video };
