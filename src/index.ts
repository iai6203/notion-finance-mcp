import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

import { getPaymentMethods, createPaymentMethod, deletePaymentMethod } from "./helpers/database.helper.js"
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

server.tool(
  "create-payment-method",
  "결제 수단 생성 (생성 전 사용자에게 다시 한번 확인)",
  {
    name: z.string().min(1).describe("결제 수단명"),
  },
  async ({ name }) => {
    try {
      const paymentMethod = await createPaymentMethod({ name })
      const formatted = paymentMethodFormatter(paymentMethod)

      return {
        content: [
          { type: "text", text: formatted },
        ],
      }
    }
    catch (error) {
      return {
        content: [
          { type: "text", text: "결제 수단 생성 오류" },
        ],
      }
    }
  },
)

server.tool(
  "delete-payment-method",
  "결제 수단 삭제 (삭제 전 사용자에게 다시 한번 확인)",
  {
    pageId: z.string().min(1).describe("결제 수단 ID")
  },
  async ({ pageId }) => {
    try {
      await deletePaymentMethod({ pageId })

      return {
        content: [
          { type: "text", text: "결제 수단이 삭제되었습니다." },
        ],
      }
    }
    catch (error) {
      return {
        content: [
          { type: "text", text: "결제 수단 삭제 오류" },
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
