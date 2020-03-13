https://project-kanban-d2173.firebaseapp.com/

# Endpoint:
## [http://localhost:3000](http://localhost:3000)

# POST /register
## Endpoint
> /register

## Request body:
```
{
    email: string,
    password: string
}
```
All req.body is **required**

## Response
Status 201
```
{
    id: 1,
    email: "test@mail.com",
    password: "hashedPassword",
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# POST /login
## Endpoint
> /login

## Request body:
```
{
    email: string,
    password: string
}
```
All req.body is **required**

## Response
Status 200
```
{
   token: "YOUR_TOKEN"
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# GET /tasks
## Endpoint
> /tasks

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 200
```
[
    {
        id: 1,
        title: "Learn how to make kanban",
        description: "Explore how to make kanban using vue.js",
        category: "Back-Log"
        createdAt: 2020-03-03T15:01:27.405Z,
        updatedAt: 2020-03-03T15:01:27.405Z
    }
]
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 500
```
{ 
   status: 500,
   msg: "Internal Server Error"
}
```

# POST /tasks
## Endpoint
> /tasks

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```

## Request body:
```
{
    title: string,
    description: string,
    category: string
}
```
## Response
Status 201
```
{
    id: 1,
    title: "Learn how to make kanban",
    description: "Explore how to make kanban using vue.js",
    category: "Back-Log"
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# GET /tasks/:id
## Endpoint
> /tasks/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    id: 1,
    title: "Learn how to make kanban",
    description: "Explore how to make kanban using vue.js",
    category: "Back-Log"
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
}
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 404
```
{
   status: 404,
   msg: "Error Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# DELETE /tasks/:id
## Endpoint
>/tasks/:id
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    msg: 'Berhasil'
}
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 404
```
{
   status: 404,
   msg: "Error Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# PUT /tasks/:id
## Endpoint
> /tasks/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Request body:
```
{
    title": string,
    description": string,
    category": boolean
}
```
## Response:
Status 200
```
{
    id: 1,
    title: "Learn how to make kanban",
    description: "Explore how to make kanban using vue.js",
    category: "Back-Log"
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 404
```
{
   status: 404,
   msg: "Error Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```
