import { GetServerSideProps } from "next";
import { destroyCookie } from "nookies";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Can } from "../components/Can";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useAuthContext();

  useEffect(() => {
    api
      .get("me")
      .then((response) => console.log(response?.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const apiClient = setupAPIClient(context);

    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  }
);
