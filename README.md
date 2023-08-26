
# Project Title

A brief description of what this project does and who it's for


## API Reference

### Auth Service
#### User Register
```http
  POST /auth/register
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `ObjectId` | Default Id |
| `name` | `string` | **Required**. user name |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password length is more than 8 |

#### User Login
```http
  POST /auth/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password length is more than 8 |

### Flashcard Service
#### Get flashcard by cardId

```http
  GET /flashcard/:cardId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cardId` | `string` | **Required**.  |

#### Edit flashcard

```http
  POST /flashcard/
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `flashcard` | `Flashcard` | **Required**.  |

#### Delete flashcard

```http
  DELETE /flashcard/:cardId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cardId` | `Flashcard` | **Required**.  |

#### Create flashcard

```http
  CREATE /flashcard/create
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `flashcard` | `Flashcard` | **Required**.  |






## Authors

- [@dragon](https://github.com/bigdDagon)

