import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";

let cancelAxios: (() => void) | null = null;
type Weather = {
  number: number | null;
  desc: string;
  min: number | null;
  max: number | null;
  icon: string | null;
};

export default function CardMeteo() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("fr");
  const dateAndTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  const [temp, setTemp] = useState<Weather>({
    number: null,
    desc: "",
    min: null,
    max: null,
    icon: null,
  });

  //handlers

  function handleLangClick() {
    if (locale == "fr") {
      setLocale("en");
      i18n.changeLanguage("en");
    } else {
      setLocale("fr");
      i18n.changeLanguage("fr");
    }
  }

  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=36.7525&lon=3.0420&appid=23315ca86053bbde8d1b31e88845bb7e",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
      )
      .then((response) => {
        const responseTemp = Math.round(response.data.main.temp - 273);
        const min = Math.round(response.data.main.temp_min - 273);
        const max = Math.round(response.data.main.temp_max - 273);
        const desc = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        //console.log(min, max, desc)
        //console.log(response.data)
        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          desc: desc,
          icon: `https://openweathermap.org/payload/api/media/file/${icon}.png`,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      // L'opérateur "?." appelle la fonction uniquement si elle existe
      cancelAxios?.();
    };
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        {/* CONTENT CONTAINE */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* CARD */}
          <div
            style={{
              width: "100%",
              background: "rgb(28 52 91 / 36% )",
              color: "white",
              padding: "10px",
              borderRadius: "15px",
              boxShadow: "0px 11px 1px rgba(0,0,0,0.05) ",
            }}
          >
            {/* CONTENT */}

            <div>
              {/* CITY & Time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                }}
              >
                <Typography variant="h2" style={{ marginLeft: "20px" }}>
                  {/* Alger */}
                  {t("Alger")}
                </Typography>
                <Typography variant="h5" style={{ marginLeft: "20px" }}>
                  {dateAndTime}
                </Typography>
              </div>
              {/* === CITY & Time === */}

              <hr />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {/* DEGREE & DESC */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h1" style={{ paddingLeft: "20px" }}>
                      {temp.number}
                    </Typography>
                    <img src={temp.icon ?? ""} />
                  </div>
                  <Typography variant="h6" style={{ paddingLeft: "20px" }}>
                    {t(temp.desc)}
                  </Typography>
                  {/* MIN & MAX */}
                  <div
                    style={{
                      fontWeight: "400",
                      fontFamily: "MNT",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: "20px",
                    }}
                  >
                    <h5>{t("min")}: {temp.min}</h5>
                    <h5 style={{ margin: "0px 5px" }}>|</h5>
                    <h5>{t("max")}: {temp.max}</h5>
                  </div>
                  {/* === MIN & MAX === */}
                </div>
                {/* ==== DEGREE & DESC === */}
                <CloudIcon style={{ fontSize: "200px", color: "white" }} />
              </div>
            </div>
            {/* === CONTENT === */}
          </div>
          {/* === CARD === */}
          {/* TRANSLATION CONTAINER */}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              variant="text"
              style={{ color: "white" }}
              onClick={handleLangClick}
            >
              {locale == "en" ? "Français" : "Englais"}
            </Button>
          </div>
          {/* === TRANSLATION CONTAINER ===*/}
        </div>
        {/* === CONTENT CONTAINE === */}
      </Container>
    </>
  );
}
