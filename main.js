// const fs = require("fs").promises;



// class ProductManager {
//     static ultId = 0;
//     constructor(path) {
//         this.products = [];
//         this.path = path;

//     }
//     async addProduct(nuevoObjeto) {
//         let { title, description, price, thumbnail, code, stock } =
//             nuevoObjeto;


//         if (!title || !description || !price || !thumbnail || !code || !stock) {

//             console.log("Por favor completa todos los campos");
//             return;

//         }
//         if (this.products.some(item => item.code === code)) {
//             console.log("El codigo no debe repetirse");
//             return;


//         }



//         const newProduct = {
//             id: ++ProductManager.ultId,
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock
//         }

//         this.products.push(newProduct);
//         await this.guardarArchivo(this.products)
//     }
//     getProduct() {
//         console.log(this.products)
//     }
//     async getProductById(id) {
//         try {
//             const arrayProductos = await this.leerArchivo();
//             const product = arrayProductos.find(item => item.id === id);
//             if (!product) {
//                 console.log("Producto no encontrado")

//             }
//             else {
//                 console.log("Producto encontrado", product);
//                 return product;
//             }

//         } catch (error) {
//             console.log('Error al leer el archivo', error)
//         }

//     }

//     async leerArchivo() {
//         try {
//             const respuesta = await fs.readFile(this.path, "utf-8");
//             const arrayProductos = JSON.parse(respuesta);
//             return arrayProductos;
//         } catch (error) {
//             console.log('Error al leer el archivo', error)
//         }
//     }

//     async guardarArchivo(arrayProductos) {
//         try {
//             await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
//         } catch (error) {
//             console.log('Error al leer el archivo', error)
//         }
//     }

//     async updateProduct(id, productoActualizado) {
//         try {
//             const arrayProductos = await this.leerArchivo();
//             const index = arrayProductos.findIndex(item => item.id === id);
            
//             if (index !== -1) {
//                 arrayProductos.splice(index, 1, productoActualizado);
//                 await this.guardarArchivo(arrayProductos);
//             } else {
//                 console.log('No se encontro')
//             }
//         } catch (error) {
//             console.log('producto no encontrado')
//         }
//     }
// }

// const manager = new ProductManager('productos.json');
// manager.getProduct()
// const pc = {
//     title: "PC gamer",
//     description: "La mejor del mercado",
//     price: 2000,
//     thumbnail: "enlace",
//     code: "3231a",
//     stock: 15
// };
// const grafica = {
//     title: "RTX 4060",
//     description: "La mejor del mercado",
//     price: 3000,
//     thumbnail: "enlace",
//     code: "3232a",
//     stock: 15
// };
// const grafic = {
//     title: "RTa 4060",
//     description: "La mejor del mercado",
//     price: 3000,
//     thumbnail: "enlace",
//     code: "32323a",
//     stock: 15
// };
// manager.addProduct(pc);
// manager.addProduct(grafica);
// manager.addProduct(grafic);

// async function busquedaId() {
//     const product = await manager.getProductById(3);
//     console.log(product);
// }

// busquedaId();

// const prueba1 = {
//     id: 1,
//     title: "RTX 4060",
//     description: "La mejor del mercado",
//     price: 3000,
//     thumbnail: "enlace",
//     code: "32ss32a",
//     stock: 15
// };

// async function testUpdate() {
//     await manager.updateProduct(1, prueba1);
// }

// testUpdate();


const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //Métodos: 

    async addProduct(nuevoObjeto) {
        let { title, description, price, img, code, stock } = nuevoObjeto;

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios, completalo o moriras en 24 hs");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico, rata de dos patas!");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }


        this.products.push(newProduct);

        //Guardamos el array en el archivo: 

        await this.guardarArchivo(this.products);

    }

    getProducts() {
        console.log(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("Producto no encontrado");
            } else {
                console.log("Producto encontrado! ");
                return buscado;
            }

        } catch (error) {
            console.log("Error al leer el archivo ", error);
        }

    }

    //Nuevos metodos desafio 2: 

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Eerror al leer un archivo", error);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    //Actualizamos algun producto:
    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                //Puedo usar el método de array splice para reemplazar el objeto en la posicion del index: 
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("no se encontró el producto");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("no se encontró el producto");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

}

//Testing: 

//Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager("./productos.json");

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []


manager.getProducts();


//Se llamará al método “addProduct” con los campos:
//title: “producto prueba”
//description:”Este es un producto prueba”
//price:200,
//thumbnail:”Sin imagen”
//code:”abc123”,
//stock:25

const fideos = {
    title: "fideos",
    description: "los mas ricos",
    price: 150,
    img: "sin imagen",
    code: "abc123",
    stock: 30
}


manager.addProduct(fideos);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE



const pc = {
    title: "PC Gamer",
    description: "Economica",
    price: 250,
    img: "sin imagen",
    code: "abc124",
    stock: 5
}


manager.addProduct(pc);

const grafica = {
    title: "RTX 2060",
    description: "Barata",
    price: 1000,
    img: "sin imagen",
    code: "abc125",
    stock: 3
}
manager.addProduct(grafica);


manager.getProducts();


async function testeamosBusquedaPorId() {
    const buscado = await manager.getProductById(2);
    console.log(buscado);
}

testeamosBusquedaPorId();


const laptop = {
    id: 1,
    title: "Laptop", 
    description: "Gamer", 
    price: 1250,
    img: "Sin imagen",
    code: "abc123",
    stock: 3
};

async function testeamosActualizar() {
    await manager.updateProduct(1, laptop);
}

testeamosActualizar();
async function deleteProductTest () {
    await manager.deleteProduct(1);
}
deleteProductTest();