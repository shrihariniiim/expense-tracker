// const operation=require("./operation.js");

// console.log(operation.add(1,2));
// console.log(operation.sub(3,7));
// console.log(operation.mul(6,8));


// const arr=[1,2,3];
// const disp=operation.display(arr);
// console.log(disp);

// const http=require('http')
// const server=http.createServer((req,res)=>{   
//     res.end("Hello World");
// })
// const PORT=8000
// server.listen(PORT,()=>{
//     console.log(`my server is running at http://localhost:${PORT}`)
// })





// const express=require("express")
// const app=express()
// const students=[
        
//     {id:1,name:"a"},
//     {id:2,name:"b"}

// ];


// app.get("/student",(req,res)=>{
//     res.json(students);
// });


// app.get("/singledata",(req,res)=>
//     {
//         const {id}=req.query;
//         if(id)
//         {
//             const result= students.find((item)=>item.id===Number(id))
//             res.json(result);
//         }
//         else{
//             res.json(students);
//         }
//     });
//app.get("/singledata/:id",(req,res)=>
    //     {
    //         const {id}=req.query;
    //         if(id)
    //         {
    //             const result= students.find((item)=>item.id===Number(id))
    //             res.json(result);
    //         }
    //         else{
    //             res.json(students);
    //         }
    //     });
    

    
    
// const PORT=8000
// app.listen(PORT,()=>
// {
//     console.log(`My server is running at http://localhost:${8000}`)
// })


const express=require("express");
const app=express()
app.use(express.json())
const mongoose=require("mongoose")
const{v4:uuidv4}=require("uuid")
const PORT=8000

const mongourl="mongodb://localhost:27017/Practice"

mongoose.connect(mongourl)
.then(()=>{
    console.log("Db connected")
app.listen(PORT,()=>{
    console.log("My server is running")


})
})

const expenseSchema=new mongoose.Schema({
    id:{type:String,requireed:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},

});
const expenseModel =mongoose.model("expense_tracker",expenseSchema)//collection-name,schema-name

app.get('/api/expenses',async(req,res)=>{
    const data=await expenseModel.find({})
    res.json(data)
})
app.get('/api/expensesById/:id',async(req,res)=>{
    const {id}=req.params;
    if(id)
    {
        const result=await expenseModel.findById(id);
        res.json(result);
    }
});
app.put('/api/expensesUpdate/:id',async(req,res)=>{
    const{id}=req.params;
    const{title,amount}=req.body;
    const updatedExpenses=await expenseModel.findOneAndUpdate(
        {
            id:id,
        },
        {
            title:title,
            amount:amount,
        }
    )
    res.status(200).json(updatedExpenses);
})

app.delete('/api/expensesdel/:id', async (req, res) => {
    const { id } = req.params;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    // Perform the delete operation
    const deletedExpense = await expenseModel.findByIdAndDelete(id);

    
    if (!deletedExpense) {
        return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully", deletedExpense });
});



app.post("/api/expenses",async(req,res)=>{
    const { title,amount}=req.body;
    const newExpense=new expenseModel({
        id:uuidv4(),
        title:title,
        amount:amount,
    });

    const savedExpenses=await newExpense.save();
    res.status(200).json(savedExpenses);

});
//hii