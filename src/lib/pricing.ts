/**
 * Centralised pricing logic — single source of truth for both client & display.
 *
 * Weekend (Sat / Sun) → ₹1 000
 * Holiday             → ₹1 000
 * Weekday             → ₹  800
 *
 * Holiday dates are maintained per-year in `holidayConfig`.
 * Add a new year key when dates become available.
 */

// ── Holiday configuration ───────────────────────────────────────────────
export const holidayConfig: Record<number, string[]> = {
  2026: [
    "2026-04-03",
    "2026-04-14",
    "2026-05-28",
    "2026-06-26",
    "2026-08-28",
    "2026-09-04",
    "2026-10-02",
    "2026-10-20",
    "2026-12-25",
    "2026-12-31",
  ],

  // Example:
  // 2027: ["2027-01-01", "2027-12-25"]
};

// Pre-build a Set for O(1) look-ups
const holidaySet = new Set(Object.values(holidayConfig).flat());

// ── Helper: convert Date → "YYYY-MM-DD" in local time ──────────────────
export const toDateString = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// ── Public API ──────────────────────────────────────────────────────────

/** Is a given "YYYY-MM-DD" string a holiday? */
export const isHoliday = (dateStr: string): boolean => holidaySet.has(dateStr);

/** Is a given Date a weekend (Sat / Sun)? */
export const isWeekendDay = (d: Date): boolean => {
  const day = d.getDay();
  return day === 0 || day === 6;
};

/** Is a given Date a special-price day (weekend OR holiday)? */
export const isSpecialDay = (d: Date): boolean =>
  isWeekendDay(d) || isHoliday(toDateString(d));

/** Returns "Holiday" | "Weekend" | "Weekday". Holiday takes label priority. */
export type DayType = "Holiday" | "Weekend" | "Weekday";

export const getDayType = (d: Date): DayType => {
  if (isHoliday(toDateString(d))) return "Holiday";
  if (isWeekendDay(d)) return "Weekend";
  return "Weekday";
};

/** Same as getDayType but accepts a "YYYY-MM-DD" string. */
export const getDayTypeFromString = (dateStr: string): DayType => {
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  return getDayType(new Date(yyyy, mm - 1, dd));
};

/** Price per person for a given Date. */
export const getPricePerPerson = (d: Date | undefined): number => {
  if (!d) return 800;
  return isSpecialDay(d) ? 1000 : 800;
};

/** Price per person from a "YYYY-MM-DD" string (for server-side usage). */
export const getPriceFromDateString = (dateStr: string): number => {
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  return getPricePerPerson(new Date(yyyy, mm - 1, dd));
};
