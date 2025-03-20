
function Footer({language, setLanguage,text}){
    return (
        <div className="flex bg-gray-500 justify-center items-center mt-2 bottom-0 left-0 fixed border-t border-white py-2 w-full">
            <div className="flex flex-row space-x-4">
                <p>{text.chooseLng}: </p>
                <button onClick={() => setLanguage('en')}
                    className={language === "en" ? "underline" : ""}
                    >EN</button>
                <button onClick={() => setLanguage('mk')}
                    className={language === "mk" ? "underline" : ""}
                    >MK</button>
            </div>
        </div>
    );
}

export default Footer