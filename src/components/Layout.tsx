import { Container } from "src/components/Container";

interface Props extends React.ComponentProps<"div"> {
  title: string;
}

export const Layout = ({ children, title, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <h1 className="mb-4 text-2xl font-bold leading-9 text-gray-900">
        {title}
      </h1>
      {children}
    </Container>
  );
};
