type Props = {
  children?: React.ReactNode;
};

export const Container = (props: Props) => {
  return <main className="max-w-md p-4 mx-auto" {...props} />;
};
