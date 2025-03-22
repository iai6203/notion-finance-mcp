import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import { getPaymentMethods } from "./helpers/database.helper.js"
import { paymentMethodFormatter } from "./formatters/database.formatter.js"

const server = new McpServer({
  name: "notion",
  version: "1.0.0",
})

server.tool(
  "get-payment-methods",
  "결제 수단 목록 조회",
  async () => {
    try {
      const paymentMethods = await getPaymentMethods()
      const formatted = paymentMethods.results.map(paymentMethodFormatter)

      return {
        content: [
          { type: "text", text: formatted.join("\n") },
        ],
      }
    }
    catch (error) {
      return {
        content: [
          { type: "text", text: "결제 수단 목록 조회 오류" },
        ],
      }
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Notion MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
