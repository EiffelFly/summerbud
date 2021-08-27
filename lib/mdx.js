import { bundleMDX } from "mdx-bundler";
import path from "path";
import footnotes from "remark-footnotes";
import gfm from "remark-gfm";

export const prepareMDX = async (source, cwd, imagesUrl) => {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "bin",
    "esbuild"
  );

  const { code } = await bundleMDX(source, {
    cwd: cwd,
    xdmOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        footnotes,
        gfm
      ];
      return options;
    },
  });
  return code;
};
