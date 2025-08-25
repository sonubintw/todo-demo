// Constant for converting milliseconds to days
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * 
 * This helps us compare only dates without considering hours/minutes.
 */
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

//shows only time
const fmtTime = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

//shows weekday + time (e.g., "Monday 2:30 PM")
const fmtWeekdayTime = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  hour: "numeric",
  minute: "2-digit",
});
//shows full date (e.g., "23/08/2025")
const fmtDate = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/**
 * 
 * @param input - Date input (string, number, or Date)
 * @param now   - Optional "current" date (defaults to today)
 * @returns     - A human-friendly string representation
 */
export function calendar(input: string | number | Date, now: Date = new Date()): string {
  const d = new Date(input);
  if (isNaN(d.getTime())) return ""; // invalid date guard

  const sodNow = startOfDay(now).getTime();
  const sodTarget = startOfDay(d).getTime();
  const dayDiff = Math.round((sodTarget - sodNow) / MS_PER_DAY); // negative = past

  // Today / Yesterday / Tomorrow
  if (dayDiff === 0) return `Today at ${fmtTime.format(d)}`;
  if (dayDiff === -1) return `Yesterday at ${fmtTime.format(d)}`;
  if (dayDiff === 1) return `Tomorrow at ${fmtTime.format(d)}`;

  // Within last/next 7 days → show weekday
  if (dayDiff <= -2 && dayDiff >= -7) return `${fmtWeekdayTime.format(d)}`;
  if (dayDiff >= 2 && dayDiff <= 7) return `${fmtWeekdayTime.format(d)}`;

  // Otherwise → fallback full date
  return `${fmtDate.format(d)} at ${fmtTime.format(d)}`;
}
