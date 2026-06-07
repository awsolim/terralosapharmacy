import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type Status = "new" | "in_review" | "completed" | "archived";

const statusStyles: Record<Status, string> = {
  new: "bg-blue-gray text-[#285c73] ring-[#bdd4df]",
  in_review: "bg-[#fff4dd] text-[#7a5520] ring-[#ead4a9]",
  completed: "bg-primary-soft text-primary ring-[#bfd8ce]",
  archived: "bg-[#eeeeea] text-muted ring-border",
};

const statusLabels: Record<Status, string> = {
  new: "New",
  in_review: "In review",
  completed: "Completed",
  archived: "Archived",
};

type StatusPillProps = HTMLAttributes<HTMLSpanElement> & {
  status: Status;
};

export function StatusPill({ className, status, ...props }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-full px-3.5 text-sm font-semibold ring-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]",
        statusStyles[status],
        className,
      )}
      {...props}
    >
      {statusLabels[status]}
    </span>
  );
}
