import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const Predictor = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bodyTemp, setBodyTemp] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);

  const information = [
        `Hello there! I am Hamza Kurdi, and I am excited to share my first-ever machine learning project with you: the Calories Burned Predictor. This project is all about estimating the number of calories you burn during different physical activities.<br>
                <br>
    This is my very first step into the world of machine learning, and I could not be more thrilled about how it turned out. It has been a fantastic learning experience. This project not only serves a practical purpose but also showcases how machine learning can be applied to health and fitness. <br><br>
        <b>Technologies Used:</b><br><br>
        Python, XGBoost, Flask, Scikit-Learn, Joblib, JupyterLab, Pandas, Axios, React.js, Heroku, Vite`
  ];
  

  const invalidResponse = (text) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: text,
    });
  };

  const clearForm = () => {
    setAge("");
    setGender("");
    setHeight("");
    setWeight("");
    setDuration("");
    setHeartRate("");
    setBodyTemp("");
    setPrediction(null);
    setClearButtonClicked(true);
    Swal.fire({
      icon: "success",
      title: "Your response has been cleared.",
    });
    setTimeout(() => {
      setClearButtonClicked(false);
    }, 2000);
  };

  const predictorURL = import.meta.env.VITE_PREDICTOR_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${predictorURL}/predict`, {
        Age: parseInt(age),
        Gender: parseInt(gender),
        Height: parseFloat(height),
        Weight: parseFloat(weight),
        Duration: parseFloat(duration),
        Heart_Rate: parseFloat(heartRate),
        Body_Temp: parseFloat(bodyTemp),
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      if (error.response.status === 422 && !isClearButtonClicked)
        return invalidResponse(
          "Invalid response. Please fix your prompts and try again."
        );
      invalidResponse("Something wrong just happened. Please try again.");
    }
  };

  const handleInfo = () => {
    Swal.fire({
        icon: "info",
        title: "Calories Burned Predictor",
        html: information,
    })};
    
  const handleGender = (e) => {
    const genderSelect = document.getElementById("gender");
    if (genderSelect.value !== "") {
      genderSelect.classList.remove("text-gray-400");
      genderSelect.classList.add("text-gray-800");
    }
    setGender(e.target.value);
  };

  return (
    <div
      className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center scroll-m-0"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/calories-counting-diet-food-control-600nw-1802971861.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "850px",
        width: "100%",
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <div className="absolute top-4 right-4">
        <button
            onClick={handleInfo}
            className="rounded-full border-2 border-neutral-50 p-2 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-300 ease-in-out transform hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 18.5A5.5 5.5 0 106.5 13 5.5 5.5 0 0012 18.5z"
              />
            </svg>
          </button>
        </div>
        <div className="flex h-full items-center justify-center">
          <div className="text-white">
            <h2 className="mb-4 text-4xl font-semibold">
              Calories Burned Predictor
            </h2>
            <h4 className="mb-6 text-xl font-semibold">
              Enter your details below
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="block w-full p-2 rounded text-gray-700"
              />
              <select
                id="gender"
                value={gender}
                onChange={handleGender}
                className="block w-full p-2 rounded text-gray-400"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value={0}>Male</option>
                <option value={1}>Female</option>
              </select>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height (cm)"
                className="block w-full p-2 rounded text-gray-700"
              />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight (kg)"
                className="block w-full p-2 rounded text-gray-700"
              />
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (minutes)"
                className="block w-full p-2 rounded text-gray-700"
              />
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                placeholder="Heart Rate"
                className="block w-full p-2 rounded text-gray-700"
              />
              <input
                type="number"
                value={bodyTemp}
                onChange={(e) => setBodyTemp(e.target.value)}
                placeholder="Body Temperature (°C)"
                className="block w-full p-2 rounded text-gray-700"
              />
              <div className="flex-1 flex flex-row gap-9 items-center justify-center">
                <button
                  type="submit"
                  className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-300 ease-in-out transform hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 hover:scale-105 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 active:scale-95 active:shadow-lg"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  style={{ minWidth: "120px" }}
                >
                  Predict
                </button>
                <button
                  onClick={clearForm}
                  type="button"
                  className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-300 ease-in-out transform hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 hover:scale-105 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 active:scale-95 active:shadow-lg"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  style={{ minWidth: "120px" }}
                >
                  Clear
                </button>
              </div>
            </form>
            {prediction && (
              <div className="mt-4 text-xl font-semibold">
                Predicted Calories Burned: {prediction}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
