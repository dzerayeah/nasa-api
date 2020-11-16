import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Item from "./components/Item";
import Select from "./components/Select";
import DatePickerNasa from "./components/DatePicker";
import Button from "./components/Button";
import { NASA_API_URL, NASA_API_KEY } from "./config";

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2020-9-27"));
  const [todayImg, setTodayImg] = useState("");
  const [rover, setRover] = useState({
    value: "curiosity",
    label: "Curiosity",
  });
  const [roverCamera, setRoverCamera] = useState({
    value: "navcam",
    label: "Navigation Camera",
  });

  const nasaApodUrl = `${NASA_API_URL}planetary/apod?date=${
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    startDate.getDate()
  }&api_key=${NASA_API_KEY}`;
  const nasaImagesUrl = `${NASA_API_URL}mars-photos/api/v1/rovers/${
    rover.value
  }/photos?page=1&camera=${roverCamera.value}&earth_date=${
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    startDate.getDate()
  }&api_key=${NASA_API_KEY}`;
  let [images, setImages] = useState([]);

  const roversMarsOptions = [
    { value: "curiosity", label: "Curiosity" },
    { value: "opportunity", label: "Opportunity" },
    { value: "spirit", label: "Spirit" },
  ];

  const roverCamerasOptions = [
    { value: "fhaz", label: "Front Hazard Avoidance Camera" },
    { value: "rhaz", label: "Rear Hazard Avoidance Camera" },
    {
      value: "mast",
      label: "Mast Camera",
      isDisabled: rover.value !== "curiosity" ? true : false,
    },
    {
      value: "chemcam",
      label: "Chemistry and Camera Complex",
      isDisabled: rover.value !== "curiosity" ? true : false,
    },
    {
      value: "mahli",
      label: "Mars Hand Lens Imager",
      isDisabled: rover.value !== "curiosity" ? true : false,
    },
    {
      value: "mardi",
      label: "Mars Descent Imager",
      isDisabled: rover.value !== "curiosity" ? true : false,
    },
    { value: "navcam", label: "Navigation Camera" },
    {
      value: "pancam",
      label: "Panoramic Camera",
      isDisabled: rover.value === "curiosity" ? true : false,
    },
    {
      value: "minites",
      label: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      isDisabled: rover.value === "curiosity" ? true : false,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      axios.get(nasaImagesUrl).then((res) => {
        setImages(res.data.photos);
      });
    } catch (err) {
      console.log(err);
    }
    try {
      axios.get(nasaApodUrl).then((res) => {
        setTodayImg(res.data.url);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          nasaImagesUrl
        );
        setImages(result.data.photos);
      } catch (err) {
        console.log(err)
      }
    };
 
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          nasaApodUrl
        );
        setTodayImg(result.data.url);
      } catch (err) {
        console.log(err)
      }
    };
 
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app" style={{backgroundImage: `url(${todayImg})`}}>
      <div className="content">
        <div className="content__images">
          {images.length ? (
            images.map((img) => <Item img_src={img.img_src} key={img.id} />)
          ) : (
            <div className="content__not-found">Изображений не найдено</div>
          )}
        </div>
        <div className="content__form">
          <form onSubmit={handleSubmit}>
            <div className="select-wrapper">
              <Select
                placeholder="Марсоход"
                options={roversMarsOptions}
                value={rover}
                onChange={(option) => {
                  setRover({
                    value: option.value,
                    label: option.label,
                  });
                }}
              />
              <Select
                placeholder="Камера"
                value={roverCamera}
                options={roverCamerasOptions}
                onChange={(option) => {
                  setRoverCamera({
                    value: option.value,
                    label: option.label,
                  });
                }}
              />
            </div>
            <div className="select-wrapper">
              <DatePickerNasa
                selected={startDate}
                maxDate={new Date()}
                onChange={(date) => setStartDate(date)}
              />
              <Button />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
