import { useGetUser } from "../../features/hooks/getUser";

const RenderLayout = ({ children }: { children?: React.ReactNode }) => {
  useGetUser();
  return <div>{children}</div>;
};

export default RenderLayout;
