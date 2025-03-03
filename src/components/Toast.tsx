interface ToastProps {
  title: string;
  content: string;
}

export default function Toast({ title, content }: ToastProps) {
  return (
    <div className="text-primary relative flex flex-col gap-2 text-sm">
      <div className="border-green-dark absolute -bottom-3.5 -left-11.5 h-[calc(100%_+_1.8rem)] overflow-hidden rounded-l-lg border-l-8 content-['']" />
      <span className="font-semibold">{title}</span>
      <span>{content}</span>
    </div>
  );
}
