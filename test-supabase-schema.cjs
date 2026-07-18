const https = require("https");
const url = require("url");
require("dotenv").config();

async function run() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return;
  }

  const restUrl = `${supabaseUrl}/rest/v1/`;
  console.log("Fetching schema from:", restUrl);

  const parsedUrl = url.parse(restUrl);
  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || 443,
    path: parsedUrl.path,
    method: "GET",
    headers: {
      "apikey": anonKey,
      "Authorization": `Bearer ${anonKey}`
    }
  };

  const req = https.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      if (res.statusCode !== 200) {
        console.error("Error response:", res.statusCode, data);
        return;
      }

      try {
        const schema = JSON.parse(data);
        console.log("\n--- API Title ---");
        console.log(schema.info ? schema.info.title : "No title");

        console.log("\n--- Available Tables/Definitions ---");
        if (schema.definitions) {
          const tables = Object.keys(schema.definitions);
          console.log("Found tables:", tables);
          
          for (const table of tables) {
            console.log(`\nTable [${table}] columns:`);
            const properties = schema.definitions[table].properties;
            if (properties) {
              for (const col of Object.keys(properties)) {
                console.log(`  - ${col} (${properties[col].type})`);
              }
            }
          }
        } else {
          console.log("No definitions found in the OpenAPI schema.");
        }
      } catch (err) {
        console.error("Parsing exception:", err.message);
      }
    });
  });

  req.on("error", (e) => {
    console.error("Request error:", e);
  });

  req.end();
}

run();
