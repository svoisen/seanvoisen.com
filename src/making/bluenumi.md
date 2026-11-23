---
title: "Bluenumi"
description: "An open source numitron clock kit."
year: 2011
cover: "/assets/images/making/bluenumi/bluenumi-front.jpg"
thumbnailFocus: "50% 15%"
coverAlt: "The assembled Bluenumi clock on a desk, its four numitron tubes glowing orange above a blue-lit acrylic case."
---

Bluenumi began with the idea of making an easy-to-assemble, open source kit clock that had the look of a nixie tube clock, but without the cost or the potentially dangerous high voltage. The result is a small desktop clock built entirely from through-hole components that nixie-ish but at a fraction of the price.

## Features

- A glowing incandescent display, using Russian IV-9 numitron tubes
- A DS1307 real-time clock with a backup battery, so the time and alarm survive a power cut
- Blue LED underlighting for each digit, with pre-programmed fading patterns
- A programmable alarm, 12- or 24-hour mode, and an AM/PM indicator
- Display blanking for night-time use and longer tube life
- Open-source hardware and software, programmable like an Arduino over TTL serial

![A low side view of the clock, its four tubes lit from below by blue LEDs through the acrylic case.](/assets/images/making/bluenumi/bluenumi-side.jpg "Each IV-9 tube sits over its own blue LED, which shows through the acrylic case.")

<figure class="figure--portrait">
    <img src="/assets/images/making/bluenumi/bluenumi-bench.jpg" alt="The bare Bluenumi circuit board held in a clamp on a workbench, its tubes lit, with solder and tools behind it." sizes="(max-width: 567px) 100vw, (min-width: 768px) 420px, 75vw">
    <figcaption>The bare board on the bench, before the case goes on. Every component is through-hole, so the kit can easily be soldered by a beginner.</figcaption>
</figure>

The firmware, parts list, assembly instructions, and schematics are all [on GitHub](https://github.com/svoisen/bluenumi).
