import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsBody from "./NewsBody";
function News() {
  const [newsData, setNewsData] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [newsUrl, setNewsUrl] = useState("");
  let apiKey = "20c625223dd84b2189a3907e7406bd8d";
  let handleClick = () => {
    setClicks((prev) => prev + 1);
  };
  let handleShowNews = async () => {
    try {
      console.log(newsUrl);
      let resp = await axios.get(`${newsUrl}${apiKey}`);
      console.log(resp.data.articles);
      setNewsData(resp.data.articles);
    } catch (err) {
      console.log("error in fetching news", err);
    }
  };
  useEffect(() => {
    console.log("inside use effect");
    console.log("clicks are ", clicks);
    handleShowNews();
  }, [clicks]);
  return (
    <div>
      <h2 style={{ fontFamily: "cursive", fontWeight: "lighter" }}>
        Today's latest headlines
      </h2>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setNewsUrl("https://newsapi.org/v2/top-headlines?country=in&apiKey=");
          setClicks((prev) => prev + 1);
        }}
      >
        General
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setNewsUrl(
            "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey="
          );
          setClicks((prev) => prev + 1);
        }}
      >
        Sports
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setNewsUrl(
            "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey="
          );
          setClicks((prev) => prev + 1);
        }}
      >
        Entertainment
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setNewsUrl(
            "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey="
          );
          setClicks((prev) => prev + 1);
        }}
      >
        Tech
      </button>
      {newsData.map((news) => (
        <NewsBody
          title={news.title}
          description={news.description}
          url={news.url}
          imageUrl={news.urlToImage}
        />
      ))}
    </div>
  );
}

export default News;
