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

const optionalLabel = (label: string) => (
  <>
    {label} <span className="text-muted">(optional)</span>
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
          defaultValue={state.fields?.phone}
          disabled={disabled}
          errorText={errorText(state.errors?.phone)}
          id="phone"
          label={requiredLabel("Phone number")}
          name="phone"
          type="tel"
        />
        <Input
          defaultValue={state.fields?.date_of_birth}
          disabled={disabled}
          errorText={errorText(state.errors?.date_of_birth)}
          id="date-of-birth"
          label={optionalLabel("Date of birth")}
          name="date_of_birth"
          type="date"
        />
        <Input
          defaultValue={state.fields?.email}
          disabled={disabled}
          errorText={errorText(state.errors?.email)}
          id="email"
          label={optionalLabel("Email")}
          name="email"
          type="email"
        />
        <Input
          defaultValue={state.fields?.prescription_number}
          disabled={disabled}
          errorText={errorText(state.errors?.prescription_number)}
          id="prescription-number"
          label={optionalLabel("Prescription number")}
          name="prescription_number"
        />
      </div>
      <Input
        defaultValue={state.fields?.medication_name}
        disabled={disabled}
        errorText={errorText(state.errors?.medication_name)}
        id="medication-name"
        label={optionalLabel("Medication name")}
        name="medication_name"
      />
      <Select
        defaultValue={state.fields?.fulfillment_preference ?? "not_sure"}
        disabled={disabled}
        errorText={errorText(state.errors?.fulfillment_preference)}
        id="pickup-delivery"
        label={optionalLabel("Pickup or delivery preference")}
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
        title="Add attachment (optional)"
      />
      <Textarea
        defaultValue={state.fields?.notes}
        disabled={disabled}
        errorText={errorText(state.errors?.notes)}
        id="notes"
        label={optionalLabel("Notes for the pharmacy")}
        name="notes"
      />
      <SubmitButton disabled={disabled} />
    </form>
  );
}
