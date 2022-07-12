#!/usr/bin/env python3

import os
import glob
import subprocess
from pathlib import Path
import shutil

path = os.getcwd() 
root_path = "/".join((path.split("/")[:-1])) 
contracts = []
warp = "/home/vishvesh/.config/yarn/global/node_modules/@nethermindeth/warp/bin/warp"

print("executig.....")

res = subprocess.run(["mkdir", "contracts"])

def copy_contracts():
    src_path = root_path + "/contracts/ethereum/"
    trg_path = path + "/contracts/"

    for src_file in Path(src_path).glob('*.*'):
        shutil.copy(src_file, trg_path)


def get_contracts(): 
    for file in glob.glob(path + "/contracts/*.sol", recursive=True):
        f_path = "/".join((file.split("/")[-2:])) 
        contracts.append(f_path)
    
    return contracts

def transpile(contract):
    res = subprocess.run([warp, "transpile", contract])

def cleanup():
    src_path = path + "/warp_output/contracts/"
    trg_path = root_path + "/contracts/starknet/"

    for src_file in Path(src_path).glob('*.*'):
        shutil.copy(src_file, trg_path)

    try:
        shutil.rmtree(path + "/contracts/")
        shutil.rmtree(path + "/warp_output/")
    except OSError as e:
        print ("Error: %s - %s." % (e.filename, e.strerror))

copy_contracts()

files = get_contracts()

for contract in files:
    transpile(contract)

cleanup()
    
