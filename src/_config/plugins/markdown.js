import markdownIt from "markdown-it";
import implicitFigures from "markdown-it-image-figures";
import footnote from "markdown-it-footnote";
import { asidePlugin } from "@humanwhocodes/markdown-it-markua-aside";

export const markdownLib = markdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(implicitFigures, {
  figcaption: true
}).use(footnote).use(asidePlugin);

// Bare numerals, not markdown-it-footnote's bracketed "[1]", and the same
// numeral for a second reference to a note rather than "1:1".
markdownLib.renderer.rules.footnote_caption = (tokens, idx) => `${tokens[idx].meta.id + 1}`;

/*
 * Footnotes as notes beside the text. markdown-it-footnote collects every
 * note into a list at the end of the document; this moves each note to just
 * after the block that first references it (usually a paragraph), as an
 * <aside role="note">, and drops the end list. One copy of each note: on a
 * phone it reads where it was cited, and from 720px the stylesheet floats it
 * into the margin column. A note referenced again later is not repeated; the
 * later reference links back to it.
 */
const marginNotes = (state) => {
  const tokens = state.tokens;
  const start = tokens.findIndex((t) => t.type === "footnote_block_open");
  if (start < 0) return;
  const end = tokens.findIndex((t, i) => i > start && t.type === "footnote_block_close");

  // Each note's own content, without the back-link arrows: a note sits
  // beside or after its reference, so there is nowhere to go back to.
  const notes = new Map();
  let current = null;
  for (const token of tokens.slice(start + 1, end)) {
    if (token.type === "footnote_open") {
      current = [];
      notes.set(token.meta.id, current);
    } else if (token.type === "footnote_close") {
      current = null;
    } else if (current && token.type !== "footnote_anchor") {
      current.push(token);
    }
  }

  const body = tokens.slice(0, start).concat(tokens.slice(end + 1));
  const placed = new Set();
  const out = [];
  for (let i = 0; i < body.length; i++) {
    out.push(body[i]);
    const refs = body[i].type === "inline"
      ? (body[i].children || []).filter((c) => c.type === "footnote_ref")
      : [];
    if (!refs.length) continue;
    // The token after an inline run is its block's closing tag
    // (paragraph_close, heading_close, td_close …); the notes follow it.
    out.push(body[++i]);
    for (const ref of refs) {
      const { id } = ref.meta;
      if (placed.has(id) || !notes.has(id)) continue;
      placed.add(id);
      const open = new state.Token("margin_note_open", "aside", 1);
      open.meta = { id, subId: 0 };
      const close = new state.Token("margin_note_close", "aside", -1);
      out.push(open, ...notes.get(id), close);
    }
  }
  state.tokens = out;
};

markdownLib.core.ruler.after("footnote_tail", "margin_notes", marginNotes);

// The number is shown for the eye and hidden from assistive technology,
// which hears the note's name instead.
markdownLib.renderer.rules.margin_note_open = (tokens, idx, options, env, slf) => {
  const n = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
  return `<aside class="note" id="fn${n}" role="note" aria-label="Note ${caption}">` +
    `<span class="note__number" aria-hidden="true">${caption}</span><div class="note__body">`;
};
markdownLib.renderer.rules.margin_note_close = () => "</div></aside>\n";
