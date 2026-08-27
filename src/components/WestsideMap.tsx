import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

const mapStops = [
  ["santa-monica", "Santa Monica", 18, 21],
  ["west-los-angeles", "West LA", 43, 17],
  ["sawtelle", "Sawtelle", 57, 25],
  ["venice", "Venice", 18, 49],
  ["mar-vista", "Mar Vista", 45, 48],
  ["palms", "Palms", 61, 42],
  ["culver-city", "Culver City", 61, 61],
  ["marina-del-rey", "Marina del Rey", 18, 72],
  ["playa-vista", "Playa Vista", 37, 81],
  ["ladera-heights", "Ladera Heights", 74, 70],
  ["westchester", "Westchester", 51, 91],
  ["inglewood", "Inglewood", 78, 91],
] as const;

export default function WestsideMap() {
  return (
    <div className="westside-map" aria-label="Communities served around Rafla Insurance Agency">
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="westside-map__coast" d="M8 8C15 22 9 38 16 50S11 75 26 95" />
        <path className="westside-map__route" d="M18 21C31 19 46 18 57 25S52 42 45 48S54 55 61 61S68 68 74 70S66 82 78 91" />
        <path className="westside-map__route" d="M18 49C27 50 37 49 45 48" />
        <path className="westside-map__route" d="M18 72C26 77 31 79 37 81S45 87 51 91" />
        <circle cx="45" cy="48" r="7" className="westside-map__office-ring" />
      </svg>
      {mapStops.map(([slug, name, x, y]) => (
        <Link
          key={slug}
          to={`/insurance/${slug}`}
          className={slug === "mar-vista" ? "is-office" : ""}
          style={{ "--map-x": `${x}%`, "--map-y": `${y}%` } as CSSProperties}
        >
          <i aria-hidden="true" />
          <span>{name}</span>
        </Link>
      ))}
      <small>Service-area sketch · Not to scale</small>
    </div>
  );
}
