import { useEffect } from "react";

interface FAQSchemaProps {
  questions: Array<{ q: string; a: string }>;
}

/** Google is deprecating FAQ rich results, so keep visible FAQ content only. */
export default function FAQSchema({ questions }: FAQSchemaProps) {
  useEffect(() => {
    document.querySelectorAll('script[data-schema="FAQSchema"]').forEach((s) => s.remove());
  }, [questions]);

  return null;
}
