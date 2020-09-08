import { Container } from "src/components/Container";

type Props = {
  children?: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: Props) => {
  return (
    <Container>
      <h1 className="mb-4 text-2xl font-bold leading-9 text-gray-900">
        {title}
      </h1>
      {children}
    </Container>
  );
};
