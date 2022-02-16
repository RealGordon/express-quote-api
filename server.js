const express = require('express');
const app = express();
//const logger=require('morgan');

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;
//app.use(logger())
app.use(express.static('public'));
/*
Your API should have a GET /api/quotes/random route. This route should send back a random quote from the quotes data.
 The response body should have the following shape:

 {
  //  quote: { quote object }
  }
*/  


app.get("/api/quotes/random",(req,res)=>{
res.send({quote:getRandomElement(quotes)})
})

/*
Your API should have a GET /api/quotes route.
 This route should return all quotes from the data if the request has no query params.
*/
app.get("/api/quotes",(req,res)=>{
    const query=req.query;
    if(query && ("person" in query)){
        const person=query.person;
     res.send({quotes:quotes.filter(quote=> person===quote.person)})
     return;
    }
res.send({quotes})
})


/*
Your API should have a POST /api/quotes route for adding new quotes to the data.
 New quotes will be passed in a query string with two properties: 
 quote with the quote text itself, 
 and person with the person who is credited with saying the quote.

This route should verify that both properties exist in the request query string and
 send a 400 response if it does not. 
 If all is well, this route handler should add the new quote object to the data array 
 and send back a response with the following shape:

{
  quote: { new quote object }
}

*/
app.post("/api/quotes",(req,res)=>{
const query=req.query;
if (query && query.person && query.quote){
        const quote={person:query.person,quote:query.quote}
    quotes.push(quote)
    res.send({quote})
}
else res.status(400).send("invalid quote")
})
/*extra:
Add a PUT route for updating quotes in the data.
 This might require adding some sort of unique ID 
 for each quote in the array in data.js.
 */
app.put('/api/quotes/:id',(req,res)=>{
    const qid =req.params.id;
 
    const quote= quotes.find(({id})=>id===qid);
    if(quote){
        quote.quote=req.body.quote;
        res.send(quote)
    }
    else res.sendStatus(404);
    
});
/* EXTRA:
Add a DELETE route for deleting quotes from the data array.
*/
app.delete('/api/quotes/:id',(req,res)=>{
    const qid =req.params.id;
  
        const index= quotes.findIndex(({id})=>id===qid);
        if(index!==-1){
            quotes.splice(index,1)
            res.sendStatus(204)
            return;
        }
        res.sendStatus(404);
});
/*EXTRA: TODO:
Add another resource to your API in addition to quotes, 
such as biographical blurbs 
(you’ll need to find your own data for this new resource).
 Use Express Routers to keep your code simple and separated into different files
  for each router.
*/
app.listen(PORT,()=>{
    console.log(`the server has started on port: ${PORT}`)
})