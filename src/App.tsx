import axios from "axios";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

function App() {
  const [quote, setQuote] = useState({
    byline: "",
    quote: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 140); // generates a random number between 0 (inclusive) and 140 (exclusive)
  };

  const fetchData = async () => {
    setIsLoading(true);
    const randomNumber = generateRandomNumber();
    try {
      const response = await axios.get(
        `https://indie-hackers.firebaseio.com/loadingQuotes/${randomNumber}.json`
      );

      setQuote(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-slate-900 min-h-screen">
      <div className="container grid place-items-center h-screen">
        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="bg-slate-800 p-4 rounded-lg max-w-xl text-center flex flex-col gap-4 shadow-md shadow-slate-900">
            <p className="text-white text-2xl">"{quote.quote}"</p>
            <div className="flex gap-4 justify-center">
              <p className="text-slate-400">{quote.byline}</p>
              <a
                href={quote.url}
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 flex items-center justify-center gap-1"
              >
                Read more <FaExternalLinkAlt />
              </a>
            </div>
            <button
              className="self-center py-2 px-4 rounded-full text-white bg-orange-500 hover:bg-orange-400 transition-colors duration-300"
              onClick={fetchData}
            >
              New Quote
            </button>
            <p className="italic text-slate-600">*Quotes by Indie Hackers</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
