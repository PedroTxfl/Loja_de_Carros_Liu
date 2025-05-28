import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/Usuario"

AppDataSource.initialize().then(async () => {

    

}).catch(error => console.log(error))
