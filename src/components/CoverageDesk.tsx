import { useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { coverageEntries } from "../data/atlas";
import CoverageLinework from "./CoverageLinework";

export default function CoverageDesk() {
  const [activeCoverage, setActiveCoverage] = useState(coverageEntries[0]);
  const ActiveIcon = activeCoverage.icon;

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const lastIndex = coverageEntries.length - 1;
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? lastIndex
        : ["ArrowDown", "ArrowRight"].includes(event.key)
          ? (currentIndex + 1) % coverageEntries.length
          : (currentIndex - 1 + coverageEntries.length) % coverageEntries.length;
    const next = coverageEntries[nextIndex];
    setActiveCoverage(next);
    window.requestAnimationFrame(() => document.getElementById(`coverage-tab-${next.key}`)?.focus());
  };

  return (
    <div className="coverage-desk motion-reveal">
      <figure className="coverage-desk__surface">
        <div className="coverage-desk__drawing" key={activeCoverage.key}>
          <CoverageLinework variant={activeCoverage.key} />
        </div>
        <figcaption><span>Coverage study</span><strong>Start with what changed.</strong></figcaption>
        <div className="coverage-desk__tabs" role="tablist" aria-label="Insurance categories">
          {coverageEntries.map((entry, index) => (
            <button
              id={`coverage-tab-${entry.key}`}
              key={entry.key}
              type="button"
              role="tab"
              aria-selected={entry.key === activeCoverage.key}
              aria-controls="coverage-desk-drawer"
              tabIndex={entry.key === activeCoverage.key ? 0 : -1}
              onClick={() => setActiveCoverage(entry)}
              onKeyDown={(event) => moveTab(event, index)}
            >
              <span>{entry.number}</span>
              <strong>{entry.title}</strong>
            </button>
          ))}
        </div>
      </figure>

      <article
        key={activeCoverage.key}
        id="coverage-desk-drawer"
        className="coverage-desk__drawer"
        role="tabpanel"
        aria-labelledby={`coverage-tab-${activeCoverage.key}`}
        aria-live="polite"
      >
        <span className="coverage-desk__number">File {activeCoverage.number}</span>
        <ActiveIcon className="coverage-desk__icon" aria-hidden="true" />
        <div className="coverage-desk__copy">
          <small>Personal review · Carrier options · Local help</small>
          <h3>{activeCoverage.title}</h3>
          <p>{activeCoverage.short}</p>
        </div>
        <Link to={activeCoverage.href}>Open this coverage file <ArrowRight size={17} /></Link>
      </article>
    </div>
  );
}
