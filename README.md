# Keshav Kunal’s Currency Converter
Built to swap cash across borders!

A simple MCP server that allows AI clients to convert currencies or fetch exchange rates using the [ExchangeRate-API](https://www.exchangerate-api.com/).

## Description
This tool enables AI assistants to:
- Convert an amount from one currency to another (e.g., "Convert 100 USD to EUR").
- Get the current exchange rate between two currencies (e.g., "What's the exchange rate from USD to EUR?").


## Installation
Install the tool via npm:
npm install -g kk-money-swapper

## MCP Configuration
Set up my Money Swapper with your AI client to start swapping cash! 
{
  "name": "kk-money-swapper",
  "version": "1.0.1",
  "description": "A cool tool I built to convert currencies!",
  "author": "Keshav Kunal",
  "main": "index.js",
  "bin": {
    "kk-money-swapper": "index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "1.15.1",
    "zod": "3.25.76"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/KeshKunal/Money-Swapper"
  },
  "keywords": ["currency", "converter", "keshav", "money_swapper", "mcp"]
}