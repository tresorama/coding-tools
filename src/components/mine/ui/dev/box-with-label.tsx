export const BoxWithLabel = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: React.ReactNode,
}) => {
  return (
    <div className="flex flex-col">
      <span className="self-end p-1 bg-white/10 rounded border">{label}</span>
      {children}
    </div>
  );
};