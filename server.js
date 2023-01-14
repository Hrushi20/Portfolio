const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const crypto = require('crypto');

// Import .env variables
dotenv.config();

const secret = process.env.SECRET_TOKEN;
const PORT = 8082;

const app = express();


// Saves a valid raw JSON body to req.rawBody
// Credits to https://stackoverflow.com/a/35651853/90674
app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  },
}));

app.use(express.static('public'));


app.post("/",verifyPostData,(req,res,next)=>{
	res.status(200).send("Request body was signed");
	
});

app.listen(PORT, ()=>{
	console.log("Server running on ",PORT);
})



const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'

function verifyPostData(req, res, next) {
  if (!req.rawBody) {
    return next('Request body empty')
  }

  const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
  const hmac = crypto.createHmac(sigHashAlg, secret)
  const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8')
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
  }

  return next()
}
