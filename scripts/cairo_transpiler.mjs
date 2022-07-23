import { run } from './exec_shellcmd.mjs';
import jetpack from 'fs-jetpack';
import rimraf from 'rimraf';

let path = process.cwd();
let project_root = (path.split("/").slice(0,-1)).join("/");
let sol_contracts = [];

let { stdout } = await run("mkdir contracts");

function copy_contracts(){
    const src = jetpack.cwd(project_root + "/contracts/ethereum/");
    const dst = jetpack.cwd(path + "/contracts/");
    sol_contracts = src.find({ matching: "*.sol" });

    sol_contracts.forEach(filePath => {
      src.copy(filePath, dst.path(filePath));
    });
}

function copy_contracts_selectively(){
  const src = jetpack.cwd(project_root + "/contracts/ethereum/");
  const dst = jetpack.cwd(path + "/contracts/");

  sol_contracts = src.find({ matching: "cairo_*.sol" });

  sol_contracts.forEach(filePath => {
    src.copy(filePath, dst.path(filePath));
  });
}

async function transpile(){
  for (let i=0; i < sol_contracts.length; i++) {
    stdout = await run(warp + " transpile " + "contracts/" + sol_contracts[i]);
  }

  return stdout;
}

function del_dir(){
    const src = jetpack.cwd(path + "/warp_output/");
    const dst = jetpack.cwd(project_root + "/contracts/starknet/");
    let cairo_contracts = src.find({ matching: "*.cairo" });

    cairo_contracts.forEach(filePath => {
      src.copy(filePath, dst.path(filePath));
    });

    rimraf.sync(path + "/contracts/");
    rimraf.sync(path + "/warp_output/");
}

export{copy_contracts, copy_contracts_selectively, transpile, del_dir}
