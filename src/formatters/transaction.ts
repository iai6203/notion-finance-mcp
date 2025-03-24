// @ts-ignore

export function transactionFormatter(data) {
  return [
    `ID: ${data.id}`,
    `거래처: ${data.properties["거래처"].title[0].text.content}`,
    `날짜: ${data.properties["날짜"].date.start}`,
    `분류: ${data.properties["분류"].select.name}`,
    `카테고리: ${data.properties["카테고리"].relation[0].id}`,
    `결제 수단: ${data.properties["결제 수단"].relation[0].id}`,
    `금액: ${data.properties["금액"].number}`,
    `메모: ${data.properties["메모"].rich_text[0].text.content}`,
    `생성 일시: ${data.created_time}`,
  ].join("\n")
}
