"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FileUploadBoxProps = {
  className?: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  errorText?: string;
  name?: string;
};

export function FileUploadBox({
  className,
  disabled = false,
  errorText,
  name = "file",
  title = "Attach a file",
  description = "JPG, PNG, or PDF accepted. Maximum file size is 10MB.",
}: FileUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  function clearFile() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileName("");
  }

  return (
    <div className="space-y-2.5">
      <label
        htmlFor={name}
        className={cn(
          "block cursor-pointer rounded-[24px] border border-dashed border-primary/35 bg-[linear-gradient(135deg,rgba(228,241,233,0.92),rgba(255,250,241,0.74))] p-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition focus-within:ring-2 focus-within:ring-ring",
          disabled && "cursor-not-allowed opacity-65",
          errorText && "border-[#b94a48]",
          className,
        )}
      >
        <input
          accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
          className="sr-only"
          disabled={disabled}
          id={name}
          name={name}
          onChange={(event) => {
            setFileName(event.currentTarget.files?.[0]?.name ?? "");
          }}
          ref={inputRef}
          type="file"
        />
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-primary shadow-[0_14px_30px_rgba(7,63,56,0.14)] ring-1 ring-border/70">
          <span className="text-lg font-semibold">+</span>
        </div>
        <p className="mt-4 text-base font-semibold text-foreground">{title}</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          {description}
        </p>
        {fileName ? (
          <p className="mx-auto mt-4 max-w-md rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-awning ring-1 ring-border/60">
            Selected: {fileName}
          </p>
        ) : null}
      </label>
      {fileName && !disabled ? (
        <button
          className="text-sm font-semibold text-awning underline decoration-awning/30 underline-offset-4"
          onClick={clearFile}
          type="button"
        >
          Remove selected file
        </button>
      ) : null}
      {errorText ? (
        <p className="text-sm leading-6 text-[#9f3432]">{errorText}</p>
      ) : null}
    </div>
  );
}
