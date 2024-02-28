import {Router} from "express";

import ProductManagerDB from "../dao/ProductManagerDB.js";
import CartManagerDB from "../dao/CartManagerDB.js";

const viewsRouter = Router();

viewsRouter.get("/api/chat", (req,res)=>{
  res.render("chat", {})
});

viewsRouter.get('/products',async (req,res)=>{
  try {
    const prodManager = new ProductManagerDB();
    const resp = await prodManager.loadProducts(req.query);
    resp.payload.prevLink = resp.payload.hasPrevPage?`http://localhost:8080/products?page=${resp.payload.prevPage}&limit=${resp.payload.limit}`:"";
    resp.payload.nextLink = resp.payload.hasNextPage?`http://localhost:8080/products?page=${resp.payload.nextPage}&limit=${resp.payload.limit}`:"";
    resp.payload.isValid = (resp.payload.docs.length > 0);
    console.log(resp.payload);
    res.render("products",resp.payload)
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

viewsRouter.get('/carts/:cid',async (req,res)=>{
  try {
    const cartManager = new CartManagerDB();
    const resp = await cartManager.loadCart(req.params.cid);
    console.log(resp.payload[0]);
    res.render("cartList", resp.payload[0]);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

export default viewsRouter;