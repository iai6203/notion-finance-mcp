import { Client } from "@notionhq/client"

async function getPaymentMethods() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_PAYMENT_DATABASE_ID as string

  return notion.databases.query({
    database_id: databaseId,
  })
}

export {
  getPaymentMethods,
}
