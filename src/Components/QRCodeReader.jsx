import { useState } from "react";
import Welcome from "./Welcome";
import { QrScanner } from "@yudiel/react-qr-scanner";
function QRCodeReader({ setResult, showloading }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [qrResult, setQrResult] = useState(null);
  const [error, setError] = useState(false);

  function onSucess(result) {
    showloading(true);
    setQrResult(result);

    checkUser(result);
  }

  const checkUser = async (result) => {
    try {
      await fetch(`http://localhost:8000/api/users/${result}`)
        .then(async (userResponse) => {
          const userData = await userResponse.json();

          if (userData) {
            console.log("User exists!");
            await fetch(`http://localhost:8000/api/votes/${result}`)
              .then(async (res) => {
                const voteData = await res.json();
                console.log(voteData);
                if (!voteData.hasVoted) {
                  console.log("User has not voted yet!");
                  setResult(result);
                  setError("");
                  setShouldRender(false);
                  showloading(false);
                } else {
                  setError("هذا المستخدم قام بالتصويت مسبقا");
                  setShouldRender(true);
                  showloading(false);
                }
              })
              .catch((error) => {
                console.error(error);
                setShouldRender(true);
                setError(error.message || "An error occurred.");
                showloading(false);
              });
          } else {
            setError("هذا المستخدم غير مسجل");
            setShouldRender(true);
            showloading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setShouldRender(true);
          setError(error.message || "An error occurred.");
          showloading(false);
        });
    } catch (error) {
      console.error(error);
      setShouldRender(true);
      setError(error.message || "An error occurred.");
      showloading(false);
    }
  };

  return (
    <>
      {!shouldRender && (
        <Welcome qrResult={qrResult} setShouldRender={setShouldRender} />
      )}

      {shouldRender && (
        <div className="relavite mt-10 ">
          {/* <input
            type="text"
            onChange={(e) => {
              onSucess(e.target.value);
            }}
          /> */}

          <QrScanner
                        onDecode={(result) => {
                            onSucess(result);
                        }}
                        onError={(error) => setError(error?.message)}
                    />
          <h3 className="pb-2 text-lg !text-center mt-10 ">
            {error ? (
              <span className="text-danger">{error}</span>
            ) : (
              <>
                من اجل التصويت قم بقراءة
                <br />
                الكود الخاص بك
              </>
            )}
          </h3>
        </div>
      )}
    </>
  );
}

export default QRCodeReader;
