export const calculateTotalMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const formatTimeFromMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
};

export const sumTimes = (times: string[]): string => {
  const totalMinutes = times.reduce((total, time) => {
    return total + calculateTotalMinutes(time);
  }, 0);
  return formatTimeFromMinutes(totalMinutes);
};