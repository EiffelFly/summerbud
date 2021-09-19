import { NextSeo } from "next-seo";
//import useTranslation from "../hooks/useTranslation";

const PageSeo = ({ metadata, locale }) => {

  //const { t, locale } = useTranslation();

  return (
    <>
      <NextSeo 
        title={`${metadata.title}`}
        description={metadata.description}
        //canonical={``}
        openGraph={{
          type: "website",
          locale: locale === "zh-tw" ? "zh_TW" : "en_US",
          url: `https://summerbud.org/${locale}${metadata.baseSlug}`,
          title: `${metadata.title}`,
          description: `${metadata.description}`,
          // images: [
          //   {
          //     url: ``,
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