// Central company config — change these before going to production
export const COMPANY_CONFIG = {
  whatsapp: "917567566214", // Replace with real WhatsApp number (country code + number, no +)
  phone: "+91 75675 66214",  // Replace with real phone
  email: "hello@ovowfoods.com", // Replace with real email
  name: "OVOW FOODS",
  // Hardcoded to prevent errors from accidentally duplicated Vercel environment variables
  upiId: "7567561239@okbizaxis",
  instagram: "https://instagram.com/ovowfoods",
  facebook: "https://www.facebook.com/share/1EWiUiZRps/",
  address: "Ahmedabad, Gujarat", 
  hours: "Open · Closes 4 am",
} as const;
