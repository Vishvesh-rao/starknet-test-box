# starknet-transpiler-box (Alpha)

(Testing warp transpilation on truffle)

The Truffle StarkNet-transpiler Box provides the boilerplate Truffle structure necessary to start coding for StarkWare's Ethereum L2 solution, StarkNet. This is different from starknet box as it allows the developer to write solidity contracts and the the compiler will automatically transpile these contracts to cairo contracts and deploy them on strakent without the user having to do any extra work.

## Installation Instructions

1. As yet this box has not been officially published on truffles repo so for now to unbox run:

```bash
truffle unbox https://github.com/Vishvesh-rao/starknet-test-box
```
2. The solidity contracts to be transpiled should be put into `/contracts/ethereum/` folder.

3. At this point if you are not in the root folder of your project then return to the root folder.

4. go to the scripts directory:
```bash
cd scripts/ 
```
5. run `compile_starknet.mjs`:
```bash
node compile_starknet.mjs
```

Once this finishes all your contracts present in `<project-root>/contracts/ethereum/` will be converted into cairo contracts and you can see those in `<project-root>/contracts/starkent/`

## Box Structure

The main core of this box is in the `scripts` directory. This directory contains all the necessary l2 compilation/deploying files to enable cairo contracts to be deployed to strakWares networks.

On unboxing the entire box is set up and the etereum folder is created under `<project-root>/contracts/ethereum/`.

Solidity contracts present in this folder will be converted into ciaro contracts and stored in `<project-root>/contracts/starkent/`.

The two main files that are releavant for transpiling solidity to cairo are present in the scripts folder.
- [`cairo_transpiler.py`](https://github.com/Vishvesh-rao/starknet-test-box/blob/main/scripts/cairo_transpiler.py)
- [`compile_starknet.mjs`](https://github.com/Vishvesh-rao/starknet-test-box/blob/main/scripts/compile_starknet.mjs)
- [`transpiler.mjs`](https://github.com/Vishvesh-rao/starknet-test-box/blob/main/scripts/transpiler.mjs)

### `cairo_transpiler.py`

This is the main executeble file which links truffle to warp and transpiling the contracts and is also responsible for certain folder creations, moving around of contracts, and at the deleting any extra folders created and storing the transpiled cairo contracts into `<project-root>/contracts/starkent/`.

### `transpiler.mjs`

This module defines the `l2_compiler` fucntion which executes the python script for transpiling contracts.


### `compile_starknet.mjs`

This contract is main module with regards to the compilation of cairo contracts store in `<project-root>/contracts/starkent/`.

This imports transpiler.mjs module and calls the `l2_compiler` function which executes the `cairo_transpiler.py`

