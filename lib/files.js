import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prepareMDX } from "./mdx";

const DirectoryPath = {
  posts: path.resolve(process.cwd(), "_data", "posts"),
  pages: path.resolve(process.cwd(), "_data", "pages"),
  series: path.resolve(process.cwd(), "_data", "series"),
  lessenLearned: path.resolve(process.cwd(), "_data", "lessen-learned"),
  novels: path.resolve(process.cwd(), "_data", "novels"),
  snippets: path.resolve(process.cwd(), "_data", "snippets"),
};

// Get all filenames in posts directory as ['en/filename.md']
export function getAllFileNames(directoryPath, filesList = []) {
  const files = fs.readdirSync(directoryPath);
  //console.log(files)
  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllFileNames(`${directoryPath}/${file}`, filesList);
    } else {
      filesList.push(path.join(path.basename(directoryPath), "/", file));
    }
  });

  const filteredList = filesList.filter((file) => file.includes(".mdx"));
  return filteredList;
}

export const getAllSlugs = (type = "post") => {
  const dir = type === "page" ? pagesDirectory : postsDirectory;
  const fileNames = getAllFileNames(dir);
  return fileNames.map((fileName) => {
    const pathList = fileName.split("/");
    pathList.pop(-1);
    const fullSlug = pathList.join("/");
    return {
      params: {
        slug: fullSlug,
        lang: fileName.split("/")[1].split(".")[1],
      },
    };
  });
};

export const getSortedPostsData = () => {
  const fileNames = getAllFileNames(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const pathList = fileName.split("/");
    pathList.pop(-1);
    const fullSlug = pathList.join("/");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const metadata = matter(fileContents);

    return {
      slug: fullSlug,
      ...metadata.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    } else {
      return 1;
    }
  });
};

export async function getContent(slug, locale, type = "post") {
  const dir = type === "page" ? pagesDirectory : postsDirectory;
  const fullPath = path.join(dir, slug, `index.${locale}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());

  //let components = {};
  // if ( data.components.length > 0 ){
  //   components = getComponents(data.components, dir, slug);
  // }

  const code = await prepareMDX(content, path.join(dir, slug));
  return {
    slug: slug,
    code: code,
    metadata: data,
  };
}

export const getComponents = (componentPaths, dir, slug) => {
  const components = {};

  for (const componentPath of componentPaths) {
    //const fileName = componentPath.split("/").pop()
    const fullPath = path.join(dir, slug, componentPath);
    const fileBuffer = fs.readFileSync(fullPath);
    components[`/${componentPath}`] = fileBuffer.toString().trim();
  }

  return components;
};

export const getPagesIndexContent = async ({ type, locale }) => {
  const dir = DirectoryPath[`${type}`];
  const fullPath = path.join(dir, `index.${locale}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());
  const code = await prepareMDX(content, path.join(dir, "index"));
  return {
    code: code,
    metadata: data,
  };
};

export const getAllSeriesSlugs = async () => {
  const fileNames = getAllSeriesFileName(DirectoryPath.series);
  let slugs = [];

  for (const name of fileNames) {
    const nameList = name.split("/"); // [ blogging-with-nextjs, <slug>, index.en.mdx ]
    if (nameList.length === 3) {
      slugs.push({
        params: {
          lang: nameList[2].split(".")[1],
          slug: nameList[1],
          series: nameList[0],
        },
      });
    }
  }
  return slugs;
};

export const getTargetSeriesPaths = async ({ seriesName }) => {
  const fileNames = getAllSeriesFileName(
    path.join(DirectoryPath.series, seriesName)
  );
  let paths = [];
  for (const name of fileNames) {
    const nameList = name.split("/"); // [ blogging-with-nextjs, <slug>, index.en.mdx ]
    if (nameList.length === 3) {
      const fullPath = path.join(seriesName, "/", nameList[1]);
      if (paths.indexOf(fullPath) === -1) {
        paths.push(fullPath);
      }
    }
  }
  return paths;
};

export const getSeriesPostsContent = async ({ series, slug, lang }) => {
  const fullPath = path.join(
    DirectoryPath.series,
    series,
    slug,
    `index.${lang}.mdx`
  );
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());
  const code = await prepareMDX(
    content,
    path.join(DirectoryPath.series, series, slug)
  );
  return {
    slug: slug,
    code: code,
    metadata: data,
  };
};

export const getAllSeriesFileName = (directoryPath, filesList = []) => {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllSeriesFileName(`${directoryPath}/${file}`, filesList);
    } else {
      const path = getRemainPathAfterIt("series", `${directoryPath}/${file}`);
      filesList.push(path);
    }
  });

  const filteredList = filesList.filter((file) => file.includes(".mdx"));
  return filteredList;
};

const getRemainPathAfterIt = (it, path) => {
  const pathList = path.split("/");
  const index = pathList.indexOf(it);
  const newPathList = pathList.slice(index + 1);
  return newPathList.join("/");
};
