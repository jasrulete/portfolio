import { useEffect, useRef, useState } from "react";
import { Camera, VideoOff } from "lucide-react";
import type { GestureRecognizer } from "@mediapipe/tasks-vision";
import { useCameraStream } from "../../../hooks/use-camera-stream";

type ModelState = "off" | "loading" | "on" | "error";

/** Pinned to the installed @mediapipe/tasks-vision version. */
const MEDIAPIPE_WASM =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const GESTURE_MODEL =
  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";

const GESTURE_LABELS: Record<string, [string, string]> = {
  Closed_Fist: ["✊", "Closed fist"],
  Open_Palm: ["✋", "Open palm"],
  Pointing_Up: ["☝️", "Pointing up"],
  Thumb_Up: ["👍", "Thumbs up"],
  Thumb_Down: ["👎", "Thumbs down"],
  Victory: ["✌️", "Victory"],
  ILoveYou: ["🤟", "I love you"],
};

interface DetectedGesture {
  emoji: string;
  label: string;
  score: number;
}

export default function GestureApp() {
  const { videoRef, status, start, stop: stopCamera } = useCameraStream();
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);
  const [model, setModel] = useState<ModelState>("off");
  const [detected, setDetected] = useState<DetectedGesture[]>([]);

  // Release the model and loop when the app window closes
  // (the camera stream is released by useCameraStream).
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      recognizerRef.current?.close();
    };
  }, []);

  // The recognizer IS this app — load it as soon as the camera is live.
  // startedRef (not state) guards re-entry: state deps would re-run the
  // effect mid-load and cancel it.
  useEffect(() => {
    if (status !== "live" || startedRef.current) return;
    startedRef.current = true;
    let cancelled = false;

    (async () => {
      setModel("loading");
      try {
        const vision = await import("@mediapipe/tasks-vision");
        const fileset = await vision.FilesetResolver.forVisionTasks(
          MEDIAPIPE_WASM
        );
        const options = {
          baseOptions: {
            modelAssetPath: GESTURE_MODEL,
            delegate: "GPU" as const,
          },
          runningMode: "VIDEO" as const,
          numHands: 2,
        };
        let recognizer: GestureRecognizer;
        try {
          recognizer = await vision.GestureRecognizer.createFromOptions(
            fileset,
            options
          );
        } catch {
          recognizer = await vision.GestureRecognizer.createFromOptions(
            fileset,
            {
              ...options,
              baseOptions: { ...options.baseOptions, delegate: "CPU" },
            }
          );
        }
        if (cancelled) {
          recognizer.close();
          return;
        }
        recognizerRef.current = recognizer;
        setModel("on");

        const CONNECTIONS = vision.GestureRecognizer.HAND_CONNECTIONS;
        let lastKey = "";
        const loop = () => {
          const video = videoRef.current;
          const canvas = overlayRef.current;
          const rec = recognizerRef.current;
          if (!video || !canvas || !rec) return;
          if (video.videoWidth > 0) {
            if (canvas.width !== video.videoWidth) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }
            const result = rec.recognizeForVideo(video, performance.now());
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              for (const landmarks of result.landmarks) {
                ctx.strokeStyle = "#60a5fa";
                ctx.lineWidth = 3;
                for (const c of CONNECTIONS) {
                  const a = landmarks[c.start];
                  const b = landmarks[c.end];
                  ctx.beginPath();
                  ctx.moveTo(a.x * canvas.width, a.y * canvas.height);
                  ctx.lineTo(b.x * canvas.width, b.y * canvas.height);
                  ctx.stroke();
                }
                ctx.fillStyle = "#ffffff";
                for (const p of landmarks) {
                  ctx.beginPath();
                  ctx.arc(
                    p.x * canvas.width,
                    p.y * canvas.height,
                    4,
                    0,
                    Math.PI * 2
                  );
                  ctx.fill();
                }
              }
            }
            const found: DetectedGesture[] = result.gestures
              .map((g) => g[0])
              .filter((top) => top && GESTURE_LABELS[top.categoryName])
              .map((top) => ({
                emoji: GESTURE_LABELS[top.categoryName][0],
                label: GESTURE_LABELS[top.categoryName][1],
                score: top.score,
              }));
            // Only re-render when what we show actually changes.
            const key = found
              .map((f) => `${f.label}:${Math.round(f.score * 10)}`)
              .join("|");
            if (key !== lastKey) {
              lastKey = key;
              setDetected(found);
            }
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      } catch {
        if (!cancelled) setModel("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, videoRef]);

  const stop = () => {
    cancelAnimationFrame(rafRef.current);
    recognizerRef.current?.close();
    recognizerRef.current = null;
    startedRef.current = false;
    setModel("off");
    setDetected([]);
    stopCamera();
  };

  return (
    <div className="p-4 flex flex-col items-center gap-3">
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Recognizes 7 hand gestures with MediaPipe — fully in your browser,
        nothing is uploaded.
      </p>

      <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover -scale-x-100 ${status === "live" ? "" : "hidden"}`}
        />
        <canvas
          ref={overlayRef}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none -scale-x-100 ${status === "live" && model === "on" ? "" : "hidden"}`}
          aria-hidden
        />
        {status !== "live" && (
          <div className="text-center px-6 text-gray-300">
            {status === "idle" && (
              <button
                type="button"
                onClick={start}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
              >
                <Camera size={16} />
                Enable camera
              </button>
            )}
            {status === "starting" && (
              <p className="font-display text-sm">Requesting camera…</p>
            )}
            {status === "denied" && (
              <div className="space-y-2">
                <VideoOff size={24} className="mx-auto" aria-hidden />
                <p className="font-display text-sm">
                  Camera access was blocked. Allow it in your browser&apos;s
                  site settings, then try again.
                </p>
                <button
                  type="button"
                  onClick={start}
                  className="text-blue-400 text-sm underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            )}
            {status === "unsupported" && (
              <p className="font-display text-sm">
                This browser doesn&apos;t support camera access.
              </p>
            )}
          </div>
        )}
      </div>

      {status === "live" && (
        <>
          <div
            role="status"
            className="min-h-[4.5rem] w-full max-w-md flex items-center justify-center gap-3"
          >
            {model === "loading" && (
              <p className="font-display text-sm text-gray-500 dark:text-gray-400">
                Downloading gesture model (~8 MB, first time only)…
              </p>
            )}
            {model === "error" && (
              <p className="font-display text-sm text-gray-500 dark:text-gray-400">
                Couldn&apos;t load the gesture model. Check your connection and
                reopen the app.
              </p>
            )}
            {model === "on" && detected.length === 0 && (
              <p className="font-display text-sm text-gray-500 dark:text-gray-400">
                Show a hand to the camera…
              </p>
            )}
            {model === "on" &&
              detected.map((g, i) => (
                <div
                  key={`${g.label}-${i}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700"
                >
                  <span className="text-3xl" aria-hidden>
                    {g.emoji}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold">{g.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(g.score * 100)}% sure
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <button
            type="button"
            onClick={stop}
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-red-500 transition-colors"
          >
            Stop camera
          </button>
        </>
      )}
    </div>
  );
}
