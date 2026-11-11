const express=require("express");const fs=require("fs");
const app=express();app.use(express.json());app.use(express.static("public"));
const FILE="data/postos.json";app.get("/api/postos",(req,res)=>res.json(JSON.parse(fs.readFileSync(FILE))));app.post("/api/postos/:id",(req,res)=>{let p=JSON.parse(fs.readFileSync(FILE));
    const id=Number(req.params.id);p=p.map(x=>x.id===id?{...x,concluido:req.body.concluido}:x);fs.writeFileSync(FILE,JSON.stringify(p,null,2)
)
;res.json({ok:true});});
    const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:3000${PORT}`);
});