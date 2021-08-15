
import { NextSeo, ArticleJsonLd } from "next-seo";
//import useTranslation from "../hooks/useTranslation";

const PostSeo = ({ metadata }) => {

  //const { t, locale } = useTranslation();

  return (
    <>
      <NextSeo 
        title={`${metadata.title}`}
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
      <ArticleJsonLd 
        //url={`https://ekomenyong.com/posts/${metadata.slug}`}
        title={metadata.title}
        //images={[`https://ekomenyong.com${metadata.image}`]}
        datePublished={`${metadata.publishedAt}`}
        dateModified={`${metadata.lastModified}`}
        authorName="Summerbud | Po Chun Chiu"
        publisherName="summerbud.org"
        description={metadata.description}
      />
    </>
  )
};

export default PostSeo;