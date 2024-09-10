// import React, { useEffect, useRef, useState } from "react";
// import DailyIframe from "@daily-co/daily-js";
// import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

// const DailyDeepgram = () => {
//   const [isMeetingJoined, setIsMeetingJoined] = useState(false);
//   const [isTranscribing, setIsTranscribing] = useState(false);
//   const [transcription, setTranscription] = useState("");
//   const videoRef = useRef(null);
//   const callFrame = useRef(null);
//   const deepgramSocketRef = useRef(null);
//   const mediaRecorderRef = useRef(null);

//   //fetch meeting url

//   const dailyRoomURL = "https://project1.daily.co/EQJhN7cHN0Z9YSSslKjm"; // Replace with your Daily room URL

//   // const dailyRoomUrl = await meetingUrl();

//   const deepgramApiKey = import.meta.env.VITE_DEEPGRAM_API; // Replace with your Deepgram API Key

//   // Handle joining the meeting
//   const joinMeeting = () => {
//     // Initialize Daily call frame
//     setIsMeetingJoined(true); // Update state to show that meeting is joined

//     callFrame.current = DailyIframe.createFrame({
//       iframeStyle: {
//         position: "absolute",
//         width: "100%",
//         height: "100%",
//         border: "0",
//         zIndex: 1, // Set z-index lower than the buttons
//       },
//       showLeaveButton: true,
//     });

//     // Attach the call frame to the video container
//     callFrame.current.join({ url: dailyRoomURL });

//     callFrame.current.on("track-started", (event) => {
//       if (event.track.kind === "audio") {
//         const audioTrack = event.track;
//         console.log("Audio track started", audioTrack);
//         // Send the audio stream to your real-time transcription service
//         // Set up MediaStream from the audio track
//         const mediaStream = new MediaStream([audioTrack]);

//         // Set up MediaRecorder to capture audio
//         mediaRecorderRef.current = new MediaRecorder(mediaStream);
//       }
//     });

//     // Set up listeners
//     callFrame.current.on("joined-meeting", handleJoinedMeeting);
//   };

//   // Handle joining the Daily meeting and capture audio stream
//   const handleJoinedMeeting = async () => {
//     console.log("Joined the Daily meeting");

//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: false,
//     });
//     console.log("stresmiting audio stream", stream);
//     if (stream) {
//       mediaRecorderRef.current = new MediaRecorder(stream);
//     }
//   };

//   // Toggle transcription on/off
//   const toggleTranscription = () => {
//     if (isTranscribing) {
//       stopTranscription();
//     } else {
//       startTranscription();
//     }
//     setIsTranscribing(!isTranscribing);
//   };

//   // Start transcription by streaming audio to Deepgram
//   const startTranscription = async () => {
//     console.log("TRANSCRIPTION STARTED");
//     const deepgram = createClient(deepgramApiKey);

//     // Create a live transcription connection
//     const connection = deepgram.listen.live({
//       model: "nova-2",
//       language: "en-US",
//       smart_format: true,
//     });
//     console.log("connection creted");

//     // Listen for live transcription events

//     //EXTRACT AUDIO DATA FROM STREAM

//     connection.on(LiveTranscriptionEvents.Open, () => {
//       console.log("Deepgram connection opened.");

//       // Capture audio and send to Deepgram
//       mediaRecorderRef.current.ondataavailable = async (event) => {
//         if (event.data.size > 0) {
//           connection.send(event.data);
//         }
//       };

//       mediaRecorderRef.current.start(250); // Send audio every 250ms
//     });

//     console.log("LISTENING FOR TRANSCRITPITON");
//     // Listen for transcriptions
//     connection.on(LiveTranscriptionEvents.Transcript, (data) => {
//       console.log("data ", data);
//       const transcript = data.channel.alternatives[0].transcript;
//       console.log("Received transcription:", transcript);
//       if (transcript) {
//         setTranscription((prev) => `${prev}\n${transcript}`);
//       }
//     });

//     connection.on(LiveTranscriptionEvents.Error, (err) => {
//       console.error("Deepgram WebSocket error:", err);
//     });

//     connection.on(LiveTranscriptionEvents.Close, () => {
//       console.log("Deepgram connection closed.");
//     });

//     deepgramSocketRef.current = connection;
//   };

//   // Stop transcription and close WebSocket connection
//   const stopTranscription = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//     }



//     // if (deepgramSocketRef.current) {
//     //   deepgramSocketRef.current.close();
//     // }
//     setTranscription(""); // Clear transcription text
//   };

  

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Show "Join Meeting" button initially */}
//       {!isMeetingJoined ? (
//         <button
//           onClick={joinMeeting}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "blue",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//           }}
//         >
//           Join Meeting
//         </button>
//       ) : (
//         <>
//           {/* Video container */}
//           <div ref={videoRef} style={{ position: "relative", zIndex: 1 }} />

//           {/* Transcription overlay */}
//           {isTranscribing && (
//             <div
//               style={{
//                 top: "10px",
//                 left: "10px",
//                 width: "780px",
//                 height: "100px",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//                 color: "white",
//                 padding: "10px",
//                 overflowY: "auto",
//                 borderRadius: "8px",
//                 zIndex: 2, // Ensure transcription is above the iframe
//               }}
//             >
//               <h4>Live Transcription:</h4>
//               <pre style={{ whiteSpace: "pre-wrap" }}>{transcription}</pre>
//             </div>
//           )}

//           {/* Toggle transcription button */}
//           <button
//             onClick={toggleTranscription}
//             style={{
//               position: "absolute",
//               top: "620px",
//               left: "10px",
//               padding: "10px 20px",
//               backgroundColor: isTranscribing ? "red" : "green",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               zIndex: 2, // Ensure button is above the iframe
//             }}
//           >
//             {isTranscribing ? "Stop Transcription" : "Start Transcription"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default DailyDeepgram;




import React, { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { Video, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DailyDeepgram = () => {
  const [isMeetingJoined, setIsMeetingJoined] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const videoRef = useRef(null);
  const callFrame = useRef(null);
  const deepgramSocketRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const dailyRoomURL = "https://project1.daily.co/EQJhN7cHN0Z9YSSslKjm";
  const deepgramApiKey = import.meta.env.VITE_DEEPGRAM_API;

  const joinMeeting = () => {
    setIsMeetingJoined(true);
    callFrame.current = DailyIframe.createFrame({
      iframeStyle: {
        position: "absolute",
        width: "100%",
        height: "100%",
        border: "0",
        borderRadius: "12px",
        overflow: "hidden",
      },
      showLeaveButton: true,
    });

    callFrame.current.join({ url: dailyRoomURL });
    callFrame.current.on("track-started", handleTrackStarted);
    callFrame.current.on("joined-meeting", handleJoinedMeeting);
  };

  const handleTrackStarted = (event) => {
    if (event.track.kind === "video") {
      // Attach the video track to the videoRef container
      const videoTrack = event.track;
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = new MediaStream([videoTrack]);
        videoElement.play();
      }
    }

    if (event.track.kind === "audio") {
      const audioTrack = event.track;
      const mediaStream = new MediaStream([audioTrack]);
      mediaRecorderRef.current = new MediaRecorder(mediaStream);
    }
  };

  const handleJoinedMeeting = async () => {
    console.log("Joined the Daily meeting");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
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
    console.log("Transcription started");
    const deepgram = createClient(deepgramApiKey);
    const connection = deepgram.listen.live({
      model: "nova-2",
      language: "en-US",
      smart_format: true,
    });

    connection.on(LiveTranscriptionEvents.Open, () => {
      console.log("Deepgram connection opened.");
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
        setTranscription((prev) => `${prev}\n${transcript}`);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!isMeetingJoined ? (
        <Button
          onClick={joinMeeting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Video className="mr-2" />
          Join Meeting
        </Button>
      ) : (
        <Card className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white p-4">
            <CardTitle className="text-2xl font-bold">Video Conference</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <video ref={videoRef} className="w-full h-full" autoPlay playsInline />
            </div>
            <div className="p-4">
              <Button
                onClick={toggleTranscription}
                className={`${
                  isTranscribing ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                } text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 mb-4`}
              >
                {isTranscribing ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                {isTranscribing ? "Stop Transcription" : "Start Transcription"}
              </Button>
              {isTranscribing && (
                <Card className="mt-4 bg-gray-100 shadow-inner">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">Live Transcription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-40 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-600">{transcription}</pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DailyDeepgram;
