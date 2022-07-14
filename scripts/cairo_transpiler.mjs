import { run } from './exec_shellcmd.mjs';
import jetpack from 'fs-jetpack';
import rimraf from 'rimraf';

let path = process.cwd();
let project_root = (path.split("/").slice(0,-1)).join("/");
let sol_contracts = [];
let warp = "/home/vishvesh/.config/yarn/global/node_modules/@nethermindeth/warp/bin/warp";

let { stdout } = await run("mkdir contracts");

function copy_contracts(){
    const src = jetpack.cwd(project_root + "/contracts/ethereum/");
    const dst = jetpack.cwd(path + "/contracts/");
    sol_contracts = src.find({ matching: "*.sol" });

    sol_contracts.forEach(filePath => {
      src.copy(filePath, dst.path(filePath));
    });
}

function del_dir(){
    const src = jetpack.cwd(path + "/warp_output/contracts/");
    const dst = jetpack.cwd(project_root + "/contracts/starknet/");
    let cairo_contracts = src.find({ matching: "*.cairo" });

    console.log(cairo_contracts);
    cairo_contracts.forEach(filePath => {
      src.copy(filePath, dst.path(filePath));
    });

    rimraf.sync(path + "/contracts/");
    rimraf.sync(path + "/warp_output/");
}

copy_contracts();

for (let i=0; i < sol_contracts.length; i++) {
  stdout = await run(warp + " transpile " + "contracts/" + sol_contracts[i]);
}

del_dir();
