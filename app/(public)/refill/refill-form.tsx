"use client";

import { useActionState } from "react";
import { submitRefillRequest } from "@/lib/actions/refill";
import { initialFormState } from "@/lib/actions/form-state";
import { Button } from "@/components/ui/button";
import { FileUploadBox } from "@/components/ui/file-upload-box";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const errorText = (error?: string | string[]) =>
  Array.isArray(error) ? error[0] : error;

const requiredLabel = (label: string) => (
  <>
    {label} <span className="text-[#c9473c]">*</span>
  </>
);

function SubmitButton({ disabled }: { disabled: boolean }) {
  return (
    <Button className="w-full sm:w-auto" disabled={disabled} size="lg" type="submit">
      {disabled ? "Submitting..." : "Submit refill request"}
    </Button>
  );
}

export function RefillForm() {
  const [state, formAction, isPending] = useActionState(
    submitRefillRequest,
    initialFormState,
  );
  const isSuccess = state.status === "success";
  const disabled = isPending || isSuccess;

  return (
    <form action={formAction} className="space-y-6">
      {state.errors?.form ? (
        <p className="rounded-[18px] border border-[#e6b8b6] bg-[#fff5f4] p-4 text-sm font-semibold leading-6 text-[#9f3432]">
          {errorText(state.errors.form)}
        </p>
      ) : null}
      {isSuccess ? (
        <p className="rounded-[18px] border border-primary/20 bg-primary-soft p-4 text-sm font-semibold leading-6 text-primary">
          {state.message}
        </p>
      ) : null}

      <input
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          defaultValue={state.fields?.first_name}
          disabled={disabled}
          errorText={errorText(state.errors?.first_name)}
          id="first-name"
          label={requiredLabel("First name")}
          name="first_name"
        />
        <Input
          defaultValue={state.fields?.last_name}
          disabled={disabled}
          errorText={errorText(state.errors?.last_name)}
          id="last-name"
          label={requiredLabel("Last name")}
          name="last_name"
        />
        <Input
          defaultValue={state.fields?.date_of_birth}
          disabled={disabled}
          errorText={errorText(state.errors?.date_of_birth)}
          id="date-of-birth"
          label={requiredLabel("Date of birth")}
          name="date_of_birth"
          type="date"
        />
        <Input
          defaultValue={state.fields?.phone}
          disabled={disabled}
          errorText={errorText(state.errors?.phone)}
          id="phone"
          label={requiredLabel("Phone number")}
          name="phone"
          type="tel"
        />
        <Input
          defaultValue={state.fields?.email}
          disabled={disabled}
          errorText={errorText(state.errors?.email)}
          helperText="Optional"
          id="email"
          label="Email"
          name="email"
          type="email"
        />
        <Input
          defaultValue={state.fields?.prescription_number}
          disabled={disabled}
          errorText={errorText(state.errors?.prescription_number)}
          helperText="Optional"
          id="prescription-number"
          label="Prescription number"
          name="prescription_number"
        />
      </div>
      <Input
        defaultValue={state.fields?.medication_name}
        disabled={disabled}
        errorText={errorText(state.errors?.medication_name)}
        helperText="Optional"
        id="medication-name"
        label="Medication name"
        name="medication_name"
      />
      <Select
        defaultValue={state.fields?.fulfillment_preference ?? "not_sure"}
        disabled={disabled}
        errorText={errorText(state.errors?.fulfillment_preference)}
        id="pickup-delivery"
        label={requiredLabel("Pickup or delivery preference")}
        name="fulfillment_preference"
      >
        <option value="pickup">Pickup at pharmacy</option>
        <option value="delivery">Ask me about delivery</option>
        <option value="not_sure">Not sure yet</option>
      </Select>
      <FileUploadBox
        disabled={disabled}
        errorText={errorText(state.errors?.file)}
        name="prescription_file"
        title="Attach prescription photo"
      />
      <Textarea
        defaultValue={state.fields?.notes}
        disabled={disabled}
        errorText={errorText(state.errors?.notes)}
        helperText="Optional"
        id="notes"
        label="Notes for the pharmacy"
        name="notes"
      />
      <label className="flex gap-3 rounded-[22px] border border-white/70 bg-primary-soft/55 p-5 text-sm leading-7 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-border/45">
        <input
          className="mt-1 size-5 accent-primary disabled:cursor-not-allowed"
          disabled={disabled}
          name="consent_given"
          type="checkbox"
        />
        <span>
          I understand this is a refill request only. The pharmacy may contact
          me before preparing or dispensing medication.
        </span>
      </label>
      {state.errors?.consent_given ? (
        <p className="text-sm leading-6 text-[#9f3432]">
          {errorText(state.errors.consent_given)}
        </p>
      ) : null}
      <SubmitButton disabled={disabled} />
    </form>
  );
}
