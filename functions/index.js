/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {beforeUserCreated} = require("firebase-functions/v2/identity");
const {HttpsError} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();

// Use the "emails" named database instead of the default database
const firestore = getFirestore("emails");

const EMAIL_ALLOWLIST_DOC_PATH = "authAllowlist/emails";
const DOMAIN_ALLOWLIST_DOC_PATH = "authAllowlist/domains";

/**
 * Retrieves allowlist configuration from Firestore.
 * Both documents are optional. Missing or malformed data is treated as empty.
 * @return {Promise<{emails:Set<string>, domains:Set<string>}>}
 */
async function loadAllowlists() {
  let emailDoc;
  let domainDoc;

  try {
    [emailDoc, domainDoc] = await Promise.all([
      firestore.doc(EMAIL_ALLOWLIST_DOC_PATH).get(),
      firestore.doc(DOMAIN_ALLOWLIST_DOC_PATH).get(),
    ]);
  } catch (error) {
    console.error("Failed to load allowlist configuration:", error);
    throw new HttpsError("internal", "Unable to verify sign-up permissions.");
  }

  const emailEntries = emailDoc?.exists ? emailDoc.get("items") : [];
  const domainEntries = domainDoc?.exists ? domainDoc.get("items") : [];

  const allowedEmails = Array.isArray(emailEntries)
    ? emailEntries
        .map((value) => (typeof value === "string" ? value.trim().toLowerCase() : ""))
        .filter(Boolean)
    : [];

  const allowedDomains = Array.isArray(domainEntries)
    ? domainEntries
        .map((value) => {
          if (typeof value !== "string") return "";
          const normalized = value.trim().toLowerCase();
          return normalized.startsWith("@") ? normalized.slice(1) : normalized;
        })
        .filter(Boolean)
    : [];

  return {
    emails: new Set(allowedEmails),
    domains: new Set(allowedDomains),
  };
}

exports.allowlistBeforeCreate = beforeUserCreated(async (event) => {
  const email = event.data?.email?.trim();
  if (!email) {
    throw new HttpsError("invalid-argument", "An email address is required.");
  }

  const normalizedEmail = email.toLowerCase();
  const domain = normalizedEmail.split("@")[1] || "";

  const {emails: allowedEmails, domains: allowedDomains} = await loadAllowlists();

  if (allowedEmails.has(normalizedEmail)) {
    return;
  }

  if (domain && allowedDomains.has(domain)) {
    return;
  }

  throw new HttpsError("permission-denied", "Sign-ups are restricted.");
});
