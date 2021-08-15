const ProjectList = ({ elements }) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
      {elements.map((element) => (
        <div className="flex flex-col bg-sd-white dark:bg-sd-black p-6 rounded-lg">
          <div className="font-sans font-bold text-2xl mr-auto">
            {element.title}
          </div>
          <div className="mt-12 font-sans font-normal text-base text-sd-brgreen dark:text-sd-brcyan">
            {element.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
