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

  console.log("--- Testing 'Contact Details' Insert ---");
  const testContact = {
    Representative_Name: "Test Name",
    Email_Address: "test@example.com",
    Company_Name: "Test Company",
    Phone_Number: "123456",
    Location_Address: "Test Address",
    State: "Test State",
    Country: "Test Country",
    Subject: "Test Subject",
    Description: "Test Description"
  };

  const contactRes = await supabase
    .from("Contact Details")
    .insert([testContact]);
  console.log("Contact Details Insert Result:", JSON.stringify(contactRes, null, 2));

  console.log("\n--- Testing 'Request Quote' Insert ---");
  const testQuote = {
    Representative_Name: "Test Name",
    Email_Address: "test@example.com",
    Company_Name: "Test Company",
    Phone_Number: "123456",
    Location_Address: "Test Address",
    Product_Name: "Test Product",
    SKU: "Test SKU",
    Description: "Test Description"
  };

  const quoteRes = await supabase
    .from("Request Quote")
    .insert([testQuote]);
  console.log("Request Quote Insert Result:", JSON.stringify(quoteRes, null, 2));

  console.log("\n--- Testing 'Subscribers Catalog' Insert ---");
  const subscriberRes = await supabase
    .from("Subscribers Catalog")
    .insert([{ Email: "test-sub@example.com" }]);
  console.log("Subscribers Catalog Insert Result:", JSON.stringify(subscriberRes, null, 2));
}

run();
