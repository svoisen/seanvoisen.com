---
title: "Self-Composed"
description: "A photo booth at SFMOMA that rethinks the selfie."
year: 2016
month: 5
disciplines: ["Interactive installation", "Image processing"]
cover: "/assets/images/making/self-composed/self-composed-booths.jpg"
thumbnail: "/assets/images/making/self-composed/self-composed-visitors.jpg"
thumbnailFocus: "50% 25%"
coverAlt: "Two Self-Composed booths in a wood-panelled gallery room, each a tall screen showing a black-and-white composite portrait above a glass-topped plinth."
---

In May 2016, after being closed for more than 3 years, [SFMOMA](https://www.sfmoma.org) reopened, expanding its space by over 100,000 sq. ft., and tripling the exhibition space available for photography. As part of this expansion, the museum added the Photographic Interpretive Gallery, where visitors were invited to look deeper at the practice of photography through interactive experiences.

SFMOMA asked our team at Adobe to design and build one of the experiences for the new gallery. The result was “[Self-Composed](https://www.sfmoma.org/read/on-collaboration-sfmoma-adobe-rethink-selfie/),” a photo booth that offers a new take on the phenomenon of the “selfie.” Inspired by analog photography techniques like the photogram, Self-Composed asks museum visitors to craft an image of themselves using the objects they carry on an everyday basis.

As a technical lead on the project, I implemented the video and image processing pipeline, using OpenGL shaders to color convert and combine the live video streams from two Blackmagic 4K cameras into the final output.

Self-Composed won a Communication Arts Interactive Award in 2017.

<figure>
    <video src="/assets/videos/making/self-composed.mp4" poster="/assets/videos/making/self-composed-poster.jpg" width="720" height="400" controls preload="none"></video>
    <figcaption>A short film on the project, from the museum’s reopening to the booths in use.</figcaption>
</figure>

![Two visitors lean over a booth’s glass plinth, their hands on objects laid across it, while the screen above shows their faces combined with the objects’ silhouettes.](/assets/images/making/self-composed/self-composed-visitors.jpg "Objects laid on the glass show up as silhouettes, combined with the live image of the visitor’s face.")

![A black-and-white photo of the gallery from behind: one visitor seated at a booth, two more standing at the other, both screens lit.](/assets/images/making/self-composed/self-composed-gallery.jpg "Both booths in use in the Photographic Interpretive Gallery.")

![A printed Self-Composed portrait lying on a white table, with a link to the photo online printed beneath it.](/assets/images/making/self-composed/self-composed-print.jpg "Each visitor leaves with a print, and a link to the photo online.")

<figure class="figure--portrait">
    <img src="/assets/images/making/self-composed/self-composed-instagram.jpg" alt="A phone showing an Instagram post tagged #selfcomposed: a black-and-white portrait of a woman behind two outspread hands and a glass." sizes="(max-width: 567px) 100vw, (min-width: 768px) 420px, 75vw">
    <figcaption>Visitors shared their portraits on Instagram under #selfcomposed.</figcaption>
</figure>
