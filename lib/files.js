import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prepareMDX } from "./mdx";

const postsDirectory = path.resolve(process.cwd(), "_data", "posts");
const pagesDirectory = path.resolve(process.cwd(), "_data", "pages");

// Get all filenames in posts directory as ['en/filename.md']
export function getAllFileNames(directoryPath, filesList = []) {
  const files = fs.readdirSync(directoryPath);
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
    if (a.publishedData < b.publishedData) {
      return 1;
    } else {
      return -1;
    }
  });
};

export async function getContent(slug, locale, type = "post") {
  const dir = type === "page" ? pagesDirectory : postsDirectory;
  const fullPath = path.join(dir, slug, `index.${locale}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents.trim());
  let components = {};

  // if ( data.components.length > 0 ){
  //   components = getComponents(data.components, dir, slug);
  // }

  const code = await prepareMDX(content, components);
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
