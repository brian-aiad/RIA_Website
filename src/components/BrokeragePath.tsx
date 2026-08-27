import {
  FileSearch,
  LifeBuoy,
  MessageSquareText,
  Scale,
} from "lucide-react";

const brokerSteps = [
  {
    label: "Client brief",
    title: "Listen",
    text: "We start with what changed, what worries you, and what the policy needs to accomplish.",
    icon: MessageSquareText,
  },
  {
    label: "Coverage review",
    title: "Review",
    text: "We organize the exposures, current limits, deductibles, filings, and documents that shape the search.",
    icon: FileSearch,
  },
  {
    label: "Carrier options",
    title: "Compare",
    text: "We review available programs and explain meaningful differences—not only the premium at the bottom.",
    icon: Scale,
  },
  {
    label: "Placement + service",
    title: "Stay involved",
    text: "You choose the direction. We help with the application, policy service, certificates, and next renewal.",
    icon: LifeBuoy,
  },
];

export default function BrokeragePath() {
  return (
    <section className="brokerage-path" aria-labelledby="brokerage-path-title">
      <div className="atlas-container">
        <header className="brokerage-path__heading">
          <div>
            <p className="ria-kicker">What an independent broker does</p>
            <h2 id="brokerage-path-title">One conversation.<br />A wider view of the market.</h2>
          </div>
          <p>Rafla is an independent insurance agency—not an insurance company. We help you make sense of available carrier programs, then remain a local point of contact after the policy is placed.</p>
        </header>

        <div className="brokerage-path__rail" data-brokerage-path>
          <div className="brokerage-path__track" aria-hidden="true"><span /></div>
          {brokerSteps.map(({ label, title, text, icon: Icon }) => (
            <article className="brokerage-path__step" data-brokerage-step key={title}>
              <div className="brokerage-path__node" aria-hidden="true"><Icon /></div>
              <span>{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <aside className="brokerage-path__roles" aria-label="The roles of your broker and insurance carrier">
          <div>
            <small>Your local broker</small>
            <strong>Rafla Insurance Agency</strong>
            <span>Reviews options · explains tradeoffs · assists with policy service</span>
          </div>
          <i aria-hidden="true">+</i>
          <div>
            <small>Your insurance company</small>
            <strong>The selected carrier</strong>
            <span>Underwrites the risk · issues the policy · handles covered claims</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
