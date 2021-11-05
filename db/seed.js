const client = require("./client");
const faker = require("faker");
const { createUser } = require("./users");

async function seedDB() {
  // client.connect();
  await client.query(`  
  DROP TABLE IF EXISTS products_orders;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS categories;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS users;
  
    
    CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            platform VARCHAR(255) NOT NULL
            );

        CREATE TABLE products (

            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            price DEC (8,2),
            quantity INT NOT NULL,
            category_id INT REFERENCES categories(id),
            image VARCHAR(255)
            

        );

        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          admin BOOLEAN NOT NULL DEFAULT false,
          country VARCHAR(255) NOT NULL,
          fullname VARCHAR(255) NOT NULL,
          phone BIGSERIAL UNIQUE NOT NULL,
          address VARCHAR(255) NOT NULL,
          city VARCHAR(255) NOT NULL,
          state VARCHAR(255) NOT NULL,
          zip INT NOT NULL
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        status VARCHAR(255) NOT NULL DEFAULT 'cart'
      );

      
     CREATE TABLE products_orders (
       id SERIAL PRIMARY KEY,
       product_id INT REFERENCES products(id),
       order_id INT REFERENCES orders(id),
       purchase_price DEC (8,2) NOT NULL,
       quantity INT NOT NULL
     )

 
   
        `);
  let categories = [
    { platform: "PC" },
    { platform: "XBox" },
    { platform: "Playstation" },
    { platform: "Nintendo Switch" },
    { platform: "Nintendo 64" },
    { platform: "Nintendo GameCube" },
    { platform: "Sega Dreamcast" },
  ];
  for (let category of categories) {
    await client.query(
      `
    INSERT INTO categories(platform) VALUES($1)
    
    `,
      [category.platform]
    );
  }

  const products = [
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 1,
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 2,
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 3,
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 7,
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 1,
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 3,
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 5,
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 3,
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 1,
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 25.99,
      quantity: 5000,
      categoryId: 2,
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 4,
    },
    {
      title: "Fallout",
      description:
        "Survive in Southern California 84 years after nuclear fallout. Rated M",
      price: 25.99,
      quantity: 57,
      categoryId: 1,
    },
    {
      title: "Fallout 2",
      description:
        "Survive in Southern Oregon 164 years after nuclear fallout. Rated M",
      price: 30.99,
      quantity: 107,
      categoryId: 1,
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 206,
      categoryId: 1,
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 203,
      categoryId: 2,
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 203,
      categoryId: 3,
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 3,
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 2,
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 1,
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters. Rated M",
      price: 23.99,
      quantity: 63,
      categoryId: 1,
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters. Rated M",
      price: 23.99,
      quantity: 63,
      categoryId: 2,
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters. Rated M",
      price: 23.99,
      quantity: 63,
      categoryId: 3,
    },
    {
      title: "Gears of War 2",
      description: "Save humanity again from a horde of monsters. Rated M",
      price: 29.99,
      quantity: 98,
      categoryId: 1,
    },
    {
      title: "Gears of War 2",
      description: "Save humanity again from a horde of monsters. Rated M",
      price: 29.99,
      quantity: 98,
      categoryId: 2,
    },
    {
      title: "Gears of War 2",
      description: "Save humanity again from a horde of monsters. Rated M",
      price: 29.99,
      quantity: 98,
      categoryId: 3,
    },
    {
      title: "Gears of War 3",
      description:
        "Save humanity a third time from a horde of monsters. Rated M",
      price: 32.99,
      quantity: 1500,
      categoryId: 1,
    },
    {
      title: "Gears of War 3",
      description:
        "Save humanity a third time from a horde of monsters. Rated M",
      price: 32.99,
      quantity: 1500,
      categoryId: 2,
    },
    {
      title: "Gears of War 3",
      description:
        "Save humanity a third time from a horde of monsters. Rated M",
      price: 32.99,
      quantity: 1500,
      categoryId: 3,
    },
    {
      title: "Gears of War 4",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 40.99,
      quantity: 3500,
      categoryId: 1,
    },
    {
      title: "Gears of War 4",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 40.99,
      quantity: 3500,
      categoryId: 2,
    },
    {
      title: "Gears of War 4",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 40.99,
      quantity: 3500,
      categoryId: 3,
    },
    {
      title: "Gears of War 5",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 55.99,
      quantity: 5500,
      categoryId: 1,
    },
    {
      title: "Gears of War 5",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 55.99,
      quantity: 5500,
      categoryId: 2,
    },
    {
      title: "Gears of War 5",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 55.99,
      quantity: 5500,
      categoryId: 3,
    },
    {
      title: "FIFA 22",
      description: "Play as your favorite soccer teams and players. Rated E",
      price: 59.99,
      quantity: 50000,
      categoryId: 1,
    },

    {
      title: "FIFA 22",
      description: "Play as your favorite soccer teams and players. Rated E",
      price: 59.99,
      quantity: 50000,
      categoryId: 2,
    },
    {
      title: "FIFA 22",
      description: "Play as your favorite soccer teams and players. Rated E",
      price: 59.99,
      quantity: 50000,
      categoryId: 3,
    },
    {
      title: "FIFA 22",
      description: "Play as your favorite soccer teams and players. Rated E",
      price: 59.99,
      quantity: 50000,
      categoryId: 4,
    },
    {
      title: "NBA 2k22",
      description: "Play as your favorite NBA teams and players. Rated E",
      price: 59.99,
      quantity: 75000,
      categoryId: 1,
    },
    {
      title: "NBA 2k22",
      description: "Play as your favorite NBA teams and players. Rated E",
      price: 59.99,
      quantity: 75000,
      categoryId: 2,
    },
    {
      title: "NBA 2k22",
      description: "Play as your favorite NBA teams and players. Rated E",
      price: 59.99,
      quantity: 75000,
      categoryId: 3,
    },
    {
      title: "NBA 2k22",
      description: "Play as your favorite NBA teams and players. Rated E",
      price: 59.99,
      quantity: 75000,
      categoryId: 4,
    },

    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 1,
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 2,
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 3,
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 4,
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 1,
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 2,
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 3,
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 4,
    },
    {
      title: "Call of Duty Vanguard",
      description: "Play as a special-ops soldier during WW2. Rated M ",
      price: 40.99,
      quantity: 100000,
      categoryId: 1,
    },
    {
      title: "Call of Duty Vanguard",
      description: "Play as a special-ops soldier during WW2. Rated M ",
      price: 40.99,
      quantity: 100000,
      categoryId: 2,
    },
    {
      title: "Call of Duty Vanguard",
      description: "Play as a special-ops soldier during WW2. Rated M ",
      price: 40.99,
      quantity: 100000,
      categoryId: 3,
    },
    {
      title: "Call of Duty Vanguard",
      description: "Play as a special-ops soldier during WW2. Rated M ",
      price: 40.99,
      quantity: 100000,
      categoryId: 4,
    },
    {
      title: "Diablo",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo. Rated M",
      price: 35.99,
      quantity: 67,
      categoryId: 1,
    },
    {
      title: "Diablo",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo. Rated M",
      price: 35.99,
      quantity: 67,
      categoryId: 3,
    },
    {
      title: "Diablo 2",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo again. Rated M",
      price: 45.99,
      quantity: 670,
      categoryId: 1,
    },
    {
      title: "Diablo 2",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo again. Rated M",
      price: 45.99,
      quantity: 670,
      categoryId: 2,
    },
    {
      title: "Diablo 2",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo again. Rated M",
      price: 45.99,
      quantity: 670,
      categoryId: 3,
    },
    {
      title: "Diablo 2",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo again. Rated M",
      price: 45.99,
      quantity: 670,
      categoryId: 4,
    },
    {
      title: "Diablo 3",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo a third time. Rated M",
      price: 49.99,
      quantity: 7500,
      categoryId: 1,
    },
    {
      title: "Diablo 3",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo a third time. Rated M",
      price: 49.99,
      quantity: 7500,
      categoryId: 2,
    },
    {
      title: "Diablo 3",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo a third time. Rated M",
      price: 49.99,
      quantity: 7500,
      categoryId: 3,
    },
    {
      title: "Diablo 3",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo a third time. Rated M",
      price: 49.99,
      quantity: 7500,
      categoryId: 4,
    },
    {
      title: "Fortnight",
      description:
        "Battle against others in this cartoonish online battle royale style game. Rated T",
      price: 45.99,
      quantity: 20000,
      categoryId: 1,
    },
    {
      title: "Fortnight",
      description:
        "Battle against others in this cartoonish online battle royale style game. Rated T",
      price: 45.99,
      quantity: 20000,
      categoryId: 2,
    },
    {
      title: "Fortnight",
      description:
        "Battle against others in this cartoonish online battle royale style game. Rated T",
      price: 45.99,
      quantity: 20000,
      categoryId: 3,
    },
    {
      title: "Fortnight",
      description:
        "Battle against others in this cartoonish online battle royale style game. Rated T",
      price: 45.99,
      quantity: 20000,
      categoryId: 4,
    },
    {
      title: "Overwatch",
      description:
        "Battle against other teams of players in the multiplayer first person shooter. Rated T",
      price: 50.99,
      quantity: 15000,
      categoryId: 1,
    },
    {
      title: "Overwatch",
      description:
        "Battle against other teams of players in the multiplayer first person shooter. Rated T",
      price: 50.99,
      quantity: 15000,
      categoryId: 2,
    },
    {
      title: "Overwatch",
      description:
        "Battle against other teams of players in the multiplayer first person shooter. Rated T",
      price: 50.99,
      quantity: 15000,
      categoryId: 3,
    },
    {
      title: "Overwatch",
      description:
        "Battle against other teams of players in the multiplayer first person shooter. Rated T",
      price: 50.99,
      quantity: 15000,
      categoryId: 4,
    },
    {
      title: "Super Smash Bros",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Rated E",
      price: 35.99,
      quantity: 4300,
      categoryId: 4,
    },
    {
      title: "Super Smash Bros",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Rated E",
      price: 35.99,
      quantity: 4300,
      categoryId: 5,
    },
    {
      title: "Super Smash Bros",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Rated E",
      price: 35.99,
      quantity: 4300,
      categoryId: 6,
    },
    {
      title: "Super Smash Bros",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Rated E",
      price: 35.99,
      quantity: 4300,
      categoryId: 7,
    },
    {
      title: "Super Smash Bros Brawl",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with more characters and maps Rated E",
      price: 40.99,
      quantity: 7000,
      categoryId: 4,
    },

    {
      title: "Super Smash Bros Brawl",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with more characters and maps Rated E",
      price: 40.99,
      quantity: 7000,
      categoryId: 6,
    },
    {
      title: "Super Smash Bros Ultimate",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with even more characters and maps Rated E",
      price: 50.99,
      quantity: 73000,
      categoryId: 4,
    },
    {
      title: "Super Smash Bros Ultimate",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with even more characters and maps Rated E",
      price: 50.99,
      quantity: 73000,
      categoryId: 3,
    },
    {
      title: "Super Smash Bros Ultimate",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with even more characters and maps Rated E",
      price: 50.99,
      quantity: 73000,
      categoryId: 2,
    },
    {
      title: "Star Fox 64",
      description:
        "Defend Corneria against invading forces in the 3D rail shooter. Rated E",
      price: 45.99,
      quantity: 430,
      categoryId: 5,
    },
    {
      title: "Star Fox Adventures",
      description: "Prevent the Lylat System from sure destruction. Rated E",
      price: 40.99,
      quantity: 2350,
      categoryId: 6,
    },
    {
      title: "Star Fox Assault",
      description:
        "Help Fox McCloud's team save the Lylat System from Aparoids. Rated E",
      price: 50.99,
      quantity: 3600,
      categoryId: 6,
    },
    {
      title: "PlayerUnknown's Battlegrounds",
      description: "Online multiplayer battle royale style game. Rated M",
      price: 45.99,
      quantity: 7800,
      categoryId: 1,
    },
    {
      title: "League of Legends",
      description: "multiplayer online battle arena video game. Rated T",
      price: 50.99,
      quantity: 8500,
      categoryId: 1,
    },
    {
      title: "Minecraft",
      description:
        "Sandbox video game. If you can dream it, you can build it in Minecraft. Rated E",
      price: 45.99,
      quantity: 4300,
      categoryId: 1,
    },
    {
      title: "Minecraft",
      description:
        "Sandbox video game. If you can dream it, you can build it in Minecraft. Rated E",
      price: 45.99,
      quantity: 4300,
      categoryId: 2,
    },
    {
      title: "Minecraft",
      description:
        "Sandbox video game. If you can dream it, you can build it in Minecraft. Rated E",
      price: 45.99,
      quantity: 4300,
      categoryId: 3,
    },
    {
      title: "Minecraft",
      description:
        "Sandbox video game. If you can dream it, you can build it in Minecraft. Rated E",
      price: 45.99,
      quantity: 4300,
      categoryId: 4,
    },
    {
      title: "The Elder Scrolls: Arena",
      description:
        "Open-World action role-player style game. Travel around Tamriel while doing a bunch of quests. Rated M",
      price: 35.99,
      quantity: 650,
      categoryId: 1,
    },
    {
      title: "The Elder Scrolls II: Daggerfall",
      description:
        "Open-World action role-player style game. Travel around Iliac Bay while doing a bunch of quests. Rated M",
      price: 37.99,
      quantity: 840,
      categoryId: 1,
    },
    {
      title: "The Elder Scrolls III: Morrowind",
      description:
        "Open-World action role-player style game. Travel around Morrowind while doing a bunch of quests. Rated M",
      price: 40.99,
      quantity: 1100,
      categoryId: 1,
    },
    {
      title: "The Elder Scrolls III: Morrowind",
      description:
        "Open-World action role-player style game. Travel around Morrowind while doing a bunch of quests. Rated M",
      price: 40.99,
      quantity: 1100,
      categoryId: 2,
    },
    {
      title: "The Elder Scrolls III: Morrowind",
      description:
        "Open-World action role-player style game. Travel around Morrowind while doing a bunch of quests. Rated M",
      price: 40.99,
      quantity: 1100,
      categoryId: 3,
    },
    {
      title: "The Elder Scrolls IV: Oblivion",
      description:
        "Open-World action role-player style game. Travel around Cyrodiil while doing a bunch of quests. Rated M",
      price: 43.99,
      quantity: 1750,
      categoryId: 1,
    },
    {
      title: "The Elder Scrolls IV: Oblivion",
      description:
        "Open-World action role-player style game. Travel around Cyrodiil while doing a bunch of quests. Rated M",
      price: 43.99,
      quantity: 1750,
      categoryId: 2,
    },
    {
      title: "The Elder Scrolls IV: Oblivion",
      description:
        "Open-World action role-player style game. Travel around Cyrodiil while doing a bunch of quests. Rated M",
      price: 43.99,
      quantity: 1750,
      categoryId: 3,
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      description:
        "Open-World action role-player style game. Travel around Skyrim while doing a bunch of quests. Rated M",
      price: 50.99,
      quantity: 5500,
      categoryId: 1,
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      description:
        "Open-World action role-player style game. Travel around Skyrim while doing a bunch of quests. Rated M",
      price: 50.99,
      quantity: 5500,
      categoryId: 2,
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      description:
        "Open-World action role-player style game. Travel around Skyrim while doing a bunch of quests. Rated M",
      price: 50.99,
      quantity: 5500,
      categoryId: 3,
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      description:
        "Open-World action role-player style game. Travel around Skyrim while doing a bunch of quests. Rated M",
      price: 50.99,
      quantity: 5500,
      categoryId: 4,
    },
    {
      title: "Apex Legends",
      description: "free to play battle royale-hero shooter style game",
      price: 0.0,
      quantity: 10000,
      categoryId: 1,
    },
    {
      title: "Apex Legends",
      description: "free to play battle royale-hero shooter style game",
      price: 0.0,
      quantity: 10000,
      categoryId: 2,
    },
    {
      title: "Apex Legends",
      description: "free to play battle royale-hero shooter style game",
      price: 0.0,
      quantity: 10000,
      categoryId: 3,
    },
    {
      title: "Apex Legends",
      description: "free to play battle royale-hero shooter style game",
      price: 0.0,
      quantity: 10000,
      categoryId: 4,
    },
    {
      title: "Final Fantasy",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Super Mario",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Mario Kart",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Halo",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "007 Golden Eye",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Zelda",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Sonic",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Crazy taxi",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Half-life",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Resident Evil",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Pokemon",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Animal Crossing",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Sims",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
  ];

  for (let product of products) {
    await client.query(
      `
    INSERT INTO products(title, description, price, quantity, category_id) VALUES ($1,$2,$3,$4,$5);
    `,
      [
        product.title,
        product.description,
        product.price,
        product.quantity,
        product.categoryId,
      ]
    );
  }

  const users = [
    {
      email: "pcasanave@gmail.com",
      password: "BAPadmin",
      admin: "true",
      country: "USA",
      fullname: "Pete Casanave",
      phone: 123456789,
      address: "123 Fake St",
      city: "New Orleans",
      state: "LA",
      zip: 70003,
    },
    {
      email: "abussell@gmail.com",
      password: "BAPadmin",
      admin: "true",
      country: "USA",
      fullname: "Ashlee Bussell",
      phone: 987654321,
      address: "123 Fake St",
      city: "New Orleans",
      state: "LA",
      zip: 70003,
    },
    {
      email: "breeves@gmail.com",
      password: "BAPadmin",
      admin: "true",
      country: "USA",
      fullname: "Brian Reeves",
      phone: 132456789,
      address: "123 Fake St",
      city: "New Orleans",
      state: "LA",
      zip: 70003,
    },
  ];

  for (let user of users) {
    await createUser({
      email: user.email,
      password: user.password,
      admin: user.admin,
      country: user.country,
      fullname: user.fullname,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      zip: user.zip,
    });
  }

  const orders = [
    { user_id: 1, status: "cart" },
    { user_id: 3, status: "shipped" },
    { user_id: 2, status: "delivered" },
  ];

  for (let order of orders) {
    await client.query(
      `
    INSERT INTO orders(user_id, status) VALUES ($1,$2)
    `,
      [order.user_id, order.status]
    );
  }

  const products_orders = [
    {
      product_id: 2,
      order_id: 3,
      purchase_price: 31.0,
      quantity: 2,
    },
  ];

  for (let products_order of products_orders) {
    await client.query(
      `
    INSERT INTO products_orders(product_id, order_id, purchase_price, quantity) VALUES ($1,$2,$3,$4)
    `,
      [
        products_order.product_id,
        products_order.order_id,
        products_order.purchase_price,
        products_order.quantity,
      ]
    );
  }
  console.log("Database seeded");
}

seedDB();

//     CREATE TABLE reviews (
//         id SERIAL PRIMARY KEY,
//         productId INT REFERENCES products(id),
//         userId INT REFERENCES users(id),
//         review VARCHAR(255) NOT NULL,
//         rating INT NOT NULL

//     );

//uploading pictures of products
//  -in React, use input tag with type file, in onChange save e.target.files[0] in state
//  -in form onSubmit want to send to server using POST request (fetch, method: POST)
/*  
when were sending a file, we have to use form data instead of json.stringify 
(const formData = new FormData()
formData.append())

npm i multer, const upload = multer({dest: "public/images"}), upload.single("image (name for formData)")

DATABASE: 
  -images are VARCHAR
*/
