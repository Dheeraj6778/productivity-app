import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
function Horoscope() {
  const [horoscopeData, sethoroscopeData] = useState("");
  const [zodiac, setZodiac] = useState("");
  const options = [
    { value: "Aries", label: "Aries" },
    { value: "Taurus", label: "Taurus" },
    { value: "Gemini", label: "Gemini" },
    { value: "Cancer", label: "Cancer" },
    { value: "Leo", label: "Leo" },
    { value: "Virgo", label: "Virgo" },
    { value: "Libra", label: "Libra" },
    { value: "Scorpio", label: "Scorpio" },
    { value: "Sagittarius", label: "Sagittarius" },
    { value: "Capricorn", label: "Capricorn" },
    { value: "Aquarius", label: "Aquarius" },
    { value: "Pisces", label: "Pisces" },
  ];
  let fetchZodiacData=async ()=>{
    const options = {
      method: "GET",
      url: "/api/daily?date=today",
      params: { date: "today" },
      headers: {
        "X-RapidAPI-Key": "7520015748msh21a3561a74d7affp134448jsn527ca46bcf29",
        "X-RapidAPI-Host": "horoscopeapi-horoscope-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      sethoroscopeData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    //fetch zodiac data
    fetchZodiacData();
  }, [zodiac]);
  return (
    <div>
      <h4 style={{ fontFamily: "cursive", fontWeight: "lighter" }}>
        Know your day !!
      </h4>
      <b style={{ fontFamily: "cursive", fontWeight: "lighter" }}>
        Select your zodiac zign
      </b>
      <Select
        value={zodiac.value}
        onChange={(event) => setZodiac(event.label)}
        options={options}
      />
      {horoscopeData}   
    </div>
  );
}

export default Horoscope;
