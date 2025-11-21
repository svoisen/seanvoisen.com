---
title: "Parts and wholes and moments, oh my!"
description: How the phenomenology of parts and wholes can help improve design decisions.
tags: ["philosophy", "design"]
image: "/assets/images/og/laptop_eyes_yeti_iglesias_unsplash@1200x630.jpg"
---

{blurb, class:information}This is Part 2 in an ongoing series on philosophy, design and cognitive science. You can also read [Part 1](/writing/phenomenology-and-the-impossibility-of-experience-design/), or check out [the reading list behind this series](/notes/philosophy-for-designers/).{/blurb}

Once, when I was a software engineer working on multiuser collaboration application, I was tasked with building the user interface component that displays the list of users who were currently "present" in the current document. If you've ever used Google Docs, Miro, Figma, or any number of other online, multiuser applications then you might have an idea of the component I'm talking about here. It typically looks like a series of overlapping circles containing a tiny photo or each user's initials, splayed like a hand of circular cards, sitting at the top of the application. When people join the document, a new circle appears. When people leave, their corresponding circle drops away. Internally, we jokingly called this component the "face pile."

![Colorful, surreal illustration of a pair of eyes looking at a laptop with finger-like curving lines holding a tablet or phone adjacent to the laptop.](/assets/images/laptop_eyes_yeti_iglesias_unsplash@1600.jpg "Illustration by Yeti Iglesias on Unsplash")

My design collaborator provided me with a mockup of the face pile, which included detailed specifications for the sizes, colors, and placement of all the sub-parts, along with how the component should work when a user is anonymous, or has a name with non-Latin characters (e.g. Japanese or Korean), or if there are so many users in the document that it can't fit all the circles. My job entailed taking this specification and implement the whole thing in code.

Despite the designer's painstaking work to specify everything she could think of, it wasn't long before I ran into a few problems. First, there were the unanswered questions: Where was the component supposed to be placed in the application header? How was it supposed to resize on mobile devices? What should I display if the same user joined the same document multiple times? How should unique colors be allocated across tens or hundreds of simultaneous users?

Beyond these questions, I faced the problem of somehow testing the thing. Should I build an entire test harness to simulate the comings and goings of users? How would I test the variety of configurations of languages and user profiles? Could I simulate server errors like lost connections or incorrect information? How could I verify it worked as expected without integrating it in the actual application? 

We had treated the face pile as a standalone component that we could design and build outside the context of our application. But all the questions and challenges I was facing were caused exactly by this framing. The face pile made no sense in isolation—it couldn't be fully designed and developed on its own. Only by considering its participation, function and construction within the full context of the application could we ultimately answer my questions and solve my problems. 

In phenomenological terms we had made a classic mistake—we had confused a "moment" for a "piece."

## Moments vs. pieces

In my [last essay](/writing/phenomenology-and-the-impossibility-of-experience-design/), I began introducing the basic concepts and approach to phenomenology as described by Robert Sokolowski in his book [Introduction to Phenomenology](https://bookshop.org/a/106240/9780521667920). In this essay, I'd like to continue going deeper into the relationship between phenomenology and design practice by looking at one of Husserl's core "structural forms of phenomenology," namely the theory of "parts and wholes."

Sokolowski opens his sub-chapter on parts and wholes with the following:

>Wholes can be analyzed into two different kinds of parts: pieces and moments. Pieces are parts that can subsist and be presented even apart from the whole; they can be detached from their wholes. Pieces can also be called independent parts.

In phenomenological terms, a *piece* is a part of something that can stand on its own. Sokolowski gives the example of a tree and an acorn. A tree is a kind of "whole" object, and an acorn is a part of a tree that can exist completely independently from the tree. In software, we can think of a file as a piece of an entire file system. A file can exist on its own. You can move it between systems. You can copy it, email it, and—if it is in a standardized format—even open it in different apps. It is, itself, a kind of whole. And as Sokolowski says, "pieces ... are parts that can become wholes."

But not all parts can exist independently. Many parts depend on the existence of the whole to which they belong, and cannot persist, be presented, or serve as meaningful in a separated context. Phenomenology calls such nonindependent parts *moments*. Sokolowski writes:

>Examples of moments are the color red (or any other color), which cannot occur apart from some surface or spatial expanse, and musical pitch, which cannot exist except as blended with a sound, and also vision, which cannot occur except as dependent upon the eye ... Moments are the kind of part that cannot become a whole.

## The language trap

Sokolowski points out something interesting here: the only reason we can even think of moments as standalone things is because of language. Language allows us to talk about moments as independent concepts even if the way we encounter them in lived experience is never as independent. We can talk abstractly about the color red, but we never encounter red except as an attribute of light and vision. We can talk abstractly about vision, but we cannot actually separate vision from our body—from our eyes, the movement of our heads, and from our mobility in the world. 

Words are sneaky this way—they let us mentally pry moments away from their context and talk about them as if they were independent things. But this is also where we get into trouble. As I alluded to in my example above, in artificially separating moments from their wider wholes and other parts, we create philosophical problems for ourselves that need not actually exist. For instance, phenomenology's response to the Cartesian problem of mind-body duality is that it is actually a non-problem. Incorrect thinking (that is, thinking non-phenomenologically about parts and wholes) created the problem in the first place. Sokolowski writes:

>... the mind is a moment to the world and the things in it; the mind is essentially correlated with its objects. The mind is essentially intentional. There is no "problem of knowledge" or "problem of the external world," there is no problem about how we get to "extramental" reality, because the mind should never be separated from reality from the beginning. Mind and being are moments to each other; they are not pieces that can be segmented out of the whole to which they belong.

## Rethinking components

The structural form of parts and wholes forces us to think more deeply about how we think about the various parts of a user experience and whether we do ourselves a disservice in designing them independently. All too often, we confuse moments for pieces.

Most things we consider to be standalone components of a user experience only make sense in the context of use. A login button, for instance, isn't simply a functional element of a form; it's a moment within the entire experience of entering a new digital space. The meaningfulness of a login button comes from its relationship with the entire experience of "logging in"—from the user's desire to enter the use the app, to the visual context of the "doorway" to that experience, to the temporal flow of entering credentials and being admitted, and so on. To consider the button as just a button is to miss the entire point of what it means to design a login experience in the first place.

And this is where we get into trouble with design systems: we treat components as things that can stand alone. After all, we *can* design, build, display and even interact with components on their own. But this is like trying to design a steering wheel independent of a car. Sure, we can describe its shape and material, feel it, rotate it, and so on. But the wheel only fully makes sense when someone's hands are on it, connected to a car, on a road, going somewhere.

An individual user interface component cannot act as an independent unit of meaning. Buttons, menus, text fields and checkboxes are meaningless on their own. Returning to my example of the "face pile," this component, too, has no meaning outside of the broader context of the collaboration app and the social fabric in which it is embedded, including the user's desire to collaborate with others, and the very existence of other human collaborators. And even more practically—as I learned—despite our best intentions, we cannot really fully design, build or test such a component divorced from wholeness of this context.

In [The Phenomenology of Perception](https://bookshop.org/a/106240/9781774645093)—which is the next book I plan to cover in this series—philosopher [Maurice Merleau-Ponty](https://plato.stanford.edu/entries/merleau-ponty/) builds on this structural form of parts and wholes, arguing that the basic unit of perceptual experience is the whole, or what philosophers call the "gestalt." That is, we do not perceive things in some methodical and rational manner by building them up through the independent sensing of each part, but rather we first perceive the whole as a *whole*. And in the context of user experience, that whole means the entirety of the experience, not just the visual arrangement of the application, but also all the baggage we drag along with us as part of our lived experience in that moment—our desires, our mood, and our very body.

How we use the form of parts and wholes in design may have implications beyond experience too. While I wasn't able to find any literature on this, I have a suspicion that it also has ethical implications. For instance, trying to separate moments from wholes could lead—whether intentionally or unintentionally—to UX dark patterns. My favorite examples of this are privacy settings, which many applications often bury in a unified settings screen, far removed from the content upon which they apply and have any significance. In this decoupled environment, users often find it difficult to understand the meaning these privacy decisions have on the ways they may choose to interact with or use the application. And they may make poor or incorrect decisions on how they do or do not expose their data as a result. Unfortunately, this decision bury privacy settings far from meaningful context is often intentional.

The structural form of parts and wholes serves as a kind of reality check for designers, reminding us to design with the whole in mind. Every time we isolate a component from its context, we may inadvertently create unnecessary complexity. Every specification document that treats a UI element as standalone risks multiplying questions it cannot answer. Every separation of a control from its meaningful context of use risks misleading users. This isn't to say that working in these ways is always incorrect, unhelpful or harmful. Rather, it reminds us that *only* working in these ways can indeed lead to these poorer outcomes.

In the next essay in this series, we'll continue with Sokolowski's [Introduction to Phenomenology](https://bookshop.org/a/106240/9780521667920), examining the remaining structural forms of phenomenology—identity in manifolds, presence and absence—and explore how these, too, might prove useful in design practice.