/** Small, original line drawings for the agency's editorial details. */
export type SignatureKind = "drive" | "property" | "work" | "weekend" | "office" | "conversation" | "correspondence" | "reading" | "route";
const drawings: Record<SignatureKind, string[]> = {
  drive: ["M9 43V33Q9 29 15 28L25 14H57L71 28L85 32V43H77M20 43H64M26 17L20 28H65L55 17ZM40 17V28", "M22 43A7 7 0 1 0 22 42.9M70 43A7 7 0 1 0 70 42.9", "M3 54H93"],
  property: ["M12 27L46 5L80 27M20 23V53H72V23M39 53V33H54V53M25 29H33V37H25ZM60 29H68V37H60Z", "M10 54H86M70 15V7H77V20"],
  work: ["M8 53V21H48V53M48 31L65 19V31L83 19V53M20 21V9H37V21M15 30H22V37H15ZM30 30H37V37H30ZM57 39H65V47H57ZM73 39H80V47H73Z", "M3 54H93M16 45H37"],
  weekend: ["M12 43V20Q12 12 21 12H63Q78 12 82 29V43H59M27 43H44M83 43H91M26 43A7 7 0 1 0 26 42.9M58 43A7 7 0 1 0 58 42.9", "M20 20H42V32H20ZM53 20H69V43M4 54H94"],
  office: ["M8 54V19L54 13V54M54 13V4L87 9V54M17 24H45V42H17ZM31 24V54M17 46H45V54M62 20H78M62 27H78M64 40H77V54", "M2 57H94"],
  conversation: ["M10 41V24Q10 20 15 20H30Q35 20 35 26V39H10M13 42L11 53M32 42L34 53M61 39V26Q61 20 67 20H81Q86 20 86 25V41H61M64 42L62 53M83 42L85 53", "M39 36Q48 32 57 36L54 40H42ZM48 40V52M42 52H54M4 58H92"],
  correspondence: ["M9 22H78V52H9ZM9 22L43 43L78 22M9 52L31 36M78 52L56 36", "M20 22V6H68V22M29 13H57M85 12H94M83 20H91M3 58H91"],
  reading: ["M47 14Q27 4 8 11V48Q27 41 47 52Q66 41 87 48V11Q66 4 47 14V52", "M17 19Q29 16 39 21M17 28Q29 25 39 30M17 37Q29 34 39 39M55 21Q67 16 79 19M55 30Q67 25 79 28M55 39Q67 34 79 37M5 57H91"],
  route: ["M9 12H55Q70 12 70 27T55 42H23M32 33L23 42L32 51", "M7 7V17M3 12H13M82 7V17M77 12H87M82 48V58M77 53H87"],
};
export default function InteriorSignature({ kind, className = "" }: { kind: SignatureKind; className?: string }) {
  return <svg className={`interior-signature interior-signature--${kind} ${className}`} viewBox="0 0 96 64" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">{drawings[kind].map((d,index) => <path key={index} d={d} data-register-line="" />)}</g></svg>;
}
