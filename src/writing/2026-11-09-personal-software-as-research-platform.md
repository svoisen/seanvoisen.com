---
title: "Personal software as research platform"
description: "I thought I was building my own research library. I ended up with a platform for experimenting in interfaces for reading."
tags: ["software", "ai", "reading", "design"]
image: "/assets/images/og/cartena_personal_software@1200x630.png"
---

I often read research papers in my spare time. This might sound like a strange way for a non-academic to spend his leisure hours, but I enjoy learning about new (and old) ideas in computing, mostly as they relate to the fields of human-computer interaction, philosophy, and cognitive science. Over the years I’ve amassed a large collection of highlighted and annotated PDFs, everything from open-access papers to old articles by computing pioneers like Alan Kay to arXiv preprints. This ever-growing library has been an unwieldy nomad, migrating through a variety of commercial, open-source and makeshift digital repositories. It has made its home in a folder in iCloud, a well-tended [Zotero](https://www.zotero.org) database, [Paperpile](https://paperpile.com), and even [DEVONthink](https://www.devontechnologies.com/apps/devonthink).

I’ve never been quite happy with any of these solutions. A flat folder makes search challenging and prohibits organizing or sorting papers by metadata attributes like title or author. Paperpile works well, but it’s cloud-based, and I want my library to be *mine*, locally available, at all times. [Mendeley](https://www.mendeley.com)’s user experience is just awful, not to mention that it’s maintained by one of the most despised names in academic publishing. Zotero is the gold standard, and while it does offer the closest solution to what I want—local-first with optional sync—it’s primarily a tool aimed at authors, not readers, with more focus on bibliographic maintenance and managing citations than on the reading experience itself.

So, with a bunch of time off between jobs, and armed with a Figma license and some agent factory infrastructure I previously cobbled together for other side projects, I decided to scratch my own itch. The result is a project I call Cartena.[^1]

Cartena is my own personal research library the way I want it. It’s local-first, agent-compatible and highly extensible—architected to suit my needs as somebody who reads research papers, but doesn’t necessarily write them. Drop a collection of PDFs on the app window, and Cartena uses local, on-device AI to figure out metadata, extract text, summarize and auto-tag the documents. I can use Cmd-P to run any command or quickly open a document. Full-text search of the entire library is just a keystroke away. It has a built-in read-only [MCP](https://modelcontextprotocol.io) server so Claude has access to the same search functionality, which makes it easy to find connections between disparate ideas across papers. And the whole thing was built in [Tauri](https://tauri.app) with a Rust backend, which means it’s cross-platform (though I’ve only ever used it on my Mac).

{% video "cartena-import", "Dropping papers into Cartena. On-device models pull out the metadata, tag each paper and index it for search." %}

It sounds like a lot, but Cartena is, admittedly, a *boring* tool. There’s nothing particularly novel about it; it’s UI on a local database with intelligence capabilities and a PDF reader tacked on. The bulk of its technical sophistication derives from combining a variety of off-the-shelf libraries and ML models. SQLite handles search and the vector database. Small, task-specific local models running in an [ONNX Runtime](https://onnxruntime.ai) handle things like document layout analysis, OCR and metadata extraction. And [Ollama](https://ollama.com) provides access to a local LLM (with the option to break out to Claude for faster and more robust results).

I don’t say this to belittle the effort and expertise that went into making this real. I like to think I did a pretty good job of it, given years of experience in software design and engineering, doing everything from building a comprehensive design system to wrestling with tricky architectural decisions to going down rabbit holes into model quantization in order to balance speed with quality during document import. While hypothetically anyone with a Claude subscription can make software these days, it remains true that even with agents doing all the coding work, applications of this level of complexity still require a significant amount of engineering know-how. The zero-to-one, text-to-app workflow remains a very steep hill to climb.

But now that I’ve climbed that hill in this niche application space, I’ve realized the boringness of Cartena belies its true power, not just as a research library, but as a platform for my own research and exploration into new UI paradigms. Because it’s first and foremost a personal tool, I can get ... weird.

---

In his talk [Apps and programming: Two accidental tyrannies](https://andymatuschak.org/tat/), Andy Matuschak bemoans the lack of innovation in user interface design that our supposed "golden era" of AI-supported software creation should have already birthed:

>Despite all the manic energy in the tech industry, and all the prestigious HCI conferences, the pace of meaningful invention in user interfaces is remarkably slow, and the level of imagination remarkably tame. I want new answers, new questions, and ideally both at once.

He points at the same problem I encountered in making Cartena: solved workflows already exist in large monolithic apps (e.g., Zotero in my case), but those apps tend to provide very limited extensibility surfaces. If the app doesn’t solve your needs, and the extensibility layer doesn’t go far enough, the only alternative remains starting from scratch. This, unfortunately, requires wrestling with a level of technical complexity beyond the interest or reach of the typical non-programmer. LLMs may continue to improve, lessening the complexity a person has to manage, but I firmly believe that most people don’t want to spend their time building brand-new applications to solve every little workflow problem. They will not climb the steep hills. Code might be cheap(er), but attention remains a finite resource.

Matuschak holds up [Obsidian](https://obsidian.md) as a shining example of a solution that lands somewhere in the middle ground: a monolithic application that offers extensibility not merely isolated to little panels or windows, but at the level of the core application surface. In the case of Obsidian, this means the text editor itself. Obsidian’s editor is built on [CodeMirror](https://codemirror.net), a highly extensible and developer-friendly text editor library. With Obsidian, an intrepid vibe coder can build extensions that don’t just live at the application’s periphery, but alter the very heart of the core text editing experience. Obsidian’s composable extension architecture makes it arguably one of the most malleable productivity tools on the market. And, with enough malleability and a coding agent, all that remains for invention is a little (or a lot of) imagination.

---

Cartena leans on Chromium’s PDFium engine—via [EmbedPDF](https://www.embedpdf.com)—for document rendering. Like CodeMirror, EmbedPDF offers a fairly robust and flexible API that makes it easy to overlay any kind of drawing or information on top of a document. Highlights and marks live in a hierarchy of layers superimposed on the base content, while EmbedPDF handles all the difficulties of rendering, panning and zooming.

After watching Matuschak’s talk and realizing the parallels with Obsidian, I started to see that Cartena need not be just a personal research management tool. Instead, it could be a platform for experiments in entirely new reading experiences. I could use it to explore all kinds of new ways of reading and understanding research papers.

For example, I’m not particularly adept at skimming papers. This is unfortunate, since knowing what to read and not read matters significantly when the only reading time you have is a few evening hours after the kids are asleep. [Scim](https://arxiv.org/abs/2205.04561) (Fok et al., 2023) describes a method for supporting skimming of scientific papers by highlighting salient passages using different colors. With Scim, a paper is first sent to an LLM for semantic analysis, then "passages are highlighted with distinct colors for each of four diverse kinds of content sought by readers: research objectives, novel aspects of the research, methodology, and results."

Cartena already had all of the infrastructure to make an implementation of Scim possible: a malleable document surface, full-text extraction and LLM integration. Because of this, Claude was able to implement a basic version of Scim as a Cartena plugin from a single prompt and a link to the research paper. I had a working version in less than an hour.

{% video "cartena-scim", "Scim as a Cartena plugin, coloring passages by objective, novelty, method and result." %}

If I can essentially "one-shot" something like Scim, then surely I can be more ambitious.

I read papers out of intellectual curiosity, but also to search for ideas that may help me in my job as a designer, engineer and software engineering leader. I often download many more interesting papers than I ever have time to read. Knowing what to read is half the battle, and sifting through my reading inbox takes time. What if Cartena helped me triage my reading better, based on what it knew about my current problems or interests? Or, what about cross-linking ideas between papers? What if Cartena automatically exported my highlights to Obsidian, but also ensured they were cross-linked by semantic relationship? Or, what if whenever I added a highlight, it showed me other related highlights from other papers in my library? Or, what if I added support for margin notes? Or, what if I just improved the reading experience in dark mode so I don’t burn my eyeballs at night?

{% video "cartena-connections", "An experiment in progress: each highlight shows related highlights from other papers in my library.", 1620, 1080 %}

The beauty of personal software is that—if you make it malleable enough—the possibilities are endless. It truly can become a personal research platform for weird or wild ideas that may never have commercial viability but still work for you.

When it comes to interface innovation, Matuschak wants new answers, new questions, and ideally both at once. Cartena may yield both, or neither. I can’t promise either way. But for the first time in my life I have a reading surface and library that’s mine to bend, where trying out some half-formed idea costs me only an evening or two. (OK, that and a lot of tokens.) If the pace of invention in user interfaces is going to pick up, I suspect some of it will happen in places just like this: small tools made by one person, for one person. Many of those ideas may never leave the machine they were built on, but some ... well, some just might.

[^1]: *Carta*: paper; *catena*: a chain of references.
