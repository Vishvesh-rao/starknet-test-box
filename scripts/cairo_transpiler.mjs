import { run } from './exec_shellcmd.mjs';
import jetpack from 'fs-jetpack';
import rimraf from 'rimraf';

let sol_contracts = [];
let { stdout } = "";

function get_contracts(){
    const src = jetpack.cwd("contracts/ethereum/");

    sol_contracts = src.find({ matching: "*.sol" });
}

function get_contracts_selectively(){
  const src = jetpack.cwd("contracts/ethereum/");

  sol_contracts = src.find({ matching: "cairo_*.sol" });
}

async function transpile(){
  console.log("inside transpile")
  for (let i=0; i < sol_contracts.length; i++) {
    stdout = await run("warp" + " transpile " + "contracts/ethereum/" + sol_contracts[i]);
  }

  return stdout;
}

function del_dir(){
    const src = jetpack.cwd("warp_output/contracts/ethereum/");
    const dst = jetpack.cwd("contracts/starknet/");
    let cairo_contracts = src.find({ matching: "*.cairo" });

    cairo_contracts.forEach(filePath => {
      src.copy(filePath, dst.path(filePath));
    });

    rimraf.sync("warp_output/");
}

export{get_contracts, get_contracts_selectively, transpile, del_dir}
