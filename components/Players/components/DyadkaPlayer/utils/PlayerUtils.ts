export const formatTime = (data: number): string => {
  const date = new Date(data * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  if (hours) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

export const formatProgress = (data: any) => {
  const {played, playedSeconds} = data;
  const playedFormatted = formatTime(playedSeconds);
  return {played, playedFormatted};
}