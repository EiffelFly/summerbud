import { bundleMDX } from "mdx-bundler";
import path from "path";
import remarkFootnotes from "remark-footnotes";

export const prepareMDX = async (source, files, cwd) => {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "bin",
    "esbuild"
  );

  const { code } = await bundleMDX(source, {
    cwd: cwd,
    files: files,
    xdmOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkFootnotes,
      ];
      return options;
    },
  });

  return code;
};
