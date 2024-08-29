import { Elysia } from "elysia";

const app = new Elysia()
.get("/", () => "Hello Elysia")
.state('version', 1)
.decorate('getDate', () =>  Date.now())
.get("/post/:id", ({params: {id}}) => {return {id:id, title: 'Learning Elysia'}})

// to get the data we destructured the body and returned it
.post('/post', ({body, set}) => {
  set.status = 201
  return body
})

// /track/2 - will return Track route
// /track/2/hello - will also return Track route as response
.get('/track/*', () => {return 'Track route'})
.get('/tracks', ({store, getDate}) => {
  console.log("\nStore: ",store);
  console.log("\nDate: ", getDate());
  
  return new Response(JSON.stringify({
    "tracks": [
      'Dancing Feat',
      'Sam I',
      'Animals',
    ]
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

// group routes in elysia
app.group('/user', app => app
  .get('', () => 'User route')
  .post('', () => 'User Post route')
  .put('/:id', ({params}) => `Update for user with id: ${params.id}`)
  .delete('/:id', ({params}) => `Delete for user with id: ${params.id}`)
)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
