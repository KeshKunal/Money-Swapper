#!/usr/bin/env node
// money_swapper - Built to swap cash across borders!


import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "kk-money-swapper",
  version: "1.0.0"
});

const inputSchema = {
amount: z.coerce.number().optional().describe("Cash to swap—skip it for just the rate!"),
from: z.string().describe("Starting currency (💡 USD for my dollars)"),
to: z.string().describe("Target currency (💡 JPY for some yen)")
};

async function convertCurrency({ amount, from, to }) {
  const apiKey = "a6665a5e7175d7a6c5c5891c";
  const apiBase = "https://v6.exchangerate-api.com/v6";
  let url;

  if (amount) {
    url = `${apiBase}/${apiKey}/pair/${from.toUpperCase()}/${to.toUpperCase()}/${amount}`;
  } else {
    url = `${apiBase}/${apiKey}/latest/${from.toUpperCase()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }
  const data = await response.json();

  if (data.result !== "success") {
    throw new Error(`API error: ${data["error-type"]}`);
  }

  if (amount) {
    return {
      content: [{ type: "text", text: `${amount} ${from} is ${data.conversion_result} ${to}` }]
    };
  } else {
    const rate = data.conversion_rates[to.toUpperCase()];
    if (!rate) {
      throw new Error(`No rate found for ${to}`);
    }
    return {
      content: [{ type: "text", text: `1 ${from} = ${rate} ${to}` }]
    };
  }
}

server.registerTool("currencyConverter", {
  title: "Currency Converter",
  description: "Convert currencies or check exchange rates",
  inputSchema,
}, convertCurrency);

const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Currency Converter is ready to go!");
