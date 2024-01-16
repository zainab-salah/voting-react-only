function Welcome({ qrResult, setShouldRender }) {
    return (
        <>
            {!qrResult ? (
                <div className="  relative">
                    <div
                        className="absolute flex flex-col items-center gap-5 justify-center welcome-container
top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-0 
animate-fadeIn animate-moveFromTop"
                    >
                        <img
                            src="/logodark.jpg"
                            width="200"
                            alt="Logo"
                            className="w-52 h-52"
                        />

                        <h1 className="text-3xl font-bold mb-2">تصويت</h1>
                        <p className="text-md opacity-50">
                            من أجل التصويت قم بقراءة الكود لتسجيل صوتك
                        </p>
                        <button
                            onClick={() => setShouldRender(true)}
                            className="button"
                        >
                            قراءة الكود
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Welcome;