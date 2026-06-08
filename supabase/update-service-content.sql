-- Populate service descriptions and checklist items.
-- Run this after supabase/add-service-checklist-items.sql.
-- This updates existing service rows by slug and does not insert duplicates.

update public.services
set
  description = 'Send a refill request online and the pharmacy team will review it against your profile. If anything is unclear or more information is needed, a team member may contact you before preparing the prescription.',
  short_description = 'Send a refill request online and the pharmacy team will review it against your profile.',
  checklist_items = 'Online refill request review, Optional attachment to help identify the prescription, Pickup or delivery preference captured, Pharmacy follow-up if more information is needed, Urgent requests should still be handled by phone'
where slug = 'prescription-refills';

update public.services
set
  description = 'A medication review is a focused conversation with the pharmacist about how your medicines are working, how to take them properly, and whether there are safety concerns to discuss with your prescriber.',
  short_description = 'Book time with the pharmacist to review medications and ask practical questions.',
  checklist_items = 'Review prescription and non-prescription medicines, Check for duplicate therapy or interaction concerns, Discuss timing and missed-dose routines, Support adherence and simpler medication habits, Identify questions to raise with your prescriber'
where slug = 'medication-reviews';

update public.services
set
  description = 'Blister packaging can organize regular medications by dose time so daily routines are easier to follow. The pharmacy can review whether packaging is appropriate for your prescriptions and schedule.',
  short_description = 'Ask about packaging options that make regular doses easier to manage.',
  checklist_items = 'Medications organized by dose time, Helpful for complex daily routines, Refill timing coordinated where possible, Clear packaging for morning and evening doses, Pharmacist review before packaging starts'
where slug = 'blister-packaging';

update public.services
set
  description = 'Delivery may be available for eligible prescriptions and pharmacy items within the service area. The pharmacy can confirm timing, address details, and whether delivery is suitable for your request.',
  short_description = 'Ask us about prescription delivery availability for your area.',
  checklist_items = 'Delivery availability confirmed by the pharmacy, Address and contact details verified, Suitable for many routine refills, Same-day needs should be discussed by phone, Pickup remains available during business hours'
where slug = 'delivery';

update public.services
set
  description = 'The pharmacy may provide selected vaccines and injection services depending on current availability, patient eligibility, and pharmacist assessment. Call ahead to confirm what is currently offered.',
  short_description = 'Contact the pharmacy to confirm vaccine and injection availability.',
  checklist_items = 'Current vaccine availability confirmed by phone, Eligibility reviewed before administration, Injection appointments may depend on staffing, Bring health card and relevant records, Pharmacist can answer common vaccine questions'
where slug = 'vaccines-injections';

update public.services
set
  description = 'For eligible minor ailments, the pharmacist can assess symptoms, recommend self-care or non-prescription options, and prescribe when appropriate under Alberta pharmacist scope. Some symptoms require medical assessment by a physician or urgent care.',
  short_description = 'Contact the pharmacy to confirm minor ailment prescribing availability and eligibility.',
  checklist_items = 'Assessment for eligible minor conditions, Self-care and non-prescription options discussed, Prescription may be provided when appropriate, Referral recommended when symptoms need medical care, Availability can vary by pharmacist schedule'
where slug = 'minor-ailments-prescribing';

update public.services
set
  description = 'The pharmacy can support people living with diabetes by helping with medication questions, supplies, glucose monitoring routines, and practical day-to-day strategies. The pharmacist can also flag concerns that should be reviewed with your care team.',
  short_description = 'Practical support for diabetes supplies, medication questions, and daily routines.',
  checklist_items = 'Support with glucose meter and supply questions, Review insulin and medication routines, Discuss low blood sugar prevention basics, Help coordinate refills for diabetes supplies, Identify concerns for follow-up with your care team'
where slug = 'diabetes-support';

update public.services
set
  description = 'Blood pressure checks can help you monitor trends and prepare useful information for your doctor or nurse practitioner. The pharmacist can explain what the reading means in context and when follow-up is appropriate.',
  short_description = 'Ask about in-pharmacy blood pressure checks and monitoring support.',
  checklist_items = 'In-pharmacy blood pressure reading, Practical explanation of the result, Support tracking readings over time, Medication adherence discussion when relevant, Referral advice for concerning readings'
where slug = 'blood-pressure-checks';

update public.services
set
  description = 'Choosing an over-the-counter product can be confusing when you take other medications or have health conditions. The pharmacy team can help you compare options and avoid products that may not be suitable.',
  short_description = 'Clear help choosing non-prescription products safely.',
  checklist_items = 'Help selecting cough and cold products, Guidance for pain and allergy options, Screen for medication interaction concerns, Advice for when symptoms need medical care, Support choosing products for children or older adults'
where slug = 'over-the-counter-guidance';
