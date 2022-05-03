export interface product
{
  id:number
  name:string,
  price_d:number,
  price_c:string
  avalibility:number | string,
  restock_date:Date,
  img:string
  description:string
}

// ladder co
export function g_product(id:number,name:string = 'lorem',price:number = 6.99,num_availible:number = 100,restock_date:Date = new Date, img:string = '',description:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam '):product
{
  let p = price.toFixed(2).split('.')
  return{
    id:id,
    name:name,
    price_d:Number(p[0]),
    price_c:p[1],
    avalibility:num_availible,
    restock_date:restock_date,
    img:img,
    description:description
  }
}