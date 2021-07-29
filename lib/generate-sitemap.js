const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const postsDirectory = path.resolve(process.cwd(), "_data", "posts");
const pagesDirectory = path.resolve(process.cwd(), "_data", "pages");

(async () => {
  const prettierConfig = await prettier.resolveConfig("./prettiter.config.js");

  const pages = getSlugs("page");
  const posts = getSlugs("post");
  const allPages = [...pages, ...posts];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${`https://summerbud.org/en`}</loc>
      </url>
      <url>
        <loc>${`https://summerbud.org/zh-tw`}</loc>
      </url>
      <url>
        <loc>${`https://summerbud.org/en/lessen-learned`}</loc>
      </url>
      <url>
        <loc>${`https://summerbud.org/zh-tw/lessen-learned`}</loc>
      </url>
      <url>
        <loc>${`https://summerbud.org/en/posts`}</loc>
      </url>
      <url>
        <loc>${`https://summerbud.org/zh-tw/posts`}</loc>
      </url>
      ${allPages
        .map((page) => {
          return `
            <url>
              <loc>${`https://summerbud.org/${page}`}</loc>
            </url>
          `;
        })
        .join("")
      }
    </urlset>
  `;
  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();

const getFilesName = (directoryPath, filesList = []) => {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getFilesName(`${directoryPath}/${file}`, filesList);
    } else {
      filesList.push(path.join(path.basename(directoryPath), "/", file));
    }
  });

  const filteredList = filesList.filter((file) => file.includes(".mdx"));
  return filteredList;
};

const getSlugs = (type) => {
  const dir = type === "page" ? pagesDirectory : postsDirectory;
  const fileNames = getFilesName(dir);
  const slugList = [];

  for (const fileName of fileNames) {
    const pathList = fileName.split("/");
    const lang = pathList.pop().split(".")[1];

    let slug;
    if (type === "page") {
      slug = `${lang}/${pathList[0]}`;
    } else {
      slug = `posts/${lang}/${pathList[0]}`;
    }

    if (slugList.indexOf(slug) === -1) {
      slugList.push(slug);
    }
  }

  return slugList;
};
