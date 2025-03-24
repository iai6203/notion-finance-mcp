import { Client } from "@notionhq/client"

async function createTransaction({
  vendor,
  date,
  type,
  categoryId,
  paymentMethodId,
  price,
  memo,
}: {
  vendor: string
  date: string
  type: "수입" | "지출" | "이체"
  categoryId: string
  paymentMethodId: string
  price: number
  memo: string
}) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_TRANSACTION_DATABASE_ID as string

  return notion.pages.create({
    "parent": {
      "type": "database_id",
      "database_id": databaseId,
    },
    "properties": {
      "거래처": {
        "title": [
          { "text": { content: vendor } },
        ],
      },
      "날짜": {
        "date": {
          "start": date,
        },
      },
      "분류": {
        "select": {
          "name": type,
        },
      },
      "카테고리": {
        "relation": [
          { id: categoryId },
        ],
      },
      "결제 수단": {
        "relation": [
          { id: paymentMethodId },
        ],
      },
      "금액": {
        "number": price,
      },
      "메모": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": memo,
              "link": null,
            },
          },
        ],
      },
      "삭제": {
        "checkbox": false,
      },
    },
  })
}

export {
  createTransaction,
}
