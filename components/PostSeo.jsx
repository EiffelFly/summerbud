
import { NextSeo, ArticleJsonLd } from "next-seo";
const PostSeo = ({ metadata, type, locale }) => {
  return (
    <>
      <NextSeo 
        title={`${metadata.title}`}
        description={metadata.description}
        //canonical={``}
        openGraph={{
          type: "website",
          locale: locale === "zh-tw" ? "zh_TW" : "en_US",
          url: `https://summerbud.org/${locale}/${type}${metadata.baseSlug}`,
          title: `${metadata.title}`,
          description: `${metadata.description}`,
          images: [
            {
              url: `https://www.summerbud.org/me.jpeg`,
              width: 512,
              height: 512,
              alt: `Cover image for ${metadata.title}`,
            },
          ],
        }}
        twitter= {{
          handle: '@eiffelfly',
          site: '@eiffelfly',
          cardType: 'summary_large_image',
        }}
      />
      <ArticleJsonLd 
        url={`https://summerbud.org/${locale}/${type}${metadata.baseSlug}`}
        title={metadata.title}
        //images={}
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