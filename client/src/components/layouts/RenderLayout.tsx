import { useGetUser } from "../../features/hooks/getUser";

const RenderLayout = ({ children }: { children?: React.ReactNode }) => {
  useGetUser();

  return <div className="h-screen w-screen">{children}</div>;
};

export default RenderLayout;
