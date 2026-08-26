const trustItems = [
  { label: "Founded 2003" },
  { label: "Multiple Carrier Programs" },
  { label: "Mar Vista Office" },
  { label: "English" },
  { label: "Español" },
  { label: "العربية" },
  { label: "Personal & Commercial Coverage" },
];

function DotIcon() {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      aria-hidden="true"
      className="flex-shrink-0 opacity-70"
      style={{ fill: "currentColor" }}
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default function TrustStrip() {
  return (
    <div
      className="w-full"
      aria-label="Trust indicators"
    >
      {/* Desktop: single row. Mobile: 2-column grid */}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 list-none m-0 p-0">
        {trustItems.map((item) => (
          <li
            key={item.label}
            role="listitem"
            className="flex items-center gap-1.5 text-current opacity-80 hover:opacity-100 transition-opacity duration-150"
          >
            <DotIcon />
            <span className="text-sm font-medium leading-tight whitespace-normal sm:whitespace-nowrap">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
