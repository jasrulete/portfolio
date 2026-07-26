import { useEffect, useRef, useState } from "react";
import { Camera, Download, RefreshCcw, VideoOff } from "lucide-react";

type Status = "idle" | "starting" | "live" | "denied" | "unsupported";

export default function CameraApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [mirror, setMirror] = useState(true);
  const [snapshot, setSnapshot] = useState<string | null>(null);

  // Always release the camera when the app window closes.
  useEffect(() => {
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    setStatus("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStatus("live");
    } catch {
      setStatus("denied");
    }
  };

  const stop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus("idle");
  };

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
    setSnapshot(canvas.toDataURL("image/png"));
  };

  return (
    <div className="p-4 flex flex-col items-center gap-3">
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Everything runs in your browser — video never leaves your device.
      </p>

      <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${status === "live" ? "" : "hidden"} ${mirror ? "-scale-x-100" : ""}`}
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
        <div className="flex flex-wrap justify-center gap-2">
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
