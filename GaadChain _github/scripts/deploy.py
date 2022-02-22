from scripts.helpful_scripts import get_account
from brownie import CPCB, network
import os
import yaml
import shutil
import json


def deploy_waste_contract():
    owner = get_account()
    print(network.show_active())
    waste_contract = CPCB.deploy(
        {"from": owner})
    print(str(waste_contract.owner()))
    '''recycler = get_account(1)
    manufac = get_account(2)
    waste_contract.addPeer(recycler, {"from": owner})
    waste_contract.addPeer(manufac, {"from": owner})
    print("peers added")
    waste_contract._allotCode("600010", "2", "600044",
                              "0100000", "3", {"from": recycler})

    waste_contract._allotCode("600044", "1", "600036",
                              "0050000", "4", {"from": manufac})
    print("codes alloted by peer")
    print(waste_contract.listPeerTransfers({"from": recycler}))

    print(waste_contract.listPeerTransfers({"from": manufac}))
    '''
    update_front_end()
    return waste_contract


def update_front_end():
    # Send the build folder
    copy_folders_to_front_end("./build", "./front-end/src/chain-info")

    # Sending the front end our config in JSON format
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front-end/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")


def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_waste_contract()
