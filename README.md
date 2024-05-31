# R6StatAPI

An API wrapper for Rainbow Six Seige written in JavaScript.

## Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Functions](#functions)
4. [Support](#support)

## Installation

`npm i r6statapi`

## Getting Started

To get started you will need a Ubisoft login, it is best to create a new account and not the account you normally use. Create a new account [here](account.ubisoft.com/login)

The example below has the email and password variables hardcoded but it would be better to use [dotenv](https://www.npmjs.com/package/dotenv) to manage environment variables.

```
import r6statapi from 'r6statapi';

const api = new r6statapi();

// replace with your own information
const email = "test@gmail.com"
const password = "Password123"
const usermame = "User1"
const platform = "uplay"

// login and get token
const token = await api.getAuth(email, password)
console.log(token)

// fetch user by username
const user = await api.getUserByUsername(userName, platform);
console.log(user);

// example response
{
  profileId: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
  userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
  platformType: 'uplay',
  idOnPlatform: 'AFC2AFEC-B9ED-4988-BFFA-58E78EEDFA93',
  nameOnPlatform: 'CaleyW1'
}
```

## Functions

### Table of Contents

1. [Auth](#Auth)
2. [GetUserByUsername](#get-user-by-username)
3. [GetUserByUserId](#get-user-by-userid)
4. [GetUserProgression](#get-user-progression)
5. [GetServerStatus](#get-server-status)
6. [GetUserRank](#get-user-rank)
7. [GetUserStats]()
8. [GetOperators]()

#### Auth

Signs into the Ubisoft a returns a token.

```
await api.getAuth(email, password)
```

Example response

```
ewogICJ2ZXIiOiAiMSIsCiAgImFpZCI6ICJlM2Q1ZWE5ZS01MGJkLTQzYjctODhiZi0zOTc5NGY0ZTNkNDAiLAogICJlbnYiOiAiUHJvZCIsCiAgInNpZCI6ICI2YzVlY2E4MS1jYWI3LTQ0NjItOWUzOC04YjZkODA5OWQ1ZjEiLAogICJ0eXAiOiAiSldFIiwKICAiZW5jIjogIkExMjhDQkMiLAogICJpdiI6ICJPellRVVNkSkswNzJURTFJTXVpdFhnIiwKICAiaW50IjogIkhTMjU2IiwKICAia2lkIjogImFkNWNjMzFhLWI2ZmQtNGYyZS04N2JmLTNjZjRkOTc1OTY2NSIKfQ.-F6ZqzG9mOze0HRYJh3Ub23dQUR9BLR-VM7hMgbisN3tQZ1XLgZFyVH2sFmmX4VMPEKVG9e_PGLnPgrtyBfVkyyQBrjlppeWJXICTQPqj1-gg-0KCX4V3DkEd_o1VYbUAeuiA2QBtUeYIaxFluqxTZ5fr6fcGZvfB8npqMgahHLdcwyzcykp8klKbhOF5L17lUXMai5VgGT33o5N3xxx6wBZL97lXZ_jK1Yd67jPTsL2guB24meGrdR2HBtrB3N6ZR2cZnrFyfDuQzdotf0HsRlX8kATI2wOiADZ8RQS6pRtfRlFXqk-HZ0bsCAdQrs4wOzwL5ZiijfS63rAif_6t1K-KYffiQ3ExXPX6jG2OVK8evkR8fP-vS_aNF1iXE8j4ctrti8PezaOgJUmlRRBwrq29hxJJs5fIsP_EGkg_5rztX4hZtvDNRM9vRsIfAt3aPci5CpyhZs2oAbjLYqA1mEOaY8PODCm4pv3qS8zFBXlPAerCW-8ccYfsAmxEMCrZCxG210BDpZQ5c4JHk_XBij6TqE7yWjg_SO0qR_6eFhRKo5lpLbHAao7EWnfuh03dr_Q210QbiyYE5lCQ4RNapfEug0i5flhlJ55asjlQq6UOt21iJFEHBKHjJLj1vSy7WR347iUlYG8bRtcKHXvL2jD6WP18knlIZIWK7XQtR90TpiYV-WY4hqy7UMqD4yFe4Ah-jP58H8ADYA0F_wzIMGenfuDV4mQ_PyjSQuEynYmycmJyjFGeSFye8N-VvGJvcxozY5NMsYmHUqFLxZ1I6HlZivB_6znSzIK5mzqkfR24tPKQv_3T2VHbTfmN_E-4e5enq3F9tayTOSGNad6sSvP_dBao50w-5JBx86i7xJyK2IRGdjizfTbmzUyBQg5zeDbrRHTrAqnaV8NglOF8I2kS3rbxKH9qfUk1MrNdgi7ZJA34tFfu7XRMvUQN2asmrYhvBC0XlyABCCnn3mPy4abQgstYS9wX-itoVSru0_YS8QCIrffpRZkWANjAIsmERWiOGMXlwE5j2wB50M4_JI_gWGplgmn_9nZrtIeGJBYRUj4j4zl495lowDfTPBOdt3QOLx8OAGrHTwDKj6TOCZ6Nh8e7DjMmgm8c8i3n1WmQu6tkT0f3kOUbt1m3941q93R9kd9MR5H28wQHDH8ffTeGPTbhitgWy9WpsnOujwIm3Nnq72L1hkB5UeJobb7uJ6x8bwMaUUjlP8S6Qpa816YKoFQlFpI-dFPaf0W4gOlxSOafLyS6oewtKQlcADTZ5uwbEx4CPRhm9kZwKdekdol6lcEBk-07z8ppev0pNJl45gztd8zuqg_tqfVQtdSh53-xYqh_7FzzsdieCHCx-I0e9jv4QqAZ_VqAGb5ENNPsYHl9bMQYHdY-4npOfK5A4QgXwConKc2KD9dzhOTuohcz5mTgnP5yCkBOxmoHOXcNqh-HV6eAtg-ayrVpG63BlFND_uxAhJ-hnK0STCID-2JI3bvBr4p6V4L6_RT8X1EU_cCw4Ohr-cO9EqZT8f8qjiVzOAqZY6uPe8DfkANkSBIfmXL6A-duTGYoetHQXmvFxiM_MB10LP6FL1eVI2ZNwCXgJ0HgZkQ-_Ul5iBPEeuEIx3tCXpk6aoq1nIC6wdj_JJx9kTwICF3tOvPbUXI1jczVu_36HFi2fZxM6inuZ1uzC3ewfY_opccdDRLSZknlHs29ZPsOfiAX_hrm0NCGdE7MJMdC9aeGsGdll2ujxGZ90CKFuayH9pJsHgpW5d8Ly8v0xCJFc2qiTGAF-XJq9XCIroOBussSi4mLsJCr97jB9KjAY12zYIb-Pfhlnlba7YqX6otIO8oWG5koYzaj5ipqixOXCrDrXAHKdHFFeAYYq3Ojk1t96o_oRkQh1WBspTmmdRz1UOlUsBbVr4q4a0mj0cgFjKIjhv54Kj2xBnpf5GxmDLV9YEE3bqfMGrCy-rIR45CLGx6mBdRmf999dmb3wOM3iPlbgloF2TDTvFdaokQ4lYX51x4E0io8aFtJIrQX8EoPeFWvG8lea20h4e7TeEFx3n07rnPY22HxAFw26spFDxwBPAc6iLxEt_NoerdANtPE_-wUnqrZJ3-Oblvk6M6HOh_vsj-yJi4QC88sxqHhWiBRhW2vCePfY1RDJvD2Hq66Xc2Engp4drZhX1Drv4PnTPk8nISNVelUxGx89B-2KZtIsBUZiUxrY7bZj6Px2FmC2Ro5dOKIjQwZA6D-uEkAhBFsibp3tOIzWAjQChCR89hJy9IS2O7PMWs31rxINAKdx43jb6llgTRsUGDXYLL1eKYecUd7orY8frlAYXU1xLmDBzBpn6wzbMRNNoFfiI1KG9rUKR8EDPUv26GcfsBzkuSHeFXSi_Xhg.oMj2gpJl_2eOj-pFuYvFyWr_t1JR48zgb2st82KTKWk
```

#### Get user by username

Gets a user by username

```
await api.getUserByUsername(userName, platform);
```

Example response

```
{
  profileId: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
  userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
  platformType: 'uplay',
  idOnPlatform: 'AFC2AFEC-B9ED-4988-BFFA-58E78EEDFA93',
  nameOnPlatform: 'CaleyW1',
  avatars: {
    '146': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_146_146.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a',
    '256': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_256_256.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a',
    '500': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_tall.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a'
  }
}
```

#### Get user by userId

Gets a user by userId

```
await api.getUserById(user.userId, platform);
```

Example response

```
[
  {
    profileId: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
    userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
    platformType: 'uplay',
    idOnPlatform: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
    nameOnPlatform: 'CaleyW1',
    avatars: {
    '146': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_146_146.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a',
    '256': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_256_256.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a',
    '500': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_tall.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a'
  }
  },
  {
    profileId: 'f02cbe10-2411-43d9-b449-5366888201a2',
    userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
    platformType: 'steam',
    idOnPlatform: '76561198172917981',
    nameOnPlatform: '76561198172917983',
    avatars: {
    '146': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_146_146.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a',
    '256': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_256_256.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a',
    '500': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_tall.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a'
  }
  },
  {
    profileId: '91193155-2b57-48f1-b69b-556f5e4ccfea',
    userId: 'afc2afec-b9ed-4988-bffa-58e78eedfa93',
    platformType: 'twitch',
    idOnPlatform: '469658264',
    nameOnPlatform: 'calbob',
    avatars: {
    '146': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_146_146.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a',
    '256': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_256_256.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a',
    '500': 'https://avatars.ubisoft.com/afc2afec-b9ed-4988-bffa-58e78eedfa93/default_tall.png?appId=3587dcbb-7f81-457c-9781-0e3f29f6f56a'
  }
  }
]
```

#### Get user progression

gets the progression for a user

```
await api.getUserProgression(user.userId, platform);
```

Example response

```
{
  level: 326,
  xp: 129949
}
```

#### Get server status

Returns the status of a platform

platforms: pc, xbox, ps4

```
await api.getServerStatus(platfrom)
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

Returns statistics for different gamemodes

```
await api.getUserRank(player.userId, platfrom);
```

Example response

```
{
  casual: {
    profile_board_id: 'casual',
    id: '7acf490b-4bfd-40df-97b6-ebbbe6ebc702',
    max_rank: 0,
    max_rank_points: 0,
    platform_family: 'pc',
    rank: 0,
    rank_points: 0,
    rank_name: 'Unranked',
    season_id: 33,
    top_rank_position: 0,
    deaths: 0,
    kills: 0,
    abandons: 0,
    losses: 0,
    wins: 0
  },
  event: {
    profile_board_id: 'event',
    id: '7acf490b-4bfd-40df-97b6-ebbbe6ebc702',
    max_rank: 0,
    max_rank_points: 0,
    platform_family: 'pc',
    rank: 0,
    rank_points: 0,
    rank_name: 'Unranked',
    season_id: 33,
    top_rank_position: 0,
    deaths: 0,
    kills: 0,
    abandons: 0,
    losses: 0,
    wins: 0
  },
  warmup: {
    profile_board_id: 'warmup',
    id: '7acf490b-4bfd-40df-97b6-ebbbe6ebc702',
    max_rank: 0,
    max_rank_points: 0,
    platform_family: 'pc',
    rank: 0,
    rank_points: 0,
    rank_name: 'Unranked',
    season_id: 33,
    top_rank_position: 0,
    deaths: 12,
    kills: 14,
    abandons: 1,
    losses: 1,
    wins: 0
  },
  standard: {
    profile_board_id: 'standard',
    id: '7acf490b-4bfd-40df-97b6-ebbbe6ebc702',
    max_rank: 0,
    max_rank_points: 0,
    platform_family: 'pc',
    rank: 0,
    rank_points: 0,
    rank_name: 'Unranked',
    season_id: 33,
    top_rank_position: 0,
    deaths: 4,
    kills: 7,
    abandons: 0,
    losses: 1,
    wins: 0
  },
  ranked: {
    profile_board_id: 'ranked',
    id: '7acf490b-4bfd-40df-97b6-ebbbe6ebc702',
    max_rank: 32,
    max_rank_points: 4155,
    platform_family: 'pc',
    rank: 32,
    rank_points: 4100,
    rank_name: 'Unranked',
    season_id: 33,
    top_rank_position: 0,
    deaths: 433,
    kills: 581,
    abandons: 1,
    losses: 56,
    wins: 49
  }
}
```

#### Get User Stats

Get seasonal user statistics

| Field       | Type   | Required | options                          |
| ----------- | ------ | -------- | -------------------------------- |
| userId      | id     | yes      |                                  |
| platform    | string | yes      | uplay, xbox, ps4                 |
| view        | string | yes      | seasonal                         |
| aggregation | string | yes      | summary                          |
| gameMode    | string | yes      | All, Casual, Ranked              |
| teamRole    | string | yes      | All                              |
| season      | string | yes      | format Y(No.)S(No.) Example Y6S3 |

```
const userStats = await api.getUserStats(
  userId,
  platform,
  view,
  aggregation,
  gameMode,
  teamRole,
  season
);
```

Example response

```
[
  {
    gameMode: 'all',
    type: 'Seasonal',
    statsType: 'summary',
    statsDetail: 'summary',
    seasonYear: 'Y9',
    seasonNumber: 'S1',
    matchesPlayed: 100,
    roundsPlayed: 619,
    minutesPlayed: 2451,
    matchesWon: 47,
    matchesLost: 53,
    roundsWon: 303,
    roundsLost: 316,
    kills: 574,
    assists: 116,
    death: 414,
    headshots: 217,
    meleeKills: 2,
    teamKills: 2,
    openingKills: 64,
    openingDeaths: 44,
    trades: 21,
    openingKillTrades: 4,
    openingDeathTrades: 4,
    revives: 13,
    distanceTravelled: 113204,
    winLossRatio: 0.8868,
    killDeathRatio: { value: 1.3865, p: 0 },
    headshotAccuracy: { value: 0.378, p: 0 },
    killsPerRound: { value: 0.9273, p: 0 },
    roundsWithAKill: { value: 0.5703, p: 0 },
    roundsWithAMultiKill: { value: 0.2456, p: 0 },
    roundsWithOpeningKill: { value: 0.1034, p: 0 },
    roundsWithOpeningDeath: { value: 0.0711, p: 0 },
    roundsWithKOST: { value: 0.6478, p: 0 },
    roundsSurvived: { value: 0.3312, p: 0 },
    roundsWithAnAce: { value: 0.0048, p: 0 },
    roundsWithClutch: { value: 0.0113, p: 0 },
    timeAlivePerMatch: 631.35,
    timeDeadPerMatch: 175.88,
    distancePerRound: 182.8821
  }
]
```

#### Get Operator

Gets seasonal operator statistics

| Field       | Type   | Required | options                          |
| ----------- | ------ | -------- | -------------------------------- |
| userId      | Id     | Yes      |
| platform    | string | Yes      | uplay, xbox, ps4                 |
| view        | string | Yes      | seasonal                         |
| aggregation | string | Yes      | operator                         |
| gameMode    | string | Yes      | All, Casual, Ranked              |
| team role   | string | Yes      | Attacker, Defender               |
| season      | string | Yes      | format Y(No.)S(No.) Example Y6S3 |

```
const operator = await api.getOperators(
  userId,
  platform,
  view,
  aggregation,
  gameMode,
  teamRole,
  season
);
```

Example Response

```
[
  {
    "attacker": [
      {
        "type": "Seasonal",
        "statsType": "operators",
        "statsDetail": "Iq",
        "seasonYear": "Y6",
        "seasonNumber": "S3",
        "matchesPlayed": 3,
        "roundsPlayed": 4,
        "minutesPlayed": 12,
        "matchesWon": 1,
        "matchesLost": 2,
        "roundsWon": 2,
        "roundsLost": 2,
        "kills": 2,
        "assists": 0,
        "death": 3,
        "headshots": 1,
        "meleeKills": 0,
        "teamKills": 0,
        "openingKills": 0,
        "openingDeaths": 1,
        "trades": 0,
        "openingKillTrades": 0,
        "openingDeathTrades": 0,
        "revives": 0,
        "distanceTravelled": 604,
        "winLossRatio": 0.5,
        "killDeathRatio": {
          "value": 0.6667,
          "p": 0
        },
        "headshotAccuracy": {
          "value": 0.5,
          "p": 0
        },
        "killsPerRound": {
          "value": 0.5,
          "p": 0
        },
        "roundsWithAKill": {
          "value": 0.25,
          "p": 0
        },
        "roundsWithMultiKill": {
          "value": 0.25,
          "p": 0
        },
        "roundsWithOpeningKill": {
          "value": 0,
          "p": 0
        },
        "roundsWithOpeningDeath": {
          "value": 0.25,
          "p": 0
        },
        "roundsWithKOST": {
          "value": 0.25,
          "p": 0
        },
        "roundsSurvived": {
          "value": 0.25,
          "p": 0
        },
        "roundsWithAnAce": {
          "value": 0,
          "p": 0
        },
        "roundsWithClutch": {
          "value": 0,
          "p": 0
        },
        "timeAlivePerMatch": 80,
        "timeDeadPerMatch": 60,
        "distancePerRound": 151
      }
    ]
  },
  {
    "defender": [
      {
        "type": "Seasonal",
        "statsType": "operators",
        "statsDetail": "Ela",
        "seasonYear": "Y6",
        "seasonNumber": "S3",
        "matchesPlayed": 3,
        "roundsPlayed": 3,
        "minutesPlayed": 10,
        "matchesWon": 1,
        "matchesLost": 2,
        "roundsWon": 1,
        "roundsLost": 2,
        "kills": 0,
        "assists": 2,
        "death": 3,
        "headshots": 0,
        "meleeKills": 0,
        "teamKills": 0,
        "openingKills": 0,
        "openingDeaths": 1,
        "trades": 0,
        "openingKillTrades": 0,
        "openingDeathTrades": 0,
        "revives": 0,
        "distanceTravelled": 553,
        "winLossRatio": 0.5,
        "killDeathRatio": {
          "value": 0,
          "p": 0
        },
        "headshotAccuracy": {
          "value": 0,
          "p": 0
        },
        "killsPerRound": {
          "value": 0,
          "p": 0
        },
        "roundsWithAKill": {
          "value": 0,
          "p": 0
        },
        "roundsWithMultiKill": {
          "value": 0,
          "p": 0
        },
        "roundsWithOpeningKill": {
          "value": 0,
          "p": 0
        },
        "roundsWithOpeningDeath": {
          "value": 0.3333,
          "p": 0
        },
        "roundsWithKOST": {
          "value": 0,
          "p": 0
        },
        "roundsSurvived": {
          "value": 0,
          "p": 0
        },
        "roundsWithAnAce": {
          "value": 0,
          "p": 0
        },
        "roundsWithClutch": {
          "value": 0,
          "p": 0
        },
        "timeAlivePerMatch": 80,
        "timeDeadPerMatch": 40,
        "distancePerRound": 184.3333
      }
    ]
  }
]

```

## Support

For any questions, bugs or feedback, please use our [Discord](https://discord.gg/Hc4rTJme4T) or create an issue on [Github](https://github.com/CalumW1/R6StatAPI)
