import { images } from "../../lib/images";
import { site } from "../../lib/site";

export default function OfficePhotoBlock() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg"
      aria-label="Our Los Angeles office"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-1 bg-slate-200 p-1">
          <img
            src={images.location.exterior}
            alt="Rafla Insurance Agency storefront on Venice Boulevard in Los Angeles, CA"
            className="h-full min-h-56 w-full object-cover md:min-h-72"
            loading="lazy"
            decoding="async"
          />
          <img
            src={images.location.interior}
            alt="Front view of the Rafla Insurance Agency office building in Los Angeles"
            className="h-full min-h-56 w-full object-cover md:min-h-72"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 bg-white px-6 py-8 md:px-8">
          <p className="text-sm leading-relaxed text-slate-600">
            Our Los Angeles office is on Venice Boulevard in Mar Vista. Walk-ins
            are welcome during regular business hours; call ahead with access or
            parking questions.
          </p>

          <address className="flex flex-col gap-1.5 not-italic">
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-9.5 11.25S.5 17.642.5 10.5a9 9 0 0119 0z" />
              </svg>
              <span>12240 Venice Blvd, Suite 2, Los Angeles, CA 90066</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-700">
              <svg className="h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <a href={site.contact.phoneHref} className="text-slate-700 underline underline-offset-2 hover:text-brand-700">
                {site.contact.phone}
              </a>
            </div>
          </address>

          <div className="flex items-start gap-2 text-sm text-slate-700">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-800">Hours</span>
              <span>Mon-Fri 10:00 AM - 7:00 PM</span>
              <span>Saturday 10:00 AM - 3:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
