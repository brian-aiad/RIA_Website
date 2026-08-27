import { Check, Paperclip } from "lucide-react";

export default function PolicyReviewSheet() {
  return (
    <div className="review-sheet" aria-label="A sample policy review worksheet">
      <div className="review-sheet__clip" aria-hidden="true"><Paperclip /></div>
      <div className="review-sheet__masthead">
        <img src="/logo.svg" alt="" aria-hidden="true" width="176" height="44" />
        <span>Policy review / 90066</span>
      </div>
      <div className="review-sheet__title">
        <small>Before we compare</small>
        <strong>What changed since the last policy?</strong>
      </div>
      <ul>
        <li><Check />New address, vehicle, driver, employee, or equipment</li>
        <li><Check />How the home, car, or business is actually used</li>
        <li><Check />Current limits, deductibles, endorsements, and exclusions</li>
        <li><Check />Lender, contract, certificate, or filing requirements</li>
      </ul>
      <div className="review-sheet__footer"><span>Limits</span><span>Deductibles</span><span>Carrier rules</span><span>Price</span></div>
      <div className="review-sheet__note" aria-hidden="true">Details first.</div>
    </div>
  );
}
