## Installation

create and configure .env with help of .env.example

```sh
npm i
npm start
```

## Usage
Navigate to POST /api/subscribe with
```json
clientId: string,
topic: string
```

you can also unsubscribe with POST /api/unsubscribe with same body fields.

Listen to messages with long polling by navigating to POST /api/listen with
```json
clientId: string,
```

Send message to topic with POST /api/message with
```json
message: string,
topic: string,
```

your listen long polling request will fullfil now.