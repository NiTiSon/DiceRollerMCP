# Dice Roller MCP Server
A tiny Model Context Protocol server that picks random numbers and rolls dice.
Built with Next.js.

## Usage
The server uses the Streamable HTTP transport, so any MCP client that supports remote servers can connect to it.

### Claude
1. Open Settings → Connectors.
1. Choose Add custom connector.
1. Enter the URL: `https://dice-roller-mcp.vercel.app/api/mcp`
1. Save, then ask Claude something like "Roll 3d6" or "Pick a random number between 1 and 100."

### Opencode
Launch this line in terminal to add Dice Roller globally.
```bash
opencode mcp add dice-roller --global --url https://dice-roller-mcp.vercel.app/api/mcp
```

Launch this line in terminal to add Dice Roller in *current project* specifically.
```bash
opencode mcp add dice-roller --global --url https://dice-roller-mcp.vercel.app/api/mcp
```

### Other AI clients
You can find MCP install instructions in your AI client documentation.
