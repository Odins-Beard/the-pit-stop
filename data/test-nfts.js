const TEST_NFTS = [
  {
    "name": "#8",
    "tokenId": "9",
    "image": "assets/images/8.jpeg",
    "attributes": {
      "ACCELERATION": 5,
      "BACKGROUND": "TPS Garage",
      "BOOSTER": "None",
      "CLASS": "Sports",
      "COLOUR": "Red",
      "ERA": "Classic",
      "HANDLING": 5,
      "MODEL": "UNI08",
      "PRESTIGE": 4,
      "RARITY": "Unique",
      "SPEED": 5
    }
  },
  {
    "name": "#181",
    "tokenId": "182",
    "image": "assets/images/181.jpeg",
    "attributes": {
      "ACCELERATION": 5,
      "BACKGROUND": "Forest",
      "BOOSTER": "None",
      "CLASS": "Sports",
      "COLOUR": "Silver",
      "ERA": "Classic",
      "HANDLING": 4,
      "MODEL": "SP18",
      "PRESTIGE": 5,
      "RARITY": "Mythic",
      "SPEED": 4
    }
  },
  {
    "name": "#254",
    "tokenId": "255",
    "image": "assets/images/254.jpeg",
    "attributes": {
      "ACCELERATION": 4,
      "BACKGROUND": "Forest",
      "BOOSTER": "H",
      "CLASS": "Yute",
      "COLOUR": "Blue",
      "ERA": "Modern",
      "HANDLING": 2,
      "MODEL": "TR05",
      "PRESTIGE": 1,
      "RARITY": "Uncommon",
      "SPEED": 4
    }
  },
  {
    "name": "#302",
    "tokenId": "303",
    "image": "assets/images/302.jpeg",
    "attributes": {
      "ACCELERATION": 3,
      "BACKGROUND": "Forest",
      "BOOSTER": "None",
      "CLASS": "Hatchback",
      "COLOUR": "Blue",
      "ERA": "Modern",
      "HANDLING": 3,
      "MODEL": "HB13",
      "PRESTIGE": 1,
      "RARITY": "Common",
      "SPEED": 2
    }
  },
  {
    "name": "#381",
    "tokenId": "382",
    "image": "assets/images/381.jpeg",
    "attributes": {
      "ACCELERATION": 3,
      "BACKGROUND": "North",
      "BOOSTER": "AS",
      "CLASS": "Saloon",
      "COLOUR": "Blue",
      "ERA": "Modern",
      "HANDLING": 2,
      "MODEL": "SA04",
      "PRESTIGE": 1,
      "RARITY": "Uncommon",
      "SPEED": 4
    }
  },
  {
    "name": "#394",
    "tokenId": "395",
    "image": "assets/images/394.jpeg",
    "attributes": {
      "ACCELERATION": 3,
      "BACKGROUND": "Asia",
      "BOOSTER": "A",
      "CLASS": "Coupe",
      "COLOUR": "Grey",
      "ERA": "Modern",
      "HANDLING": 4,
      "MODEL": "CO15",
      "PRESTIGE": 2,
      "RARITY": "Rare",
      "SPEED": 4
    }
  },
  {
    "name": "#447",
    "tokenId": "448",
    "image": "assets/images/447.jpeg",
    "attributes": {
      "ACCELERATION": 4,
      "BACKGROUND": "Asia",
      "BOOSTER": "A",
      "CLASS": "Saloon",
      "COLOUR": "Silver",
      "ERA": "Retro",
      "HANDLING": 3,
      "MODEL": "SA05",
      "PRESTIGE": 2,
      "RARITY": "Uncommon",
      "SPEED": 3
    }
  },
  {
    "name": "#555",
    "tokenId": "556",
    "image": "assets/images/555.jpeg",
    "attributes": {
      "ACCELERATION": 4,
      "BACKGROUND": "North",
      "BOOSTER": "ASH",
      "CLASS": "Saloon",
      "COLOUR": "Blue",
      "ERA": "Modern",
      "HANDLING": 4,
      "MODEL": "SA13",
      "PRESTIGE": 1,
      "RARITY": "Uncommon",
      "SPEED": 2
    }
  },
  {
    "name": "#558",
    "tokenId": "559",
    "image": "assets/images/558.jpeg",
    "attributes": {
      "ACCELERATION": 4,
      "BACKGROUND": "Forest",
      "BOOSTER": "H",
      "CLASS": "Muscle Car",
      "COLOUR": "Black",
      "ERA": "Classic",
      "HANDLING": 3,
      "MODEL": "MC08",
      "PRESTIGE": 4,
      "RARITY": "Legendary",
      "SPEED": 5
    }
  },
  {
    "name": "#693",
    "tokenId": "694",
    "image": "assets/images/693.jpeg",
    "attributes": {
      "ACCELERATION": 3,
      "BACKGROUND": "Asia",
      "BOOSTER": "S",
      "CLASS": "Muscle Car",
      "COLOUR": "White",
      "ERA": "Modern",
      "HANDLING": 4,
      "MODEL": "MC01",
      "PRESTIGE": 2,
      "RARITY": "Rare",
      "SPEED": 4
    }
  },
  {
    "name": "#710",
    "tokenId": "711",
    "image": "assets/images/710.jpeg",
    "attributes": {
      "ACCELERATION": 4,
      "BACKGROUND": "Showroom",
      "BOOSTER": "P",
      "CLASS": "Sports",
      "COLOUR": "Gold",
      "ERA": "Modern",
      "HANDLING": 3,
      "MODEL": "SP08",
      "PRESTIGE": 3,
      "RARITY": "Legendary",
      "SPEED": 5
    }
  },
  {
    "name": "#864",
    "tokenId": "865",
    "image": "assets/images/864.jpeg",
    "attributes": {
      "ACCELERATION": 4,
      "BACKGROUND": "Asia",
      "BOOSTER": "SH",
      "CLASS": "Sports",
      "COLOUR": "Grey",
      "ERA": "Modern",
      "HANDLING": 3,
      "MODEL": "SP02",
      "PRESTIGE": 3,
      "RARITY": "Legendary",
      "SPEED": 5
    }
  },
  {
      "name": "#905",
      "tokenId": "906",
      "image": "assets/images/905.jpeg",
      "attributes": {
          "ACCELERATION": 4,
          "BACKGROUND": "Forest",
          "BOOSTER": "NS",
          "CLASS": "Saloon",
          "COLOUR": "Silver",
          "ERA": "Modern",
          "HANDLING": 1,
          "MODEL": "SA14",
          "PRESTIGE": 2,
          "RARITY": "Uncommon",
          "SPEED": 4
      }
  },  
  {
      "name": "#1018",
      "tokenId": "1019",
      "image": "assets/images/1018.jpeg",
      "attributes": {
          "ACCELERATION": 2,
          "BACKGROUND": "Asia",
          "BOOSTER": "NH",
          "CLASS": "Van",
          "COLOUR": "Green",
          "ERA": "Retro",
          "HANDLING": 1,
          "MODEL": "VA01",
          "PRESTIGE": 1,
          "RARITY": "Common",
          "SPEED": 4
      }
  }  
];