// import {
//   AddressType,
//   Backend,
//   ConfigProps,
//   Dapp,
//   Dialect,
//   DialectSdk,
//   DialectWalletAdapterWrapper,
//   EncryptionKeysStore,
//   NodeDialectWalletAdapter,
//   TokenStore,
// } from '@dialectlabs/sdk'
// import { PublicKey } from '@solana/web3.js'

// const environment = 'development'
// const dialectCloud = {
//   url: 'https://dialectapi.to',
//   tokenStore: TokenStore.createInMemory(),
// }

// // This class is temp version
// export class NotifySubscription {
//   private _sdk: DialectSdk
//   public _dappInstance: Dapp
//   public static notificationInstance: NotifySubscription
//   constructor(sdk: DialectSdk, dappInstance: Dapp) {
//     this._sdk = sdk
//     this._dappInstance = dappInstance
//   }

//   static async initializeSubscription(rpc: string) {
//     if (!NotifySubscription.notificationInstance) {
//       const backends = [Backend.DialectCloud, Backend.Solana]
//       const wallet = DialectWalletAdapterWrapper.create(
//         NodeDialectWalletAdapter.create(),
//       )
//       const sdk = Dialect.sdk({
//         backends,
//         dialectCloud,
//         environment,
//         encryptionKeysStore: EncryptionKeysStore.createInMemory(),
//         solana: {
//           rpcUrl: rpc,
//         },
//         wallet,
//       } as ConfigProps)
//       const dappInstance = await sdk.dapps.create({
//         name: 'My test dapp',
//         description: `My test dapp/'s description`,
//       })
//       NotifySubscription.notificationInstance = new NotifySubscription(
//         sdk,
//         dappInstance,
//       )
//     }
//     return NotifySubscription.notificationInstance
//   }

//   async createNewAddress() {
//     return await this._sdk.wallet.addresses.create({
//       type: AddressType.Email,
//       value: 'ngduytra@gmail.com',
//     })
//   }

//   async verifyAddress(addressId: string, code: string) {
//     return await this._sdk.wallet.addresses.verify({
//       addressId: addressId,
//       code: code,
//     })
//   }

//   async resendVerificationCode() {
//     return await this._sdk.wallet.addresses.resendVerificationCode({
//       addressId: '',
//     })
//   }

//   async getAllAddresses() {
//     return await this._sdk.wallet.addresses.findAll()
//   }

//   async getAddress() {
//     return await this._sdk.wallet.addresses.find({
//       addressId: '',
//     })
//   }

//   async subscribeDappNotification(id: string, dappPublicKey: PublicKey) {
//     return await this._sdk.wallet.dappAddresses.create({
//       addressId: id,
//       enabled: true,
//       // use Publickey of Dapp
//       dappPublicKey,
//     })
//   }

//   async updateSubscription() {
//     return await this._sdk.wallet.dappAddresses.update({
//       // Use subcription ID
//       dappAddressId: '',
//       enabled: false,
//     })
//   }

//   async deleteSubscription() {
//     return await this._sdk.wallet.dappAddresses.delete({
//       dappAddressId: '',
//     })
//   }

//   async sendNotification() {
//     return await this._dappInstance.messages.send({
//       title: 'Hello, this is the first title',
//       message: 'Message i want to give out is that, we have many choices',
//       recipient: new PublicKey('GJLqpmDxxrV9xruee2vFvEoTho7VVQHRtuHH8nfoAE54'),
//     })
//   }
// }
