const fs = require("fs").promises;



class ProductManager {
    static ultId = 0;
    constructor(path){
        this.products =[];
        this.path = path;

    }
    async addProduct(nuevoObjeto) {
        let {title, description, price, thumbnail, code, stock} =
         nuevoObjeto;


        if(!title || !description || !price || !thumbnail || !code || !stock) {

            console.log("Por favor completa todos los campos");
            return;
        
        }
        if (this.products.some(item => item.code === code)){
            console.log ("El codigo no debe repetirse");
            return;
    

        }



        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct);
    await this.guardarArchivo(this.products)
     }
     getProduct() {
        console.log (this.products)
     }
     getProductById (id) {
        const product = this.products.find (item => item.id === id);
    if (!product){
        console.log ("Producto no encontrado")

    }
    else {
        console.log ("Producto encontrado", product);
    }
    return product;
}

async leerArchivo (){
    try {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse (respuesta);
        return arrayProductos;
    } catch (error) {
        console.log('Error al leer el archivo', error)
    }
}

async guardarArchivo (arrayProductos){
    try {
    await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))      
    } catch (error) {
        console.log('Error al leer el archivo', error)
    }

} 
    }

    const manager = new ProductManager ('productos.json');
    manager.getProduct()

const pc = {
    title: 'PC gamer',
    description: 'La mejor del mercado',
    price: 2000,
    thumbnail: 'enlace',
    code: '3231a',
    stock: 15
}
const grafica = {
    title: 'RTX 4060',
    description: 'La mejor del mercado',
    price: 3000,
    thumbnail: 'enlace',
    code: '3232a',
    stock: 15
}
const grafic = {
    title: 'RTa 4060',
    description: 'La mejor del mercado',
    price: 3000,
    thumbnail: 'enlace',
    code: '32323a',
    stock: 15
}
manager.addProduct(pc)
manager.addProduct(grafica)
manager.addProduct(grafic)
//     manager.getProduct();
//     manager.addProduct('PC Gamer','Juega a lo que quieras', 300,'image', 'abc15', 33);
//     manager.getProduct();
//     manager.addProduct('Mouse','Juega a lo que quieras', 300,'image', 'abc1225', 33);
//     manager.getProduct();

// manager.getProductById(2);

 