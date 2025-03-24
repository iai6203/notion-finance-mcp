// @ts-ignore

export function categoryFormatter(data) {
  return [
    `ID: ${data.id}`,
    `이름: ${data.properties["이름"].title[0].text.content}`,
    `생성 일시: ${data.created_time}`,
  ].join("\n")
}
