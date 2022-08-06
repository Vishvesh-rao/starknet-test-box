
import { get_contracts, transpile, del_dir } from './cairo_transpiler.mjs'

get_contracts();

console.log("l2 compilation done!!")
let {stdout} = await transpile();
del_dir();

console.log("l2 compilation done!!")
