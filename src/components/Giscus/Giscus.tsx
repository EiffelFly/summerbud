import { Component } from "solid-js";

const Giscus: Component = () => {
  return (
    <>
      <div class="discus"></div>
      <script
        src="https://giscus.app/client.js"
        data-repo="EiffelFly/summerbud"
        data-repo-id="MDEwOlJlcG9zaXRvcnkzODY1MzEyODM="
        data-category="Announcements"
        data-category-id="DIC_kwDOFwn_084COzH3"
        data-mapping="title"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="dark"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async
      ></script>
    </>
  );
};

export default Giscus;
