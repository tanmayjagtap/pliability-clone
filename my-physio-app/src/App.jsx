// MVP Physio Routine App in React (Auto-timed version)
// Vercel-ready project using React + Tailwind

import { useEffect, useState } from "react";

const routine = [
  {
    name: "Scapular Stability (TYI)",
    sets: 2,
    reps: 10,
    duration: 35, // Just a 3s instruction screen, since it's a 10-rep active movement
    type: "instruction",
    text: "Do 10 reps of TYI movement.",
    youtube: "https://www.youtube.com/embed/h4-Q49PhSkg?autoplay=1&mute=1&rel=0",
  },
  {
    name: "Doorway Pec Stretch",
    sets: 2,
    reps: 3,
    duration: 10,
    type: "hold",
    text: "Hold stretch for 10 seconds.",
    youtube: "https://www.youtube.com/embed/-T3BoVw8MhA?autoplay=1&mute=1&rel=0",
  },
  {
    name: "Chin Tuck in Prone",
    sets: 2,
    reps: 3,
    duration: 10,
    type: "hold",
    text: "Hold for 10 seconds.",
    youtube: "https://www.youtube.com/embed/gkzooJNJjNA?autoplay=1&mute=1&rel=0",
  },
  {
    name: "Rhomboids / Scapular Stretch",
    sets: 2,
    reps: 3,
    duration: 10,
    type: "hold",
    text: "Hold for 10 seconds.",
    youtube: "https://www.youtube.com/embed/EYj-bpFbE34?autoplay=1&mute=1&rel=0",
  },
  {
    name: "Levator Scapular Stretch",
    sets: 2,
    reps: 3,
    duration: 10,
    type: "hold",
    text: "Hold for 10 seconds.",
    youtube: "https://www.youtube.com/embed/A6_mCeTgrYw?autoplay=1&mute=1&rel=0",
  },
];

export default function App() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setCount, setSetCount] = useState(1);
  const [repCount, setRepCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(null);
  const [status, setStatus] = useState("start"); // start, active, rest, done

  const current = routine[exerciseIndex];

  useEffect(() => {
    if ((status === "active" || status === "rest") && timeLeft !== null) {
      if (timeLeft === 0) {
        if (status === "rest") {
          resumeAfterRest();
        } else {
          nextStep();
        }
        return;
      }
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, status]);

  const startRoutine = () => {
    setStatus("rest");
    setTimeLeft(10);
  };

  const nextStep = () => {
    if (repCount < current.reps) {
      setRepCount((r) => r + 1);
      setStatus("rest");
      setTimeLeft(5);
    } else if (setCount < current.sets) {
      setSetCount((s) => s + 1);
      setRepCount(1);
      setStatus("rest");
      setTimeLeft(5);
    } else if (exerciseIndex < routine.length - 1) {
      setExerciseIndex((i) => i + 1);
      setSetCount(1);
      setRepCount(1);
      setStatus("rest");
      setTimeLeft(5);
    } else {
      setStatus("done");
    }
  };

  const resumeAfterRest = () => {
    setStatus("active");
    setTimeLeft(current.duration);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      {status === "start" && (
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer"
          onClick={startRoutine}
        >
          Start My Routine
        </button>
      )}

      {status === "active" && (
        <div>
          <h2 className="text-2xl font-bold mb-2">{current.name}</h2>
          <p className="mb-1">
            Set {setCount} / {current.sets}
          </p>
          <p className="mb-1">
            Rep {repCount} / {current.reps}
          </p>
          <div className="mb-4">
            <iframe
              className="w-full max-w-md h-60 mx-auto rounded-md"
              src={current.youtube}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Exercise Demo"
            />
          </div>
          <p className="mb-3">{current.text}</p>
          <div className="text-5xl font-mono">{timeLeft}s</div>
          {current.type === "hold" && (
            <p className="mt-3 animate-pulse text-blue-500">Inhale… Exhale…</p>
          )}
        </div>
      )}

      {status === "rest" && (
        <div>
          <p className="text-xl font-semibold mb-2">Rest / Get Ready</p>
          <h3 className="text-2xl font-bold mb-1">{current.name}</h3>
          <p>
            Set {setCount} / {current.sets} | Rep {repCount} / {current.reps}
          </p>
          <p className="text-gray-700 mb-2">{current.text}</p>
          <div className="text-5xl font-mono">{timeLeft}s</div>
          <button
            onClick={resumeAfterRest}
            className="mt-4 underline text-blue-600 cursor-pointer"
          >
            Skip Rest
          </button>
        </div>
      )}

      {status === "done" && (
        <h2 className="text-3xl font-bold">Routine Complete 🎉</h2>
      )}
    </div>
  );
}
