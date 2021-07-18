
  
import fs from 'fs';
import path from 'path';

const postsDirectory = path.resolve(process.cwd(), '_data', 'posts');
const pagesDirectory = path.resolve(process.cwd(), '_data', 'pages');

// Get all filenames in posts directory as ['en/filename.md']
export function getAllFileNames(directoryPath, filesList = []) {
  const files = fs.readdirSync(directoryPath);

  console.log(files);

  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllFileNames(`${directoryPath}/${file}`, filesList);
    } else {
      filesList.push(path.join(path.basename(directoryPath), '/', file));
    }
  });

  const filteredList = filesList.filter((file) => file.includes('.mdx'));
  return filteredList;
};