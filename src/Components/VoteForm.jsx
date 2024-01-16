// src/components/VoteForm.jsx

import { useState } from "react";

const VoteForm = ({ result }) => {
    const [voteNumber, setVoteNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleButtonClick = (number) => {
        setVoteNumber(number);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(result);
        console.log(voteNumber);
        try {
            // Save the vote
            const saveVoteResponse = await fetch(
                "http://localhost:8000/api/votes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: result,
                        voteNumber: voteNumber,
                    }),
                }
            );

            if (saveVoteResponse.ok) {
                setErrorMessage("تم التثبيت شكرا");
            } else {
                setErrorMessage("لقد قمت بالتصويت مسبقاً");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error processing vote.");
        }
    };
    const voteData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className=" flex   items-center justify-center ">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col  min-h-screen w-[400px] p-3  h-full  items-center justify-around gap-"
            >
                <h3 className="pt-5 pb-10 text-xl text-center">
                    قم بإختيار رقم افضل مشروع
                </h3>
                <div className="flex items-center justify-between gap-y-5 gap-x-2 flex-wrap">
                    {voteData.map((number) => (
                        <button
                            key={number}
                            type="button"
                            onClick={() => handleButtonClick(number)}
                            className={`button mt-2 voteBtn ${
                                voteNumber === String(number)
                                    ? "bg-blue-500"
                                    : ""
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                <button
                    disabled={voteNumber === ""}
                    type="submit"
                    className="button mt-5 disabled:bg-gray-700"
                >
                    تصويت
                </button>
                {errorMessage && <p className="text-danger ">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default VoteForm;
