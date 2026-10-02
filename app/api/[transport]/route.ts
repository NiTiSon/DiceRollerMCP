import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "random_number",
      "Pick a random integer between min and max (inclusive)",
      { min: z.number().int(), max: z.number().int() },
      async ({ min, max }) => {
        const n = Math.floor(Math.random() * (max - min + 1)) + min;
        return { content: [{ type: "text", text: String(n) }] };
      }
    );
  },
  {},
  { basePath: "/api" }
);

export { handler as GET, handler as POST };