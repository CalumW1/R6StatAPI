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
1. [Auth](#Auth)
2. [GetUserByUsername](#get-user-by-username)
3. [GetUserByUserId]()
4. [GetUserProgression]()
5. [GetServerStatus](#get-server-status)
6. [GetUserRank]()

#### Auth
Signs into the Ubisoft a returns a token.
```
await getAuth(email, password)
```

Example response
```
ewogICJ2ZXIiOiAiMSIsCiAgImFpZCI6ICJlM2Q1ZWE5ZS01MGJkLTQzYjctODhiZi0zOTc5NGY0ZTNkNDAiLAogICJlbnYiOiAiUHJvZCIsCiAgInNpZCI6ICI2YzVlY2E4MS1jYWI3LTQ0NjItOWUzOC04YjZkODA5OWQ1ZjEiLAogICJ0eXAiOiAiSldFIiwKICAiZW5jIjogIkExMjhDQkMiLAogICJpdiI6ICJPellRVVNkSkswNzJURTFJTXVpdFhnIiwKICAiaW50IjogIkhTMjU2IiwKICAia2lkIjogImFkNWNjMzFhLWI2ZmQtNGYyZS04N2JmLTNjZjRkOTc1OTY2NSIKfQ.-F6ZqzG9mOze0HRYJh3Ub23dQUR9BLR-VM7hMgbisN3tQZ1XLgZFyVH2sFmmX4VMPEKVG9e_PGLnPgrtyBfVkyyQBrjlppeWJXICTQPqj1-gg-0KCX4V3DkEd_o1VYbUAeuiA2QBtUeYIaxFluqxTZ5fr6fcGZvfB8npqMgahHLdcwyzcykp8klKbhOF5L17lUXMai5VgGT33o5N3xxx6wBZL97lXZ_jK1Yd67jPTsL2guB24meGrdR2HBtrB3N6ZR2cZnrFyfDuQzdotf0HsRlX8kATI2wOiADZ8RQS6pRtfRlFXqk-HZ0bsCAdQrs4wOzwL5ZiijfS63rAif_6t1K-KYffiQ3ExXPX6jG2OVK8evkR8fP-vS_aNF1iXE8j4ctrti8PezaOgJUmlRRBwrq29hxJJs5fIsP_EGkg_5rztX4hZtvDNRM9vRsIfAt3aPci5CpyhZs2oAbjLYqA1mEOaY8PODCm4pv3qS8zFBXlPAerCW-8ccYfsAmxEMCrZCxG210BDpZQ5c4JHk_XBij6TqE7yWjg_SO0qR_6eFhRKo5lpLbHAao7EWnfuh03dr_Q210QbiyYE5lCQ4RNapfEug0i5flhlJ55asjlQq6UOt21iJFEHBKHjJLj1vSy7WR347iUlYG8bRtcKHXvL2jD6WP18knlIZIWK7XQtR90TpiYV-WY4hqy7UMqD4yFe4Ah-jP58H8ADYA0F_wzIMGenfuDV4mQ_PyjSQuEynYmycmJyjFGeSFye8N-VvGJvcxozY5NMsYmHUqFLxZ1I6HlZivB_6znSzIK5mzqkfR24tPKQv_3T2VHbTfmN_E-4e5enq3F9tayTOSGNad6sSvP_dBao50w-5JBx86i7xJyK2IRGdjizfTbmzUyBQg5zeDbrRHTrAqnaV8NglOF8I2kS3rbxKH9qfUk1MrNdgi7ZJA34tFfu7XRMvUQN2asmrYhvBC0XlyABCCnn3mPy4abQgstYS9wX-itoVSru0_YS8QCIrffpRZkWANjAIsmERWiOGMXlwE5j2wB50M4_JI_gWGplgmn_9nZrtIeGJBYRUj4j4zl495lowDfTPBOdt3QOLx8OAGrHTwDKj6TOCZ6Nh8e7DjMmgm8c8i3n1WmQu6tkT0f3kOUbt1m3941q93R9kd9MR5H28wQHDH8ffTeGPTbhitgWy9WpsnOujwIm3Nnq72L1hkB5UeJobb7uJ6x8bwMaUUjlP8S6Qpa816YKoFQlFpI-dFPaf0W4gOlxSOafLyS6oewtKQlcADTZ5uwbEx4CPRhm9kZwKdekdol6lcEBk-07z8ppev0pNJl45gztd8zuqg_tqfVQtdSh53-xYqh_7FzzsdieCHCx-I0e9jv4QqAZ_VqAGb5ENNPsYHl9bMQYHdY-4npOfK5A4QgXwConKc2KD9dzhOTuohcz5mTgnP5yCkBOxmoHOXcNqh-HV6eAtg-ayrVpG63BlFND_uxAhJ-hnK0STCID-2JI3bvBr4p6V4L6_RT8X1EU_cCw4Ohr-cO9EqZT8f8qjiVzOAqZY6uPe8DfkANkSBIfmXL6A-duTGYoetHQXmvFxiM_MB10LP6FL1eVI2ZNwCXgJ0HgZkQ-_Ul5iBPEeuEIx3tCXpk6aoq1nIC6wdj_JJx9kTwICF3tOvPbUXI1jczVu_36HFi2fZxM6inuZ1uzC3ewfY_opccdDRLSZknlHs29ZPsOfiAX_hrm0NCGdE7MJMdC9aeGsGdll2ujxGZ90CKFuayH9pJsHgpW5d8Ly8v0xCJFc2qiTGAF-XJq9XCIroOBussSi4mLsJCr97jB9KjAY12zYIb-Pfhlnlba7YqX6otIO8oWG5koYzaj5ipqixOXCrDrXAHKdHFFeAYYq3Ojk1t96o_oRkQh1WBspTmmdRz1UOlUsBbVr4q4a0mj0cgFjKIjhv54Kj2xBnpf5GxmDLV9YEE3bqfMGrCy-rIR45CLGx6mBdRmf999dmb3wOM3iPlbgloF2TDTvFdaokQ4lYX51x4E0io8aFtJIrQX8EoPeFWvG8lea20h4e7TeEFx3n07rnPY22HxAFw26spFDxwBPAc6iLxEt_NoerdANtPE_-wUnqrZJ3-Oblvk6M6HOh_vsj-yJi4QC88sxqHhWiBRhW2vCePfY1RDJvD2Hq66Xc2Engp4drZhX1Drv4PnTPk8nISNVelUxGx89B-2KZtIsBUZiUxrY7bZj6Px2FmC2Ro5dOKIjQwZA6D-uEkAhBFsibp3tOIzWAjQChCR89hJy9IS2O7PMWs31rxINAKdx43jb6llgTRsUGDXYLL1eKYecUd7orY8frlAYXU1xLmDBzBpn6wzbMRNNoFfiI1KG9rUKR8EDPUv26GcfsBzkuSHeFXSi_Xhg.oMj2gpJl_2eOj-pFuYvFyWr_t1JR48zgb2st82KTKWk
```

#### Get user by username
Gets a user by username

```
await getUserByUsername(userName, platform);
```

Example response
```
{
  profileId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
  userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
  platformType: 'uplay',
  idOnPlatform: 'AFC2AFEC-B9ED-4988-BFFA-58E78EEDFA9D',
  nameOnPlatform: 'CaleyW1'
}
```

#### Get user by userId
Gets a user by userId
```
await getUserById(user.userId, platform);
```

Example response
```
[
  {
    profileId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
    userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
    platformType: 'uplay',
    idOnPlatform: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
    nameOnPlatform: 'CaleyW1'
  },
  {
    profileId: 'f02cbe10-2411-43d9-b449-5366888201a8',
    userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
    platformType: 'steam',
    idOnPlatform: '76561198172917986',
    nameOnPlatform: '76561198172917986'
  },
  {
    profileId: '91193155-2b57-48f1-b69b-556f5e4ccfeb',
    userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
    platformType: 'twitch',
    idOnPlatform: '469658264',
    nameOnPlatform: 'calbob'
  }
]
``` 

#### Get user progression
gets the progression for a user
```
await getUserProgression(user.profileId, platform);
``` 

Example response
```
{
  xp: 12887,
  profileId: 'afc2afec-b9ed-4988-bffa-58e78eedfa9d',
  lootboxProbability: 750,
  level: 186
}
```

#### Get server status
Returns the status of a particular platform

platforms: pc, xbox, ps4
```
await getServerStatus('pc')
```

Example response
```
{
  platform: 'PC',
  status: 'Online',
  maintenance: null,
  impactedFeatures: []
}
``` 

#### Get user rank
coming soon
<!-- ```
```

Example response
```
``` -->

## Support
For any questions, bugs or feedback, please use our [Discord](https://discord.gg/Hc4rTJme4T) or create an issue on [Github]()
