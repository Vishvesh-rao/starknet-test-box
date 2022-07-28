import { run } from './exec_shellcmd.mjs';
import jetpack from 'fs-jetpack';

let cairo_contracts = [];

let inputs = process.argv[2];

async function deploy(){
    const src = jetpack.cwd("/contracts/starknet/");
    cairo_contracts = src.find({ matching: "*.cairo" });

    for (let i=0; i < cairo_contracts.length; i++) {
        stdout = await run("warp" + " deploy " + "contracts/starkent/" + cairo_contracts[i] + " --inputs " + inputs);
    }

    return stdout;
}

