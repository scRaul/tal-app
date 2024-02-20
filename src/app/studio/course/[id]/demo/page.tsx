interface DemoPageProps {
  className?: string;
}

export default function DemoPage(props: DemoPageProps) {
  return (
    <div className="max-w-3xl ">
      <h1 className="text-2xl md:text-4xl text-blue-500 my-2">Demo</h1>
    </div>
  );
}
