# Notion MCP

## 기능

- 결제 수단 목록 조회
- 결제 수단 생성

## 시작하기

### Notion API Key

[Notion API Key](https://developers.notion.com/)를 생성해주세요.

### Notion 템플릿 구성

[Notion 초기 템플릿](https://www.notion.so/dev-js/1be9e25bddc380fe8d56ffac26a08965)을 개인 페이지에 복사해주세요.

### Claude Desktop & Notion MCP 사용법

우선, Notion MCP를 `claude_desktop_config.json` 파일에 아래와 같이 추가합니다.

```json
{
  "mcpServers": {
    "notion": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "NOTION_API_KEY",
        "-e",
        "NOTION_PAYMENT_METHOD_DATABASE_ID",
        "mcp/notion"
      ],
      "env": {
        "NOTION_API_KEY": "<YOUR_NOTION_API_KEY>",
        "NOTION_PAYMENT_METHOD_DATABASE_ID": "<YOUR_NOTION_PAYMENT_METHOD_DATABASE_ID>"
      }
    }
  }
}
```

### Docker 이미지 빌드

Docker 빌드:

```shell
docker build -t mcp/notion -f Dockerfile .
```
