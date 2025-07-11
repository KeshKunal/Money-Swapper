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

