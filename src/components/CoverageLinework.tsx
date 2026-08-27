import type { CSSProperties } from "react";

export type CoverageLineworkVariant = "overview" | "auto" | "home" | "commercial" | "sr22" | "specialty";

const labels: Record<CoverageLineworkVariant, string> = {
  overview: "Line illustration combining home, auto, business, and filing coverage",
  auto: "Line illustration of a car and Los Angeles roadway",
  home: "Line illustration of a home and its property boundary",
  commercial: "Line illustration of a storefront and work vehicle",
  sr22: "Line illustration of an insurance filing and roadway",
  specialty: "Line illustration of specialty vehicles and a surety document",
};

export default function CoverageLinework({
  variant,
  className = "",
}: {
  variant: CoverageLineworkVariant;
  className?: string;
}) {
  return (
    <svg
      className={`coverage-linework ${className}`}
      viewBox="0 0 640 420"
      role="img"
      aria-label={labels[variant]}
      style={{ "--linework-delay": `${({ overview: 0, auto: 1, home: 2, commercial: 3, sr22: 4, specialty: 5 }[variant]) * 70}ms` } as CSSProperties}
    >
      <path className="coverage-linework__grid" d="M40 64H600M40 146H600M40 228H600M40 310H600M126 34V386M248 34V386M370 34V386M492 34V386" />
      <path className="coverage-linework__frame" d="M40 34H600V386H40Z" />

      {variant === "overview" && (
        <g>
          <path className="coverage-linework__gold" d="M72 203 189 113l118 90" />
          <path d="M96 186v112h188V186m-146 112v-69h55v69m23-69h43v35h-43" />
          <path d="M337 256h102l39 39 48 10v24H316v-51c0-14 7-22 21-22Zm20 21h72l22 25h-94Z" />
          <circle cx="360" cy="329" r="25" /><circle cx="482" cy="329" r="25" />
          <path d="M403 79h122l42 43v100H403Z" />
          <path className="coverage-linework__gold" d="M525 79v44h42M431 153h106m-106 26h79" />
          <path className="coverage-linework__gold" d="M72 329h214m31 22h249" />
          <path className="coverage-linework__micro" d="M72 72h174m-174 22h105m386 166h35m-35 22h55" />
        </g>
      )}

      {variant === "auto" && (
        <g>
          <path className="coverage-linework__gold" d="M64 319C156 297 245 292 322 301s173 30 254 9" />
          <path d="M136 267l36-76c8-17 22-26 40-28l157-16c23-2 43 7 57 26l51 67 50 15c20 6 32 21 32 42v25H93v-31c0-13 8-21 20-23l23-1Z" />
          <path d="M183 244h246l-49-67-163 17-34 50Zm47 0 20-58m120 50-24-55" />
          <circle cx="187" cy="322" r="35" /><circle cx="457" cy="322" r="35" />
          <circle className="coverage-linework__gold" cx="187" cy="322" r="12" /><circle className="coverage-linework__gold" cx="457" cy="322" r="12" />
          <path className="coverage-linework__micro" d="M90 99h167m-167 22h103m333-22h42m-42 22h72" />
        </g>
      )}

      {variant === "home" && (
        <g>
          <path className="coverage-linework__gold" d="M93 211 318 70l229 142" />
          <path d="M127 191v147h386V191M183 338V221h116v117m47 0V211h111v73H346m0-34h111" />
          <path d="M207 251h68m-68 27h68m-68 27h68" />
          <path className="coverage-linework__gold" d="M81 338h479M82 358h478" />
          <circle cx="404" cy="251" r="12" />
          <path className="coverage-linework__micro" d="M77 99h122m-122 22h78m350-22h58m-58 22h89" />
        </g>
      )}

      {variant === "commercial" && (
        <g>
          <path d="M88 145h303v190H88Zm38 59h86v131h-86Zm119 0h109v73H245m0 27h109" />
          <path className="coverage-linework__gold" d="M72 145h334l-25-61H100l-28 61Z" />
          <path d="M404 231h94l46 54 32 9v41H386v-81c0-14 5-23 18-23Z" />
          <path d="M427 254h62l28 35h-90v-35Z" />
          <circle cx="433" cy="335" r="27" /><circle cx="536" cy="335" r="27" />
          <path className="coverage-linework__gold" d="M63 361h519" />
          <path className="coverage-linework__micro" d="M87 57h147m-147 22h94m326-22h67m-67 22h101" />
        </g>
      )}

      {variant === "sr22" && (
        <g>
          <path d="M182 62h220l75 76v221H182Z" />
          <path className="coverage-linework__gold" d="M402 62v78h75" />
          <path d="M230 176h196m-196 41h196m-196 41h137m-137 41h104" />
          <circle className="coverage-linework__gold" cx="414" cy="305" r="48" />
          <path className="coverage-linework__gold" d="m390 304 16 17 32-37" />
          <path className="coverage-linework__micro" d="M84 114h64m-64 24h42m388 128h62m-62 24h92" />
        </g>
      )}

      {variant === "specialty" && (
        <g>
          <circle cx="166" cy="303" r="51" /><circle cx="363" cy="303" r="51" />
          <path d="m166 303 75-104h78l44 104m-122-104 48 104H166l92-68m31 68 74-77 50 2" />
          <path className="coverage-linework__gold" d="M76 130c83 0 98 53 150 53 58 0 67-53 135-53 58 0 73 49 125 49 25 0 48-9 75-27" />
          <path d="M436 236h114v117H436Zm24 32h66m-66 26h66m-66 26h39" />
          <path className="coverage-linework__gold" d="m481 236 12-40 13 40" />
          <path className="coverage-linework__micro" d="M76 74h132m-132 22h79m351-22h54m-54 22h82" />
        </g>
      )}

      <text x="58" y="375">RAFLA / COVERAGE STUDY</text>
      <text x="526" y="375">LOS ANGELES</text>
    </svg>
  );
}
