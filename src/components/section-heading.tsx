export default function SectionHeading({ title }: { title: string }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="w-16 h-1 bg-blue-500 mx-auto" />
    </div>
  );
}
