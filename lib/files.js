
  
import fs from 'fs';
import path from 'path';

const postsDirectory = path.resolve(process.cwd(), '_data', 'posts');
const pagesDirectory = path.resolve(process.cwd(), '_data', 'pages');

// Get all filenames in posts directory as ['en/filename.md']
export function getAllFileNames(directoryPath, filesList = []) {
  const files = fs.readdirSync(directoryPath);

  //console.log(files);

  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllFileNames(`${directoryPath}/${file}`, filesList);
    } else {
      //console.log(path.basename(directoryPath), path.join(path.basename(directoryPath), '/', file));
      filesList.push(path.join(path.basename(directoryPath), '/', file));
    }
  });

  const filteredList = filesList.filter((file) => file.includes('.mdx'));
  return filteredList;
};

export const getAllSlugs = (type = 'post') => {
  const dir = type === 'page' ? pagesDirectory : postsDirectory;
  const fileNames = getAllFileNames(dir);

  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.split('/')[0],
      lang: fileName.split('/')[1].split(".")[1]
    },
  }));
}