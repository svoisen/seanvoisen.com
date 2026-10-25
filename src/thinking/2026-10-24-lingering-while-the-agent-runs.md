---
title: 'Lingering while the agent runs'
description: 'On agentic development and resisting the pull of multitasking.'
tags: ["ai", "programming", "philosophy"]
---

Towards the end of his talk, [Apps and programming: two accidental tyrannies](https://andymatuschak.org/tat) (which is excellent, by the way), Andy Matuschak shares his feelings about agentic development:

>Working with coding agents all day leaves my attention fragmented, unfocused, impulsive. I’m busy waiting. I’m constantly bouncing between workspace tabs, flushing and reconstituting my working memory. I’m moving quickly, but I’m never in flow.

It felt so familiar, I had to pause the video for a second. This unsettledness, this perennial bouncing, this "never in the flow" aptly characterizes the feel of software development in the year 2026. Most of us who write code for a living—or, perhaps I should say, *used* to write code for a living—can only nod our heads in lamenting assent to Matuschak’s description.

But, if you watch the talk, you will only have time for maybe one silent nod, because in the next breath Matuschak goes on to share the even more dismaying feelings of one of his collaborators, a designer named Nio:

>I live in an eternal present. No memory, no plan. Every minute my attention lunges at something else. It’s hard to recount what even happened these last few months. For all this activity, I feel bereft of outcomes or memories. I feel disembodied, so my embodied life is in disrepair. My home is my screen, so my living space is dusty and incomplete. I feel robbed of agency. I can scarcely recognize my own goals, let alone act on them. It’s like forgetting a past life. The world feels like a blurry backdrop for my screens. It’s all desktop wallpaper.

Oof.

Honestly, not nearly enough has been said about the temporal experience of agentic development. I find this baffling. The mourning of our lost craft is not just the mourning of a lost skill, but a lost way of being. And with it goes that comforting sense of hours accumulating, of a day inching towards a satisfying end. In its place we find something new: Nio’s unsatisfying "eternal present."

Agentic development asks us to trade hours in deep focus on challenging problems in favor of a shallower, supervisory flitting about between simultaneous tasks. In the process, our experience of time itself mutates into something alien, unrecognizable, a pile of ephemeral shards. Nothing endures. We struggle to build a continuous narrative of our days and what we accomplished. For many, it is unpalatable. Adapting to it all requires not just a willingness to learn new skills, but a willingness to live in a completely new way, to surrender the familiar feeling of flow for something *else*.

Whenever I talk about the modern phenomenological experience of time [I inevitably reach for the words of Byung-Chul Han](/writing/design-for-lingering/). In [The Scent of Time](https://bookshop.org/a/106240/9781509516056), Han gives a name to Nio’s eternal present: point-time. Point-time is time that has been atomized, broken up so finely that it lacks any narrative continuity. Like scrolling through a TikTok feed, where a friend’s cooking video cuts abruptly into a clip of a political protest in a foreign land, one moment in point-time has no meaningful relationship with the next. Agentic development time is point-time.

The writer Annie Dillard once observed: "How we spend our days is, of course, how we spend our lives. What we do with this hour, and that one, is what we are doing." But if you don’t even remember what you did in the past hour, how can you know what you are doing? How can you account for how you spent your days and, thus, your life?

Those of us who switched career paths from individual contributor to management have felt a version of this disorientation. We traded days with long blocks of focus for days fragmented into meetings and impromptu conversations. The trade-off felt worth it for the increased leverage that came with shepherding an entire team of people towards a shared vision. For me, it remains worth it. But agentic development doesn’t have the same trade-off.

Agentic development has frequently been likened to management, except instead of managing humans you manage agents. This analogy is blatantly wrong. Agents are nothing like humans. Humans grow and learn and change and have personalities and needs and interests and lived experiences. You can have relationships with humans. Humans have volition. An agent has none of these characteristics. Despite its name, an agent doesn’t even have agency; it is autonomous, yes, but not agentic. Its volition comes from the outside. It does whatever you direct it to do.

When you transition from IC to manager you fragment your day—yes—but this fragmentation is redeemed by the joy (and challenge) of working with people. Agentic development gives you the same (or worse) fragmentation without the same redemption.

So what to do? I think, if you want to avoid the eternal present of point-time, the only option is to resist fragmentation, which means [resisting parallelism](/thinking/2025-07-22-multitasking-as-antiprogress/). Go deep on the same problem in the same focus block. Run multiple agents, but work only on one project at a time. Resist flitting about.

Of course, all this is easier said than done. Agentic coding presents a unique structural problem that frustrates this kind of focus: what to do while the model executes. Even though *you* might be idle, your brain most certainly is not, constantly seeking the next productive thing to do. I’ve found that with practice I can get better at paying attention to the liminal moment that begins right after I press the `Enter` key and resist jumping to the next prompt. Instead I look at the code. I read what the agent just wrote in the last session. I ask questions about it, probe it, take time to understand it. I push and prod and poke and see if I can make it better. I linger with the problem while the agent runs. But I try not to pick off another ticket in another area.

Is this tactic a panacea or just a band-aid? If I’m being honest, it’s mostly the latter. I’m hopeful that as agentic development matures we will see better interfaces for interacting with agents that may help keep our monkey minds on the straight and narrow. But I’m not hopeful those interfaces will come from purveyors of tokens. Someone else will have to invent them.

As an engineering manager—and thus as someone deeply invested in team output—all this talk of resisting parallelism feels dangerous, even ill-advised. But I’m not convinced excessive parallelism always buys more output in the long run anyway. What it does buy is burnout. And that, my friends, is much, much worse.
