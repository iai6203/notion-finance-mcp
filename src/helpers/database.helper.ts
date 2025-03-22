import { Client } from "@notionhq/client"

async function getPaymentMethods() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_PAYMENT_DATABASE_ID as string

  return notion.databases.query({
    database_id: databaseId,
    "filter": {
      "property": "삭제",
      "checkbox": {
        "equals": false,
      },
    },
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
      "삭제": {
        checkbox: false,
      },
    },
  })
}

async function deletePaymentMethod({ pageId }: { pageId: string }) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  return await notion.pages.update({
    page_id: pageId,
    properties: {
      "삭제": {
        checkbox: true,
      },
    },
  })
}

async function createTransaction({
  price,
  category,
  vendor,
  paymentMethodId,
  date,
  memo,
}: {
  price: number
  category: "수입" | "지출" | "이체"
  vendor: string
  paymentMethodId: string
  date: string
  memo: string
}) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_TRANSACTIONS_DATABASE_ID as string

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
      "금액": {
        "number": price,
      },
      "분류": {
        select: {
          name: category,
        },
      },
      "거래처": {
        rich_text: [
          {
            type: "text",
            text: {
              content: vendor,
              link: null,
            },
          },
        ],
      },
      "결제 수단": {
        "relation": [
          {
            "id": paymentMethodId,
          },
        ],
      },
      "날짜": {
        "date": {
          "start": date,
        },
      },
      "메모": {
        rich_text: [
          {
            type: "text",
            text: {
              content: memo,
              link: null,
            },
          },
        ],
      },
    },
  })
}

export {
  getPaymentMethods,
  createPaymentMethod,
  deletePaymentMethod,

  createTransaction,
}
