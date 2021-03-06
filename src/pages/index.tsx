import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { FormEvent, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import styles from "../../styles/Home.module.css";
import { withSSRGuest } from "../utils/withSSRGuest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuthContext();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.item}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.item}
      />
      <button type="submit" className={styles.item}>
        Entrar
      </button>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (context) => {
    return {
      props: {
        
      },
    };
  }
);
