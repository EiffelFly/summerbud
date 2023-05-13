---
title: "How to solve react-select unknown type issue"
slug: "how-to-solve-react-select-unknown-type-issue"
tags: ["react-select", "react", "typescript", "how-to"]
publishedAt: "2022-10-18T18:00:00"
lastModified: "2022-10-18T18:00:00"
description: "React select is a easy to use library, but when working with typescript it has some issue to correctly inherit the type. This article will try to light up the path of how to solve it."
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
locale: "en-US"
---

When working with React-select and typescript, one of the advantages is auto type detecting. React-select will digest your prop's type and make it universal inside the component. For example, React-select will digest the option prop and use the type in opChange props. This is very convenient.

Here comes the pitfall. When you return the wrong type back to React-select, it will get confused and rollback Option type to its original type which is Unknown. 

```js
interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
 ...
}
```

> If TypeScript can't detect what type this should be, it defaults to `unknown`.

This seldom happens when the use case is simple, but when you want to adjust lots of React-select's props, it will cause some issues. Like the example below, when dealing with the custom component, if you cast the wrong type at component’s props, React-select will get confused and rollback its Option's type.

```js
<ReactSelect
  options={options}
  onChange={onChangeHandler}
  components={{
	// This will cause issue
    ClearIndicator: (props: ClearIndicatorProps) => {...},
  }}
/>
```

The correct way of doing so, if you don't need to do anything fancy of type checking is you let the prop's type inherit from React-select itself.

```js
<ReactSelect
  options={options}
  onChange={onChangeHandler}
  components={{
	// This will cause issue
    ClearIndicator: (props) => {...},
  }}
/>
```

And the React-select will correctly get the type!

