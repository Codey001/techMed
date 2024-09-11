import React, { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { useLocation } from 'react-router-dom';

const MeetingComponent = () => {
  const [isMeetingJoined, setIsMeetingJoined] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const videoRef = useRef(null);
  const callFrame = useRef(null);
  const deepgramSocketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const location = useLocation();
  const { meetingUrl } = location.state || {};

  const dailyRoomURL = meetingUrl; 

  const deepgramApiKey = import.meta.env.VITE_DEEPGRAM_API;

  const joinMeeting = () => {
    setIsMeetingJoined(true);

    callFrame.current = DailyIframe.createFrame({
      iframeStyle: {
        position: "absolute",
        width: "100%",
        height: "100%",
        border: "0",
        zIndex: 1,
      },
      showLeaveButton: true,
    });

    callFrame.current.join({ url: dailyRoomURL });

    callFrame.current.on("track-started", (event) => {
      if (event.track.kind === "audio") {
        const audioTrack = event.track;
        console.log("Audio track started", audioTrack);
        const mediaStream = new MediaStream([audioTrack]);
        mediaRecorderRef.current = new MediaRecorder(mediaStream);
      }
    });

    callFrame.current.on("joined-meeting", handleJoinedMeeting);
  };

  const handleJoinedMeeting = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    console.log("streaming audio stream", stream);
    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
    }
  };

  const toggleTranscription = () => {
    if (isTranscribing) {
      stopTranscription();
    } else {
      startTranscription();
    }
    setIsTranscribing(!isTranscribing);
  };

  const startTranscription = async () => {
    const deepgram = createClient(deepgramApiKey);

    const connection = deepgram.listen.live({
      model: "nova-2",
      language: "en-US",
      smart_format: true,
    });

    connection.on(LiveTranscriptionEvents.Open, () => {
      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          connection.send(event.data);
        }
      };

      mediaRecorderRef.current.start(250);
    });

    connection.on(LiveTranscriptionEvents.Transcript, (data) => {
      const transcript = data.channel.alternatives[0].transcript;
      if (transcript) {
        setTranscription((prev) => `${transcript}`);
      }
    });

    connection.on(LiveTranscriptionEvents.Error, (err) => {
      console.error("Deepgram WebSocket error:", err);
    });

    connection.on(LiveTranscriptionEvents.Close, () => {
      console.log("Deepgram connection closed.");
    });

    deepgramSocketRef.current = connection;
  };

  const stopTranscription = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setTranscription("");
  };

  return (
    <div style={{ height: "100%" }}>
      {!isMeetingJoined ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={joinMeeting}
            style={{
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Join Meeting
          </button>
        </div>
      ) : (
        <>
          <div ref={videoRef} style={{ position: "absolute", zIndex: 1 }} />

          {isTranscribing && (
            <div
              style={{
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxWidth: "600px",
                // backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "20px",
                textAlign: "center",
                borderRadius: "8px",
                zIndex: 5,
                fontSize: "18px",
                lineHeight: "1.5",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // Limit to two lines
                whiteSpace: "pre-wrap",
              }}
            >
              {transcription}
            </div>
          )}

          <button
            onClick={toggleTranscription}
            style={{
              position: "absolute",
              bottom: "50px",
              left: "10px",
              padding: "2px 5px",
              background: isTranscribing ? "#2196F3" : "#4CAF50", // Blue when active, green when inactive
              color: "white",
              border: "none",
              borderRadius: "20px", // Rounded corners
              cursor: "pointer",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
              transition: "background 0.3s ease", // Smooth background color transition
              zIndex: 2,
            }}
          >
            {isTranscribing ? "Stop Transcription" : "Start Transcription"}
          </button>
        </>
      )}
    </div>
  );
};

export default MeetingComponent;
