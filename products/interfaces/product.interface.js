"use strict";
exports.__esModule = true;
exports.g_product = void 0;
// ladder co
function g_product(id, name, price, num_availible, restock_date, img, description) {
    if (name === void 0) { name = 'lorem'; }
    if (price === void 0) { price = 6.99; }
    if (num_availible === void 0) { num_availible = 100; }
    if (restock_date === void 0) { restock_date = new Date; }
    if (img === void 0) { img = ''; }
    if (description === void 0) { description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam '; }
    var p = price.toFixed(2).split('.');
    return {
        id: id,
        name: name,
        price_d: Number(p[0]),
        price_c: p[1],
        avalibility: num_availible,
        restock_date: restock_date,
        img: img,
        description: description
    };
}
exports.g_product = g_product;
