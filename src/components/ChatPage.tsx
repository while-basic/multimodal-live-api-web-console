import { useRef, useState } from "react";
import { LiveAPIProvider } from "../contexts/LiveAPIContext";
import SidePanel from "./side-panel/SidePanel";
import { Altair } from "./altair/Altair";
import ControlTray from "./control-tray/ControlTray";
import cn from "classnames";
import { RightSidePanel } from "./right-side-panel/RightSidePanel";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

export function ChatPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const { user } = useAuth();

  return (
    <div className="App">
      <header className={cn("main-header", {
        'left-open': leftSidebarOpen,
        'right-open': rightSidebarOpen
      })}>
        <div className="header-left">
          <h2>Celaya</h2>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link active">Console</Link>
          <Link to="/docs" className="nav-link">Documentation</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
        </nav>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
        </div>
      </header>
      <LiveAPIProvider url={uri} apiKey={API_KEY}>
        <SidePanel onOpenChange={setLeftSidebarOpen} />
        <RightSidePanel onOpenChange={setRightSidebarOpen} />
        <div 
          className={cn("streaming-console", {
            'left-open': leftSidebarOpen,
            'right-open': rightSidebarOpen
          })}
        >
          <main>
            <div className="main-app-area">
              <Altair />
              <video
                className={cn("stream", {
                  hidden: !videoRef.current || !videoStream,
                })}
                ref={videoRef}
                autoPlay
                playsInline
              />
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
            >
              {/* put your own buttons here */}
            </ControlTray>
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
} 