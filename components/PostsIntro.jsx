import useTranslation from "../hooks/useTranslation";


const PostIntro = () => {
  const { t } = useTranslation();
  return (
    <div
      className="font-sans text-lg font-medium text-sd-dark dark:text-sd-white py-2 border-b border-sd-brgreen dark:border-sd-brcyan"
    >
      {t("pages.postList.title")}
    </div>
  )
};

export default PostIntro;