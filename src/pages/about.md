---
layout: "page"
title: "About"
description: "About me and this site."
date: git Last Modified
permalink: "/about/"
---

**Hello!** I’m _Sean_.

My professional mission is to _make computers better tools for supporting human thinking and creativity_. I'm a design technologist and software engineering leader who is deeply interested in creative tools, tools for thought, malleable systems, human-computer interaction, and generally anything related to making computers more inclusive and empowering.

I’m originally from California, and live with my wife and kids in the San Francisco bay area. I studied computer science at [UCLA](https://www.ucla.edu) and at the (radically interdisciplinary and sadly now shuttered) Arts Computation Engineering program at [UC Irvine](https://www.uci.edu). 

![A portrait of the author.](/assets/images/sean_voisen_wide.webp
"A portrait of the author.")

Currently, I lead teams of front-end engineers and design technologists building design systems and new user experiences for web, mobile and desktop. In the past I have:

- Built real-time collaboration and accessibility features for [Adobe Express](https://express.adobe.com)
- Managed layout and accessibility engineering teams working on [Firefox](https://mozilla.org)
- Built web-based tools for making animated VR and AR comics at [Madefire](https://techcrunch.com/2022/04/29/madefire-shuts-down/)
- Led prototype engineering inside [Adobe’s Design Studio](https://adobe.design)
- Developed chat and instant messaging applications at [Userplane](https://en.wikipedia.org/wiki/Userplane)

---

## Contact me

If anything I write resonates with you, please feel free to <a href="#" class="eml-protected">send me a note</a> or find me on [Mastodon](https://front-end.social/@svoisen) or [Bluesky](https://bsky.app/profile/seanvoisen.com).

## Privacy and analytics

- This site does not use any third party tracking scripts. 
- This site does not collect any data. 
- I am a [Bookshop.org](https://bookshop.org) affiliate. Links to books on this site typically use my affiliate link, which means I may receive a small commission on any purchases made through the link.

## Design and production 

If you're curious about how this site is designed or built, [check out the colophon](/colophon/).

## Disclaimer

_Views and opinions expressed on this site are purely my own and not representative of those of my employer._

<script>
    function decode(encodedString) {
        var email = ''; 
        var keyInHex = encodedString.substr(0, 2);
        var key = parseInt(keyInHex, 16);
        for (var n = 2; n < encodedString.length; n += 2) {
            var charInHex = encodedString.substr(n, 2)
            var char = parseInt(charInHex, 16);
            var output = char ^ key;
            email += String.fromCharCode(output);
        }

        return email;
    }

    window.addEventListener('DOMContentLoaded', function() {
        const allElements = document.getElementsByClassName('eml-protected');
        const eml = decode('582b3d3936182b3d39362e37312b3d36763b3735');
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].href = 'mailto:' + eml;
        }
    });
</script>

