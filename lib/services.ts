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
    title: "Prescription Transfers",
    shortLine: "Move prescriptions to Tera Losa Pharmacy.",
    details:
      "Send us your current pharmacy details and we can help begin the transfer process. The pharmacy may contact you if more information is needed.",
    image: "/images/stocktablet.jpg",
    imageAlt: "Tablet used for prescription transfer support",
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
    imageAlt: "Tera Losa Pharmacy team inside the pharmacy",
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
    image: "/images/stockshelves.avif",
    imageAlt: "Organized pharmacy shelves and medication products",
  },
];
