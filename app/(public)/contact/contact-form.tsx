"use client";

import { useActionState } from "react";
import { submitContactMessage } from "@/lib/actions/contact";
import { initialFormState } from "@/lib/actions/form-state";
import { Button } from "@/components/ui/button";
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
      {disabled ? "Submitting..." : "Submit message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactMessage,
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

      <Input
        defaultValue={state.fields?.name}
        disabled={disabled}
        errorText={errorText(state.errors?.name)}
        id="contact-name"
        label={requiredLabel("Name")}
        name="name"
      />
      <Input
        defaultValue={state.fields?.phone}
        disabled={disabled}
        errorText={errorText(state.errors?.phone)}
        id="contact-phone"
        label={requiredLabel("Phone number")}
        name="phone"
        type="tel"
      />
      <Input
        defaultValue={state.fields?.email}
        disabled={disabled}
        errorText={errorText(state.errors?.email)}
        id="contact-email"
        label={optionalLabel("Email")}
        name="email"
        type="email"
      />
      <Select
        defaultValue={state.fields?.reason ?? "general_question"}
        disabled={disabled}
        errorText={errorText(state.errors?.reason)}
        id="contact-reason"
        label={requiredLabel("Reason")}
        name="reason"
      >
        <option value="general_question">General question</option>
        <option value="prescription_question">Prescription question</option>
        <option value="delivery_question">Delivery question</option>
        <option value="hours_location">Hours/location</option>
        <option value="other">Other</option>
      </Select>
      <Textarea
        defaultValue={state.fields?.message}
        disabled={disabled}
        errorText={errorText(state.errors?.message)}
        id="contact-message"
        label={requiredLabel("Message")}
        name="message"
      />
      <p className="rounded-[18px] border border-primary/15 bg-primary-soft/80 p-4 text-sm leading-6 text-foreground">
        Your information is kept private and used only so the pharmacy can
        respond to your message. Please call directly for urgent pharmacy
        needs.
      </p>
      <SubmitButton disabled={disabled} />
    </form>
  );
}
