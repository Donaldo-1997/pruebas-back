const { Router } = require("express");
const { Product, Size } = require("../db");
const {Op} = require("sequelize")
const router = Router();

// router.post("/", async(req, res)=>{
//     const {idAll} = req.body
//     let productId= [];
//     let sizeId = [];
//     let productArray = [];

//    for(let i = 0; i < idAll.length; i++){
//     productId.push(idAll[i].idP) && sizeId.push(idAll[i].idS);    
//    }

//    for(let i = 0; i < productId.length; i++){
//     const productCopy = await Product.findOne({ where: { id: productId[i] }, include: Size });
//     productArray.push(productCopy);
//       //for(let i = 0; i < sizeArray.length; i++){            
//         const stockrest = (productArray[i].sizes.find(s=> s.id === sizeId[i]).stock -1); 
//         console.log(stockrest);        
//        } 
//     });    
    

    //PUT Stock
    router.put("/", async (req, res) => {
      const { idAll } = req.body;

      let productId = [];
      let sizeId = [];
      let productArray = [];
      let productCopy = [];

      for (let i = 0; i < idAll.length; i++) {
        productId.push(idAll[i].idP) && sizeId.push(idAll[i].idS);
      }

      for (let i = 0; i < productId.length; i++) {
        productCopy = await Product.findOne({
          where: { id: productId[i] },
          include: Size,
        });
        productCopy.sizes.find((s) => s.id === sizeId[i]).stock =
          productCopy.sizes.find((s) => s.id === sizeId[i]).stock - 1;

        await productCopy.save();
        productArray.push(productCopy);
        console.log(productArray);
      }
      res.status(200).json(productArray);
    });
        






        // const productsCopy = await Product.findOne({ where: { id: idP }, include: Size });
        
        // const prod = productsCopy.sizes.find(s => s.id === idS);
        // const prod1 = (prod.stock -1);
        // console.log(prod1); 
       
     
    
       
    
        
        
        
        
        // console.log(productsCopy, "productsCopy")
        // const result = productsCopy.map(p=>p.sizes)
        // console.log(result, "result")
        
        //     for (let i = 0; i < result.sizes.length; i++) {
        //       if(result.sizes[i].id===mapIdS) console.log(result.sizes[i].id===mapIdS)
        //     }
        
        // console.log(reussizes, "sizes")
        



module.exports= router