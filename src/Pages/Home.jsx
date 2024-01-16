import React, { useState } from "react";

 
import QRCodeReader from "../Components/QRCodeReader";
import VoteForm from "../Components/VoteForm";

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, showloading] = useState(false);
  console.log(result);

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div className="absolute top-1/2 left-1/2">
          <span className="loader"></span>
        </div>
      )}
      <QRCodeReader
        setResult={setResult}
        result={result}
        showloading={showloading}
      />

      {result && <VoteForm result={result} />}
    </div>
  );
};

export default Home;
