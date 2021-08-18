import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prepareMDX } from "./mdx";

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

// Get all filenames in posts directory as ['en/filename.md']
export function getAllFileNames(directoryPath, filesList = [], prefix) {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllFileNames(
        `${directoryPath}/${file}`,
        filesList,
        prefix
      );
    } else {
      if (prefix) {
        filesList.push(
          path.join("/", prefix, path.basename(directoryPath), "/", file)
        );
      } else {
        filesList.push(path.join(path.basename(directoryPath), "/", file));
      }
    }
  });

  const filteredList = filesList.filter((file) => !file.includes("pageIndex"));
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

export const getPostsPath = () => {
  const fileNames = getAllFileNames(DirectoryPath.posts);
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

export const getPostContent = async ({ lang, slug }) => {
  const fullPath = path.join(DirectoryPath.posts, slug, `index.${lang}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());
  const code = await prepareMDX(content, path.join(DirectoryPath.posts, slug));
  return {
    code: code,
    metadata: data,
  };
};

export const getAllPagesPath = () => {
  let paths = [];
  const dir = DirectoryPath.pages;
  const fileNames = getAllFileNames(dir);
  for (const fileName of fileNames) {
    const pathChunk = fileName.split("/");
    const lang = pathChunk.pop(-1).split(".")[1];
    const slug = pathChunk[0];
    paths.push({
      params: {
        slug: slug,
        lang: lang,
      },
    });
  }
  return paths;
};

export const getSortedPostsData = () => {
  const fileNames = getAllPostsFilename();

  const allPostsData = fileNames.map((fileName) => {
    const pathList = fileName.split("/");
    pathList.pop(-1);
    const fullSlug = pathList.join("/");
    const fullPath = path.join(DirectoryPath.dataRoot, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const metadata = matter(fileContents);

    return {
      path: fullSlug,
      metadata: metadata.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    } else {
      return 1;
    }
  });
};

export const getAllPostsFilename = () => {
  let seriesFilenames = getAllSeriesFileName(DirectoryPath.series, [], true);
  seriesFilenames = seriesFilenames.filter((file) => !file.includes("/intro/"));
  //const postFilenames = getAllFileNames(DirectoryPath.posts, [], "posts");
  const llFilenames = getAllFileNames(
    DirectoryPath.lessonLearned,
    [],
    "lesson-learned"
  );
  let devlogsFilenames = getAllProjectFilenames(
    DirectoryPath.projects,
    [],
    true,
    false
  );
  devlogsFilenames = devlogsFilenames.filter(
    (file) => !file.includes("/intro/")
  );
  const allFilenames = [
    ...seriesFilenames,
    ...llFilenames,
    ...devlogsFilenames,
  ];
  return allFilenames;
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

export const getPagesIndexContent = async ({ slug, lang }) => {
  const dir = DirectoryPath.pages;
  const fullPath = path.join(dir, slug, `index.${lang}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());
  const code = await prepareMDX(content);
  return {
    code: code,
    metadata: data,
  };
};

export const getAllProjectFilenames = (
  directoryPath,
  filesList,
  havePrefix,
  withPageIndex
) => {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllProjectFilenames(
        `${directoryPath}/${file}`,
        filesList,
        havePrefix
      );
    } else {
      let path = getRemainPathAfterIt("projects", `${directoryPath}/${file}`);
      if (havePrefix) {
        path = `/projects/${path}`;
      }
      filesList.push(path);
    }
  });
  let filteredList = filesList.filter((file) => file.includes(".mdx"));
  if (!withPageIndex) {
    filteredList = filteredList.filter((file) => !file.includes("pageIndex"));
  }
  return filteredList;
};

export const getAllProjectPath = ({ isIndex }) => {
  const fileNames = getAllProjectFilenames(
    DirectoryPath.projects,
    [],
    false,
    false
  );
  let paths = [];
  for (const name of fileNames) {
    const pathChunk = name.split("/");
    const projectName = pathChunk[0];
    const slug = pathChunk[1];
    const lang = pathChunk[2].split(".")[1];
    if (isIndex) {
      if (slug === "intro") {
        paths.push({
          params: {
            project: projectName,
            lang: lang,
          },
        });
      }
    } else {
      if (slug !== "intro") {
        paths.push({
          params: {
            project: projectName,
            slug: slug,
            lang: lang,
          },
        });
      }
    }
  }
  return paths;
};

export const getProjectContent = async ({ isIndex, project, lang, slug }) => {
  const dir = DirectoryPath.projects;
  let fullPath;
  if (isIndex) {
    fullPath = path.join(dir, project, "intro", `index.${lang}.mdx`);
  } else {
    fullPath = path.join(dir, project, slug, `index.${lang}.mdx`);
  }
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());
  const code = await prepareMDX(content);
  return {
    code: code,
    metadata: data,
  };
};

export const getProjectDevlogMeta = async ({ projectName }) => {
  const dir = path.join(DirectoryPath.projects, projectName);
  const fileNames = getAllProjectFilenames(dir, [], false);
  const devlogsPath = fileNames.filter(
    (file) => file.split("/")[1] !== "intro"
  );
  const devlogData = devlogsPath.map((devlogPath) => {
    const fullPath = path.join(DirectoryPath.projects, devlogPath);
    const slug = devlogPath.split("/")[1];
    const fullSlug = `/projects/${projectName}/${slug}`;
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileContents.trim());
    return {
      path: fullSlug,
      metadata: data,
    };
  });
  return devlogData;
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
  // let paths = [];
  // for (const name of fileNames) {
  //   const nameList = name.split("/"); // [ blogging-with-nextjs, <slug>, index.en.mdx ]
  //   if (nameList.length === 3) {
  //     const fullPath = path.join(seriesName, "/", nameList[1]);
  //     if (paths.indexOf(fullPath) === -1) {
  //       paths.push(fullPath);
  //     }
  //   }
  // }
  return fileNames;
};

export const getSeriesPostsContent = async ({
  series,
  slug,
  lang,
}) => {
  let fullPath = path.join(DirectoryPath.series, series, slug, `index.${lang}.mdx`);
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

export const getAllSeriesFileName = (
  directoryPath,
  filesList = [],
  havePrefix
) => {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllSeriesFileName(
        `${directoryPath}/${file}`,
        filesList,
        havePrefix
      );
    } else {
      let path = getRemainPathAfterIt("series", `${directoryPath}/${file}`);
      if (havePrefix) {
        path = `/series/${path}`;
      }
      filesList.push(path);
    }
  });

  const filteredList = filesList.filter((file) => !file.includes("pageIndex"));
  return filteredList;
};

export const getLessonLearnedContent = async ({ isPageRoot, lang, slug }) => {
  let fullPath;
  if (isPageRoot) {
    fullPath = path.join(DirectoryPath.lessonLearned, `pageIndex.${lang}.mdx`);
  } else {
    fullPath = path.join(
      DirectoryPath.lessonLearned,
      slug,
      `index.${lang}.mdx`
    );
  }

  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());
  const code = await prepareMDX(content);
  return {
    code: code,
    metadata: data,
  };
};

export const getAllLessonLearnedPath = () => {
  const dir = path.join(DirectoryPath.lessonLearned);
  const llPaths = getAllLessonLearnedFilesames(dir, [], false);
  let paths = [];
  for (const llPath of llPaths) {
    const slug = llPath.split("/")[0];
    const lang = llPath.split("/")[1].split(".")[1];
    paths.push({
      params: {
        slug: slug,
        lang: lang,
      },
    });
  }
  return paths;
};

export const getLessonLearnedPostsMeta = ({ lang }) => {
  const dir = path.join(DirectoryPath.lessonLearned);
  let llPaths = getAllLessonLearnedFilesames(dir, [], true);

  llPaths = llPaths.filter(
    (llpath) =>
      llpath.split("/").length === 4 &&
      llpath.split("/")[3].split(".")[1] === lang
  );
  const meta = llPaths.map((llPath) => {
    const fullPath = path.join(DirectoryPath.dataRoot, llPath);
    const slug = llPath.split("/")[2];
    const fullSlug = `/lesson-learned/${slug}`;
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileContents.trim());
    return {
      path: fullSlug,
      metadata: data,
    };
  });
  return meta.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    } else {
      return 1;
    }
  });
};

export const getAllLessonLearnedFilesames = (
  directoryPath,
  filesList,
  havePrefix,
  withPageIndex
) => {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllLessonLearnedFilesames(
        `${directoryPath}/${file}`,
        filesList,
        havePrefix
      );
    } else {
      let path = getRemainPathAfterIt(
        "lesson-learned",
        `${directoryPath}/${file}`
      );
      if (havePrefix) {
        path = `/lesson-learned/${path}`;
      }
      filesList.push(path);
    }
  });
  let filteredList = filesList.filter((file) => file.includes(".mdx"));
  if (!withPageIndex) {
    filteredList = filteredList.filter((file) => !file.includes("pageIndex"));
  }
  return filteredList;
};

const getRemainPathAfterIt = (it, path) => {
  const pathList = path.split("/");
  const index = pathList.indexOf(it);
  const newPathList = pathList.slice(index + 1);
  return newPathList.join("/");
};

export const getPageIndexContent = async ({ type, lang }) => {
  const fullPath = path.join(DirectoryPath[`${type}`], `pageIndex.${lang}.mdx`);
  return await prepareMatterAndMDX(fullPath);
};

const prepareMatterAndMDX = async (path) => {
  const fileContents = fs.readFileSync(path, "utf-8");
  const { content, data } = matter(fileContents.trim());
  const code = await prepareMDX(content);
  return {
    code: code,
    metadata: data,
  };
};
