import { run } from './exec_shellcmd.mjs';
import jetpack from 'fs-jetpack';
import rimraf from 'rimraf';
import fs from 'fs';

let l2_contracts = [];
let l1_contracts = [];
let warp = "/home/vishvesh/.config/yarn/global/node_modules/@nethermindeth/warp/bin/warp";
let { stdout } = "";
let selective_compile = false;

function get_contracts(){
  const src = jetpack.cwd("contracts/starknet/");
  l2_contracts = src.find({ matching: "*.sol" });

  src = jetpack.cwd("contracts/ethereum/");
  l1_contracts = src.find({ matching: "cairo_*.sol" });

  if (l1_contracts.length > 0){
    selective_compile = true;
  }
}

async function transpile(){
  console.log("inside transpile")
  for (let i=0; i < l2_contracts.length; i++) {
    stdout = await run(warp + " transpile " + "contracts/starknet/" + l2_contracts[i]);
  }

  if (selective_compile){
    for (let i=0; i < l1_contracts.length; i++) {
      stdout = await run(warp + " transpile " + "contracts/ethereum/" + l1_contracts[i]);
    }
  }
  return stdout;
}

function del_dir(){
  const src = jetpack.cwd("warp_output/contracts/starknet/");
  const dst = jetpack.cwd("contracts/starknet/");
  let cairo_contracts = src.find({ matching: "*.cairo" });

  cairo_contracts.forEach(filePath => {
    src.copy(filePath, dst.path(filePath));
  });

  for (let i=0; i < l2_contracts.length; i++) {
    fs.unlinkSync("contracts/starknet/"+l2_contracts[i]);
  }

  if (selective_compile){
    const src = jetpack.cwd("warp_output/contracts/ethereum/");
    const dst = jetpack.cwd("contracts/starknet/");
    let cairo_contracts = src.find({ matching: "*.cairo" });
  
    cairo_contracts.forEach(filePath => {
      src.copy(filePath, dst.path(filePath));
    });

    for (let i=0; i < l1_contracts.length; i++) {
      fs.unlinkSync("contracts/ethereum/"+l1_contracts[i]);
   }
  }

  rimraf.sync("warp_output/");
}

export{get_contracts, transpile, del_dir}
