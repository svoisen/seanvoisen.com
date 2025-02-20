---
layout: "page"
title: "About"
description: "About me and this site."
date: Last Modified
permalink: "/about/"
---

![A portrait of the author.](/assets/images/sean_voisen_wide.webp
"A portrait of the author.")

**Hello!** I’m _Sean_.

My professional mission is to _make computing better for human creativity_. I'm a design technologist and software engineering leader who is deeply interested in creative tools, tools for thought, malleable systems, the open web, human-computer interaction, sustainable computing, and generally anything related to making computers more inclusive, empowering, and [convivial](https://archive.org/details/illich-conviviality).

I’m originally from California, and live with my wife and kids in the San Francisco bay area. I studied computer science at [UCLA](https://www.ucla.edu) and at the (radically interdisciplinary and sadly now shuttered) Arts Computation Engineering program at [UC Irvine](https://www.uci.edu). 

Currently, I lead teams of front-end engineers and design technologists building design systems and new user experiences for web, mobile and desktop.

---

If anything I write resonates with you, please feel free to <a href="#" class="eml-protected">send me a note</a> or [find me on Mastodon](https://front-end.social/@svoisen).

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
        const eml = decode('582b3d3936182e37312b3d3676372a3f');
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].href = 'mailto:' + eml;
        }
    });
</script>

