---
title: Flash was more than a plug-in
description: Thoughts on Flash's end of life.
tags: ["programming", "computing", "design"]
---

![Screenshot of the Flash uninstaller announcing end-of-life on December 31, 2020](/assets/images/flash_uninstall_eol.jpg)

Adobe Flash officially reaches its end-of-life at the end of this month, the last day of the last month of a year that will surely live in infamy. That a browser plug-in technology so polarizing as Flash—simultaneously loved and reviled—should die on this day feels somehow &hellip; fitting.

The upcoming occasion has given me cause to reflect on Flash, what it meant to me personally, and how I believe it transformed computing and the web. I feel I would be remiss in not writing some sort of eulogy.

I should open by noting that I currently work at [Mozilla](https://mozilla.org), helping push open web standards (albeit as an engineering manager, and thus in a behind-the-scenes kind of way). Despite this, Flash—which gained notoriety by proliferating a proprietary plug-in on the web—occupies a special place in my heart. Perhaps that's hyperbolic to say about software. Yet, in many ways, Flash launched my career. It is what got me excited enough about computing to pursue a degree in computer science and career in software development. It gave me a supportive community of like-minded developers to learn from, an audience to teach as I developed my own expertise, and a stable income for many years. It even helped me through some dark times—including my own battle with cancer—by providing me an outlet for my own creative expression, a way to take my mind off things.

I first started making things in Flash in 1998. The web was different back then. Google had just launched, and Flash itself had just gone mainstream thanks to the popularization of now long-gone creative agency sites like Gabocorp, Eye4U, E3 Direktiv, and countless others too numerous to list here. Where the web once felt static and staid, in a few creative corners it was springing to life, with movement, transitions, sound, non-rectilinear layouts and colorful design. It was the beginning of an era of massive creative experimentation on the web. Looking back on it with contemporary eyes, we might laugh or cringe at some of what was pushed out onto the web using Flash at the time. I still marvel at much of it.

There's a quote by James Baker in [Web Design: The Evolution of the Digital World 1990-Today](http://www.worldcat.org/oclc/1122197286):

> When Flash took off it was like the Cambrian explosion for the interactive web.

I can think of no more apt words to describe the excitement I felt watching this happen in the late 90s. And as soon as I saw it happening, I knew I wanted to be a part of that explosion. While I admit I was never as creative or prolific or ingenious as the Flash designers I most admired, I found a place in that world—blogging, speaking at conferences—ultimately leading me to a fruitful career as an engineer at Adobe.

I won't use this space to dwell much on the pros and cons of browser plug-ins, but I can't ignore the subject entirely. Flash, like other plug-ins, served as vehicle for pushing the web platform forward faster than it may have otherwise evolved on its own. It was a proving-ground, an exploratory sandbox for capabilities that now come standard in modern browsers. Plug-ins pioneered the space now occupied by web animations, web video, WebGL, WebAssembly, and more. 

But, Flash was not without its many shortcomings. SWF was a propriety file format for years <sup>[1](#1)</sup>. The Flash player was infamous as a vector for security exploits. Flash content was difficult to index and search. Flash inadvertently led to trends in web design that were antithetical to great user experience on the web, such as the dreaded "Flash intro." (The ultimate parody of which is Zombo.com, now thankfully also [viewable without Flash](https://html5zombo.com).) And, finally, while the Flash player did support accessible content in later versions, much Flash content was notoriously inaccessible for web users with disabilities. As Jakob Nielsen famously said:

> About 99% of the time, the presence of Flash on a website constitutes a usability disease.

I might quibble with the 99% part, but Nielsen was right that extensive use of Flash in unnecessary ways certainly caused great harm.

All this said, Flash was more than a runtime or browser plug-in. It was an ecosystem of runtime and authoring tools. Sometimes it's easy to ignore this fact, because the face of Flash for 99% of the world _was_ the plug-in. But when I reflect on what first captivated me about the technology, and what kept me engaged in building things with for over a decade, I return my attention again and again not just to the near-ubiquity of the Flash runtime, but to the Flash authoring experience.

Great authoring experiences are hard to come by, especially when they involve computer programming. Arguments have been made that this is one reason why programming literacy is not as widespread as it could be.<sup>[2](#2)</sup> The hurdles one most overcome to simply get a working development environment often stand in the way for many programming novices. Look at the state of web frontend development today: a convoluted maze of libraries, frameworks, transpilers, bundlers, etc. Compare this with the Flash authoring tool, which comprised a unified programming, drawing, and animation environment that required little to no setup. Getting your project running was a simple as clicking "play."

Most people just want to create something without the meta-struggle of wrestling with external dependencies, editor configuration, compiler build options, and their ilk. Learning programming is always a challenge, but one that people are willing to overcome if the barrier to entry is low enough and the tooling targeted at a specific problem or domain. Look no further than the products and domains where end-user programming has proven successful. This goes beyond spreadsheets. In [his excellent essay on the topic](https://medium.com/the-truant-haruspex/end-user-computing-5367171478b7), Adam Wiggins cites a few other examples:

<blockquote>
<p>Industrial designers use <a href="http://cad-notes.com/2012/03/learn-how-to-write-command-scripts-for-autocad-and-automate-your-plotting/">scripting to automate AutoCAD</a>; statisticians <a href="http://faculty.washington.edu/lum/website_professional/matlab/tutorials/Matlab_Tutorial_Beginner/matlab_tutorial_beginner.pdf">visualize data with tools like Matlab</a>; and businesspeople <a href="http://www.youtube.com/watch?v=Ul17dsrMoaU">build database apps</a> using tools like Filemaker Pro and Microsoft Access.</p><p>These tools all share the same two golden traits: no-fuss setup, and a programming language and development tools focused on the specific tasks their users want to achieve.</p>
</blockquote>

Flash was not end-user programming. But, the Flash authoring tool provided this exact kind of "no fuss" rapid development experience for interactive content. Oftentimes—at least for simple projects—without the need to write code at all. Draw, animate, add some keyframe actions here or there, press "play" and get near-instant results. Flash was fast enough that it could act like a REPL for the creation of animated, visual experiences—a quick build-compile-run feedback loop that encouraged creative experimentation. 

And, when you wanted to go deep, the entire world of ActionScript programming was there for you, ready to accommodate the creation of feature rich, highly-complex applications. (As an example, I was building enterprise software with Flash in 2003. My first job out of university was building the front end of an application for insurance underwriting using Flash MX and ActionScript 1.0, which in turn communicated with J2EE servlets to handle the business logic. It was painful, but we did it!) 

For many, the Flash authoring tool served as a "gateway drug" for programming. Creatives flocked to Flash and ActionScript not because they wanted to learn programming per se, but because programming was a means to a creative end, and the tool supported them on their journey. Many of them became great programmers along the way. As for myself, the things I wanted to build at the time—games, interactive animations, immersive multimedia experiences—were simply easiest to make in Flash, especially if I wanted to share them.

I am hard-pressed to think of a modern authoring tool and runtime ecosystem that matches what Flash offered in terms of ease-of-use, expressive power, and reach when Flash was at its zenith. I'd be happy to hear arguments to the contrary. Creative coding tools like Processing and Glitch offer no-fuss setup, but forgo a visual authoring environment. [Unity](https://unity.com/) offers a web player, but I would hesitate to call Unity easy to use. Animation tools like [Animaker](https://www.animaker.com/) or [Powtoon](https://www.powtoon.com/) focus solely on animation without interactivity. [MaxMSP](https://cycling74.com/products/max) might come close, though it's primarily aimed at the production of music and visual effects. [Scratch](https://scratch.mit.edu/) is also wonderful, but is aimed at kids and lacks the technical power that Flash provided. And while the Flash authoring tool lives on today as [Adobe Animate](https://www.adobe.com/products/animate.html), short of improved animation capabilities and being able to export content to the HTML canvas, it's largely the same tool it always was. 

I think there's a void here. There's a space to fill with modern, easy-to-use tools that can produce rich, interactive content running on web standards. I don't know if it's going to be filled by the new generation of "no code" tools—[Webflow](https://webflow.com), for instance—or if it will be filled at all. It's an incredibly hard space to fill, but there is an opportunity.

Flash served its purpose. The web has matured, and we certainly don't need it anymore. You can build the same experiences using web standards now that required the Flash player years ago. But the authoring experience is far worse, the barrier to entry much higher. It's not the same.

I reminisce, but I don't long for the good old days. Instead, I mostly lament the lack of interesting design common on the modern web because, while much of it is clean and usable, a lot of it is also pretty damn boring. If there's one thing Flash gave us in the early 2000's, it was plenty of not boring stuff—the freedom of beginner's mind naïveté as we explored a new medium, made plenty of mistakes, and tried to figure out what a more interactive web should be.

<aside class="footnote">
<p><a name="1"></a>[1] Adobe has released a partial specification fo the SWF file format, but never a full spec. Additionally, until about 2008 the specification license disallowed the creation of software that played SWF files.</p>
<p><a name="2"></a>[2] One of my former professors at UCI, <a href="https://www.artifex.org/~bonnie/">Bonnie Nardi</a>, wrote a (now long out-of-print) book on the subject of end-user programming: <a href="https://mitpress.mit.edu/books/small-matter-programming">A Small Matter of Programming</a>. In it, she argues that, while everyone can and should learn how to program computers, inadequate, complex tooling often gets in the way. The book is extremely hard to find; but Wiggins' essay summarizes the main points well.</p>
</aside>
