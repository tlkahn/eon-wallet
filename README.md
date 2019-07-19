# Purpose

Neon Chain is a next generation groupware on blockchain which enables companies to transform into digital communities. EON Wallet is a wallet/browser/IM which brings blockchain to mainstream users, fully compatible with *EOS* series blockchain including *EON/BOS/everiToken* etc.

# Product


## Core features

-   Intra-organization and cross-organization collaboration and communication with features providing bots and open API for 3rd party dapps/apps, compatible with all mainstream public protocols such as IRC, WebRTC, XMPP as well as proprietary ones Slack, Telegram, WeChat etc.
-   Existing blockchain as a replacement to cloud services, typically focusing on data. McKinsey report <sup><a id="fnr.2" class="footref" href="#fn.2">2</a></sup> conceptualized those into 6 categories:

-   Tokenization
    There are two types of tokenization: utility tokens and security tokens. A token backed by asset is typically defined as security token. Public offering of utility tokens often take the path of ICO/IEO/etc, security tokens do STO. For example, A standard security token is decribed as:
    
        interface IERCST is IERCPFT {
        
          // Document Management
          function getDocument(bytes32 _name) 
                               external view returns (string, bytes32);
          function setDocument(bytes32 _name, 
                               string _uri, 
                               bytes32 _documentHash) external;
        
          // Controller Operation
          function isControllable() external view returns (bool);
        
          // Token Issuance
          function isIssuable() external view returns (bool);
          function issueByTranche(bytes32 _tranche, 
                                  address _tokenHolder, 
                                  uint256 _amount, 
                                  bytes _data) external;
          event IssuedByTranche(bytes32 indexed tranche, 
                                address indexed operator, 
                                address indexed to, 
                                uint256 amount, 
                                bytes data, 
                                bytes operatorData);
        
          // Token Redemption
          function redeemByTranche(bytes32 _tranche, 
                                   uint256 _amount, 
                                   bytes _data) external;
          function operatorRedeemByTranche(bytes32 _tranche, 
                                           address _tokenHolder, 
                                           uint256 _amount, 
                                           bytes _operatorData) external;
          event RedeemedByTranche(bytes32 indexed tranche, 
                                  address indexed operator, 
                                  address indexed from, 
                                  uint256 amount, 
                                  bytes operatorData);
        
          // Transfer Validity
          function canSend(address _from, 
                           address _to, 
                           bytes32 _tranche, 
                           uint256 _amount, 
                           bytes _data) 
                           external view returns (byte, bytes32, bytes32);
        
        }
    
    A new model propsed by Neon Chain is so called **mini-tokenization**. Users can create and retire tokens on the fly. Anyone can create and circulate a token just like send a message. The lifetime of a token can lowered to minutes, days from today's years. Retirement of tokens can be redemption, burning, or consumption etc. Thus users can use tokens for various purposes rather than just financing. For example, a mini-tokenization for staff trip expense reimbursement:
    
        interface ticketStub is AccountingItems {
          function buy(float32 price) external returns (bool);
          function reimbursement() external returns (bool);
        }
    
    Tokens can even be created by AI agents during the process of cross-orgnization collaboration, e.g. conversation logs between robots of different organizations, thus avoiding data loss and potential abuse. Thus maximal mutual trust is estalished. Users can create asset-backed tokens or utility tokens for fast cross-organization or cross-border transactions and accelerate flow of data and exchange of values.

-   Neon Chain's tokenization templates and development framework cover most typical scenarios in industries. Based on our rich experience as blockchain consultant specializing in implementation, we provide typical tokenization templates based on tech and industry standards. This one-stop service offers a standardized consulting service with immediate impact. Minimum tech knowledge is required. Only some public parameters and Neon Chain's smart contract framework will do the rest.

-   Drag-n-drop style 3rd party extensions. Neon Chain offers rich features comparable to current mainstream cloud service. (Actually we expect with advent of 5G and IoT, those services based on blockchain will soon be defined as fog computing service). Users can cherrypick services such as tokenization, messaging, privacy preserving, data storage etc., into their own application with ease. Thus transforming legacy business systems such as membership, loyalty program, customer support apps into a community-facing blockchain service app become unprecedentedly easy. To put it another way, We enable SMEs to have their own WeChat, in their own terms.

-   Neon Chain is based on Polkadot, a recent cross-chain infrastructure led by Ethereum's pervious co-founder Gavin Wood. Such infrastructure is created with cross chain in mind. Neon Chain will act as the middle layer and scaffold to use features from multiple blockchains.
    
    For example, an automobile company can finance its new venture in hydrogen battery cars by issuing a mix of asset backed tokens and equity token. Everyone who is authorized to participate can join and subscribe with their chosen method to pay. The proceeds will be a mix of various fiat money, BTC, ETH, even tokens the company claims to accept. Public chain TPS will become less of an issue since majority of workload are processed on the highly performant Neon Chain. 
    

-   Privacy preserving unlimited history data storage.
    
    Collaboration happens in groups like Slack's channels or Telegram's groups. All conversation records will be kept in Neon Chain (to be specific, the hash digest of messages saved as index, due to performance concerns). All data on chain and offchain will be encrypted with privilege hierarchies. Without user's consent, those contents are unreadable avoiding data leak and abuse.