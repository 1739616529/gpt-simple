import { copy, exists } from "fs-extra"

;( async ()=> {
    if ( await exists(".env") ) return 
    await copy(".env.example", ".env")
})()