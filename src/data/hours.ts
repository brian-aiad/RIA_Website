/**
 * Office hours data for Rafla Insurance Agency.
 *
 * To add or update a holiday:
 *   Add a line to SPECIAL_HOURS: { date: "YYYY-MM-DD", label: "Holiday Name", closed: true }
 *   Or use `opensAt`/`closesAt` for reduced hours: { date: "...", label: "...", opensAt: "10:00", closesAt: "13:00" }
 */

export type SpecialHoursEntry =
  | { date: string; label: string; closed: true }
  | { date: string; label: string; opensAt: string; closesAt: string };

export const REGULAR_HOURS = {
  weekdays: { opens: "10:00", closes: "19:00" },
  saturday: { opens: "10:00", closes: "15:00" },
  sunday: null,
};

/**
 * Upcoming and recurring special hours.
 * Add entries here — Brian should confirm actual hours for each holiday.
 * Entries with `closed: true` mean the office is completely closed.
 */
// Publish only client-confirmed exceptions. An empty list keeps the site from
// presenting assumed holiday closures as fact.
export const SPECIAL_HOURS: SpecialHoursEntry[] = [];

/** Returns today's special-hours entry if one exists, otherwise null. */
export function getTodaySpecialHours(): SpecialHoursEntry | null {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" }); // YYYY-MM-DD
  return SPECIAL_HOURS.find((e) => e.date === today) ?? null;
}

/** Returns the next upcoming special-hours entry within the next `days` days, or null. */
export function getUpcomingSpecialHours(days = 7): SpecialHoursEntry | null {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const future = new Date(now);
  future.setDate(now.getDate() + days);
  return (
    SPECIAL_HOURS.find((e) => {
      const d = new Date(e.date + "T12:00:00");
      return d > now && d <= future;
    }) ?? null
  );
}

/** Returns { open, label } accounting for special hours. */
export function getOfficeStatus(): { open: boolean; label: string; holidayWarning?: string } {
  const ptStr = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const pt = new Date(ptStr);
  const day = pt.getDay();
  const decimal = pt.getHours() + pt.getMinutes() / 60;

  const today = getTodaySpecialHours();
  if (today) {
    if ("closed" in today && today.closed) {
      return { open: false, label: `Closed — ${today.label}` };
    }
    if ("opensAt" in today) {
      const [oh, om] = today.opensAt.split(":").map(Number);
      const [ch, cm] = today.closesAt.split(":").map(Number);
      const open = decimal >= oh + om / 60 && decimal < ch + cm / 60;
      return {
        open,
        label: open ? `Open until ${today.closesAt.replace(":", ":")} — ${today.label}` : `Closed — ${today.label}`,
      };
    }
  }

  const upcoming = getUpcomingSpecialHours(7);
  const holidayWarning = upcoming
    ? ("closed" in upcoming && upcoming.closed
        ? `Closed ${upcoming.label} (${upcoming.date})`
        : `Special hours ${upcoming.label}`)
    : undefined;

  const isWeekday = day >= 1 && day <= 5;
  const isSaturday = day === 6;
  const isOpen = (isWeekday && decimal >= 10 && decimal < 19) || (isSaturday && decimal >= 10 && decimal < 15);

  if (isOpen) return { open: true, label: "Open Now", holidayWarning };
  if (day === 0) return { open: false, label: "Opens Mon 10:00 AM", holidayWarning };
  if (day === 6) return { open: false, label: decimal < 10 ? "Opens today 10:00 AM" : "Opens Mon 10:00 AM", holidayWarning };
  if (decimal < 10) return { open: false, label: "Opens today 10:00 AM", holidayWarning };
  const tomorrow = day === 5 ? "Mon" : "tomorrow";
  return { open: false, label: `Opens ${tomorrow} 10:00 AM`, holidayWarning };
}
