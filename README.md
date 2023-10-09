# R6StatAPI
A wrapper for the Rainbow Six Seige API in Node.JS

⚠️ *This package is still a work in progress, please check out the [support](#support) section if you are having any issues.*

## Table of Contents
1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Functions](#functions)
4. [Support](#support)

## Installation 
``` npm i r6statapi ```

## Getting Started

To get started you will need a Ubisoft login, it is best to create a new account and not the account you normally use. Create a new account [here](account.ubisoft.com/login)

The example below has the email and password variables hardcoded but it would be better to use [dotenv](https://www.npmjs.com/package/dotenv) to manage environment variables.

```
// replace with your own information
const email = "test@gmail.com"
const password = "Password123"
const usermame = "CaleyW1"
const password = "uplay"

// login and get token
const token = await getAuth(email, password)
console.log(token)

// fetch user by username
const user = await getUserByUsername(userName, platform);
console.log(user);

// example response
{
  profileId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
  userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
  platformType: 'uplay',
  idOnPlatform: 'AFC2AFEC-B9ED-4988-BFFA-58E78EEDFA9D',
  nameOnPlatform: 'CaleyW1'
}
```

## Functions
### Table of Contents

#### Auth
```
```

#### Get user by username
```
```

## Support
For any questions, bugs or feedback, please use our [Discord](https://discord.gg/Hc4rTJme4T) or create an issue on [Github]()
