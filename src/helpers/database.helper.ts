import { Client } from "@notionhq/client"

async function getPaymentMethods() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_PAYMENT_DATABASE_ID as string

  return notion.databases.query({
    database_id: databaseId,
  })
}

async function createPaymentMethod({ name }: { name: string }) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_PAYMENT_DATABASE_ID as string

  return notion.pages.create({
    "parent": {
      "type": "database_id",
      "database_id": databaseId
    },
    "properties": {
      "미사용": {
        "title": [
          {
            "text": {
              "content": "",
            }
          }
        ]
      },
      "이름": {
        "rich_text": [
          {
            "text": {
              "content": name,
            }
          }
        ]
      },
    },
  })
}

export {
  getPaymentMethods,
  createPaymentMethod,
}
