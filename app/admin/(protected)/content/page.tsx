import {
  updateBusinessHourAction,
  updateHomepageSectionAction,
  updatePharmacySettingsAction,
  updateSitePageAction,
  upsertAboutValueAction,
  upsertConditionAction,
  upsertDocumentAction,
  upsertServiceAction,
} from "@/lib/content-actions";
import {
  formatDay,
  getAdminContentData,
  type AboutValue,
  type BusinessHour,
  type Condition,
  type EditableService,
  type HomepageSection,
  type RegulatoryDocument,
  type SitePageContent,
} from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminContentPage() {
  const content = await getAdminContentData();

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/75 bg-[linear-gradient(135deg,var(--surface),var(--sage))] p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
          Admin
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Website Content
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Edit the public website copy, services, conditions, documents,
          pharmacy information, and hours.
        </p>
      </section>

      {content.error ? (
        <div className="rounded-[18px] border border-[#e0aaa8] bg-[#fff3f2] px-4 py-3 text-sm font-semibold leading-6 text-[#9f3432]">
          {content.error}
        </div>
      ) : null}

      <EditorSection title="Homepage">
        {content.sections.length > 0 ? (
          <div className="grid gap-4">
            {content.sections.map((section) => (
              <HomepageSectionForm key={section.id} section={section} />
            ))}
          </div>
        ) : (
          <EmptyState text="No homepage sections found. Run supabase/content-cms.sql to seed them." />
        )}
      </EditorSection>

      <EditorSection title="Pages">
        {content.pages.length > 0 ? (
          <div className="grid gap-4">
            {content.pages.map((page) => (
              <SitePageForm key={page.id} page={page} />
            ))}
          </div>
        ) : (
          <EmptyState text="No editable pages found. Run supabase/content-cms.sql to seed them." />
        )}
      </EditorSection>

      <EditorSection title="Services">
        <AddServiceForm />
        <div className="mt-5 grid gap-4">
          {content.services.map((service) => (
            <ServiceForm key={service.id} service={service} />
          ))}
        </div>
      </EditorSection>

      <EditorSection title="Conditions Treated">
        <AddConditionForm />
        <div className="mt-5 grid gap-4">
          {content.conditions.map((condition) => (
            <ConditionForm condition={condition} key={condition.id} />
          ))}
        </div>
      </EditorSection>

      <EditorSection title="About Values">
        <AddAboutValueForm />
        <div className="mt-5 grid gap-4">
          {content.aboutValues.map((value) => (
            <AboutValueForm key={value.id} value={value} />
          ))}
        </div>
      </EditorSection>

      <EditorSection title="Patient & Regulatory Documents">
        <AddDocumentForm />
        <div className="mt-5 grid gap-4">
          {content.documents.map((document) => (
            <DocumentForm document={document} key={document.id} />
          ))}
        </div>
      </EditorSection>

      <EditorSection title="Pharmacy Info">
        <form action={updatePharmacySettingsAction} className="grid gap-4">
          <input name="id" type="hidden" value={content.settings.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input defaultValue={content.settings.pharmacy_name} id="pharmacy_name" label="Pharmacy name" name="pharmacy_name" />
            <Input defaultValue={content.settings.phone ?? ""} id="phone" label="Phone" name="phone" />
            <Input defaultValue={content.settings.fax ?? ""} id="fax" label="Fax" name="fax" />
            <Input defaultValue={content.settings.email ?? ""} id="email" label="Email" name="email" />
            <Input defaultValue={content.settings.address_line_1 ?? ""} id="address_line_1" label="Address line 1" name="address_line_1" />
            <Input defaultValue={content.settings.address_line_2 ?? ""} id="address_line_2" label="Address line 2" name="address_line_2" />
            <Input defaultValue={content.settings.city ?? ""} id="city" label="City" name="city" />
            <Input defaultValue={content.settings.province ?? ""} id="province" label="Province" name="province" />
            <Input defaultValue={content.settings.postal_code ?? ""} id="postal_code" label="Postal code" name="postal_code" />
            <Input defaultValue={content.settings.google_maps_url ?? ""} id="google_maps_url" label="Google Maps URL" name="google_maps_url" />
          </div>
          <Textarea defaultValue={content.settings.homepage_announcement ?? ""} id="homepage_announcement" label="Homepage announcement" name="homepage_announcement" />
          <Textarea defaultValue={content.settings.delivery_note ?? ""} id="delivery_note" label="Delivery note" name="delivery_note" />
          <Button className="justify-self-start" type="submit">Save pharmacy info</Button>
        </form>
      </EditorSection>

      <EditorSection title="Hours">
        <div className="grid gap-4">
          {content.hours.map((hour) => (
            <HourForm hour={hour} key={hour.id} />
          ))}
        </div>
      </EditorSection>
    </div>
  );
}

function EditorSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-3xl font-semibold text-foreground">{title}</h2>
      <Card padding="lg">{children}</Card>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-sm leading-7 text-muted">{text}</p>;
}

function Checkbox({
  defaultChecked,
  label,
  name,
}: {
  defaultChecked?: boolean;
  label: string;
  name: string;
}) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-[16px] bg-primary-soft/55 px-4 text-sm font-bold text-foreground">
      <input defaultChecked={defaultChecked} name={name} type="checkbox" />
      {label}
    </label>
  );
}

function HomepageSectionForm({ section }: { section: HomepageSection }) {
  return (
    <form action={updateHomepageSectionAction} className="rounded-[22px] border border-border/70 bg-white/70 p-4">
      <input name="id" type="hidden" value={section.id} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          {section.section_key}
        </h3>
        <Checkbox defaultChecked={section.is_active} label="Active" name="is_active" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Input defaultValue={section.eyebrow ?? ""} id={`${section.id}-eyebrow`} label="Eyebrow" name="eyebrow" />
        <Input defaultValue={section.display_order} id={`${section.id}-display_order`} label="Display order" name="display_order" type="number" />
        <Input defaultValue={section.title ?? ""} id={`${section.id}-title`} label="Title" name="title" />
        <Input defaultValue={section.subtitle ?? ""} id={`${section.id}-subtitle`} label="Subtitle" name="subtitle" />
        <Input defaultValue={section.button_label ?? ""} id={`${section.id}-button_label`} label="Button label" name="button_label" />
        <Input defaultValue={section.button_href ?? ""} id={`${section.id}-button_href`} label="Button link" name="button_href" />
        <Input defaultValue={section.secondary_button_label ?? ""} id={`${section.id}-secondary_button_label`} label="Secondary button label" name="secondary_button_label" />
        <Input defaultValue={section.secondary_button_href ?? ""} id={`${section.id}-secondary_button_href`} label="Secondary button link" name="secondary_button_href" />
      </div>
      <Textarea className="mt-4" defaultValue={section.body ?? ""} id={`${section.id}-body`} label="Body" name="body" />
      <Button className="mt-4" type="submit">Save section</Button>
    </form>
  );
}

function SitePageForm({ page }: { page: SitePageContent }) {
  return (
    <form action={updateSitePageAction} className="rounded-[22px] border border-border/70 bg-white/70 p-4">
      <input name="id" type="hidden" value={page.id} />
      <h3 className="font-serif text-2xl font-semibold text-foreground">{page.slug}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Input defaultValue={page.eyebrow ?? ""} id={`${page.id}-eyebrow`} label="Eyebrow" name="eyebrow" />
        <Input defaultValue={page.title ?? ""} id={`${page.id}-title`} label="Title" name="title" />
        <Input defaultValue={page.subtitle ?? ""} id={`${page.id}-subtitle`} label="Subtitle" name="subtitle" />
        <Input defaultValue={page.hero_title ?? ""} id={`${page.id}-hero_title`} label="Hero title" name="hero_title" />
        <Input defaultValue={page.hero_subtitle ?? ""} id={`${page.id}-hero_subtitle`} label="Hero subtitle" name="hero_subtitle" />
        <Input defaultValue={page.meta_title ?? ""} id={`${page.id}-meta_title`} label="Meta title" name="meta_title" />
        <Input defaultValue={page.meta_description ?? ""} id={`${page.id}-meta_description`} label="Meta description" name="meta_description" />
      </div>
      <Textarea className="mt-4" defaultValue={page.body ?? ""} id={`${page.id}-body`} label="Body" name="body" />
      <Button className="mt-4" type="submit">Save page</Button>
    </form>
  );
}

function ServiceForm({ service }: { service: EditableService }) {
  return <ServiceFields service={service} />;
}

function AddServiceForm() {
  return <ServiceFields />;
}

function ServiceFields({ service }: { service?: EditableService }) {
  return (
    <form action={upsertServiceAction} className="rounded-[22px] border border-border/70 bg-white/70 p-4">
      {service ? <input name="id" type="hidden" value={service.id} /> : null}
      <h3 className="font-serif text-2xl font-semibold text-foreground">
        {service ? service.title : "Add service"}
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Input defaultValue={service?.title ?? ""} id={`${service?.id ?? "new"}-service-title`} label="Title" name="title" />
        <Input defaultValue={service?.slug ?? ""} id={`${service?.id ?? "new"}-service-slug`} label="Slug" name="slug" />
        <Input defaultValue={service?.short_description ?? ""} id={`${service?.id ?? "new"}-service-short`} label="Short description" name="short_description" />
        <Input defaultValue={service?.icon_name ?? ""} id={`${service?.id ?? "new"}-service-icon`} label="Icon name" name="icon_name" />
        <Input defaultValue={service?.display_order ?? 100} id={`${service?.id ?? "new"}-service-order`} label="Display order" name="display_order" type="number" />
        <div className="grid content-end gap-2 sm:grid-cols-2">
          <Checkbox defaultChecked={service?.is_featured ?? false} label="Featured" name="is_featured" />
          <Checkbox defaultChecked={service?.is_active ?? true} label="Active" name="is_active" />
        </div>
      </div>
      <Textarea className="mt-4" defaultValue={service?.long_description ?? ""} id={`${service?.id ?? "new"}-service-long`} label="Long description" name="long_description" />
      <Button className="mt-4" type="submit">{service ? "Save service" : "Add service"}</Button>
    </form>
  );
}

function ConditionForm({ condition }: { condition: Condition }) {
  return <ConditionFields condition={condition} />;
}

function AddConditionForm() {
  return <ConditionFields />;
}

function ConditionFields({ condition }: { condition?: Condition }) {
  return (
    <form action={upsertConditionAction} className="rounded-[22px] border border-border/70 bg-white/70 p-4">
      {condition ? <input name="id" type="hidden" value={condition.id} /> : null}
      <h3 className="font-serif text-2xl font-semibold text-foreground">
        {condition ? condition.name : "Add condition"}
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Input defaultValue={condition?.name ?? ""} id={`${condition?.id ?? "new"}-condition-name`} label="Name" name="name" />
        <Input defaultValue={condition?.slug ?? ""} id={`${condition?.id ?? "new"}-condition-slug`} label="Slug" name="slug" />
        <Input defaultValue={condition?.category ?? ""} id={`${condition?.id ?? "new"}-condition-category`} label="Category" name="category" />
        <Input defaultValue={condition?.display_order ?? 100} id={`${condition?.id ?? "new"}-condition-order`} label="Display order" name="display_order" type="number" />
        <Input defaultValue={condition?.short_description ?? ""} id={`${condition?.id ?? "new"}-condition-short`} label="Short description" name="short_description" />
        <Checkbox defaultChecked={condition?.is_active ?? true} label="Active" name="is_active" />
      </div>
      <Textarea className="mt-4" defaultValue={condition?.long_description ?? ""} id={`${condition?.id ?? "new"}-condition-long`} label="Long description" name="long_description" />
      <Button className="mt-4" type="submit">{condition ? "Save condition" : "Add condition"}</Button>
    </form>
  );
}

function AboutValueForm({ value }: { value: AboutValue }) {
  return <AboutValueFields value={value} />;
}

function AddAboutValueForm() {
  return <AboutValueFields />;
}

function AboutValueFields({ value }: { value?: AboutValue }) {
  return (
    <form action={upsertAboutValueAction} className="rounded-[22px] border border-border/70 bg-white/70 p-4">
      {value ? <input name="id" type="hidden" value={value.id} /> : null}
      <h3 className="font-serif text-2xl font-semibold text-foreground">
        {value ? value.title : "Add about value"}
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Input defaultValue={value?.title ?? ""} id={`${value?.id ?? "new"}-about-value-title`} label="Title" name="title" />
        <Input defaultValue={value?.value_key ?? ""} id={`${value?.id ?? "new"}-about-value-key`} label="Key" name="value_key" />
        <Input defaultValue={value?.icon_name ?? ""} id={`${value?.id ?? "new"}-about-value-icon`} label="Icon name" name="icon_name" />
        <Input defaultValue={value?.display_order ?? 100} id={`${value?.id ?? "new"}-about-value-order`} label="Display order" name="display_order" type="number" />
        <Checkbox defaultChecked={value?.is_active ?? true} label="Active" name="is_active" />
      </div>
      <Textarea className="mt-4" defaultValue={value?.description ?? ""} id={`${value?.id ?? "new"}-about-value-description`} label="Description" name="description" />
      <Button className="mt-4" type="submit">{value ? "Save value" : "Add value"}</Button>
    </form>
  );
}

function DocumentForm({ document }: { document: RegulatoryDocument }) {
  return <DocumentFields document={document} />;
}

function AddDocumentForm() {
  return <DocumentFields />;
}

function DocumentFields({ document }: { document?: RegulatoryDocument }) {
  return (
    <form action={upsertDocumentAction} className="rounded-[22px] border border-border/70 bg-white/70 p-4">
      {document ? <input name="id" type="hidden" value={document.id} /> : null}
      <h3 className="font-serif text-2xl font-semibold text-foreground">
        {document ? document.title : "Add document"}
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Input defaultValue={document?.title ?? ""} id={`${document?.id ?? "new"}-doc-title`} label="Title" name="title" />
        <Input defaultValue={document?.category ?? ""} id={`${document?.id ?? "new"}-doc-category`} label="Category" name="category" />
        <Input defaultValue={document?.document_url ?? ""} id={`${document?.id ?? "new"}-doc-url`} label="Document URL" name="document_url" />
        <Input defaultValue={document?.display_order ?? 100} id={`${document?.id ?? "new"}-doc-order`} label="Display order" name="display_order" type="number" />
        <Checkbox defaultChecked={document?.is_active ?? true} label="Active" name="is_active" />
      </div>
      <Textarea className="mt-4" defaultValue={document?.description ?? ""} id={`${document?.id ?? "new"}-doc-description`} label="Description" name="description" />
      <Button className="mt-4" type="submit">{document ? "Save document" : "Add document"}</Button>
    </form>
  );
}

function HourForm({ hour }: { hour: BusinessHour }) {
  return (
    <form action={updateBusinessHourAction} className="grid gap-4 rounded-[22px] border border-border/70 bg-white/70 p-4 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-end">
      <input name="id" type="hidden" value={hour.id} />
      <p className="self-center font-bold text-foreground">{formatDay(hour.day_of_week)}</p>
      <Input defaultValue={hour.open_time?.slice(0, 5) ?? ""} id={`${hour.id}-open`} label="Open" name="open_time" type="time" />
      <Input defaultValue={hour.close_time?.slice(0, 5) ?? ""} id={`${hour.id}-close`} label="Close" name="close_time" type="time" />
      <Input defaultValue={hour.display_order} id={`${hour.id}-order`} label="Order" name="display_order" type="number" />
      <div className="grid gap-2">
        <Checkbox defaultChecked={hour.is_closed} label="Closed" name="is_closed" />
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
