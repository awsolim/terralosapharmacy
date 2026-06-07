import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";

const privacyNotes = [
  "Website forms are intended for pharmacy-related requests only.",
  "Do not use this website for emergencies or urgent medical needs.",
  "Information submitted through future forms may be used to respond to and process requests.",
  "Prescription submissions are reviewed by pharmacy staff before any next step is confirmed.",
  "Patients should call the pharmacy for urgent or time-sensitive needs.",
  "This page is a plain-language intake notice, not a final legal privacy policy.",
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[88rem] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHeader
        eyebrow="Privacy"
        title="Website intake and privacy notice."
        subtitle="A simple notice for the current website foundation. A final legal privacy policy should be reviewed before launch."
      />

      <Card padding="lg">
        <Badge variant="neutral">Draft notice</Badge>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {privacyNotes.map((note) => (
            <div
              className="rounded-[22px] border border-white/70 bg-primary-soft/45 p-5 text-sm leading-7 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-border/45"
              key={note}
            >
              {note}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
