import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MainPageHeadline from "../../components/MainPageHeadline";
import MainPageSubHeadline from "../../components/MainPageSubHeadline";
import SectionContainer from "../../components/SectionContainer";

const index = () => {
  return (
    <div className="flex bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-8">
        <Header />
        <div
          className="flex-grow flex-col flex gap-y-6 my-auto mt-48"
        >
          <MainPageHeadline />
          <MainPageSubHeadline />
        </div>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export default index;
