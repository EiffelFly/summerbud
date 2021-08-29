import SectionContainer from "../SectionContainer";
import PageSeo from "../PageSeo";
import Header from "../Header";
import Footer from "../Footer";
import useTranslation from "../../hooks/useTranslation";

const RootPageLayout = ({ metadata, children }) => {
  const { locale } = useTranslation();
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
        <PageSeo metadata={metadata} locale={locale} />
        <Header hasTranslation={metadata.hasTranslation} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          {children}
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export default RootPageLayout;
