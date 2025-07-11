"use client";
import { GridLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <GridLoader
      color="#D0730E"
      cssOverride={{
        display: "block",
        margin: "300px auto",
      }}
      speedMultiplier={0.9}
      size={20}
    />
  );
}

export default LoadingPage;


/* to test loading try this in homepage.tsx:
const HomePage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); */