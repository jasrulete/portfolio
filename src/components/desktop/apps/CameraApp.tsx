import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Download, Hand, RefreshCcw, VideoOff } from "lucide-react";
import type { GestureRecognizer } from "@mediapipe/tasks-vision";
import { useCameraStream } from "../../../hooks/use-camera-stream";

type HandsState = "off" | "loading" | "on" | "error";

/** Pinned to the installed @mediapipe/tasks-vision version. */
const MEDIAPIPE_WASM =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const GESTURE_MODEL =
  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";

const TIMER_SECONDS = 3;
const TIMER_GESTURE = "Thumb_Up";
const TIMER_CONFIDENCE = 0.6;
const RETRIGGER_COOLDOWN_MS = 3000;

export default function CameraApp() {
  const { videoRef, status, start, stop: stopCamera, aspectRatio } = useCameraStream();
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const rafRef = useRef(0);
  const timerIdRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const countdownActiveRef = useRef(false);
  const cooldownUntilRef = useRef(0);
  const captureRef = useRef<() => void>(() => {});

  const [mirror, setMirror] = useState(true);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [hands, setHands] = useState<HandsState>("off");
  const [handCount, setHandCount] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const clearTimer = useCallback(() => {
    clearInterval(timerIdRef.current);
    countdownActiveRef.current = false;
    setCountdown(null);
  }, []);

  const stopHands = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    recognizerRef.current?.close();
    recognizerRef.current = null;
    clearTimer();
    const ctx = overlayRef.current?.getContext("2d");
    if (ctx && overlayRef.current)
      ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);
    setHands("off");
    setHandCount(0);
  }, [clearTimer]);

  // Always release the model and timer when the app window closes
  // (the camera stream itself is released by useCameraStream).
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(timerIdRef.current);
      recognizerRef.current?.close();
    };
  }, []);

  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (mirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);
    if (hands === "on" && overlayRef.current) {
      ctx.drawImage(overlayRef.current, 0, 0, canvas.width, canvas.height);
    }
    setSnapshot(canvas.toDataURL("image/png"));
  };
  captureRef.current = capture;

  const beginTimer = useCallback(() => {
    if (countdownActiveRef.current || Date.now() < cooldownUntilRef.current)
      return;
    countdownActiveRef.current = true;
    let n = TIMER_SECONDS;
    setCountdown(n);
    timerIdRef.current = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        clearInterval(timerIdRef.current);
        countdownActiveRef.current = false;
        cooldownUntilRef.current = Date.now() + RETRIGGER_COOLDOWN_MS;
        setCountdown(null);
        captureRef.current();
      } else {
        setCountdown(n);
      }
    }, 1000);
  }, []);

  const startHands = async () => {
    setHands("loading");
    try {
      const vision = await import("@mediapipe/tasks-vision");
      const fileset = await vision.FilesetResolver.forVisionTasks(
        MEDIAPIPE_WASM
      );
      const options = {
        baseOptions: { modelAssetPath: GESTURE_MODEL, delegate: "GPU" as const },
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
        recognizer = await vision.GestureRecognizer.createFromOptions(fileset, {
          ...options,
          baseOptions: { ...options.baseOptions, delegate: "CPU" },
        });
      }
      recognizerRef.current = recognizer;
      setHands("on");

      const CONNECTIONS = vision.GestureRecognizer.HAND_CONNECTIONS;
      let lastCount = -1;
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
            if (result.landmarks.length !== lastCount) {
              lastCount = result.landmarks.length;
              setHandCount(lastCount);
            }
            const thumbsUp = result.gestures.some(
              (g) =>
                g[0] &&
                g[0].categoryName === TIMER_GESTURE &&
                g[0].score >= TIMER_CONFIDENCE
            );
            if (thumbsUp) beginTimer();
          }
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    } catch {
      setHands("error");
    }
  };

  const stop = () => {
    stopHands();
    stopCamera();
  };

  const mirrorClass = mirror ? "-scale-x-100" : "";

  return (
    <div className="p-4 flex flex-col items-center gap-3">
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Everything runs in your browser — video never leaves your device.
      </p>

      <div
        style={{ aspectRatio }}
        className="relative w-full max-w-md max-h-[70vh] rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center"
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-contain ${status === "live" ? "" : "hidden"} ${mirrorClass}`}
        />
        <canvas
          ref={overlayRef}
          className={`absolute inset-0 w-full h-full object-contain pointer-events-none ${status === "live" && hands === "on" ? "" : "hidden"} ${mirrorClass}`}
          aria-hidden
        />
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
            <span
              role="status"
              aria-label={`Photo in ${countdown}`}
              className="font-display text-8xl font-bold text-white drop-shadow-lg"
            >
              {countdown}
            </span>
          </div>
        )}
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
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => (hands === "on" ? stopHands() : startHands())}
              disabled={hands === "loading"}
              aria-pressed={hands === "on"}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors disabled:opacity-60 ${
                hands === "on"
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-500"
              }`}
            >
              <Hand size={14} />
              {hands === "loading" ? "Loading model…" : "Detect hands"}
            </button>
            <button
              type="button"
              onClick={capture}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
            >
              <Camera size={14} />
              Snap
            </button>
            <button
              type="button"
              onClick={() => setMirror((m) => !m)}
              aria-pressed={mirror}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-blue-500 transition-colors"
            >
              <RefreshCcw size={14} />
              Mirror {mirror ? "on" : "off"}
            </button>
            <button
              type="button"
              onClick={stop}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-red-500 transition-colors"
            >
              Stop
            </button>
          </div>
          <p
            role="status"
            className="font-display text-xs h-4 text-gray-500 dark:text-gray-400 text-center"
          >
            {hands === "loading" &&
              "Downloading gesture model (~8 MB, first time only)…"}
            {hands === "on" &&
              (countdown !== null
                ? "Get ready!"
                : `${handCount} hand${handCount === 1 ? "" : "s"} detected · thumbs-up starts a ${TIMER_SECONDS}s photo timer`)}
            {hands === "error" &&
              "Couldn't load the gesture model. Check your connection and try again."}
          </p>
        </>
      )}

      {snapshot && (
        <div className="w-full max-w-md space-y-2">
          <img
            src={snapshot}
            alt="Captured snapshot"
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
          />
          <div className="flex gap-2">
            <a
              href={snapshot}
              download="camera-snapshot.png"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
            >
              <Download size={14} />
              Download
            </a>
            <button
              type="button"
              onClick={() => setSnapshot(null)}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
