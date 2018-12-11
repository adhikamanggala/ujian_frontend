//destructuring

var objKucing = { kurcaci: 'Hello', bertasbih: { nyingnyong: 'Teletubies} }

console.log(objKucing.bertasbih.nyingnyong)

var { nyingnyong } = objKucing.bertasbih;

console.log(nyingnyong);