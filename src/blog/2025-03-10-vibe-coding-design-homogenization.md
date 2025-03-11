---
title: Vibe coding our way to design homogenization
tags: ["ai", "design"]
---

Are we at risk of "vibe coding" our way to design homogenization?

---

Recently, [Matt Webb mused](https://interconnected.org/home/2025/03/07/schelling):

>... with the rise of vibe coding and the end of apps, we’ll see everyone using AI to make and share their own micro-apps to do everything, and these apps will differentiate by personal weird aesthetic ...

And yet ... one of the challenges with AI-generated "home-cooked" apps is that many of them don't really have any weird personal aesthetic. They look, well, boring and corporate. And not just boring and corporate, but the *same kind of corporate*. In fact, if you prompt Claude or ChatGPT to build you some small, bespoke app without being very explicit in your technical and aesthetic preferences, odds are very high that whatever you get back will be built in React and styled with Tailwind. It will have that characteristic Tailwind-ish aesthetic, with its flat purple buttons, sans-serif system font and rounded corners. The layout, too, will likely be reminiscent of something you've seen a million times before, maybe a horizontal navigation bar that collapses to a hamburger menu on mobile.

To get something that doesn't look or act this way, you actually have to *fight against the grain* of the system, and be rather explicit in your aesthetic preferences. You have to describe, in detail, your weird personal aesthetic and hope the LLM will respect your description. The problem is: the LLM hasn't been trained on your aesthetic.

I'm optimistic about AI as a tool that may help deliver on the long yearned-for-but-never-achieved promise of computing envisioned by the likes of Engelbart or Kay, where LLMs as natural-language-to-code compilers allow more people to work with computing as a medium for thinking and expression. I see this happening already. Ambitious non-coders are building their own little micro-apps for all kinds of personal needs and tasks, just as Matt Webb describes. Professional developers like Simon Willison [have even published entire collections of little micro-apps built using LLMs](https://tools.simonwillison.net/).

But LLMs are industrial tools. Which makes me think of something Ivan Illich wrote long ago in [Tools for Conviviality](https://openlibrary.org/works/OL2848898W/Tools_for_Conviviality):

>The use of industrial tools stamps in an identical way the landscape of cities each having its own history and culture. Highways, hospital wards, classrooms, office buildings, apartments, and stores look everywhere the same. Identical tools also promote the development of the same character types.

LLMs are squarely anti-convivial; Illich probably would have hated them. But, Illich was writing about how much older industrial tools, tools that create this sameness by virtue of not just of their prolific use, but also the inability to customize, shape or personalize their output. One might argue that LLMs don't really fit this description—in theory, you can steer their output in any number of directions.

But, this doesn't really happen in practice. We already know that [LLMs are powerful homogenizers](https://www.researchgate.net/publication/383466490_Homogenizing_Effect_of_Large_Language_Model_LLM_on_Creative_Diversity_An_Empirical_Comparison_of_Human_and_ChatGPT_Writing). And the reason they are powerful homogenizers is not just because of their training data or because of [algorithmic monoculture](https://www.pnas.org/doi/10.1073/pnas.2018340118), but also because of *fixation effects.* Fixation happens when early solutions to a problem presented by an LLM feel so complete and thought-through that they nudge the human user of the LLM to prematurely converge on a final solution. Basically, we humans are prone to accepting what AI gives us without a lot of pushback.

Good UX design is hard, and most people using LLMs to make apps are not experienced designers. If an app looks good enough and the UX patterns are familiar enough, odds are people will just use whatever the AI "decides" for their little home-cooked app. Which really just means more of the same for a lot more people.

Homogenizing forces on design are not new, of course. In a paper entitled [Investigating the Homogenization of Web Design: A Mixed-Methods Approach,](https://dl.acm.org/doi/10.1145/3411764.3445156) researchers at Indiana University Bloomington showed that the web has indeed slowly converged towards homogenous layout styles and color choices, with a noticeable uptick in this trend starting somewhere around 2007. The paper cites a few possible reasons, including mobile-friendly design and the launch of the iPhone (note the year!), but another one that stands out to me is this: An increased reliance on an ever-shrinking collection of common libraries—open source libraries like Bootstrap or jQuery—that pushed designs towards those best afforded and supported by these libraries. That was in the early years post 2007. Today's jQuery and Bootstrap are—you guessed it—React and Tailwind.

I'm not really sure what there is to be done about this, except the obvious: learn to code and manually intervene. I really would love more weird personal aesthetic in computing. But to do this—to get something more MySpace and less Facebook out of AI—we're going to have to very deliberately inject the weird.
