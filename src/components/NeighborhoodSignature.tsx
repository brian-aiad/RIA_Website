/** A small, original streetscape: the homes, vehicles, and workplaces Rafla serves. */
export default function NeighborhoodSignature() {
  return (
    <svg className="neighborhood-signature" viewBox="0 0 320 78" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path className="neighborhood-signature__street" d="M4 70H316" />
        <path d="M15 67V38L47 17L79 38V67M10 40L47 15L84 40M23 29V20H31V24M27 67V47H41V67M53 44H67V56H53ZM60 44V56M53 50H67" />
        <path d="M95 62V54Q96 49 102 49L109 37H141L151 49Q158 50 159 56V62H152M105 62H143M108 48L114 40H137L145 48ZM98 55H108M146 55H155" />
        <circle cx="109" cy="62" r="6" /><circle cx="147" cy="62" r="6" />
        <path d="M178 67V27H255V67M174 27H259L254 18H179ZM180 29V34Q184 40 189 34Q194 40 199 34Q204 40 209 34Q214 40 219 34Q224 40 229 34Q234 40 239 34Q244 40 249 34Q252 38 254 34M187 44H211V59H187ZM222 67V43H244V67M228 55V58" />
        <path d="M282 67Q284 43 285 16M285 16Q272 10 268 23Q275 18 285 16M285 16Q293 7 304 19Q294 15 285 16M285 16Q279 3 270 6M285 16Q289 2 298 5M285 16Q274 21 273 31M285 16Q298 22 297 31" />
      </g>
      <path d="M5 75H64M256 75H315" stroke="currentColor" strokeOpacity=".35" />
    </svg>
  );
}
