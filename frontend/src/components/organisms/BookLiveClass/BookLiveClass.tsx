import React, { useState } from "react";
import "./styles.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import Lottie from "react-lottie-player";
import loaderData from "../../../assets/Lottie/loader.json";
// import profileImage from "../../../assets/images/carousal/profileImage.jpeg";

export interface ProfileData {
  image: string;
  desc: string;
  name: string;
  location: string;
}
export interface SlideData {
  title: string;
  image?: string;
  desc?: string[];
  profiles?: ProfileData[];
  type?: "image" | "profile";
}

const BookLiveClassForm: React.FC = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [timeSlot, setTimeSlot] = useState<Number | null>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);

  const validateName = (value: string): string | null => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (value.trim().length < 3) {
      return "Name must be at least 3 characters long.";
    }
    if (!namePattern.test(value)) {
      return "Name can only contain alphabets and spaces.";
    }
    return null;
  };
  const validatePhoneNumber = (value: string): string | null => {
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(value)) {
      return "Please enter a valid 10-digit mobile number.";
    }
    return null;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = validateName(inputName);
    const numberError = validatePhoneNumber(inputNumber);
    setNameError(nameError);
    setNumberError(numberError);

    if (nameError || numberError) {
      return;
    }

    setLoading(true);
    const date =
      timeSlot === 0
        ? "15-06-2023"
        : timeSlot === 1
          ? "15-06-2023"
          : "22-06-2023";
    const time =
      timeSlot === 0 ? "09:30" : timeSlot === 1 ? "11:00 AM" : "04:00 PM";

    const data = {
      name: inputName,
      phoneNumber: inputNumber,
      date: date,
      time: time,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/book-live-class",
        data
      );
      console.log("Response:", response.data);
      setFormSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error("There was an error making the request:", error);
      setLoading(false);
    }
  };

  return (
    <section className="hero-section">
      <div
        className="signUpform"
        style={{
          borderRadius: "15px",
          backgroundColor: "#fcf2ef",
          margin: "50px",
          boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Book a Live Class</h2>
          <h3>
            We are planning a meet-up in <span> Lucknow!</span>
          </h3>
          <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
            <Input
              label="Full Name"
              icon={<FaUser />}
              placeholder="Full Name"
              value={inputName}
              disabled={isLoading || formSubmitted}
              errorMessage={nameError}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Input
              label="Mobile Number"
              icon={<FaPhoneAlt />}
              type="tel"
              placeholder="10 digits Mobile Number"
              value={inputNumber}
              disabled={isLoading || formSubmitted}
              errorMessage={numberError}
              onChange={(e) => setInputNumber(e.target.value)}
            />
            <div className="form-slots">
              <div
                className={`timeSlot ${timeSlot === 0 && "active"}`}
                onClick={() => {
                  isLoading ||
                    (!formSubmitted && setTimeSlot(timeSlot === 0 ? null : 0));
                }}
              >
                <p>No Preference</p>
              </div>

              <div
                className={`timeSlot ${timeSlot === 1 && "active"}`}
                onClick={() => {
                  isLoading ||
                    (!formSubmitted && setTimeSlot(timeSlot === 1 ? null : 1));
                }}
              >
                <p>15 June</p>
                <p>11:00 AM</p>
              </div>

              <div
                className={`timeSlot ${timeSlot === 2 && "active"}`}
                onClick={() => {
                  isLoading ||
                    (!formSubmitted && setTimeSlot(timeSlot === 2 ? null : 2));
                }}
              >
                <p>22 June</p>
                <p>4:00 PM</p>
              </div>
            </div>
            {isLoading ? (
              <div className="form-loader">
                <Lottie
                  loop
                  animationData={loaderData}
                  play
                  style={{ width: 40, height: 40 }}
                />
              </div>
            ) : (
              <Button
                text="Book a Live Class"
                style={{ width: "100%", marginTop: "0.8rem" }}
                disabled={formSubmitted}
              />
            )}
            {formSubmitted && (
              <p className="success-message">
                Thank you for submitting the form!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookLiveClassForm;
