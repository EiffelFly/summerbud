export default function SectionContainer({ children, gap }) {
  return (
    <div className={"flex flex-col max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 " + gap}>
      {children}
    </div>
  );
}
