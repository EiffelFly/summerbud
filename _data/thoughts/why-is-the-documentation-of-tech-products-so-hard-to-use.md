---
title: "Why is the documentation of tech products so hard to use? (In the user’s point of view)"
slug: "why-is-the-documentation-of-tech-products-so-hard-to-use"
tags: ["Thoughts"]
publishedAt: "2022-08-30T18:00:00"
lastModified: "2022-08-30T18:00:00"
description: "I want to address the 2 major issues of documentation of tech products right now and I think if we don't address these issues, the future of programming is at danger."
featureImg: "/early-20-centry-books-and-scholars-possessions.jpg"
featureImgAlt: "Books and Scholars' Possessions, early 20th century, Unidentified artist"
featureImgSource: "https://www.metmuseum.org/art/collection/search/73134"
setup: |
  import Image from "../../src/components/Image"
---

Nowadays, our documentation of developer tools is hard to use and we tend to find the solution on other sources such as Youtube, GitHub issues, or blog posts. Its content may easily fall behind or the key point has not been mentioned at all. I consider this issue an emergent problem that we should toggle as soon as possible, and I think two major problems needed to be solved first. (In the user’s point of view)

- Documentation is too hard to contribute to
  - Documentation easily becomes out of date. People tend to write a blog post rather than contribute to a document because it requires a lot of extra effort without the corresponding incentives.
- The context is clustered
  - Documentation itself hardly connects to other resources. The context that makes good documentation is clustered.

In this article, I would like to introduce two concepts around documentation that I think are problematic and then further expand it to 3 thinking points toward solving these two issues.

First of all, please recall some documentation you have visited recently and join me with the explanation below. I would like to take Next.js for example which is currently my most visited documentation. Let's start with the "Getting Started" page.

https://nextjs.org/docs/getting-started

Nextjs's documentation has a structure that is popular through various products, let me call this structure "Isolated listing structure". The reason I call them isolated is that they are mainly maintained by the people behind Next.js(although they are open-sourced).

Furthermore, I would like to conclude the mindset behind this documentation as "Owner's bullet-point".

## Owner's bullet-point
The reason I call it "Owner's bullet point" is the process of generating documentation is usually accomplished by the product owner. At the start of a product, no one has an understanding better than the owner. The owners are the best person to maintain proper documentation for their consumers and maintainers.

But after a while, the product receives a lot of love and begins to build up the community. It becomes harder and harder to follow up on corner cases and bugs. The owners have to catch up with new commits and solve issues daily, on the other hand, they have to explain new designs, and caveats and provide information for newcomers to overcome these problems. The loading is rising high drastically.

Not every product can catch up, the content begins to fall behind, and some solutions may exist in others' blog posts, StackOverflow's answers, GitHub issues, or discussions. A user needs to connect these solutions with search engines, sometimes the solution on documentation is even wrong. 

## Isolated listing structure
The isolated listing structure is very common, in e-commerce, in general-purpose websites, on your phone, and in the documentation. It's everywhere. 

The structure is mostly arbitrary and opinionated coming from the mindset of "Owner's bullet-point", due to the owner having to first come up with the tree of the structure, in an order that they think is most suitable for their client. 

The isolated listing structure is a double-edged sword: To be clear, I am not fully against this structure, it is really helpful in a general context. For example, it's good for initial exploration and if you're familiar with the document, it's quite easy for you to find the information you want.

But on the other hand, it's a fixed structure, it is hard for the structure to evolve and every time the maintainer wants to add something else, it's hard to find an appropriate place if the owner didn't think it well from the beginning. Besides that, users have no other choice but to explore your documentation. They have only one route and it's not enough.

<Image
  src="/force-directed-graph.png"
  alt="Force firected graph"
/>
<sup>Martin Grandjean, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons</sup>

Imagine a dynamic structure, like a force-directed graph (Something like Obsidian can accomplish or a tree diagram, you could find many examples right in their publish section[^1]). I am not saying force-directed graphs or tree diagrams are better than isolated listing structures. What I want is to encourage everyone not to think in a "listing way" but in a more "dynamic way", so that people can choose whatever suits their needs best. They can use tree diagrams to explore the structure and use the force-directed graph to acknowledge the connection between topics. Or we could come up with a new structure from the ground up which can solve some of these problems.

In combination, the mindset and the structure lead to the problem I think is problematic, listed below.

## Documentation is too hard to contribute to
In combination with the arbitrary mindset of "Owner bullet's point" and the "Isolated listing structure", what we have is that current documentation can only be properly maintained by the owner, there is no other easy way to contribute to the documentation. The problem is twofold.

First, based on the "Owner's bullet point" mindset, the author doesn't want some inexperienced person to mess up your documentation and it's quite hard to match the tone of documentation if you don't spend much time staying aligned with your maintainers. 

Second, your user doesn't have any incentive to contribute to the documentation, people love your product but if they don't get any credit within the construction of the document or some ownership toward some page of documentation, there is no incentive.

You may argue that they can post an issue and explain their suggestion but the problem remains. The feeling of contributing is very simultaneous, it is just like the feeling of buying something. Imagine a parallel world, in here, if you want to buy something, you need to write down 200 words to describe why you want to buy this stuff and what is the benefit the community. 

There is no need to gate people from contributing documentation with bureaucracy. We need to come up with another structure that can remain the authority of the documentation and benefit the simultaneous contribution at the same time.

## The context is clustered
The material of good documentation is not just the documentation itself, but the corresponding discussions, issues, related blog posts, and videos. I will call these materials "Contexts".

Until recently we tended to store these contexts distributedly. A regular open-source project stores their discussion in GitHub discussion or a discourse forum, their use cases in product websites, issues right in the GitHub issues, and a self-hosting documentation website elsewhere. Besides that, there is a lot of community-generated content on YouTube and personal blog posts.

In reality, the context of a product becomes clustered. They won't have inter-connection with each other. There may be a discussion about the solution to the specific bug, but there is no reverse link on the documentation section that has mentioned this solution. Sadly we have to deal with the reality that the bi-directional link is not what the current internet is capable of.

### Clustered context is volatile
Imagine a situation where you drop in the product's documentation and quickly find out that the documentation doesn't provide a solution, later the day you find a workable solution on someone else's blog post. 

At this moment, with the current documentation, there is no other way to remind other developers that they can solve the same problem with this method described by the blog post, you can't add a reference to the documentation. What you can do is open an issue(if it's open-source) or open a discussion on a forum to remind people about this solution which will soon be flooded by other content.

Every useful solution in any context needs to be resistant to the flood of information we have right now. They have to join this battleground with no anchor point besides search engines. 

The awesome list [^2] is a good idea, they provide a way to let good contents stay, but they have the same issue with the "Isolated listing structure" and the "Owner's bullet-point" mindset.

## If the situation remains as is…
The immediate consequence of these issues will be the “Documentation” will deem to decay over time. You could take a look at some tech giant’s documentation including Amazon web services documentation or Google cloud documentation, they are all overwhelming and hard to read. 

The worst feeling is you are stucking on a specific problem that you can’t find in the documentation and anywhere else. We will be facing these kinds of situations more if the structure of our documentation can not align with the scope of the product we use.

It may seem overwhelming to come up with a new kind of structure to overcome these issues in the first place. But look closely, we could separate the overall problems into 3 questions to ask ourselves.

- How to encourage users to contribute to the documentation and not interfere with the general purpose of the document? Can we have a more interactive experience for documentation? Can a user directly contribute to the documentation without leaving the page?
- How to gather context together for a better search experience that does not rely on exterior search solutions and brings up inter-connectivity of every context along the way?
- How to experiment with a new structure that may benefit user experience and iterate it over time, or even let users choose it freely?

I want to progressively tackle these issues. If you are interested in or come up with something interesting about this topic, I'd like to hear about it. I would answer any email (summerbud.chiu@gmail.com) about this topic, you could also find me on Twitter (https://twitter.com/EiffelFly).

## Thanks

Thanks for 晏如, 靜智, 子宇, 示家 reading the draft of this article.

[^1]: [Obsidian publish page](https://obsidian.md/publish)
[^2]: [sindresorhus/awesome](https://github.com/sindresorhus/awesome)