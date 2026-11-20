import { supabase } from "../supabase/supabaseClient";

export const ABDM_FEES = {
  REGISTRATION: 100,
  LOGO_PURCHASE: 100,
  ID_CARD_PURCHASE: 100,
  COLLECTION_WINDOW_DAYS: 90,
};

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function normalizePhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function normalizeLicence(licenceNo) {
  return String(licenceNo || "").trim().toUpperCase().replace(/\s+/g, "");
}

export function validateContactAndLicence({ email, phone, licenceNo }) {
  const cleanEmail = normalizeEmail(email);
  const cleanPhone = normalizePhone(phone);
  const cleanLicence = normalizeLicence(licenceNo);
  const errors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
    errors.email = "সঠিক ও ভ্যালিড ইমেইল আইডি দিন।";
  }
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.phone = "সঠিক ১০ ডিজিটের ভ্যালিড মোবাইল নম্বর দিন।";
  }
  if (!cleanLicence || cleanLicence.length < 6) {
    errors.licenceNo = "সঠিক ড্রাইভিং লাইসেন্স নম্বর দিন।";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    clean: { email: cleanEmail, phone: cleanPhone, licenceNo: cleanLicence },
  };
}

// Deterministic Member ID derived from normalized Email + Phone (never random)
export function generateDeterministicMemberId(email, phone) {
  const seed = `${normalizeEmail(email)}|${normalizePhone(phone)}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const code = (hash >>> 0).toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
  return `ABDM-${code}`;
}

// Checks duplicate Email, Phone, or Driving Licence before registration
export async function checkDuplicateMember({ email, phone, licenceNo }) {
  const cleanEmail = normalizeEmail(email);
  const cleanPhone = normalizePhone(phone);
  const cleanLicence = normalizeLicence(licenceNo);

  const { data: existingByEmail } = await supabase
    .from("profiles")
    .select("id, member_id, email")
    .eq("email", cleanEmail)
    .limit(1);

  if (existingByEmail && existingByEmail.length > 0) {
    return { blocked: true, reason: "এই ইমেইল আইডি দিয়ে ইতিমধ্যে একটি আইডি তৈরি করা আছে।" };
  }

  const { data: existingByPhone } = await supabase
    .from("profiles")
    .select("id, member_id, phone")
    .eq("phone", cleanPhone)
    .limit(1);

  if (existingByPhone && existingByPhone.length > 0) {
    return { blocked: true, reason: "এই মোবাইল নম্বর দিয়ে ইতিমধ্যে একটি আইডি তৈরি করা আছে।" };
  }

  const { data: existingByLicence } = await supabase
    .from("profiles")
    .select("id, member_id, license_number")
    .eq("license_number", cleanLicence)
    .limit(1);

  if (existingByLicence && existingByLicence.length > 0) {
    return { blocked: true, reason: "এই ড্রাইভিং লাইসেন্স নম্বরটি ইতিমধ্যে রেজিস্টার্ড আছে।" };
  }

  return { blocked: false, reason: "" };
}

export function calculateNinetyDayWindow(purchaseDate = new Date()) {
  const start = new Date(purchaseDate);
  const validStart = Number.isNaN(start.getTime()) ? new Date() : start;
  const deadline = new Date(validStart.getTime());
  deadline.setDate(deadline.getDate() + ABDM_FEES.COLLECTION_WINDOW_DAYS);

  const now = new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  return {
    daysWindow: ABDM_FEES.COLLECTION_WINDOW_DAYS,
    daysLeft,
    deadlineIso: deadline.toISOString(),
    deadlineText: deadline.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    bnNotice: `পারচেসের দিন থেকে ৯০ দিনের মধ্যে কার্যালয় থেকে আপনার আইডি কার্ড ও লোগো সংগ্রহ/পারচেজ করতে পারবেন (শেষ তারিখ: ${deadline.toLocaleDateString("bn-IN")})।`,
  };
}
