const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const articleRootList = ["lessonLearned", "series", "projects"];

const DirectoryPath = {
  dataRoot: path.resolve(process.cwd(), "_data"),
  about: path.resolve(process.cwd(), "_data", "about"),
  posts: path.resolve(process.cwd(), "_data", "posts"),
  pages: path.resolve(process.cwd(), "_data", "pages"),
  series: path.resolve(process.cwd(), "_data", "series"),
  lessonLearned: path.resolve(process.cwd(), "_data", "lesson-learned"),
  novels: path.resolve(process.cwd(), "_data", "novels"),
  snippets: path.resolve(process.cwd(), "_data", "snippets"),
  projects: path.resolve(process.cwd(), "_data", "projects"),
};

(async () => {
  const prettierConfig = await prettier.resolveConfig("./prettiter.config.js");

  let allPages = [];

  for (const root of articleRootList) {
    const pages = constructPathParams(root);
    allPages = [...allPages, ...pages];
  }

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${`https://www.summerbud.org/zh-tw`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/en`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/zh-tw/about`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/en/about`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/zh-tw/lesson-learned`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/en/lesson-learned`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/zh-tw/posts`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/en/posts`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/zh-tw/series`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/en/series`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/zh-tw/projects`}</loc>
      </url>
      <url>
        <loc>${`https://www.summerbud.org/en/projects`}</loc>
      </url>
      ${allPages
        .map((page) => {
          return `
            <url>
              <loc>${`https://www.summerbud.org/${page.lang}/${page.path}`}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;
  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();

const getAllFilePath = (type, directoryPath, filesList = []) => {
  if (!directoryPath) {
    directoryPath = DirectoryPath[`${type}`];
  }
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllFilePath(type, `${directoryPath}/${file}`, filesList);
    } else {
      let path = getRemainPathAfterIt("_data", `${directoryPath}/${file}`);
      filesList.push(path);
    }
  });

  filesList = filesList.filter(
    (file) => file.includes(".mdx") && !file.includes("pageIndex")
  );
  return filesList;
};

const constructPathParams = (type) => {
  const paths = getAllFilePath(type);
  let params = [];

  paths.forEach((path) => {
    let pathChunk = path.split("/");
    const lang = pathChunk.pop().split(".")[1];
    const pathTail = pathChunk.join("/");

    params.push({
      lang: lang,
      path: pathTail,
    });
  });
  return params;
};

const getRemainPathAfterIt = (it, path) => {
  const pathList = path.split("/");
  const index = pathList.indexOf(it);
  const newPathList = pathList.slice(index + 1);
  return newPathList.join("/");
};
