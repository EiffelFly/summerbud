import { bundleMDX } from "mdx-bundler";
import path from 'path'

export const prepareMDX = async (source, files, cwd) => {

  console.log(process.platform)

  if (process.platform === "darwin") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const { code } = await bundleMDX(source, {
    cwd: cwd,
    files: files,
  });

  return code;
};
