#!/usr/bin/env node
// Cash Swapper - Built by Keshav Kunal to swap currencies across borders.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Cash Swapper",
  version: "1.0.0"
});

const inputSchema = {
amount: z.number().optional().describe("Cash to swap—skip it for just the rate!"),
from: z.string().describe("Starting currency (💡 USD for my dollars)"),
to: z.string().describe("Target currency (💡 JPY for some yen)")
};

async function convertCurrency({ amount, from, to }) {
  const apiBase = "https://open.er-api.com/v6";
  let url = amount
    ? `${apiBase}/pair/${from.toUpperCase()}/${to.toUpperCase()}/${amount}`
    : `${apiBase}/latest/${from.toUpperCase()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Oops, API call failed: ${response.status}`);
  const data = await response.json();

  if (data.result !== "success") throw new Error(`API says: ${data.error_type}`);

  if (amount) {
    return {
      content: [{ type: "text", text: `${amount} ${from} becomes ${data.conversion_result} ${to}!` }]
    };
  } else {
    const rate = data.rates[to.toUpperCase()];
    if (!rate) throw new Error(`No rate for ${to}!`);
    return {
      content: [{ type: "text", text: `1 ${from} = ${rate} ${to}` }]
    };
  }
}

server.registerTool("currencyConverter", {
  title: "Currency Converter",
  description: "Swap cash or check rates!",
  inputSchema,
}, convertCurrency);

const transport = new StdioServerTransport();
await server.connect(transport);