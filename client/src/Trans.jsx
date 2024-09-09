import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { createClient } from '@deepgram/sdk';

const DailyDeepgram = () => {
  const [isMeetingJoined, setIsMeetingJoined] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const videoRef = useRef(null);
  const callFrame = useRef(null);
  const deepgramSocketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const dailyRoomURL = "https://project1.daily.co/EQJhN7cHN0Z9YSSslKjm"; // Replace with your Daily room URL
  const deepgramApiKey = 'b4cc6486951a12492673090971ed4736395b59de'; // Replace with your Deepgram API Key

  // Handle joining the meeting
  const joinMeeting = () => {
    // Initialize Daily call frame
    callFrame.current = DailyIframe.createFrame({
      iframeStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '0',
      },
      showLeaveButton: true,
    });

    // Attach the call frame to the video container
    callFrame.current.join({ url: dailyRoomURL });
    videoRef.current.appendChild(callFrame.current.iframe);

    // Set up listeners
    callFrame.current.on('joined-meeting', handleJoinedMeeting);

    setIsMeetingJoined(true); // Update state to show that meeting is joined
  };

  // Handle joining the Daily meeting and capture audio stream
  const handleJoinedMeeting = () => {
    console.log('Joined the Daily meeting');
    const stream = callFrame.current.localAudio();

    if (stream) {
      mediaRecorderRef.current = stream; // Store the audio stream reference
    }
  };

  // Toggle transcription on/off
  const toggleTranscription = () => {
    if (isTranscribing) {
      stopTranscription();
    } else {
      startTranscription();
    }
    setIsTranscribing(!isTranscribing);
  };

  // Start transcription by streaming audio to Deepgram
  const startTranscription = () => {
    const deepgramSocket = new WebSocket('wss://api.deepgram.com/v1/listen', [], {
      headers: {
        Authorization: `Token ${deepgramApiKey}`,
      },
    });

    deepgramSocketRef.current = deepgramSocket;

    deepgramSocket.onopen = () => {
      console.log('Connected to Deepgram WebSocket for transcription');

      // Create MediaRecorder to capture audio from the stored audio stream
      const mediaRecorder = new MediaRecorder(mediaRecorderRef.current);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Send audio chunks to Deepgram WebSocket
          deepgramSocket.send(event.data);
        }
      };

      mediaRecorder.start(250); // Send audio chunks every 250ms
      mediaRecorderRef.current = mediaRecorder; // Save reference to media recorder
    };

    // Listen for transcription results
    deepgramSocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const transcript = data.channel.alternatives[0].transcript;

      if (transcript) {
        setTranscription((prev) => `${prev}\n${transcript}`);
      }
    };

    deepgramSocket.onerror = (error) => {
      console.error('Deepgram WebSocket error:', error);
    };

    deepgramSocket.onclose = () => {
      console.log('Deepgram WebSocket closed');
    };
  };

  // Stop transcription and close WebSocket connection
  const stopTranscription = () => {
    if (deepgramSocketRef.current) {
      deepgramSocketRef.current.close();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setTranscription(''); // Clear transcription text
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Show "Join Meeting" button initially */}
      {!isMeetingJoined ? (
        <button
          onClick={joinMeeting}
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Join Meeting
        </button>
      ) : (
        <>
          {/* Video container */}
          <div
            ref={videoRef}
            style={{ width: '800px', height: '600px', border: '1px solid black', position: 'relative' }}
          />

          {/* Transcription overlay */}
          {isTranscribing && (
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              width: '780px',
              height: '100px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '10px',
              overflowY: 'auto',
              borderRadius: '8px',
            }}>
              <h4>Live Transcription:</h4>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{transcription}</pre>
            </div>
          )}

          {/* Toggle transcription button */}
          <button
            onClick={toggleTranscription}
            style={{
              position: 'absolute',
              top: '620px',
              left: '10px',
              padding: '10px 20px',
              backgroundColor: isTranscribing ? 'red' : 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {isTranscribing ? 'Stop Transcription' : 'Start Transcription'}
          </button>
        </>
      )}
    </div>
  );
};

export default DailyDeepgram;
