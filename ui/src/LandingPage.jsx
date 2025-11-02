// frontend/src/LandingPage.jsx
import React, { useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!longUrl) {
      setErrorMessage("Please enter a URL.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setShortUrl("");

    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        original_url: longUrl,
      });
      setShortUrl(res.data.short_url);
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-sky-200 p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-2">
          ShortenURL
        </h1>
        <p className="text-2xl text-blue-800 font-medium">
          Link shortener service
        </p>
      </div>

      <div className="flex w-full max-w-2xl bg-white rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
          placeholder="Paste URL to shorten"
          value={longUrl}
          onChange={(e) => {
            setLongUrl(e.target.value);
            setErrorMessage("");
          }}
          className="flex-1 px-6 py-4 text-lg border-none focus:outline-none placeholder-gray-400"
        />
        <button
          onClick={handleShorten}
          disabled={loading}
          className={`${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold text-lg px-8 py-4 transition duration-300`}
        >
          {loading ? "Cutting..." : "Cut"}
        </button>
      </div>

      {errorMessage && (
        <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
      )}

      {shortUrl && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-500 mb-2">
            <span className="font-semibold text-gray-700">Original URL:</span>{" "}
            {longUrl}
          </p>
          <div className="flex items-center justify-between space-x-4">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-blue-600 text-lg sm:text-xl truncate underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-full transition duration-300"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
