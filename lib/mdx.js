import { bundleMDX } from "mdx-bundler";

export const prepareMDX = async (source, files) => {
  const { code } = await bundleMDX(source, {
    files,
  });

  return code;
};
