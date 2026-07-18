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

  console.log("--- Fetching 'Contact Details' ---");
  const { data: contactData, error: contactError } = await supabase
    .from("Contact Details")
    .select("*")
    .limit(5);
  if (contactError) console.error("Contact Error:", contactError.message);
  else console.log("Contacts:", contactData);

  console.log("\n--- Fetching 'Request Quote' ---");
  const { data: quoteData, error: quoteError } = await supabase
    .from("Request Quote")
    .select("*")
    .limit(5);
  if (quoteError) console.error("Quote Error:", quoteError.message);
  else console.log("Quotes:", quoteData);

  console.log("\n--- Fetching 'Subscribers Catalog' ---");
  const { data: subData, error: subError } = await supabase
    .from("Subscribers Catalog")
    .select("*")
    .limit(5);
  if (subError) console.error("Subscriber Error:", subError.message);
  else console.log("Subscribers:", subData);
}

run();
