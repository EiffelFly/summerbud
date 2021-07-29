export default function SectionContainer({ children, gap }) {
  return (
    <div className={"flex flex-col max-w-3xl mx-auto px-6 sm:px-8 lg:max-w-4xl lg:px-0 " + gap}>
      {children}
    </div>
  );
}
