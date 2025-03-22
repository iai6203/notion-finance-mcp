// @ts-ignore

export function paymentMethodFormatter(payment) {
  return [
    `ID: ${payment.id}`,
    `이름: ${payment.properties["이름"].rich_text[0].text.content}`,
    `생성 일시: ${payment.created_time}`,
  ].join("\n")
}
