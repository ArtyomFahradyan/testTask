import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useWorkspaceActions, WorkspaceSelectors } from "@redux";
import { getUserById } from "requests";

export default function useLogin() {
  const navigate = useNavigate();
  const { clearWorkspace, setUser } = useWorkspaceActions();
  const user = useSelector(WorkspaceSelectors.getUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      clearWorkspace();
      navigate("/signin");
    } else if (token && !user) {
      const fetchUser = async () => {
        const user = await getUserById(token);
        setUser(user);
      };
      fetchUser();
    }
  }, [user]);
}
