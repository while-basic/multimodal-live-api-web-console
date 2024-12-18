import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { useLoggerStore } from "../../lib/store-logger";
import Logger, { LoggerFilterType } from "../logger/Logger";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import "./side-panel.scss";

const filterOptions = [
  { value: "conversations", label: "Conversations" },
  { value: "tools", label: "Tool Use" },
  { value: "none", label: "All" },
];

interface SidePanelProps {
  onOpenChange?: (isOpen: boolean) => void;
}

export default function SidePanel({ onOpenChange }: SidePanelProps) {
  const { client } = useLiveAPIContext();
  const [open, setOpen] = useState(true);
  const loggerContainerRef = useRef<HTMLDivElement>(null);
  const { log, logs } = useLoggerStore();
  const navigate = useNavigate();

  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const handleSubmit = () => {
    if (!textInput.trim()) return;
    
    client.send([{ text: textInput }]);
    setTextInput("");
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Scroll to bottom after sending
    setTimeout(scrollToBottom, 100);
  };

  // Notify parent of open state changes
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (loggerContainerRef.current) {
      const container = loggerContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll to bottom when new logs come in
  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // listen for log events and store them
  useEffect(() => {
    client.on("log", (logData) => {
      log(logData);
      // Scroll after logging
      setTimeout(scrollToBottom, 100);
    });
    return () => {
      client.off("log", log);
    };
  }, [client, log]);

  return (
    <div className={cn("side-panel", { open })}>
      <div className="side-panel-header">
        <button
          className="toggle-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close panel" : "Open panel"}
        >
          {open ? <RiSidebarFoldLine /> : <RiSidebarUnfoldLine />}
        </button>
      </div>

      <div className="side-panel-content" ref={loggerContainerRef}>
        <Logger 
          filter={(selectedOption?.value as LoggerFilterType) || "none"}
        />
      </div>

      <div className="chat-input-container">
        <div className="input-content">
          <textarea
            className="input-area"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit();
              }
            }}
            onChange={(e) => setTextInput(e.target.value)}
            value={textInput}
            placeholder="Type something..."
          />
          <button
            className="send-button"
            onClick={handleSubmit}
            aria-label="Send message"
          >
            <IoSend size={16} />
          </button>
        </div>
      </div>

      <div className="side-panel-footer">
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </div>
    </div>
  );
}
