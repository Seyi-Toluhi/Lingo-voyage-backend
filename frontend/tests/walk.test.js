const ten_mins_walk = require('../Walk')

//function returns true if all conditions are met
describe('correct array for 10 mins walk', () => {
    test('correct array for 10 mins walk', () => {
    const current_walk = ['w', 's', 'e', 'e', 'n', 'n', 'e', 's', 'w', 'w']
    const result = ten_mins_walk(current_walk)
    expect(result).toBe(true)
  }) 
    test('wrong array for 10 mins walk', () => {
    const current_walk = ['w', 's', 'e', 's', 's', 'e', 's', 'w', 'n', 'n']
    const result = ten_mins_walk(current_walk)
    expect(result).toBe(false)
  }) 
});