const IconWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[4.4rem] w-[4.4rem] items-center justify-center">
      {children}
    </div>
  );
};

export default IconWrapper;
