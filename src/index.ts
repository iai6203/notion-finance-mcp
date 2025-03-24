import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

import { getPaymentMethods, createPaymentMethod } from "./helpers/payment-method.js"
import { getCategories, createCategory } from "./helpers/category.js"
import { createTransaction } from "./helpers/transaction.js"
import { paymentMethodFormatter } from "./formatters/payment-method.js"
import { transactionFormatter } from "./formatters/transaction.js"
import { categoryFormatter } from "./formatters/category.js"

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
  "get-categories",
  "카테고리 목록 조회",
  async () => {
    try {
      const categories = await getCategories()
      const formatted = categories.results.map(categoryFormatter)

      return {
        content: [
          { type: "text", text: formatted.join("\n") },
        ],
      }
    }
    catch (error) {
      return {
        content: [
          { type: "text", text: "카테고리 목록 조회 오류" },
        ],
      }
    }
  },
)

server.tool(
  "create-category",
  "카테고리 생성 (생성 전 사용자에게 다시 한번 확인)",
  {
    name: z.string().min(1).describe("카테고리명"),
  },
  async ({ name }) => {
    try {
      const category = await createCategory({ name })
      const formatted = paymentMethodFormatter(category)

      return {
        content: [
          { type: "text", text: formatted },
        ],
      }
    }
    catch (error) {
      return {
        content: [
          { type: "text", text: "카테고리 생성 오류" },
        ],
      }
    }
  },
)

server.tool(
  "create-transaction",
  "결제 내역 생성 (생성 전 사용자에게 다시 한번 확인)",
  {
    vendor: z.string().min(1).describe("거래처"),
    date: z.string().min(1).describe("날짜 (ISO)"),
    type: z.enum(["수입", "지출", "이체"]).describe("타입 (수입, 지출, 이체)"),
    categoryId: z.string().min(1).describe("카테고리 ID"),
    paymentMethodId: z.string().min(1).describe("결제 수단 ID"),
    price: z.number().describe("가격"),
    memo: z.string().describe("메모"),
  },
  async (data) => {
    try {
      const transaction = await createTransaction(data)
      const formatted = transactionFormatter(transaction)

      return {
        content: [
          { type: "text", text: formatted },
        ],
      }
    }
    catch (error) {
      return {
        content: [
          { type: "text", text: "결제 내역 생성 오류" },
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
