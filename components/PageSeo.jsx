import { NextSeo } from "next-seo";
//import useTranslation from "../hooks/useTranslation";

const PageSeo = ({ metadata }) => {

  //const { t, locale } = useTranslation();

  return (
    <>
      <NextSeo 
        title={`Summerbud's writing | ${metadata.title}`}
        description={metadata.description}
        //canonical={``}
        openGraph={{
          //url: `https://ekomenyong.com/posts/${frontMatter.slug}`,
          title: `${metadata.title}`,
          description: `${metadata.description}`,
          // images: [
          //   {
          //     url: `https://ekomenyong.com${frontMatter.image}`,
          //     width: 1200,
          //     height: 720,
          //     alt: `Cover image for ${frontMatter.title}`,
          //   },
          // ],
        }}
        twitter= {{
          handle: '@eiffelfly',
          site: '@eiffelfly',
          cardType: 'summary_large_image',
        }}
      />
    </>
  )
};

export default PageSeo;