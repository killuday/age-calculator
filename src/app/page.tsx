"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  type AgeType = {
    years: number;
    remainingHours: number;
    remainingMinutes: number;
    remainingSeconds: number;
    remainingMilliseconds: number;
  };
  const [dob, setDOB] = useState(new Date());
  const [age, setAge] = useState<AgeType | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let intervalId: any;

    if (isStarted) {
      intervalId = setInterval(() => {
        if (dob) {
          handleCalculateAge();
        }
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [dob, isStarted]);

  const handleCalculateAge = () => {
    const birthDate: any = new Date(dob);
    const currentDate: any = new Date();

    const ageInMilliseconds = currentDate - birthDate;
    const ageInSeconds = ageInMilliseconds / 1000;

    const years = Math.floor(ageInSeconds / (365 * 24 * 60 * 60));
    const remainingSeconds = Math.floor(ageInSeconds % (365 * 24 * 60 * 60));
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMilliseconds = Math.floor(ageInMilliseconds % 1000);

    setAge({
      years,
      remainingHours,
      remainingMinutes: remainingMinutes % 60,
      remainingSeconds: remainingSeconds % 60,
      remainingMilliseconds: remainingMilliseconds % 100,
    });
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleReset = () => {
    setIsStarted(false);
    setAge(null);
  };
  

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-6xl text-lime-500 font-bold mb-6">
            Age Calculator
          </h1>
          <h3 className="text-xl font-semibold">
            {" "}
            Select or type in your Date of Birth:
          </h3>
          <label className="block mb-4 text-base font-medium">
            <DatePicker
             showIcon
             isClearable
              selected={dob}
              maxDate={new Date()}
              onChange={(date: any) => setDOB(date)}
              dateFormat="dd-MM-yyyy"
              className="border rounded px-4   focus:outline-none focus:ring  focus:border-blue-300"
            />
          </label>

          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        {age !== null && (
          <div className=" text-center font-semibold mt-4">
            <p>
              <span className="text-[7rem]">
              {age.years} 
              </span>
              <span className="text-[7rem]">
              .
              </span>
           
              <span className="text-[5.5rem]">
              {age.remainingHours}
              </span>
              <span className="text-[5.5rem]">
              .
              </span>
              <span className="text-[4.5rem]">
              {age.remainingMinutes}
              </span>
              <span className="text-[4.5rem]">
              .
              </span>
              <span className="text-[3.5rem]">
              {age.remainingSeconds}
              </span>
            
            </p>
          </div>
        )}
      </div>
    </>
  );
}
