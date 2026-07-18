const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

async function run() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return;
  }

  const supabase = createClient(supabaseUrl, anonKey);

  const contactTableVariations = [
    "Contact Details", "Contact_Details", "ContactDetails", "contact_details",
    "contact_detail", "contacts", "Contact", "contact", "messages", "message"
  ];

  const quoteTableVariations = [
    "Request Quote", "Request_Quote", "RequestQuote", "request_quote",
    "request_quotes", "quotes", "quote", "rfqs", "rfq"
  ];

  const subscriberTableVariations = [
    "Subscribers Catalog", "Subscribers_Catalog", "SubscribersCatalog", "subscribers_catalog",
    "subscribers", "subscriber", "newsletter", "newsletters", "newsletter_subscribers"
  ];

  const allVariations = [...new Set([...contactTableVariations, ...quoteTableVariations, ...subscriberTableVariations])];

  console.log("Probing tables...");
  const existingTables = [];
  const errors = [];

  for (const table of allVariations) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .limit(1);

      if (error) {
        if (error.message && error.message.includes("Could not find the table")) {
          // Table does not exist
          continue;
        }
        // Table exists but returned another error (e.g., policy, auth, column issue)
        existingTables.push({ table, error: error.message, code: error.code });
      } else {
        existingTables.push({ table, exists: true, rowsCount: data ? data.length : 0 });
      }
    } catch (err) {
      errors.push({ table, exception: err.message });
    }
  }

  console.log("\n--- Active/Existing Tables Found ---");
  console.log(JSON.stringify(existingTables, null, 2));

  if (errors.length > 0) {
    console.log("\n--- Exceptions ---");
    console.log(errors);
  }
}

run();
