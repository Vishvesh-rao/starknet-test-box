
import starknetConfig from '../truffle-config.starknet.js';
import { get_contracts, get_contracts_selectively, transpile, del_dir } from './cairo_transpiler.mjs'

if (starknetConfig.compilers.cairo.selecetive_compile){
    copy_contracts_selectively();
}
else{
    copy_contracts();
}

let {stdout} = await transpile();
del_dir();

console.log("l2 compilation done!!")
