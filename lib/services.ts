export type ServiceTile = {
  title: string;
  shortLine: string;
  details: string;
  image: string;
  imageAlt: string;
};

export const serviceTiles: ServiceTile[] = [
  {
    title: "Prescription Refills",
    shortLine: "Request your refill online or call the pharmacy.",
    details:
      "Start a refill request online and the pharmacy team will review it. For urgent or same-day needs, please call directly.",
    image: "/images/stockprescription.jpg",
    imageAlt: "Prescription paperwork and medication packaging",
  },
  {
    title: "Medication Reviews",
    shortLine: "Understand your medications more clearly.",
    details:
      "Book time with the pharmacy team to review your medications, answer questions, and check for possible concerns.",
    image: "/images/stockexplanation.jpg",
    imageAlt: "Medication consultation and explanation at a table",
  },
  {
    title: "Prescribing Support",
    shortLine: "Ask about pharmacist prescribing options.",
    details:
      "For eligible minor conditions or prescription needs, the pharmacy team can explain available prescribing services and next steps.",
    image: "/images/stockrefill.jpg",
    imageAlt: "Terra Losa Pharmacy team inside the pharmacy",
  },
  {
    title: "Vaccines & Injections",
    shortLine: "Ask about available vaccines and injections.",
    details:
      "Contact the pharmacy to confirm vaccine or injection availability, appointment options, and eligibility.",
    image: "/images/stockvaccination.jpg",
    imageAlt: "Vaccine preparation in a pharmacy setting",
  },
  {
    title: "Delivery & Packaging",
    shortLine: "Support for delivery and medication organization.",
    details:
      "Ask about delivery options and packaging support to make regular medications easier to manage.",
    image: "/images/stockblisterpack.jpg",
    imageAlt: "Organized pharmacy shelves and medication products",
  },
];

export const serviceImageBySlug: Record<string, Pick<ServiceTile, "image" | "imageAlt">> = {
  "blister-packaging": {
    image: "/images/stockblisterpack.jpg",
    imageAlt: "Organized pharmacy shelves and medication products",
  },
  delivery: {
    image: "/images/stockshelves.avif",
    imageAlt: "Organized pharmacy shelves and medication products",
  },
  "diabetes-support": {
    image: "/images/stockmedicine.jpg",
    imageAlt: "Medication and pharmacy health products",
  },
  "medication-reviews": {
    image: "/images/stockexplanation.jpg",
    imageAlt: "Medication consultation and explanation at a table",
  },
  "minor-ailments-prescribing": {
    image: "/images/stockrefill.jpg",
    imageAlt: "Terra Losa Pharmacy team inside the pharmacy",
  },
  "over-the-counter-guidance": {
    image: "/images/stockpills.jpg",
    imageAlt: "Pharmacy pills and over-the-counter medication",
  },
  "prescription-refills": {
    image: "/images/stockprescription.jpg",
    imageAlt: "Prescription paperwork and medication packaging",
  },
  "vaccines-injections": {
    image: "/images/stockvaccination.jpg",
    imageAlt: "Vaccine preparation in a pharmacy setting",
  },
};
