export interface Items {
  items: Item[];
}

export interface Item {
  id: string;
  assetUrl: string;
  itemId: string;
  name: string;
  tags: string[];
  type: string;
  marktetData?: MarketData;
}

export interface MarketData {
  id: string;
  sellStats?: SellStats;
  buyStats?: BuyStats;
  lastSoldAt?: LastSoldAt;
}

export interface SellStats {
  id: string;
  paymentItemId: string;
  lowestPrice: number;
  highestPrice: number;
  activeCount: number;
}

export interface BuyStats {
  id: string;
  paymentItemId: string;
  lowestPrice: number;
  highestPrice: number;
  activeCount: number;
}

export interface LastSoldAt {
  id: string;
  paymentItemId: string;
  price: number;
  performedAt: string;
}

export interface Types {
  type: Type[];
}

export interface Tags {
  rarity: ItemRarity[];
  seasons: Season[];
  operators: Operators[];
  weapon: Weapons[];
  events: Event[];
  esportsTeams: EsportsTeams[];
  other: OtherTypes[];
}

// Transactions
export interface Transactions{
  transactions: Transaction[];
}

export interface Transaction{
  id: string,
  tradeId: string,
  state: string,
  category: string,
  createdAt: string,
  expiresAt: string,
  lastModifiedAt: string,
  tradeItems: Item,
  paymentOptions: PaymentOptions,
}

export interface PaymentOptions {
  quantity: number,
  price: number,
  transactionFee: number
}

export type MarkplaceSearchType = 'buy' | 'sell';

export type SortByOptions =
  | 'Purchase available: high to low'
  | 'Purchase available: low to high'
  | 'Sale available: high to low'
  | 'Sale available: low to high'
  | 'Last sale price: high to low'
  | 'Last sale price: low to high'
  | 'Item names: A-Z'
  | 'Item names: Z-A';

export enum ItemRarity {
  Legendary = 'rarity_legendary',
  SuperRare = 'rarity_superrare',
  Rare = 'rarity_rare',
  Uncommon = 'rarity_uncommon',
}

export type Type =
  | 'WeaponSkin'
  | 'CharacterHeadgear'
  | 'CharacterUniform'
  | 'WeaponAttachmentSkinSet'
  | 'Charm'
  | 'OperatorCardPortrait'
  | 'OperatorCardBackground'
  | 'DroneSkin'
  | 'GadgetSkin';

export type Season =
  | 'Y1S1'
  | 'Y1S2'
  | 'Y1S3'
  | 'Y1S4'
  | 'Y2S1'
  | 'Y2S2'
  | 'Y2S3'
  | 'Y2S4'
  | 'Y3S1'
  | 'Y3S2'
  | 'Y3S3'
  | 'Y3S4'
  | 'Y4S1'
  | 'Y4S2'
  | 'Y4S3'
  | 'Y4S4'
  | 'Y5S1'
  | 'Y5S2'
  | 'Y5S3'
  | 'Y5S4'
  | 'Y6S1'
  | 'Y6S2'
  | 'Y6S3'
  | 'Y6S4'
  | 'Y7S1'
  | 'Y7S2'
  | 'Y7S3'
  | 'Y7S4'
  | 'Y8S1'
  | 'Y8S2'
  | 'Y8S3'
  | 'Y8S4'
  | 'Y9S1'
  | 'Y9S2'
  | 'Y9S3';
// | 'Y9S4';

export enum Operators {
  'Ace' = 'Character.Y5S2.ACE',
  'Alibi' = 'Character.Y3S2.ALIBI',
  'Amaru' = 'Character.Y4S3.AMARU',
  'Aruni' = 'Character.Y5S4.ARUNI',
  'Ash' = 'Character.Legacy.ASH',
  'Azami' = 'Character.Y7S1.AZAMI',
  'Bandit' = 'Character.Legacy.BANDIT',
  'Blackbeard' = 'Character.Legacy.BLACKBEARD',
  'Blitz' = 'Character.Legacy.BLITZ',
  'Brava' = 'Character.Y8S1.BRAVA',
  'Buck' = 'Character.Legacy.BUCK',
  'Capitao' = 'Character.Legacy.CAPITAO',
  'Castle' = 'Character.Legacy.CASTLE',
  'Caveria' = 'Character.Legacy.CAVEIRA',
  'Clash' = 'Character.Y3S3.CLASH',
  'Deimos' = 'Character.Y9S1.DEIMOS',
  'Doc' = 'Character.Legacy.DOC',
  'Dokkaebi' = 'Character.Y2S4.DOKKAEBI',
  'Echo' = 'Character.Legacy.ECHO',
  'Ela' = 'Character.Y2S3.ELA',
  'Fenrir' = 'Character.Y8S2.FENRIR',
  'Finka' = 'Character.Y3S1.FINKA',
  'Flores' = 'Character.Y6S1.FLORES',
  'Frost' = 'Character.Legacy.FROST',
  'Fuze' = 'Character.Legacy.FUZE',
  'Glaz' = 'Character.Legacy.GLAZ',
  'Goyo' = 'Character.Y4S3.GOYO',
  'Gridlock' = 'Character.Y4S1.GRIDLOCK',
  'Grim' = 'Character.Y7S3.GRIM',
  'Hibana' = 'Character.Legacy.HIBANA',
  'Iana' = 'Character.Y5S1.IANA',
  'IQ' = 'Character.Legacy.IQ',
  'Jackal' = 'Character.Y2S1.JACKAL',
  'Jager' = 'Character.Legacy.JAGER',
  'Kaid' = 'Character.Y3S4.KAID',
  'Kali' = 'Character.Y4S4.KALI',
  'Kapkan' = 'Character.Legacy.KAPKAN',
  'Lesion' = 'Character.Y2S3.LESION',
  'Lion' = 'Character.Y3S1.LION',
  'Maestro' = 'Character.Y3S2.MAESTRO',
  'Maverick' = 'Character.Y3S3.MAVERICK',
  'Melusi' = 'Character.Y5S2.MELUSI',
  'Mira' = 'Character.Y2S1.MIRA',
  'Montagne' = 'Character.Legacy.MONTAGNE',
  'Mozzie' = 'Character.Y4S1.MOZZIE',
  'Mute' = 'Character.Legacy.MUTE',
  'Nokk' = 'Character.Y4S2.NOKK',
  'Nomad' = 'Character.Y3S4.NOMAD',
  'Oryx' = 'Character.Y5S1.ORYX',
  'Osa' = 'Character.Y6S3.OSA',
  'Pulse' = 'Character.Legacy.PULSE',
  'Ram' = 'Character.Y8S3.RAM',
  'Rook' = 'Character.Legacy.ROOK',
  'Sens' = 'Character.Y7S2.SENS',
  'Sentry' = 'Character.Y9S2.SENTRY',
  'Skopos' = 'Character.Y9S3.SKOPOS',
  'Sledge' = 'Character.Legacy.SLEDGE',
  'Smoke' = 'Character.Legacy.SMOKE',
  'Solis' = 'Character.Y7S4.SOLIS',
  'Striker' = 'Character.Y9S2.STRIKER',
  'Tachanka' = 'Character.Legacy.TACHANKA',
  'Thatcher' = 'Character.Legacy.THATCHER',
  'Thermite' = 'Character.Legacy.THERMITE',
  'Thorn' = 'Character.Y6S4.THORN',
  'Thunderbird' = 'Character.Y6S2.THUNDERBIRD',
  'Tubarao' = 'Character.Y8S4.TUBARAO',
  'Twitch' = 'Character.Legacy.TWITCH',
  'Valkrie' = 'Character.Legacy.VALKYRIE',
  'Vigil' = 'Character.Y2S4.VIGIL',
  'Wamai' = 'Character.Y4S4.WAMAI',
  'Warden' = 'Character.Y4S2.WARDEN',
  'Ying' = 'Character.Y2S3.YING',
  'Zero' = 'Character.Y5S3.ZERO',
  'Zofia' = 'Character.Y2S4.ZOFIA',
}

export enum Weapons {
  '.44 Mag Semi-Auto' = '44_Mag_Semi-Auto',
  '5.7 USG' = '57_USG',
  '6P41' = '6P41',
  '9mm C1' = '9mm_C1',
  '9x19VSN' = '9x19VS',
  '416-C CARBINE' = '416-C_CARBINE',
  'FourOneSeven' = '417', // Cant use just numbers in the name, this will need to do
  '552 COMMANDO' = '552_COMMANDO',
  '556XL' = '556XL',
  '1911 TACOPS' = '1911_TACOPS',
  'ACS12' = 'ACS12',
  'AK-12' = 'AK-12',
  'AK-74M' = 'AK-74M',
  'ALDA 5.56' = 'ALDA_556',
  'AR-15.50' = 'AR-1550',
  'AR33' = 'AR33',
  'ARX200' = 'ARX200',
  'AUG A2' = 'AUG_A2',
  'AUG A3' = 'AUG_A3',
  'Bailiff 410' = 'Bailiff_410',
  'BEARING 9' = 'BEARING_9',
  'BOSG.12.2' = 'BOSG122',
  'C7E' = 'C7E',
  'C8-SFW' = 'C8-SFW',
  'C75 Auto' = 'C75_Auto',
  'CAMRS' = 'CAMRS',
  'COMMANDO 9' = 'CAMMANDO_9',
  'CSRX 300' = 'CSRX300',
  'D-50' = 'D-50',
  'DP27' = 'DP27',
  'F2' = 'F2',
  'F90' = 'F90',
  'FMG-9' = 'FMG-9',
  'FO-12' = 'FO-12',
  'G8A1' = 'G8A1',
  'G36C' = 'G36C',
  'GONNE-6' = 'GONNE-6',
  'GSH-18' = 'GSH-18',
  'ITA12L' = 'ITA12L',
  'ITA12S' = 'ITA12S',
  'K1A' = 'K1A',
  'KERATOS .357' = 'KERATOS_357',
  'L85A2' = 'L85A2',
  'LFP586' = 'LFP586',
  'LMG-E' = 'LMG-E',
  'M4' = 'M4',
  'M12' = 'M12',
  'M45 MEUSOC' = 'M45_MEUSOC',
  'M249' = 'M249',
  'M249 SAW' = 'M249_SAW',
  'M590A1' = 'M590A1',
  'M762' = 'M762',
  'M870' = 'M870',
  'M1014' = 'M1014',
  'Mk 14 EBR' = 'Mk_14_EBR',
  'MK1 9mm' = 'MK1_9mm',
  'MK17 CQB' = 'MK17_CQB',
  'MP5' = 'MP5',
  'MP5K' = 'MP5K',
  'MP5SD' = 'MP5SD',
  'MP7' = 'MP7',
  'MPX' = 'MPX',
  'Mx4 Strom' = 'Mx4_Strom',
  'OTs-03' = 'OTs-03',
  'P-10C' = 'P-10C',
  'P9' = 'P9',
  'P10 RONI' = 'P10_RONI',
  'P12' = 'P12',
  'P90' = 'P90',
  'P226 MK 25' = 'P226_MK_25',
  'P229' = 'P229',
  'PARA-308' = 'PARA-308',
  'PDW9' = 'PDW9',
  'PMM' = 'PMM',
  'POF-9' = 'POF-9',
  'PRB92' = 'PRB92',
  'Q-929' = 'Q-929',
  'R4-C' = 'R4-C',
  'RG15' = 'RG15',
  'SASG-12' = 'SASG-12',
  'SC3000K' = 'SC3000K',
  'SCORPION EVO 3 A1' = 'SCORPION_EVO_3_A1',
  'SDP 9mm' = 'SDP_9mm',
  'SG-CQB' = 'SG-CQB',
  'SIX12' = 'SIX12',
  'SIX12 SD' = 'SIX12_SD',
  'SMG-11' = 'SMG-11',
  'SMG-12' = 'SMG-12',
  'SPAS-12' = 'SPAS-12',
  'SPAS-15' = 'SPAS-15',
  'SPEAR .308' = 'SPEAR_308',
  'SPSMG9' = 'SPSMG9',
  'SR-25' = 'SR-25',
  'SUPER 90' = 'SUPER_90',
  'SUPER SHORTY' = 'SUPER_SHORTY',
  'SUPERNOVA' = 'SUPERNOVA',
  'T-5 SMG' = 'T-5_SMG',
  'T-95 LSW' = 'T-95_LSW',
  'TCSG12' = 'TCSG12',
  'TYPE-89' = 'TYPE-89',
  'UMP45' = 'UMP45',
  'USP40' = 'USP40',
  'UZK50GI' = 'UZK50GI',
  'V308' = 'V308',
  'VECTOR .45 ACP' = 'VECTOR_45_ACP',
}

export enum Event {
  Apocalypse = 'beret',
  Containment = 'quarantine',
  DoktorsCurse = 'doktorcurse',
  FreezeForAll = 'frosty',
  MuteFleshAndMetal = 'bot',
  Rengoku = 'toky',
  Showdown = 'showdown',
  SnowBrawl = 'snowball',
  SugarFright = 'telly',
  TheGrandLarceny = 'mafia',
  TheTeddyConflict = 'rimv2',
}

export enum EsportsTeams {
  '00Nation' = '00NATION',
  Astralis = 'ATRALIS',
  'Chaos EC' = 'CHAOS_EC',
  Cloud9 = 'CLOUD9',
  'Fav Gaming' = 'FAV_GAMING',
  'Giants Gaming' = 'GIANTS_GAMING',
  'Guts Gaming' = 'GUTS_GAMING',
  Heroic = 'HEROIC',
  Intz = 'INTZ',
  'Invictus Gaming' = 'INVICTUS_GAMING',
  Mirage = 'MIRAGE',
  'MNM Gaming' = 'MNM_GAMING',
  'Natus Vincere' = 'NATUS_VINCERE',
  'Nora Rengo' = 'NORA_RENGO',
  Order = 'ORDER',
  'Parabellum Esports' = 'PARABELLUM_ESPORTS',
  QConfirm = 'QCONFIRM',
  Santos = 'SANTOS',
  'Team Empire' = 'TEAM_EMPIRE',
  'Team Vitality' = 'TEAM_VITALITY',
  'The Chiefs' = 'THE_CHIEFS',
  'Xavier Esports' = 'XAVIER_ESPORTS',
  XSet = 'XSET',
}

export enum OtherTypes {
  Battlepass = 'acq_battlepass',
  Seasonal = 'Seasonal',
  Universal = 'Universal',
}

export interface SortBy {
  direction: string;
  field: string;
  orderType?: string;
  paymentItemId: string;
}

// Sort By options

// Defualt for sell option
export const PurchaseAvailableHighLow: SortBy = {
  direction: 'DESC',
  field: 'ACTIVE_COUNT',
  orderType: 'Buy',
  paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
};

export const PurchaseAvailableLowHigh: SortBy = {
  direction: 'ASC',
  field: 'ACTIVE_COUNT',
  orderType: 'Buy',
  paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
};

// Default for buy option
export const SaleAvailableHighLow: SortBy = {
  direction: 'DESC',
  field: 'ACTIVE_COUNT',
  orderType: 'Sell',
  paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
};

export const SaleAvailableLowHigh: SortBy = {
  direction: 'ASC',
  field: 'ACTIVE_COUNT',
  orderType: 'Sell',
  paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
};

export const LastSalePriceHighLow: SortBy = {
  direction: 'DESC',
  field: 'LAST_TRANSACTION_PRICE',
  paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
};

export const LastSalePriceLowHigh: SortBy = {
  direction: 'ASC',
  field: 'LAST_TRANSACTION_PRICE',
  paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
};

export const ItemNamesDESC: SortBy = {
  direction: 'DESC',
  field: 'DISPLAY_NAME',
  paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
};

export const ItemNamesASC: SortBy = {
  direction: 'ASC',
  field: 'DISPLAY_NAME',
  paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
};
