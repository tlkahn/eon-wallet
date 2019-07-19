import '../utils/aux';
import {BasicWallet} from "./wallet";
import axios from 'axios';
import Web3 from 'web3';
import unit from 'ethjs-unit';
import ethCrypto from 'eth-crypto';
import {ETH_CONFIG} from '../config/constants';

export class ETHWallet extends BasicWallet {
  constructor(props) {
    super(props);
    this.__coinType = 'ETH';
    this.__name = props.name;
    this.__address = props.address;
    this.__phone = props.phone;
    this.__mnemonic = props.mnemonic;
    this.__privateKey = props.privateKey;
    this.__publicKey = props.publicKey;
    this.__network = props.network;
    this.__wif = props.wif;
    this.__pwdHash = props.__pwdHash;
    this.pwdHash = props.pwdHash;
    // const web3 = new Web3(infuraEndPoint + infuraAPIKey);
  }
  
  static generate() {
    const {privateKey, publicKey, address} = ethCrypto.createIdentity();
    Object.assign(this, {
      privateKey, publicKey, address
    });
    return  {privateKey, publicKey, address};
  }
  
  static create(phone, name, mnemonic, privateKey, publicKey, address, pwdHash) {
    return new ETHWallet({
      phone, name, address, mnemonic, privateKey, publicKey,
      network: ETH_CONFIG.network,
      wif: privateKey,
      pwdHash
    });
  }
  
  save() {
    let self = this;
    let obj = this.toObject();
    console.log({
      network: this.network,
      ...this,
      ...obj
    });
    return self.constructor.store.insert({
      network: this.network,
      ...this,
      ...obj
    });
  }
  
  getGasPrice(gasOption) {
    return new Promise((resolve, reject)=>{
      let speed = gasOption.speed || 'fast';
      axios.get(ETH_CONFIG.ETH_GAS_STATION).then(response=>{
        resolve(response.data[speed]);
      }, e=>{
        reject(e);
      });
    });
  }
  
  getGasLimit(gasOption) {
    return gasOption.gasLimit || ETH_CONFIG.ETH_GAS_LIMIT;
  }
  
  get web3() {
    return new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
  
  coins() {
    return new Promise((resolve, reject)=>{
      let address = this.address;
      if (address) {
        this.web3.eth.getBalance(address).then(balance=>{
          console.log({balance});
          resolve(balance);
        });
      } else {
        reject({success: false, message: 'Invalid address', data: null});
      }
    })
  }
  
  getPrivateKey() {
    return new Promise((resolve, reject)=>{
      let password = window.prompt("Please input your password:", "");
      resolve(this.readDecrypted(password));
    })
  }
  
  send(eth, address, password, gasOption) {
    return new Promise(async (resolve, reject) => {
      let senderAddress = this.address;
      let senderPrivateKey = this.getPrivateKey();
      let recipientAddress = address;
      let value = unit.toWei(eth, 'ether');
      
      console.log({senderAddress, senderPrivateKey, recipientAddress, value});
  
      let gasPrice = this.getGasPrice(gasOption);
      let gasLimit = this.getGasLimit(gasOption);
  
      const web3 = this.web3;
      
      Promise.all([senderPrivateKey, gasPrice]).then((values)=>{
        const [senderPrivateKey, gasPrice] = values;
        let _ = web3.eth.getTransactionCount(senderAddress, 'pending', function(err, result) {
          if (err) {
            console.log("error when sending eth: ", err);
            reject(err);
          } else {
            const rawTransaction = {
              from: senderAddress,
              to: recipientAddress,
              value: value,
              gasPrice: gasPrice,
              nonce: result,
              gasLimit: gasLimit,
            };
      
            const signedTransaction = ethCrypto.signTransaction(
              rawTransaction,
              senderPrivateKey
            );
      
            web3.eth.sendSignedTransaction('0x' + signedTransaction, function(err, result) {
              if (err) {
                console.log({success: false, message: err.toString(), data: null});
                reject(err);
              } else {
                console.log({success: true, message: 'Transaction was sent successfully. Transaction hash: ' + result + '.', data: null});
                resolve({success: true, message: 'Transaction was sent successfully. Transaction hash: ' + result + '.', data: {rawTransaction}, result})
              }
            });
          }
        });
      });
    });
  }
  
  async update() {
    let _ = await this.coins()
  }

}