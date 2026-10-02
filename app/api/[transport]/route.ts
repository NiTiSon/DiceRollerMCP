import { createMcpHandler } from "mcp-handler";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { z } from "zod";

const handler = createMcpHandler((server) => {
  server.registerTool(
    "random_number",
    {
      description: "Pick a random integer between min and max (inclusive)",
      inputSchema: z.object({
        min: z.number().int(),
        max: z.number().int(),
      }),
    },
    async ({ min, max }) => {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      return { content: [{ type: "text", text: String(n) }] };
    }
  );

  server.registerTool(
    "roll",
    {
      description:
        "Roll dice from standard notation and return the rolls with their total. Supports basic dice (2d6, d20, 3d8+2), exploding/compounding (4d6!, 4d6!!), advantage/disadvantage and keep highest/lowest (2d20kh1, 2d20kl1, 4d6kh3), success counting (10d10>=7), critical hits (10d10*7), rerolls (4d6r<3), repeating groups (5d10dl1), fudge dice (2dF), percentile (d%) and math (2d6/2, max(3d8, 2))",
      inputSchema: z.object({
        notation: z
          .string()
          .describe("Dice notation to roll, e.g. '2d6+3', 'd20', '4d6kh3'"),
      }),
    },
    async ({ notation }) => {
      try {
        const roll = new DiceRoll(notation);
        return {
          content: [{ type: "text", text: roll.output }],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Invalid dice notation "${notation}": ${(error as Error).message}`,
            },
          ],
        };
      }
    }
  );
});

export { handler as GET, handler as POST };