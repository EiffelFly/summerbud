import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prepareMDX } from "./mdx";

const DirectoryPath = {
  dataRoot: path.resolve(process.cwd(), "_data"),
  posts: path.resolve(process.cwd(), "_data", "posts"),
  pages: path.resolve(process.cwd(), "_data", "pages"),
  series: path.resolve(process.cwd(), "_data", "series"),
  lessenLearned: path.resolve(process.cwd(), "_data", "lessen-learned"),
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
      slug: fullSlug,
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
  const seriesFilenames = getAllSeriesFileName(DirectoryPath.series, [], true);
  const postFilenames = getAllFileNames(DirectoryPath.posts, [], "posts");
  const llFilenames = getAllFileNames(
    DirectoryPath.lessenLearned,
    [],
    "lessen-learned"
  );
  const allFilenames = [...seriesFilenames, ...llFilenames, ...postFilenames];
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

export const getAllProjectPath = async () => {
  const fileNames = getAllProjectFilenames(DirectoryPath.projects);
  return fileNames
}

export const getAllProjectFilenames = (
  directoryPath,
  filesList,
  havePrefix
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
  const filteredList = filesList.filter((file) => file.includes(".mdx"));
  return filteredList;
};

export const getProjectIndexPath = () => {
  const fileNames = getAllProjectFilenames(DirectoryPath.projects, [], false);
  let paths = [];
  for (const name of fileNames){
    const pathChunk = name.split("/");
    const projectName = pathChunk[0];
    const lang = pathChunk[2].split(".")[1];
    paths.push({
      params: {
        project: projectName,
        lang: lang
      }
    })
  }
  return paths
};

export const getProjectIndexContent = async ({ project, lang }) => {
  const dir = DirectoryPath.projects;
  const fullPath = path.join(dir, project, "intro", `index.${lang}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());
  const code = await prepareMDX(content);
  return {
    code: code,
    metadata: data,
  };
}

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
      console.log(path)
      if (havePrefix) {
        path = `/series/${path}`;
      }
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
