//we're importing the paintPrice function from the paint.js file
const {paintPrice} = require ('./paint.js');

//testing paintPrice function
describe('paintPrice', function() {
    //essentially we're inputting the various options for paint and getting the price as output. 
    //It has toBe $X. We're doing this for all paint colors and prices
  it('should return the correct price for regular paint', function() {
    expect(paintPrice('regular', 'white')).toBe(20);
    expect(paintPrice('regular', 'black')).toBe(25);
    expect(paintPrice('regular', 'blue')).toBe(30);
    expect(paintPrice('regular', 'red')).toBe(35);
    expect(paintPrice('regular', 'green')).toBe(40);
  });

  it('should return the correct price for premium paint', function() {
    expect(paintPrice('premium', 'white')).toBe(25);
    expect(paintPrice('premium', 'black')).toBe(30);
    expect(paintPrice('premium', 'blue')).toBe(35);
    expect(paintPrice('premium', 'red')).toBe(40);
    expect(paintPrice('premium', 'green')).toBe(45);
  });

  it('should return undefined for invalid paint type', function() {
    expect(paintPrice('luxury', 'white')).toBeUndefined();
  });

  it('should return undefined for invalid color', function() {
    expect(paintPrice('regular', 'purple')).toBeUndefined();
  });
});

