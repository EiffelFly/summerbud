import { getPageIndexContent } from "../../lib/files";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import RootPageLayout from "../../components/layouts/RootPageLayout";
import CustomLink from "../../components/CustomLink";
import ProjectList from "../../components/ProjectList";
import useTranslation from "../../hooks/useTranslation";

const MDXPage = ({ metadata, code }) => {
  
  const { t } = useTranslation();

  const projectList = [
    {
      title: "township",
      status: "on-going",
      description: t("components.projectListShortIntro.township"),
      tags: ["#nextjs", "bookclub"]
    },
    {
      title: "totuslink",
      status: "pending",
      description: t("components.projectListShortIntro.totuslink"),
      tags: ["#knowledge"]
    },
    {
      title: "hologram",
      status: "pending",
      description: t("components.projectListShortIntro.hologram"),
      tags: ["#vuejs", "#amplify", "productivity"]
    },
    {
      title: "pnyx",
      status: "pending",
      description: t("components.projectListShortIntro.pnyx"),
      tags: ["#reactjs", "discussion"]
    },
    {
      title: "basestone",
      status: "closed",
      description: t("components.projectListShortIntro.basestone"),
    }
  ]


  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <RootPageLayout metadata={metadata}>
      <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
        <Component components={{ CustomLink: CustomLink }} />
      </article>
      <ProjectList elements={projectList} />
    </RootPageLayout>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getPageIndexContent({
    type: "projects",
    lang: params.lang,
  });
  return {
    props: {
      code,
      metadata,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { lang: "en" } }, { params: { lang: "zh-tw" } }],
    fallback: false,
  };
};

export default MDXPage;