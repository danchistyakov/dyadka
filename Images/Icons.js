import React from "react";

const Icons = (type) => {
  const icon = type.icon;

  if (icon === "SearchIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
      </svg>
    );
  }

  if (icon === "BookmarkIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path>
      </svg>
    );
  }

  if (icon === "PersonIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
      </svg>
    );
  }

  if (icon === "LikeIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
      </svg>
    );
  }

  if (icon === "LikeActiveIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
      </svg>
    );
  }

  if (icon === "ShareIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
      </svg>
    );
  }

  if (icon === "DownloadIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path>
      </svg>
    );
  }

  if (icon === "ExpandMoreIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </svg>
    );
  }

  if (icon === "ExpandLessIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
      </svg>
    );
  }

  if (icon === "SettingsIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
      </svg>
    );
  }

  if (icon === "SkipPreviousIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
      </svg>
    );
  }

  if (icon === "SkipNextIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
      </svg>
    );
  }

  if (icon === "PlayArrowIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"></path>
      </svg>
    );
  }

  if (icon === "PauseIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
      </svg>
    );
  }

  if (icon === "FullscreenIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
      </svg>
    );
  }

  if (icon === "FullscreenExitIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path>
      </svg>
    );
  }

  if (icon === "ExternalPlayerIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path>
      </svg>
    );
  }

  if (icon === "VolumeUpIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
      </svg>
    );
  }

  if (icon === "VolumeOffIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
      </svg>
    );
  }

  if (icon === "ChevronLeftIcon") {
    return (
      <svg {...type} focusable="false" viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
      </svg>
    );
  }

  if (icon === "ChevronRightIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
      </svg>
    );
  }

  if (icon === "LoadingIcon") {
    return (
      <svg {...type} className="icon_loading" viewBox="25 25 50 50">
        <circle
          className="icon_loading_front"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="5"
          strokeMiterlimit="10"
        ></circle>
        <circle
          className="icon_loading_back"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="5"
          strokeMiterlimit="10"
        ></circle>
      </svg>
    );
  }

  if (icon === "MenuIcon") {
    return (
      <svg {...type} width="5.5vw" fill="#fff" viewBox="0 0 25 25">
        <path d="M3 5.25C3 4.56 3.56 4 4.25 4h15.5a1.25 1.25 0 110 2.5H4.25C3.56 6.5 3 5.94 3 5.25zM3 12.25c0-.69.56-1.25 1.25-1.25h15.5a1.25 1.25 0 110 2.5H4.25c-.69 0-1.25-.56-1.25-1.25zM4.25 18a1.25 1.25 0 100 2.5h15.5a1.25 1.25 0 100-2.5H4.25z"></path>
      </svg>
    );
  }

  if (icon === "CloseIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 25 25">
        <path d="M12.5 11.086l7.07-7.07a1 1 0 111.415 1.413l-7.07 7.071 7.07 7.07a1 1 0 11-1.414 1.414l-7.071-7.07-7.07 7.07a1 1 0 11-1.415-1.413l7.07-7.071-7.07-7.07A1 1 0 115.43 4.015l7.071 7.07z"></path>{" "}
      </svg>
    );
  }

  if (icon === "ExpandIcon") {
    return (
      <svg {...type} fill="#fff" focusable="false" viewBox="0 0 24 24">
        <path d="M16.232 14.697a.953.953 0 001.395 0l.084-.09a1.073 1.073 0 000-1.464l-4.317-4.536a1.905 1.905 0 00-2.788 0l-4.317 4.536a1.073 1.073 0 000 1.465l.084.089a.953.953 0 001.395 0l3.535-3.715a.953.953 0 011.394 0l3.535 3.715z"></path>
      </svg>
    );
  }

  return <></>;
};

export default Icons;
