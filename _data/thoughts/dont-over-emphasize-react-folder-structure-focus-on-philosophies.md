Managing proper react component folder structure is hard, it needs to be flexible, extendable, and most important of all, it needs to make naming a component as easy as possible.

I adapted several react folder structures across 3 different repo this year, what I discovered is not a steady structure but some philosophies behind the structure. 

- Structure should be consistent and the principle should be documented.
- Component's materials should stay near to the component itself.
- It's a good practice to export your component to the outer responsibility layer.
- It's a good practice to limit the length of the filename to 3. 

I would like to introduce the different structures I used first and then share the context of these philosophies with you.

## [Pnyx](https://github.com/EiffelFly/pnyx)

```
.
|-- public
|-- src
|   |-- config
|   |-- lib
|   |-- locales
|   |-- pages
|   |-- shared-hooks
|   |-- static
|   |   `-- images
|   |-- types
|   |-- utilities
|   |-- components
|   |   |-- buttons
|   |   |-- layouts
|   |   |-- links
|   |   |-- Footer.tsx
|   |   |-- Header.tsx
|   |   `-- ...etc
|   |-- App.tsx
```

This is a simple project and most of its pages are static. As a first-time React user, I learned this structure from videos on Youtube. The whole repo was maintained in a flat manner. There was no nested folder with a duplicate name like `/components/PageHeader/PageHeader.tsx` and I didn’t export any component to its outer layer. Because the codebase is relatively small I didn’t observe much problems during writing this project.




## [instill.tech@0.1.6](https://github.com/instill-ai/instill.tech)

```
.
|-- .github
|-- .husky
|-- .storybook
|-- .__mocks__
|-- .__tests__
|   |-- ui
|   |   |-- Headline.test.tsx
|-- contexts
|-- .hooks
|-- .lib
|-- markdown
|-- pages
|-- public
|-- stories
|   |-- ui
|   |   |-- Headline.stories.tsx
|-- styles
|-- components
|   |-- forms
|   |-- layouts
|   |-- ui
|   |   |-- blocks
|   |   |-- buttons
|   |   |-- groups
|   |   |-- links
|   |   |-- Headline.tsx
|   |   |-- SubHeadline.tsx
|   |   `-- ...etc
```

After further exploring and digging deeper, this project has several changes compared to Pnyx. 

- It adapted storybook and stored stories in a different folder,
- It had the test suites and stored the test files in a different folder,
- Component folder had categories like `form` and `layouts`, it grouped the same components together.

This structure was experimental and I had not formed a steady opinion of React folder structure at that moment. But back then the idea of separating component material(like stories and tests) into different folders caused a lot of trouble. When I refactored some minor changes beneath the component folder, I needed to adjust the `/tests` and `/stories` folder too. These folders became inconsistent over time.

Besides, those components were not exported to the outer level, so it was hard to digest them.  Every import of a component will occupy a line of code and it looks messy.

```js
import ClientBlock from "@/components/ui/blocks/ClientBlock"
import Headline from "@/components/ui/Headline"
```

Image some Next.js page component that have 50 to 75 lines of this kind of import and it is very chaotic.

## [instill-ai/instill.tech@0.13.0](https://github.com/instill-ai/instill.tech)

```
.
|-- .github
|-- .husky
|-- .storybook
|-- docs
|-- public
|-- release-please
|-- src
|   |-- contexts
|   |-- hooks
|   |-- styles
|   |-- types
|   |-- lib
|   |-- pages
|   |-- components
|   |   |-- about
|   |   |   |-- OurMembers
|   |   |   |   |-- OurMembers.tsx
|   |   |   |   |-- MemberIntro.tsx
|   |   |   |   `-- index.ts
|   |   |   `-- index.ts
|   |   |-- career
|   |   |-- docs
|   |   |-- landing
|   |   |-- policy
|   |   |-- ui
|   |   |   |-- Nav
|   |   |   |   |-- Nav.tsx
|   |   |   |   |-- AboutPageLink.tsx
|   |   |   |   `-- index.ts
|   |   |   |-- PageHead.tsx
|   |   |   `-- index.ts
```

This is the current version of my favored folder structure.

- Component's materials are near the component itself.
- General purpose components will stay in the `components/ui` folder.
- Non-general-purpose components will stay in the parent's component folder.
      - For example, `MemberIntro.tsx` is a disposable component that will only be used by its parent `OurMember.tsx` so it should stay in the 
`components/about/OurMember` folder not in the `components/ui` folder.
This act can make naming components much easier compared to treating every component as general purpose components and putting them into the `components/ui` folder.
- All components are exported to its outermost responsibility folder. For example, `Nav` will be exported to the `/components/ui` folder and the `OurMember` component will be exported to the `/components/about`. In this way, the import code will look cleaner.
- Under the `/components` folder, the components are categorized by their responsibility not their functionality. For example, there won’t be a category like `/block` and `/section` but `/onboarding`, `/career`, and `/about`. In this way, we could limit general-purpose components in just one place and other components are treated like disposable components under their responsibility folder.

```js
import { Nav, PageHead } from "@/components/ui"
import { OurMember } from "@components/about"
```

## [instill-ai/design-system](https://github.com/instill-ai/design-system)

```
.
|-- .github
|-- .husky
|-- .storybook
|-- public
|-- src
|   |-- hooks
|   |-- styles
|   |-- types
|   |-- utils
|   |-- index.ts
|   |-- ui
|   |   |-- index.ts
|   |   |-- Buttons
|   |   |   |-- ButtonBase
|   |   |   |   |-- ButtonBase.tsx
|   |   |   |   |-- ButtonBase.stories.tsx
|   |   |   |   `-- index.ts
|   |   |   |-- SolidButton
|   |   |   |   |-- SolidButton.tsx
|   |   |   |   |-- SolidButton.stories.tsx
|   |   |   |   `-- index.ts
```

This project is a special case when it comes to folder structure. It uses the structure I called "Base and Export" two-level component design. 

-   Base-level components: The foundation of every type of component.
    -   Base level components won't be exported to be used by exterior consumers.
    -   Base components will define all the props and functions that the component needs.
-   Exported-level components: Inherits all the props from a base component but may have a predefined style, meant to be used by the consumers.
    -   Exported-level components will be consumed with the limited props like onChangeInput, borderStyle, fontFamiliy, or other functional props.
    -   We will limit as few style props an exported component needs as possible, to control the visual style of the component.

This is a unique way to organize our design system. Overall it brings some fresh air into our projects and serves our needs well. 

## Philosophies

During this journey, what I learned the most is "There is no one fit for all folder structures". If you encounter someone claiming that, it will be better to leave them there and move on. The reason is quite simple: The technology we use is drastically changing. For example, Next.js has a new layout RFC that will change our folder structure a lot, and the adaption of storybook changes the way we thought about components too. I foresee that we will have more frameworks and libraries like these.

### Structure should be consistent and the principle should be documented.

This is my first point. The codebase is not a single person's playground but a collective intelligence that the maintainers had to agree on. No matter what you adopt, you should make the structure as clear and consistent as possible. In this way, other maintainers will have a clear path to look into your project and once you need to refactor the whole repo to adopt a new tech it will be easier to migrate a consistent structure.

### Component's materials should stay near to the component itself.

This is the mistake I made at `instill-ai/instill.tech@0.6.1 ` that caused lots of trouble and inconsistency when I tried to refactor its structure. Overall I think we should put our component's materials close to the component itself. Not only to reduce the overhead of refactoring but also to help others find your component. In this way we could help the maintainers to name their components easier too, because they don’t need to come up with a component name that can describe itself in various contexts. It only needs to describe itself under the context of its parent. 

### It's a good practice to export your component to the outer responsibility layer.

When your file has 30 to 50 imports, it will be messy if the imported function or component are not exported to their outer folder. Imagine you have 30 lines of this kind of code.

```js
import ClientBlock from "@/components/ui/blocks/ClientBlock"
import Headline from "@/components/ui/Headline"
```

Compared to this way.

```js
import { ClientBlock, Headline } from "@/components/ui"
```

I think the latter is better.

### It's a good practice to limit the length of the filename to 3. 

This philosophy comes from a friend of mine. Because we are using the PascalCase for the naming convention of our components, it may be hard to read when the length of words exceeds 3. 

`CallToAction.tsx` and `CallToActionBlock.tsx`

## Don’t over-emphasize the importance of a structure

The ideal structure is changing and changing fast, and it highly relates to the technology we adapt to. I think the best method is to maintain these kinds of fundamental philosophies and adapt new tech and structure in a quick and flexible manner. 