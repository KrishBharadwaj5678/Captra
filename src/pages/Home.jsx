import { useEffect, useRef, useState } from "react";
import { filterNames } from "../constants/filters.jsx";
import { delay } from "../constants/delay.jsx";
import captureSound from "/audio/capture.mp3";
import DotGrid from "../components/ui/DotGrid.jsx";
import Delay from "../components/home/Delay.jsx";
import DelayTimer from "../components/home/DelayTimer.jsx";
import SwitchCamera from "../components/home/SwitchCamera.jsx";
import FiltersMenu from "../components/home/FiltersMenu.jsx";
import CameraButton from "../components/home/CameraButton.jsx";
import ExitAndDownloadButton from "../components/home/ExitAndDownloadButton.jsx";
import "../index.css";

export const Home = () => {
  let videoRef = useRef(null);
  let streamRef = useRef(null);
  let canvasRef = useRef(null);
  let [isCaptured, setIsCaptured] = useState(false); // used to toggle post-capture UI i.e download and back buttons
  let [imgData, setImgData] = useState(null);
  let [hideUIButtons, setHideUIButtons] = useState(false); // hides all UI elements when page is refreshed
  let [delayDropdownUI, setDelayDropdownUI] = useState(false);
  let [delayValue, setDelayValue] = useState(delay[0]);
  let [timerPopUp, setTimerPopUp] = useState(false);
  let [timer, setTimer] = useState(0);
  let [isPhotoBeingTaken, setIsPhotoBeingTaken] = useState(false); // hides all UI elements while capturing
  let captureAudio = new Audio(captureSound);

  // Convert `filterNames` array into an object using reduce. Each filter's `name` becomes a key and its `default` becomes the value.
  let [filters, setFilters] = useState(
    filterNames.reduce((acc, item) => {
      acc[item.name] = item.default;
      return acc;
    }, {})
  );
  let [facingMode, setFacingMode] = useState("user"); // "user" = front, "environment" = back

  let setup = async () => {
    try {
      // Stop previous stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Request new stream
      let stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  let switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  let exitImage = () => {
    let canvas = canvasRef.current;

    if (!canvas) return;

    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setIsCaptured(!isCaptured);
    setIsPhotoBeingTaken(!isPhotoBeingTaken);
  };

  let saveImage = () => {
    let anchor = document.createElement("a");
    anchor.href = imgData;
    anchor.download = "WebCam.png";
    anchor.click();
  };

  let handleTimer = () => {
    setTimerPopUp(true);
    setIsPhotoBeingTaken(true);
    let countdown = delayValue; // storing the actual delay
    setTimer(countdown); // reset state each time

    let intervalId = setInterval(() => {
      countdown--;
      setTimer(countdown); // Update UI

      if (countdown <= 0) {
        clearInterval(intervalId);
        takeImage();
        setTimerPopUp(false);
      }
    }, 1000);
  };

  let takeImage = () => {
    let video = videoRef.current;
    let canvas = canvasRef.current;

    if (!video || !canvas) return;

    let context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw Flash
    context.fillStyle = "rgba(252, 252, 252, 1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    captureAudio.play();

    setTimeout(() => {
      context.filter = `blur(${filters.blur}px) brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%) hue-rotate(${filters.huerotate}deg) invert(${filters.invert}%) opacity(${filters.opacity}%) saturate(${filters.saturate}%) sepia(${filters.sepia}%)`;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      setImgData(canvas.toDataURL("image/png"));
      setIsCaptured(!isCaptured);
    }, 120);
  };

  useEffect(() => {
    setup();
  }, [facingMode]); // run this effect when the component loads and every time facingMode changes

  useEffect(() => {
    let timer = setTimeout(() => {
      setHideUIButtons(true); // Show UI buttons when the page is refreshed
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-screen md:py-12 py-8 px-5 md:px-22 relative overflow-hidden bg-black">
      {/* Background Effect */}
      <div className="absolute inset-0 flex justify-center">
        <div className="relative w-full h-screen">
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#271E37"
            activeColor="#3794F4"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      </div>

      <div className="w-5.5/8 h-11/12 md:h-full relative rounded-xl overflow-hidden">
        <video
          autoPlay
          id="video"
          className="w-full h-full object-cover"
          ref={videoRef}
          style={{
            filter: `blur(${filters.blur}px) brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%) hue-rotate(${filters.huerotate}deg) invert(${filters.invert}%) opacity(${filters.opacity}%) saturate(${filters.saturate}%) sepia(${filters.sepia}%)`,
          }}
        ></video>
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover absolute top-0"
        ></canvas>

        {/* Delay Button */}
        {hideUIButtons && !isPhotoBeingTaken && (
          <Delay
            delay={delay}
            delayValue={delayValue}
            setDelayValue={setDelayValue}
            delayDropdownUI={delayDropdownUI}
            setDelayDropdownUI={setDelayDropdownUI}
          />
        )}

        {/* Delay Timer */}
        {timerPopUp && <DelayTimer timer={timer} />}

        {/* Switch Camera Button */}
        {window.innerWidth >= 200 &&
          window.innerWidth <= 900 &&
          hideUIButtons &&
          !isPhotoBeingTaken && <SwitchCamera switchCamera={switchCamera} />}

        {/* Filters */}
        {hideUIButtons && !isPhotoBeingTaken && (
          <FiltersMenu
            filterNames={filterNames}
            filters={filters}
            setFilters={setFilters}
          />
        )}

        {/* Camera Button */}
        {!isCaptured && hideUIButtons && !isPhotoBeingTaken && (
          <CameraButton handleTimer={handleTimer} />
        )}

        {/* Exit and Download Button */}
        {isCaptured && (
          <ExitAndDownloadButton saveImage={saveImage} exitImage={exitImage} />
        )}
      </div>
    </div>
  );
};
