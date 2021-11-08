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
            image VARCHAR(255),
            active BOOLEAN NOT NULL DEFAULT true
            

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
          zip INT NOT NULL,
          active BOOLEAN NOT NULL DEFAULT true
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
      image: "https://iconape.com/wp-content/files/mz/133421/svg/133421.svg",
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 2,
      image: "https://iconape.com/wp-content/files/mz/133421/svg/133421.svg",
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 3,
      image: "https://iconape.com/wp-content/files/mz/133421/svg/133421.svg",
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 7,
      image: "https://iconape.com/wp-content/files/mz/133421/svg/133421.svg",
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 1,
      image:
        "https://images.gog-statics.com/344ef1668564cd4255fd069fa560db4e1aa1edaef7cec668ef68daf9037d7fdc.jpg",
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 3,
      image:
        "https://images.gog-statics.com/344ef1668564cd4255fd069fa560db4e1aa1edaef7cec668ef68daf9037d7fdc.jpg",
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 5,
      image:
        "https://images.gog-statics.com/344ef1668564cd4255fd069fa560db4e1aa1edaef7cec668ef68daf9037d7fdc.jpg",
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 3,
      image:
        "https://mortalkombatgamessupport.wbgames.com/hc/article_attachments/360058831074/MK_11_-_Logo.jpg",
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 1,
      image:
        "https://mortalkombatgamessupport.wbgames.com/hc/article_attachments/360058831074/MK_11_-_Logo.jpg",
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 25.99,
      quantity: 5000,
      categoryId: 2,
      image:
        "https://mortalkombatgamessupport.wbgames.com/hc/article_attachments/360058831074/MK_11_-_Logo.jpg",
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 4,
      image:
        "https://mortalkombatgamessupport.wbgames.com/hc/article_attachments/360058831074/MK_11_-_Logo.jpg",
    },
    {
      title: "Fallout",
      description:
        "Survive in Southern California 84 years after nuclear fallout. Rated M",
      price: 25.99,
      quantity: 57,
      categoryId: 1,
      image:
        "https://www.mobygames.com/images/promo/original/1472789273-2517358647.jpg",
    },
    {
      title: "Fallout 2",
      description:
        "Survive in Southern Oregon 164 years after nuclear fallout. Rated M",
      price: 30.99,
      quantity: 107,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/4/46/FALLOUT.png/revision/latest?cb=20151109231600",
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 206,
      categoryId: 1,
      image:
        "https://lh3.googleusercontent.com/proxy/Z5JjMCKjMWcZ_hirVacee4uXDci9Fqffd7mrkgQlHk2CCm90yRScJ7K69tLbrziSJtx_AUYMWw8d_uXYAs03gyEBQBaxEXHVhTiGgHZyOyYctGQIPjdcqOsc2g",
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 203,
      categoryId: 2,
      image:
        "https://lh3.googleusercontent.com/proxy/Z5JjMCKjMWcZ_hirVacee4uXDci9Fqffd7mrkgQlHk2CCm90yRScJ7K69tLbrziSJtx_AUYMWw8d_uXYAs03gyEBQBaxEXHVhTiGgHZyOyYctGQIPjdcqOsc2g",
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 203,
      categoryId: 3,
      image:
        "https://lh3.googleusercontent.com/proxy/Z5JjMCKjMWcZ_hirVacee4uXDci9Fqffd7mrkgQlHk2CCm90yRScJ7K69tLbrziSJtx_AUYMWw8d_uXYAs03gyEBQBaxEXHVhTiGgHZyOyYctGQIPjdcqOsc2g",
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 3,
      image:
        "https://external-preview.redd.it/4DH_dMAEPIEeDPgXZpzcDtndRgvNbdFM3nXhrCfwVo4.png?auto=webp&s=09efdd83e9885cddffbef217b7fbecd97d821adc",
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 2,
      image:
        "https://external-preview.redd.it/4DH_dMAEPIEeDPgXZpzcDtndRgvNbdFM3nXhrCfwVo4.png?auto=webp&s=09efdd83e9885cddffbef217b7fbecd97d821adc",
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 1,
      image:
        "https://external-preview.redd.it/4DH_dMAEPIEeDPgXZpzcDtndRgvNbdFM3nXhrCfwVo4.png?auto=webp&s=09efdd83e9885cddffbef217b7fbecd97d821adc",
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters. Rated M",
      price: 23.99,
      quantity: 63,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d2/Gears_of_War_logo.PNG",
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters. Rated M",
      price: 23.99,
      quantity: 63,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d2/Gears_of_War_logo.PNG",
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters. Rated M",
      price: 23.99,
      quantity: 63,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d2/Gears_of_War_logo.PNG",
    },
    {
      title: "Gears of War 2",
      description: "Save humanity again from a horde of monsters. Rated M",
      price: 29.99,
      quantity: 98,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Gears_of_War_2_Game_Cover.jpg/220px-Gears_of_War_2_Game_Cover.jpg",
    },
    {
      title: "Gears of War 2",
      description: "Save humanity again from a horde of monsters. Rated M",
      price: 29.99,
      quantity: 98,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Gears_of_War_2_Game_Cover.jpg/220px-Gears_of_War_2_Game_Cover.jpg",
    },
    {
      title: "Gears of War 2",
      description: "Save humanity again from a horde of monsters. Rated M",
      price: 29.99,
      quantity: 98,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Gears_of_War_2_Game_Cover.jpg/220px-Gears_of_War_2_Game_Cover.jpg",
    },
    {
      title: "Gears of War 3",
      description:
        "Save humanity a third time from a horde of monsters. Rated M",
      price: 32.99,
      quantity: 1500,
      categoryId: 1,
      image: "https://assets.vg247.com/current//2011/02/gow3cover.jpg",
    },
    {
      title: "Gears of War 3",
      description:
        "Save humanity a third time from a horde of monsters. Rated M",
      price: 32.99,
      quantity: 1500,
      categoryId: 2,
      image: "https://assets.vg247.com/current//2011/02/gow3cover.jpg",
    },
    {
      title: "Gears of War 3",
      description:
        "Save humanity a third time from a horde of monsters. Rated M",
      price: 32.99,
      quantity: 1500,
      categoryId: 3,
      image: "https://assets.vg247.com/current//2011/02/gow3cover.jpg",
    },
    {
      title: "Gears of War 4",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 40.99,
      quantity: 3500,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/f/ff/Gears_of_War_4.jpg",
    },
    {
      title: "Gears of War 4",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 40.99,
      quantity: 3500,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/f/ff/Gears_of_War_4.jpg",
    },
    {
      title: "Gears of War 4",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 40.99,
      quantity: 3500,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/f/ff/Gears_of_War_4.jpg",
    },
    {
      title: "Gears of War 5",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 55.99,
      quantity: 5500,
      categoryId: 1,
      image:
        "https://www.gears5.com/static/e7317a2bb749f0510dd21561fdfdd03a/gears5.jpg",
    },
    {
      title: "Gears of War 5",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 55.99,
      quantity: 5500,
      categoryId: 2,
      image:
        "https://www.gears5.com/static/e7317a2bb749f0510dd21561fdfdd03a/gears5.jpg",
    },
    {
      title: "Gears of War 5",
      description: "Save humanity once again from a horde of monsters. Rated M",
      price: 55.99,
      quantity: 5500,
      categoryId: 3,
      image:
        "https://www.gears5.com/static/e7317a2bb749f0510dd21561fdfdd03a/gears5.jpg",
    },
    {
      title: "FIFA 22",
      description: "Play as your favorite soccer teams and players. Rated E",
      price: 59.99,
      quantity: 50000,
      categoryId: 1,
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/header.jpg?t=1633113405",
    },

    {
      title: "FIFA 22",
      description: "Play as your favorite soccer teams and players. Rated E",
      price: 59.99,
      quantity: 50000,
      categoryId: 2,
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/header.jpg?t=1633113405",
    },
    {
      title: "FIFA 22",
      description: "Play as your favorite soccer teams and players. Rated E",
      price: 59.99,
      quantity: 50000,
      categoryId: 3,
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/header.jpg?t=1633113405",
    },
    {
      title: "FIFA 22",
      description: "Play as your favorite soccer teams and players. Rated E",
      price: 59.99,
      quantity: 50000,
      categoryId: 4,
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/header.jpg?t=1633113405",
    },
    {
      title: "NBA 2k22",
      description: "Play as your favorite NBA teams and players. Rated E",
      price: 59.99,
      quantity: 75000,
      categoryId: 1,
      image:
        "https://img.bleacherreport.net/img/images/photos/003/915/388/994bc06eea22279cfab905ae30a6754a_crop_north.jpg?1626196611&w=3072&h=2048",
    },
    {
      title: "NBA 2k22",
      description: "Play as your favorite NBA teams and players. Rated E",
      price: 59.99,
      quantity: 75000,
      categoryId: 2,
      image:
        "https://img.bleacherreport.net/img/images/photos/003/915/388/994bc06eea22279cfab905ae30a6754a_crop_north.jpg?1626196611&w=3072&h=2048",
    },
    {
      title: "NBA 2k22",
      description: "Play as your favorite NBA teams and players. Rated E",
      price: 59.99,
      quantity: 75000,
      categoryId: 3,
      image:
        "https://img.bleacherreport.net/img/images/photos/003/915/388/994bc06eea22279cfab905ae30a6754a_crop_north.jpg?1626196611&w=3072&h=2048",
    },
    {
      title: "NBA 2k22",
      description: "Play as your favorite NBA teams and players. Rated E",
      price: 59.99,
      quantity: 75000,
      categoryId: 4,
      image:
        "https://img.bleacherreport.net/img/images/photos/003/915/388/994bc06eea22279cfab905ae30a6754a_crop_north.jpg?1626196611&w=3072&h=2048",
    },

    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 1,
      image:
        "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/kronos/common/social-share/social-share-image.jpg",
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 2,
      image:
        "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/kronos/common/social-share/social-share-image.jpg",
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 3,
      image:
        "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/kronos/common/social-share/social-share-image.jpg",
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 4,
      image:
        "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/kronos/common/social-share/social-share-image.jpg",
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/callofduty/images/3/3d/Warzone_Artwork_CoDWarzone_MW.jpg/revision/latest?cb=20200331223136",
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/callofduty/images/3/3d/Warzone_Artwork_CoDWarzone_MW.jpg/revision/latest?cb=20200331223136",
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/callofduty/images/3/3d/Warzone_Artwork_CoDWarzone_MW.jpg/revision/latest?cb=20200331223136",
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/callofduty/images/3/3d/Warzone_Artwork_CoDWarzone_MW.jpg/revision/latest?cb=20200331223136",
    },
    {
      title: "Call of Duty Vanguard",
      description: "Play as a special-ops soldier during WW2. Rated M ",
      price: 40.99,
      quantity: 100000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/callofduty/images/3/3c/COD_Vanguard_Artwork.jpg/revision/latest?cb=20210816171308",
    },
    {
      title: "Call of Duty Vanguard",
      description: "Play as a special-ops soldier during WW2. Rated M ",
      price: 40.99,
      quantity: 100000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/callofduty/images/3/3c/COD_Vanguard_Artwork.jpg/revision/latest?cb=20210816171308",
    },
    {
      title: "Call of Duty Vanguard",
      description: "Play as a special-ops soldier during WW2. Rated M ",
      price: 40.99,
      quantity: 100000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/callofduty/images/3/3c/COD_Vanguard_Artwork.jpg/revision/latest?cb=20210816171308",
    },
    {
      title: "Call of Duty Vanguard",
      description: "Play as a special-ops soldier during WW2. Rated M ",
      price: 40.99,
      quantity: 100000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/callofduty/images/3/3c/COD_Vanguard_Artwork.jpg/revision/latest?cb=20210816171308",
    },
    {
      title: "Diablo",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo. Rated M",
      price: 35.99,
      quantity: 67,
      categoryId: 1,
      image:
        "https://storage.googleapis.com/gamebyte/2019/03/Diablo-OG-796x417.jpg",
    },
    {
      title: "Diablo",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo. Rated M",
      price: 35.99,
      quantity: 67,
      categoryId: 3,
      image:
        "https://storage.googleapis.com/gamebyte/2019/03/Diablo-OG-796x417.jpg",
    },
    {
      title: "Diablo 2",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo again. Rated M",
      price: 45.99,
      quantity: 670,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Diablo_II_Coverart.png",
    },
    {
      title: "Diablo 2",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo again. Rated M",
      price: 45.99,
      quantity: 670,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Diablo_II_Coverart.png",
    },
    {
      title: "Diablo 2",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo again. Rated M",
      price: 45.99,
      quantity: 670,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Diablo_II_Coverart.png",
    },
    {
      title: "Diablo 2",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo again. Rated M",
      price: 45.99,
      quantity: 670,
      categoryId: 4,
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Diablo_II_Coverart.png",
    },
    {
      title: "Diablo 3",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo a third time. Rated M",
      price: 49.99,
      quantity: 7500,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/80/Diablo_III_cover.png",
    },
    {
      title: "Diablo 3",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo a third time. Rated M",
      price: 49.99,
      quantity: 7500,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/80/Diablo_III_cover.png",
    },
    {
      title: "Diablo 3",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo a third time. Rated M",
      price: 49.99,
      quantity: 7500,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/80/Diablo_III_cover.png",
    },
    {
      title: "Diablo 3",
      description:
        "hack and slash action role-playing game. Fight off hordes of hellish monsters and you save humanity from Diablo a third time. Rated M",
      price: 49.99,
      quantity: 7500,
      categoryId: 4,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/80/Diablo_III_cover.png",
    },
    {
      title: "Fortnight",
      description:
        "Battle against others in this cartoonish online battle royale style game. Rated T",
      price: 45.99,
      quantity: 20000,
      categoryId: 1,
      image:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/107508274/original/03df8c86694f57de4fde1c8898f8233a8fb02c0b/this-is-a-fortnite-logo.jpg",
    },
    {
      title: "Fortnight",
      description:
        "Battle against others in this cartoonish online battle royale style game. Rated T",
      price: 45.99,
      quantity: 20000,
      categoryId: 2,
      image:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/107508274/original/03df8c86694f57de4fde1c8898f8233a8fb02c0b/this-is-a-fortnite-logo.jpg",
    },
    {
      title: "Fortnight",
      description:
        "Battle against others in this cartoonish online battle royale style game. Rated T",
      price: 45.99,
      quantity: 20000,
      categoryId: 3,
      image:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/107508274/original/03df8c86694f57de4fde1c8898f8233a8fb02c0b/this-is-a-fortnite-logo.jpg",
    },
    {
      title: "Fortnight",
      description:
        "Battle against others in this cartoonish online battle royale style game. Rated T",
      price: 45.99,
      quantity: 20000,
      categoryId: 4,
      image:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/107508274/original/03df8c86694f57de4fde1c8898f8233a8fb02c0b/this-is-a-fortnite-logo.jpg",
    },
    {
      title: "Overwatch",
      description:
        "Battle against other teams of players in the multiplayer first person shooter. Rated T",
      price: 50.99,
      quantity: 15000,
      categoryId: 1,
      image:
        "https://1000logos.net/wp-content/uploads/2018/03/Overwatch-Logo.png",
    },
    {
      title: "Overwatch",
      description:
        "Battle against other teams of players in the multiplayer first person shooter. Rated T",
      price: 50.99,
      quantity: 15000,
      categoryId: 2,
      image:
        "https://1000logos.net/wp-content/uploads/2018/03/Overwatch-Logo.png",
    },
    {
      title: "Overwatch",
      description:
        "Battle against other teams of players in the multiplayer first person shooter. Rated T",
      price: 50.99,
      quantity: 15000,
      categoryId: 3,
      image:
        "https://1000logos.net/wp-content/uploads/2018/03/Overwatch-Logo.png",
    },
    {
      title: "Overwatch",
      description:
        "Battle against other teams of players in the multiplayer first person shooter. Rated T",
      price: 50.99,
      quantity: 15000,
      categoryId: 4,
      image:
        "https://1000logos.net/wp-content/uploads/2018/03/Overwatch-Logo.png",
    },
    {
      title: "Super Smash Bros",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Rated E",
      price: 35.99,
      quantity: 4300,
      categoryId: 4,
      image:
        "https://spng.pngfind.com/pngs/s/71-719498_super-smash-bros-64-logo-png-png-download.png",
    },
    {
      title: "Super Smash Bros",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Rated E",
      price: 35.99,
      quantity: 4300,
      categoryId: 5,
      image:
        "https://spng.pngfind.com/pngs/s/71-719498_super-smash-bros-64-logo-png-png-download.png",
    },
    {
      title: "Super Smash Bros",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Rated E",
      price: 35.99,
      quantity: 4300,
      categoryId: 6,
      image:
        "https://spng.pngfind.com/pngs/s/71-719498_super-smash-bros-64-logo-png-png-download.png",
    },
    {
      title: "Super Smash Bros",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Rated E",
      price: 35.99,
      quantity: 4300,
      categoryId: 7,
      image:
        "https://spng.pngfind.com/pngs/s/71-719498_super-smash-bros-64-logo-png-png-download.png",
    },
    {
      title: "Super Smash Bros Brawl",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with more characters and maps Rated E",
      price: 40.99,
      quantity: 7000,
      categoryId: 4,
      image:
        "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/wii_24/SI_Wii_SuperSmashBrosBrawl_image1600w.jpg",
    },

    {
      title: "Super Smash Bros Brawl",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with more characters and maps Rated E",
      price: 40.99,
      quantity: 7000,
      categoryId: 6,
      image:
        "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/wii_24/SI_Wii_SuperSmashBrosBrawl_image1600w.jpg",
    },
    {
      title: "Super Smash Bros Ultimate",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with even more characters and maps Rated E",
      price: 50.99,
      quantity: 73000,
      categoryId: 4,
      image:
        "https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg",
    },
    {
      title: "Super Smash Bros Ultimate",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with even more characters and maps Rated E",
      price: 50.99,
      quantity: 73000,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg",
    },
    {
      title: "Super Smash Bros Ultimate",
      description:
        "Play as your favorite Nintendo video game characters and fight against other Nintendo video game characters. Now with even more characters and maps Rated E",
      price: 50.99,
      quantity: 73000,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg",
    },
    {
      title: "Star Fox 64",
      description:
        "Defend Corneria against invading forces in the 3D rail shooter. Rated E",
      price: 45.99,
      quantity: 430,
      categoryId: 5,
      image: "https://tcrf.net/images/c/c7/StarFox64_Title.png",
    },
    {
      title: "Star Fox Adventures",
      description: "Prevent the Lylat System from sure destruction. Rated E",
      price: 40.99,
      quantity: 2350,
      categoryId: 6,
      image:
        "https://p.kindpng.com/picc/s/43-434406_logopedia10-star-fox-adventures-hd-png-download.png",
    },
    {
      title: "Star Fox Assault",
      description:
        "Help Fox McCloud's team save the Lylat System from Aparoids. Rated E",
      price: 50.99,
      quantity: 3600,
      categoryId: 6,
      image:
        "https://pressthebuttons.typepad.com/.a/6a00d83452033569e20240a495e5df200c-350wi",
    },
    {
      title: "PlayerUnknown's Battlegrounds",
      description: "Online multiplayer battle royale style game. Rated M",
      price: 45.99,
      quantity: 7800,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Pubgbattlegrounds.png/220px-Pubgbattlegrounds.png",
    },
    {
      title: "League of Legends",
      description: "multiplayer online battle arena video game. Rated T",
      price: 50.99,
      quantity: 8500,
      categoryId: 1,
      image: "https://cdn.mos.cms.futurecdn.net/qPibdLSyYHnTX5NymkEb8M.jpeg",
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
      image:
        "https://logos-world.net/wp-content/uploads/2020/04/Minecraft-Symbol.jpg",
    },
    {
      title: "Minecraft",
      description:
        "Sandbox video game. If you can dream it, you can build it in Minecraft. Rated E",
      price: 45.99,
      quantity: 4300,
      categoryId: 3,
      image:
        "https://logos-world.net/wp-content/uploads/2020/04/Minecraft-Symbol.jpg",
    },
    {
      title: "Minecraft",
      description:
        "Sandbox video game. If you can dream it, you can build it in Minecraft. Rated E",
      price: 45.99,
      quantity: 4300,
      categoryId: 4,
      image:
        "https://logos-world.net/wp-content/uploads/2020/04/Minecraft-Symbol.jpg",
    },
    {
      title: "The Elder Scrolls: Arena",
      description:
        "Open-World action role-player style game. Travel around Tamriel while doing a bunch of quests. Rated M",
      price: 35.99,
      quantity: 650,
      categoryId: 1,
      image:
        "https://lparchive.org/The-Elder-Scrolls-Arena/Images/1-arenaboxlogo.png",
    },
    {
      title: "The Elder Scrolls II: Daggerfall",
      description:
        "Open-World action role-player style game. Travel around Iliac Bay while doing a bunch of quests. Rated M",
      price: 37.99,
      quantity: 840,
      categoryId: 1,
      image:
        "https://m.media-amazon.com/images/M/MV5BNjczZTc4ODUtMTVmOC00ZGZiLWI0Y2YtNDYzNzk1YzQ4MmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
    },
    {
      title: "The Elder Scrolls III: Morrowind",
      description:
        "Open-World action role-player style game. Travel around Morrowind while doing a bunch of quests. Rated M",
      price: 40.99,
      quantity: 1100,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/elderscrolls/images/3/38/Morrowind_Cover.png/revision/latest?cb=20160812144154",
    },
    {
      title: "The Elder Scrolls III: Morrowind",
      description:
        "Open-World action role-player style game. Travel around Morrowind while doing a bunch of quests. Rated M",
      price: 40.99,
      quantity: 1100,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/elderscrolls/images/3/38/Morrowind_Cover.png/revision/latest?cb=20160812144154",
    },
    {
      title: "The Elder Scrolls III: Morrowind",
      description:
        "Open-World action role-player style game. Travel around Morrowind while doing a bunch of quests. Rated M",
      price: 40.99,
      quantity: 1100,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/elderscrolls/images/3/38/Morrowind_Cover.png/revision/latest?cb=20160812144154",
    },
    {
      title: "The Elder Scrolls IV: Oblivion",
      description:
        "Open-World action role-player style game. Travel around Cyrodiil while doing a bunch of quests. Rated M",
      price: 43.99,
      quantity: 1750,
      categoryId: 1,
      image:
        "https://gamingbolt.com/wp-content/uploads/2010/06/bkgd_parchment_w-logo.jpg",
    },
    {
      title: "The Elder Scrolls IV: Oblivion",
      description:
        "Open-World action role-player style game. Travel around Cyrodiil while doing a bunch of quests. Rated M",
      price: 43.99,
      quantity: 1750,
      categoryId: 2,
      image:
        "https://gamingbolt.com/wp-content/uploads/2010/06/bkgd_parchment_w-logo.jpg",
    },
    {
      title: "The Elder Scrolls IV: Oblivion",
      description:
        "Open-World action role-player style game. Travel around Cyrodiil while doing a bunch of quests. Rated M",
      price: 43.99,
      quantity: 1750,
      categoryId: 3,
      image:
        "https://gamingbolt.com/wp-content/uploads/2010/06/bkgd_parchment_w-logo.jpg",
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      description:
        "Open-World action role-player style game. Travel around Skyrim while doing a bunch of quests. Rated M",
      price: 50.99,
      quantity: 5500,
      categoryId: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT40kRQEVa_tixzz7mQD_feUIRbEeSCSF2AA&usqp=CAU",
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      description:
        "Open-World action role-player style game. Travel around Skyrim while doing a bunch of quests. Rated M",
      price: 50.99,
      quantity: 5500,
      categoryId: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT40kRQEVa_tixzz7mQD_feUIRbEeSCSF2AA&usqp=CAU",
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      description:
        "Open-World action role-player style game. Travel around Skyrim while doing a bunch of quests. Rated M",
      price: 50.99,
      quantity: 5500,
      categoryId: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT40kRQEVa_tixzz7mQD_feUIRbEeSCSF2AA&usqp=CAU",
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      description:
        "Open-World action role-player style game. Travel around Skyrim while doing a bunch of quests. Rated M",
      price: 50.99,
      quantity: 5500,
      categoryId: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT40kRQEVa_tixzz7mQD_feUIRbEeSCSF2AA&usqp=CAU",
    },
    {
      title: "Apex Legends",
      description: "free to play battle royale-hero shooter style game",
      price: 0.0,
      quantity: 10000,
      categoryId: 1,
      image:
        "https://preview.redd.it/njdna87sy3431.png?auto=webp&s=3f74fbec3c3b230d0b81ce5412bd3438d8883a72",
    },
    {
      title: "Apex Legends",
      description: "free to play battle royale-hero shooter style game",
      price: 0.0,
      quantity: 10000,
      categoryId: 2,
      image:
        "https://preview.redd.it/njdna87sy3431.png?auto=webp&s=3f74fbec3c3b230d0b81ce5412bd3438d8883a72",
    },
    {
      title: "Apex Legends",
      description: "free to play battle royale-hero shooter style game",
      price: 0.0,
      quantity: 10000,
      categoryId: 3,
      image:
        "https://preview.redd.it/njdna87sy3431.png?auto=webp&s=3f74fbec3c3b230d0b81ce5412bd3438d8883a72",
    },
    {
      title: "Apex Legends",
      description: "free to play battle royale-hero shooter style game",
      price: 0.0,
      quantity: 10000,
      categoryId: 4,
      image:
        "https://preview.redd.it/njdna87sy3431.png?auto=webp&s=3f74fbec3c3b230d0b81ce5412bd3438d8883a72",
    },
    {
      title: "Final Fantasy",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://ih0.redbubble.net/image.493983514.5958/flat,800x800,075,f.jpg",
    },
    {
      title: "Super Mario",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/d/d4/Super_Mario_%281996-2014%29.svg/revision/latest?cb=20181206060417",
    },
    {
      title: "Mario Kart",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/30/Mario_kart_first_logo.png",
    },
    {
      title: "Halo",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image: "https://i.redd.it/x2nthi03s2g11.jpg",
    },
    {
      title: "007 Golden Eye",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Logo_goldeneye_eu.svg/1280px-Logo_goldeneye_eu.svg.png",
    },
    {
      title: "Zelda",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://i.pinimg.com/736x/c4/b8/11/c4b811057b5e5c838504914d09eea209.jpg",
    },
    {
      title: "Sonic",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://venturebeat.com/wp-content/uploads/2018/03/sonicemblem2.jpg?fit=1920%2C1080&strip=all",
    },
    {
      title: "Crazy taxi",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fapptrigger.com%2Ffiles%2F2017%2F05%2Fcrazy-taxi-header.jpg",
    },
    {
      title: "Half-life",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Half-Life_Cover_Art.jpg/220px-Half-Life_Cover_Art.jpg",
    },
    {
      title: "Resident Evil",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Resident_Evil_1_cover.png/220px-Resident_Evil_1_cover.png",
    },
    {
      title: "Pokemon",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image: "http://i.imgur.com/iPvcyJv.png",
    },
    {
      title: "Animal Crossing",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/ultimatepopculture/images/8/82/Animal_Crossing_Coverart.png/revision/latest?cb=20190922185519",
    },
    {
      title: "Sims",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
      image: "https://www.decalsplanet.com/img_b/vinyl-decal-sticker-1728.jpg",
    },
  ];

  for (let product of products) {
    await client.query(
      `
    INSERT INTO products(title, description, price, quantity, category_id, image) VALUES ($1,$2,$3,$4,$5,$6);
    `,
      [
        product.title,
        product.description,
        product.price,
        product.quantity,
        product.categoryId,
        product.image,
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
