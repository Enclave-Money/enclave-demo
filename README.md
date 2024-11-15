# Enclave: Next-Generation Passkey Wallets

Enclave revolutionizes Web3 wallet security and user experience by leveraging device-native secure enclaves and biometric authentication. Experience self-custody without seed phrases, cross-device synchronization without downloads, and seamless blockchain interactions without compromising security.

## 🔐 Secure by Design

### Passkey-Based Security
- Leverage your device's secure enclave for military-grade protection
- No seed phrases to store or potentially expose
- Each private key is encrypted and stored directly in your device's secure hardware
- FIDO2-compliant passkey implementation ensures industry-standard security

### Biometric Authentication
- Authenticate with Face ID, Touch ID, or fingerprint sensors
- Transaction signing requires biometric confirmation
- No more copying and pasting long addresses or confirming complex hex data
- Hardware-level security meets intuitive user experience

## 🌐 Cross-Chain Compatibility

### Unified EVM Experience
- Seamlessly interact with all EVM-compatible networks
- One account, infinite blockchain possibilities
- Currently supported networks:
  - Arbitrum
  - Optimism
  - Base
  - Avalanche

## 📱 True Cross-Device Support

### Synchronized & Seamless
- Access your wallet from any device, instantly
- No downloads required - pure web-based experience
- Supported platforms:
  - iOS (Safari)
  - macOS (Safari, Chrome)
  - Android (Chrome)
  - Windows (Chrome, Edge)

### Automatic Backup & Recovery
- Encrypted backups to iCloud (iOS/macOS)
- Google Password Manager integration (Android/Chrome)
- Never worry about losing access to your assets
- Full self-custody maintained at all times

## 💡 Superior User Experience

### Web2-Level Simplicity
- Login with just a face scan or fingerprint
- No wallet extensions or apps to install
- Intuitive interface for both crypto-natives and newcomers

### Smart Transaction Management
- Biometric confirmation for security

### Enclave Smart Balance

#### Supported Networks
- Arbitrum, Base, Optimism (other coming soon)

#### Smart Balance Order Types
- AMOUNT_IN : the *amount* field in order data is the amount the user is willing to spend from their balance to receive tokens on the desired destination chain. the *limit* field is the minimum amount the user would expect to receive on the destination chain where they wish to transact
- AMOUNT_OUT : the *amount* field in order data is the amount the user requires on the destination chain. the *limit* field is the maximum amount the user is willing to spend from their 

#### Smart Balance Order Data Fields
- *type* (required) (Determined based on use case. If a user wants to buy an NFT worth exactly 100 USDC, AMOUNT_OUT would be appropriate. If a user wants to spend exactly 100 USDC to purchase a memecoin AMOUNT_IN would be appropriate)
- *amount* (required)
- *limit* (optional)

## 🚀 Coming Soon

### Multiple Signing Options
- Add EOA based signers for recovery or primary account custody in addition to passkeys
- Add and revoke access to session keys for transaction automation

### EVM Integration
- ETH Mainnet
- Polygon
- Fantom
- Celo
- BSC Mainnet
- Monad

### Solana Integration
- Native Solana support
- Same seamless experience across EVM and Solana
- Unified interface for all supported chains