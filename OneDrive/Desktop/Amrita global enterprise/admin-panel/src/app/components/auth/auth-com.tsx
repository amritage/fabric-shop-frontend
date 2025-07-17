import { useEffect } from "react";
import Loading from "../common/loading";
import useAuthCheck from "@/hooks/use-auth-check";
import Cookies from "js-cookie";

const AuthCom = ({ children }: { children: React.ReactNode }) => {
  const { authChecked } = useAuthCheck();

  let content;
  if (!authChecked) {
    content = (
      <div className="flex items-center justify-center h-screen">
        <Loading spinner="fade" loading={!authChecked} />
      </div>
    );
  } else {
    content = children;
  }

  return <>{content}</>;
};

export default AuthCom;
