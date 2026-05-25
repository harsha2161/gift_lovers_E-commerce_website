import Order from "./order.model.js";
import Product from "../products/product.model.js";
import AppError from "../../shared/errors/AppError.js";


export async function CreateOrder(orderInfo, orderUser) {
   
    const customerName = orderUser.firstName + " " + orderUser.lastName;

    let newOrderId = "ORD00001";
    const lastOrder = await Order.find().sort({date : -1}).limit(1);

    if(lastOrder.length > 0){
        newOrderId = lastOrder[0]?.orderId ? "ORD" + String(parseInt(lastOrder[0].orderId.replace("ORD", "")) + 1).padStart(5, '0') : "ORD00001";
     
    }

    let total = 0;
    let lableTotal = 0;
    const formattedProducts = [];

    for (let i = 0; i < orderInfo.orderProducts.length; i++) {

        const currentProduct = orderInfo.orderProducts[i];
        const currentQuantity = currentProduct.quantity;

        const item = await Product.findOne({ productId: currentProduct.productId });

        if (!item) {
            throw new AppError( `Product with ProductId ${currentProduct.productId} is not found`, 404)
        }

        if (item.isAvailable === false || item.stock <= 0) {
            throw new AppError( `Product ${item.productName || currentProduct.productId} is out of stock`, 400)
        }

       
        formattedProducts.push({
            productInfo: {
                productId: item.productId,
                name: item.productName,
                altName: item.altName,
                discription: item.description,
                lablePrice: item.lablePrice,
                price: item.price, 
                images: item.img[0],
            },
            quantity: currentQuantity
        });

        total += item.lablePrice * currentQuantity;
        lableTotal += item.lablePrice * currentQuantity;
    }

    const newOrder = new Order({
        orderId: newOrderId,
        email: orderUser.email,
        name: customerName,
        address: orderInfo.address,
        total: total,
        lableTotal: lableTotal,
        phone: orderInfo.phone,
        orderProducts: formattedProducts,
    });

    return await newOrder.save()
}

export  async function GetAllOrder(){
    return await Order.find()
}
