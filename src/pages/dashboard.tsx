import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Can } from "../components/Can";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useAuthContext();

  useEffect(() => {
    api
      .get("me")
      .then((response) => console.log(response?.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <button onClick={signOut}>Sign Out</button>
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
