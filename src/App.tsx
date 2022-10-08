import React, { useEffect, useState } from "react";
import Games from "./Games";
import IGDBClient from "./igdb_client";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    IGDBClient.getAccessToken().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-slate-800">
      <MainContent>
        <h1 className="text-2xl font-mono font-extrabold text-center">
          Hello world!
        </h1>
        <Games />
      </MainContent>
    </div>
  );
}

function Loading() {
  return <p className="text-center italic">Loading...</p>;
}

function MainContent(props: { children: React.ReactNode }) {
  return (
    <div className="px-20">
      {props.children}
    </div>
  );
}
