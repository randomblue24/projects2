
const {paintPrice} = require ('./paint.js');


test('pricePrice: calculate correct paint amnt, price', () => {
    expect(paintAmount(20, 250)).toEqual({ total_price: 60, total_liters: 3 });
    expect(paintAmount(25, 100)).toEqual({ total_price: 25, total_liters: 1 });
    expect(paintAmount(30, 50)).toEqual({ total_price: 30, total_liters: 1 });
});

test('should handle edge case where area is less than 100 square feet', () => {
    expect(paintAmount(35, 99)).toEqual({ total_price: 35, total_liters: 1 });
});