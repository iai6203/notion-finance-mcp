import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const USER_AGENT = "notion-app/1.0"

const server = new McpServer({
  name: "notion",
  version: "1.0.0",
})

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Notion MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
