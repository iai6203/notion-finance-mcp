import { Client } from "@notionhq/client"

async function createPaymentMethod({ name }: { name: string }) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_PAYMENT_METHOD_DATABASE_ID as string

  return notion.pages.create({
    "parent": {
      "type": "database_id",
      "database_id": databaseId,
    },
    "properties": {
      "이름": {
        "title": [
          { "text": { content: name } },
        ],
      },
    },
  })
}

async function getPaymentMethods() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_PAYMENT_METHOD_DATABASE_ID as string

  return notion.databases.query({
    "database_id": databaseId,
  })
}

export {
  createPaymentMethod,
  getPaymentMethods,
}
