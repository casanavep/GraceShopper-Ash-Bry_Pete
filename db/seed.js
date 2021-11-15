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
            description VARCHAR(5000),
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
      image: "https://portforward.com/call-of-duty-modern-warfare/default.webp",
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 2,
      image: "https://portforward.com/call-of-duty-modern-warfare/default.webp",
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 3,
      image: "https://portforward.com/call-of-duty-modern-warfare/default.webp",
    },
    {
      title: "Call of Duty Modern Warfare",
      description:
        "Play a special-ops soldier and hunt down terroists. Rated M",
      price: 40.99,
      quantity: 4300,
      categoryId: 4,
      image: "https://portforward.com/call-of-duty-modern-warfare/default.webp",
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
      image:
        "https://logos-world.net/wp-content/uploads/2020/04/Minecraft-Symbol.jpg",
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
      description:
        "free to play battle royale-hero shooter style game. Rated T",
      price: 0.0,
      quantity: 10000,
      categoryId: 1,
      image:
        "https://preview.redd.it/njdna87sy3431.png?auto=webp&s=3f74fbec3c3b230d0b81ce5412bd3438d8883a72",
    },
    {
      title: "Apex Legends",
      description:
        "free to play battle royale-hero shooter style game. Rated T",
      price: 0.0,
      quantity: 10000,
      categoryId: 2,
      image:
        "https://preview.redd.it/njdna87sy3431.png?auto=webp&s=3f74fbec3c3b230d0b81ce5412bd3438d8883a72",
    },
    {
      title: "Apex Legends",
      description:
        "free to play battle royale-hero shooter style game. Rated T",
      price: 0.0,
      quantity: 10000,
      categoryId: 3,
      image:
        "https://preview.redd.it/njdna87sy3431.png?auto=webp&s=3f74fbec3c3b230d0b81ce5412bd3438d8883a72",
    },
    {
      title: "Apex Legends",
      description:
        "free to play battle royale-hero shooter style game. Rated T",
      price: 0.0,
      quantity: 10000,
      categoryId: 4,
      image:
        "https://preview.redd.it/njdna87sy3431.png?auto=webp&s=3f74fbec3c3b230d0b81ce5412bd3438d8883a72",
    },
    {
      title: "Final Fantasy.",
      description:
        "Help four youths called the Light Warriors, who each carry one of their world's four elemental crystals. The crystals have been darkened by the four Elemental Fiends, and togetherthey quest to defeat these evil forces, restore light to the crystals, and save their world. Fantasy RPG. Rated E",
      price: 29.99,
      quantity: 400,
      categoryId: 3,
      image:
        "https://ih0.redbubble.net/image.493983514.5958/flat,800x800,075,f.jpg",
    },
    {
      title: "Final Fantasy",
      description:
        "Help four youths called the Light Warriors, who each carry one of their world's four elemental crystals. The crystals have been darkened by the four Elemental Fiends, and togetherthey quest to defeat these evil forces, restore light to the crystals, and save their world. Fantasy RPG. Rated E",
      price: 29.99,
      quantity: 400,
      categoryId: 1,
      image:
        "https://ih0.redbubble.net/image.493983514.5958/flat,800x800,075,f.jpg",
    },
    {
      title: "Final Fantasy II",
      description:
        "Help Firion, Maria, and Guy fight Emperor Mateus' hellspawn and save the world. Fantasy RPG. Rated E",
      price: 34.99,
      quantity: 670,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/6/69/FFII_logo.png/revision/latest?cb=20160920111833",
    },
    {
      title: "Final Fantasy II",
      description:
        "Help Firion, Maria, and Guy fight Emperor Mateus' hellspawn and save the world. Fantasy RPG. Rated E",
      price: 34.99,
      quantity: 670,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/6/69/FFII_logo.png/revision/latest?cb=20160920111833",
    },
    {
      title: "Final Fantasy III",
      description:
        "Four orphaned youths become drawn to a crystal of light. The crystal grants them some of its power, and instructs them to go forth and restore balance to the world. Not knowing what to make of the crystal's pronouncements, but nonetheless recognizing the importance of its words, the four inform their adoptive families of their mission and set out to explore and bring back balance to the world. Fantasy RPG. Rated E",
      price: 34.99,
      quantity: 543,
      categoryId: 1,
      image:
        "https://w7.pngwing.com/pngs/1009/956/png-transparent-final-fantasy-iii-final-fantasy-brave-exvius-final-fantasy-x-video-game-square-enix-final-fantasy-emoji-game-logo-video-game.png",
    },
    {
      title: "Final Fantasy IV",
      description:
        "Help Cecil, a dark knight, as he tries to prevent the sorcerer Golbez from seizing powerful crystals and destroying the world. Fantasy RPG. Rated E",
      price: 34.99,
      quantity: 825,
      categoryId: 1,
      image: "https://image.pngaaa.com/17/4037017-middle.png",
    },
    {
      title: "Final Fantasy IV",
      description:
        "Help Cecil, a dark knight, as he tries to prevent the sorcerer Golbez from seizing powerful crystals and destroying the world. Fantasy RPG. Rated E",
      price: 34.99,
      quantity: 825,
      categoryId: 3,
      image: "https://image.pngaaa.com/17/4037017-middle.png",
    },
    {
      title: "Final Fantasy V",
      description:
        "Help Bartz and his party  keep the Crystals from being exploited by the evil socerer Exdeath's influence and prevent his resurgence. Fantasy RPG. Rated E",
      price: 37.99,
      quantity: 1500,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/0/0a/FFV_logo.png/revision/latest?cb=20160920112302",
    },
    {
      title: "Final Fantasy V",
      description:
        "Help Bartz and his party  keep the Crystals from being exploited by the evil socerer Exdeath's influence and prevent his resurgence. Fantasy RPG. Rated E",
      price: 37.99,
      quantity: 1500,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/0/0a/FFV_logo.png/revision/latest?cb=20160920112302",
    },
    {
      title: "Final Fantasy VI",
      description:
        "Set in a world with technology resembling the Second Industrial Revolution, the game's story follows an expanding cast that includes fourteen permanent playable characters. The narrative depicts numerous more mature themes throughout the entire game than its previous installments including a rebellion against an immoral military dictatorship, pursuit of a magical arms race, use of chemical weapons in warfare, depictions of violent and apocalyptic confrontations, several personal redemption arcs, teenage pregnancy, and the renewal of hope and life itself. Fantasy RPG. Rated M",
      price: 40.99,
      quantity: 1645,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/3/36/FFVI_logo.png/revision/latest?cb=20160920112443",
    },
    {
      title: "Final Fantasy VI",
      description:
        "Set in a world with technology resembling the Second Industrial Revolution, the game's story follows an expanding cast that includes fourteen permanent playable characters. The narrative depicts numerous more mature themes throughout the entire game than its previous installments including a rebellion against an immoral military dictatorship, pursuit of a magical arms race, use of chemical weapons in warfare, depictions of violent and apocalyptic confrontations, several personal redemption arcs, teenage pregnancy, and the renewal of hope and life itself. Fantasy RPG. Rated M",
      price: 40.99,
      quantity: 1645,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/3/36/FFVI_logo.png/revision/latest?cb=20160920112443",
    },
    {
      title: "Final Fantasy VII",
      description:
        "Help Cloud Strife, a mercenary who joins an eco-terrorist organization to stop a world-controlling megacorporation from using the planet's life essence as an energy source. Fantasy RPG. Rated T",
      price: 42.99,
      quantity: 950,
      categoryId: 3,
      image:
        "https://www.pngfind.com/pngs/m/83-838172_final-fantasy-vii-png-final-fantasy-7-logo.png",
    },
    {
      title: "Final Fantasy VII",
      description:
        "Help Cloud Strife, a mercenary who joins an eco-terrorist organization to stop a world-controlling megacorporation from using the planet's life essence as an energy source. Fantasy RPG. Rated T",
      price: 42.99,
      quantity: 950,
      categoryId: 1,
      image:
        "https://www.pngfind.com/pngs/m/83-838172_final-fantasy-vii-png-final-fantasy-7-logo.png",
    },
    {
      title: "Final Fantasy VII",
      description:
        "Help Cloud Strife, a mercenary who joins an eco-terrorist organization to stop a world-controlling megacorporation from using the planet's life essence as an energy source. Fantasy RPG. Rated T",
      price: 42.99,
      quantity: 950,
      categoryId: 2,
      image:
        "https://www.pngfind.com/pngs/m/83-838172_final-fantasy-vii-png-final-fantasy-7-logo.png",
    },
    {
      title: "Final Fantasy VII",
      description:
        "Help Cloud Strife, a mercenary who joins an eco-terrorist organization to stop a world-controlling megacorporation from using the planet's life essence as an energy source. Fantasy RPG. Rated T",
      price: 42.99,
      quantity: 950,
      categoryId: 4,
      image:
        "https://www.pngfind.com/pngs/m/83-838172_final-fantasy-vii-png-final-fantasy-7-logo.png",
    },
    {
      title: "Final Fantasy VIII",
      description:
        "Help Squall Leonhart and his group of mercinaries as they are drawn into a conflict sparked by Ultimecia, a sorceress from the future who wishes to compress time. Fantasy RPG. Rated T",
      price: 42.99,
      quantity: 3500,
      categoryId: 1,
      image:
        "https://www.pikpng.com/pngl/m/133-1335776_final-fantasy-viii-final-fantasy-8-logo-clipart.png",
    },
    {
      title: "Final Fantasy VIII",
      description:
        "Help Squall Leonhart and his group of mercinaries as they are drawn into a conflict sparked by Ultimecia, a sorceress from the future who wishes to compress time. Fantasy RPG. Rated T",
      price: 42.99,
      quantity: 3500,
      categoryId: 2,
      image:
        "https://www.pikpng.com/pngl/m/133-1335776_final-fantasy-viii-final-fantasy-8-logo-clipart.png",
    },
    {
      title: "Final Fantasy VIII",
      description:
        "Help Squall Leonhart and his group of mercinaries as they are drawn into a conflict sparked by Ultimecia, a sorceress from the future who wishes to compress time. Fantasy RPG. Rated T",
      price: 42.99,
      quantity: 3500,
      categoryId: 3,
      image:
        "https://www.pikpng.com/pngl/m/133-1335776_final-fantasy-viii-final-fantasy-8-logo-clipart.png",
    },
    {
      title: "Final Fantasy VIII",
      description:
        "Help Squall Leonhart and his group of mercinaries as they are drawn into a conflict sparked by Ultimecia, a sorceress from the future who wishes to compress time. Fantasy RPG. Rated T",
      price: 42.99,
      quantity: 3500,
      categoryId: 4,
      image:
        "https://www.pikpng.com/pngl/m/133-1335776_final-fantasy-viii-final-fantasy-8-logo-clipart.png",
    },
    {
      title: "Final Fantasy IX",
      description:
        "Players follow a thief named Zidane Tribal who kidnaps princess Garnet Til Alexandros XVII as part of a ploy by the neighboring nation of Lindblum. He joins Garnet and a growing cast of characters on a quest to take down her mother, Queen Brahne of Alexandria, who started the war. Fantasy RPG. Rated M",
      price: 42.99,
      quantity: 3200,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/7/7f/FFIX_Title_Logo_Concept.jpg/revision/latest/scale-to-width-down/250?cb=20130323070321",
    },
    {
      title: "Final Fantasy IX",
      description:
        "Players follow a thief named Zidane Tribal who kidnaps princess Garnet Til Alexandros XVII as part of a ploy by the neighboring nation of Lindblum. He joins Garnet and a growing cast of characters on a quest to take down her mother, Queen Brahne of Alexandria, who started the war. Fantasy RPG. Rated M",
      price: 42.99,
      quantity: 3200,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/7/7f/FFIX_Title_Logo_Concept.jpg/revision/latest/scale-to-width-down/250?cb=20130323070321",
    },
    {
      title: "Final Fantasy IX",
      description:
        "Players follow a thief named Zidane Tribal who kidnaps princess Garnet Til Alexandros XVII as part of a ploy by the neighboring nation of Lindblum. He joins Garnet and a growing cast of characters on a quest to take down her mother, Queen Brahne of Alexandria, who started the war. Fantasy RPG. Rated M",
      price: 42.99,
      quantity: 3200,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/7/7f/FFIX_Title_Logo_Concept.jpg/revision/latest/scale-to-width-down/250?cb=20130323070321",
    },
    {
      title: "Final Fantasy IX",
      description:
        "Players follow a thief named Zidane Tribal who kidnaps princess Garnet Til Alexandros XVII as part of a ploy by the neighboring nation of Lindblum. He joins Garnet and a growing cast of characters on a quest to take down her mother, Queen Brahne of Alexandria, who started the war. Fantasy RPG. Rated M",
      price: 42.99,
      quantity: 3200,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/7/7f/FFIX_Title_Logo_Concept.jpg/revision/latest/scale-to-width-down/250?cb=20130323070321",
    },
    {
      title: "Final Fantasy X",
      description:
        "Help a group of adventurers on their quest to defeat a rampaging monster known as Sin. Fantasy RPG. Rated M",
      price: 45.99,
      quantity: 6000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/8/82/FFX_logo.png/revision/latest?cb=20160920112920",
    },
    {
      title: "Final Fantasy X",
      description:
        "Help a group of adventurers on their quest to defeat a rampaging monster known as Sin. Fantasy RPG. Rated M",
      price: 45.99,
      quantity: 6000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/8/82/FFX_logo.png/revision/latest?cb=20160920112920",
    },
    {
      title: "Final Fantasy X",
      description:
        "Help a group of adventurers on their quest to defeat a rampaging monster known as Sin. Fantasy RPG. Rated M",
      price: 45.99,
      quantity: 6000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/8/82/FFX_logo.png/revision/latest?cb=20160920112920",
    },
    {
      title: "Final Fantasy X",
      description:
        "Help a group of adventurers on their quest to defeat a rampaging monster known as Sin. Fantasy RPG. Rated M",
      price: 45.99,
      quantity: 6000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/8/82/FFX_logo.png/revision/latest?cb=20160920112920",
    },
    {
      title: "Final Fantasy XI: Online",
      description:
        "The story is set in the fantasy world of Vana'diel, where player-created avatars can both compete and cooperate in a variety of objectives to develop an assortment of jobs, skills, and earn in-game item rewards. Fantasy MMORPG. Rated T",
      price: 45.99,
      quantity: 7500,
      categoryId: 1,
      image:
        "https://png.pngitem.com/pimgs/s/466-4669092_final-fantasy-xi-17-470x3102x-final-fantasy-xi.png",
    },
    {
      title: "Final Fantasy XI: Online",
      description:
        "The story is set in the fantasy world of Vana'diel, where player-created avatars can both compete and cooperate in a variety of objectives to develop an assortment of jobs, skills, and earn in-game item rewards. Fantasy MMORPG. Rated T",
      price: 45.99,
      quantity: 7500,
      categoryId: 2,
      image:
        "https://png.pngitem.com/pimgs/s/466-4669092_final-fantasy-xi-17-470x3102x-final-fantasy-xi.png",
    },
    {
      title: "Final Fantasy XI: Online",
      description:
        "The story is set in the fantasy world of Vana'diel, where player-created avatars can both compete and cooperate in a variety of objectives to develop an assortment of jobs, skills, and earn in-game item rewards. Fantasy MMORPG. Rated T",
      price: 45.99,
      quantity: 7500,
      categoryId: 3,
      image:
        "https://png.pngitem.com/pimgs/s/466-4669092_final-fantasy-xi-17-470x3102x-final-fantasy-xi.png",
    },

    {
      title: "Final Fantasy XII",
      description:
        "The game takes place in Ivalice, where the empires of Archadia and Rozarria are waging an endless war. Dalmasca, a small kingdom, is caught between the warring nations. When Dalmasca is annexed by Archadia, its princess, Ashe, creates a resistance movement. During the struggle, she meets Vaan, a young adventurer who dreams of becoming a sky pirate in command of an airship. They are quickly joined by a band of allies; together, they rally against the tyranny of the Archadian Empire. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 8350,
      categoryId: 1,
      image:
        "https://i.pinimg.com/originals/43/d3/48/43d348b6c64a25e6a3cc7f9c2f4cd17e.jpg",
    },
    {
      title: "Final Fantasy XII",
      description:
        "The game takes place in Ivalice, where the empires of Archadia and Rozarria are waging an endless war. Dalmasca, a small kingdom, is caught between the warring nations. When Dalmasca is annexed by Archadia, its princess, Ashe, creates a resistance movement. During the struggle, she meets Vaan, a young adventurer who dreams of becoming a sky pirate in command of an airship. They are quickly joined by a band of allies; together, they rally against the tyranny of the Archadian Empire. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 8350,
      categoryId: 2,
      image:
        "https://i.pinimg.com/originals/43/d3/48/43d348b6c64a25e6a3cc7f9c2f4cd17e.jpg",
    },
    {
      title: "Final Fantasy XII",
      description:
        "The game takes place in Ivalice, where the empires of Archadia and Rozarria are waging an endless war. Dalmasca, a small kingdom, is caught between the warring nations. When Dalmasca is annexed by Archadia, its princess, Ashe, creates a resistance movement. During the struggle, she meets Vaan, a young adventurer who dreams of becoming a sky pirate in command of an airship. They are quickly joined by a band of allies; together, they rally against the tyranny of the Archadian Empire. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 8350,
      categoryId: 3,
      image:
        "https://i.pinimg.com/originals/43/d3/48/43d348b6c64a25e6a3cc7f9c2f4cd17e.jpg",
    },
    {
      title: "Final Fantasy XII",
      description:
        "The game takes place in Ivalice, where the empires of Archadia and Rozarria are waging an endless war. Dalmasca, a small kingdom, is caught between the warring nations. When Dalmasca is annexed by Archadia, its princess, Ashe, creates a resistance movement. During the struggle, she meets Vaan, a young adventurer who dreams of becoming a sky pirate in command of an airship. They are quickly joined by a band of allies; together, they rally against the tyranny of the Archadian Empire. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 8350,
      categoryId: 4,
      image:
        "https://i.pinimg.com/originals/43/d3/48/43d348b6c64a25e6a3cc7f9c2f4cd17e.jpg",
    },
    {
      title: "Final Fantasy XIII",
      description:
        "The game takes place in the fictional floating world of Cocoon, whose government, the Sanctum, is ordering a purge of civilians who have supposedly come into contact with Pulse, the much-feared world below. The former soldier Lightning begins her fight against the government in order to save her sister who has been branded as an unwilling servant to a god-like being from Pulse, making her an enemy of Cocoon. Lightning is soon joined by a band of allies, and together the group also become marked by the same Pulse creature. They rally against the Sanctum while trying to discover their assigned task and whether they can avoid being turned into monsters or crystals at the completion. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 10000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/7/7a/FFXIII_logo.png/revision/latest?cb=20160920113249",
    },
    {
      title: "Final Fantasy XIII",
      description:
        "The game takes place in the fictional floating world of Cocoon, whose government, the Sanctum, is ordering a purge of civilians who have supposedly come into contact with Pulse, the much-feared world below. The former soldier Lightning begins her fight against the government in order to save her sister who has been branded as an unwilling servant to a god-like being from Pulse, making her an enemy of Cocoon. Lightning is soon joined by a band of allies, and together the group also become marked by the same Pulse creature. They rally against the Sanctum while trying to discover their assigned task and whether they can avoid being turned into monsters or crystals at the completion. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 10000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/7/7a/FFXIII_logo.png/revision/latest?cb=20160920113249",
    },
    {
      title: "Final Fantasy XIII",
      description:
        "The game takes place in the fictional floating world of Cocoon, whose government, the Sanctum, is ordering a purge of civilians who have supposedly come into contact with Pulse, the much-feared world below. The former soldier Lightning begins her fight against the government in order to save her sister who has been branded as an unwilling servant to a god-like being from Pulse, making her an enemy of Cocoon. Lightning is soon joined by a band of allies, and together the group also become marked by the same Pulse creature. They rally against the Sanctum while trying to discover their assigned task and whether they can avoid being turned into monsters or crystals at the completion. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 10000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/7/7a/FFXIII_logo.png/revision/latest?cb=20160920113249",
    },
    {
      title: "Final Fantasy XIV: A Realm Reborn",
      description:
        "Bahamut, a primal dragon, escapes from its lunar prison to initiate the Seventh Umbral Calamity, an apocalyptic event which destroys much of Eorzea. Through the gods' blessing, the player character escapes the devastation by time traveling five years into the future. As Eorzea recovers and rebuilds, the player must deal with the impending threat of invasion by the Garlean Empire from the north. Fantasy MMORPG. Rated T",
      price: 54.99,
      quantity: 15000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/b/b3/FFXIV_logo.png/revision/latest?cb=20160920113420",
    },
    {
      title: "Final Fantasy XIV: A Realm Reborn",
      description:
        "Bahamut, a primal dragon, escapes from its lunar prison to initiate the Seventh Umbral Calamity, an apocalyptic event which destroys much of Eorzea. Through the gods' blessing, the player character escapes the devastation by time traveling five years into the future. As Eorzea recovers and rebuilds, the player must deal with the impending threat of invasion by the Garlean Empire from the north. Fantasy MMORPG. Rated T",
      price: 54.99,
      quantity: 15000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/b/b3/FFXIV_logo.png/revision/latest?cb=20160920113420",
    },
    {
      title: "Final Fantasy XIV: A Realm Reborn",
      description:
        "Bahamut, a primal dragon, escapes from its lunar prison to initiate the Seventh Umbral Calamity, an apocalyptic event which destroys much of Eorzea. Through the gods' blessing, the player character escapes the devastation by time traveling five years into the future. As Eorzea recovers and rebuilds, the player must deal with the impending threat of invasion by the Garlean Empire from the north. Fantasy MMORPG. Rated T",
      price: 54.99,
      quantity: 15000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/finalfantasy/images/b/b3/FFXIV_logo.png/revision/latest?cb=20160920113420",
    },
    {
      title: "Final Fantasy XV",
      description:
        "On the fictional world of Eos; aside from Insomnia, the capital of Lucis, all the world is dominated by the empire of Niflheim, who seek control of the magical Crystal protected by the Lucian royal family. On the eve of peace negotiations, Niflheim attacks the capital and steals the Crystal. Noctis Lucis Caelum, heir to the Lucian throne, goes on a quest to rescue the Crystal and defeat Niflheim. He later learns his full role as the 'True King', destined to use the Crystal's powers to save Eos from eternal darkness. Fantasy RPG. Rated T",
      price: 59.99,
      quantity: 30000,
      categoryId: 1,
      image:
        "https://e7.pngegg.com/pngimages/861/933/png-clipart-final-fantasy-xv-comrades-video-games-noctis-lucis-caelum-final-fantasy-xiii-quest-final-fantasy-x-weapons-game-text.png",
    },
    {
      title: "Super Mario 64",
      description:
        "Play as Mario and save Princess Peach and her servants from the evil Bowser, who has taken over her castle with the power of the castle's Power Stars. Rated E ",
      price: 45.99,
      quantity: 430,
      categoryId: 5,
      image:
        "https://www.dexerto.com/wp-content/uploads/2021/07/11/Super-Mario-64-Nintendo-N64-Auction-World-Record-With-Vignette.jpg",
    },
    {
      title: "Super Mario Sunshine",
      description:
        "The game takes place on the tropical Isle Delfino, where Mario, Toadsworth, Princess Peach, and five Toads are taking a vacation. A villain resembling Mario, known as Shadow Mario, vandalizes the island with graffiti and leaves Mario to be wrongfully convicted for the mess. Help Mario and his friends defeat Shadow Mario Rated E ",
      price: 45.99,
      quantity: 625,
      categoryId: 6,
      image:
        "https://assets-prd.ignimgs.com/2020/09/04/super-mario-sunshine-button-1599246426728.jpg",
    },
    {
      title: "Super Mario Odyssey",
      description:
        "When Bowser kidnaps Princess Peach again, Mario must find a way to save her using his airship, The Odyssey. Explore various kingdoms with Mario and his friend Cappy to collect Power Moons, which help power The Odyssey. Rated E ",
      price: 50.99,
      quantity: 7500,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/74/Super_Mario_Odyssey_Logo.png/revision/latest?cb=20170914192321",
    },
    {
      title: "New Super Mario Bros. U Deluxe",
      description:
        "Princess Peach is held captive in her castle by Bowser, Bowser Jr., and the Koopalings who invade and use a giant mechanical arm to throw Mario, Luigi, and two Toads far away. Mario and friends must now travel across this new land returning to Peach's castle in order to save her. Rated E ",
      price: 50.99,
      quantity: 6430,
      categoryId: 4,
      image: "https://gotgame.com/wp-content/uploads/2019/01/NSMBUD.png",
    },
    {
      title: "Super Mario 3D All-Stars",
      description:
        "Compilation of games for Nintendo Switch. Games included are Super Mario 64, Super Mario Sunshine, and Super Mario Galaxy Rated E ",
      price: 59.99,
      quantity: 10320,
      categoryId: 4,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Super_Mario_3D_All_Stars.jpg/220px-Super_Mario_3D_All_Stars.jpg",
    },
    {
      title: "Super Mario 3D World + Browser's Fury",
      description:
        "Super Mario 3D World: Mario, Luigi, Peach, and Toad are watching a fireworks show until they find a tilted glass pipe. After Mario and Luigi fix it, a green fairy-like Sprixie princess appears and tells them that Bowser has kidnapped and trapped the rest of the Sprixie princesses in jars. He arrives and captures her before escaping through the pipe, while the heroes enter it and pursue him. They find themselves in a realm known as 'The Sprixie Kingdom' and set off to find the Sprixies. Bundled with this game is Bowser's Fury: Help Mario defeat Fury Bowser by collecting Cat Shrines around Lake Lapcat. Rated E ",
      price: 59.99,
      quantity: 10320,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/0/0c/Logo-Super_Mario_3D_World_Bowser%E2%80%99s_Fury.png/revision/latest?cb=20200903173636",
    },
    {
      title: "Super Mario Kart",
      description:
        "Use your favorite Mario Kingdom characters to race against other Mario characters. Rated E",
      price: 35.99,
      quantity: 4500,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/9/99/Super-Mario-Kart-Logo.png/revision/latest?cb=20140211221159",
    },
    {
      title: "Mario Kart 64",
      description:
        "Use your favorite Mario Kingdom characters to race against other Mario characters. Rated E",
      price: 45.99,
      quantity: 650,
      categoryId: 5,
      image: "https://upload.wikimedia.org/wikipedia/en/a/a1/Mario_Kart_64.jpg",
    },
    {
      title: "Mario Kart: Double Dash!!",
      description:
        "Use your favorite Mario Kingdom characters to race against other Mario characters. Rated E",
      price: 45.99,
      quantity: 746,
      categoryId: 6,
      image:
        "https://upload.wikimedia.org/wikipedia/en/7/78/Mario_Kart_Double_Dash.jpg",
    },
    {
      title: "Mario Kart 8 Deluxe",
      description:
        "Use your favorite Mario Kingdom characters to race against other Mario characters. Rated E",
      price: 49.99,
      quantity: 12500,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/78/Mario_Kart_8_Deluxe_logo.png/revision/latest/scale-to-width-down/2000?cb=20170503002757",
    },
    {
      title: "Mario Kart Live: Home Circuit",
      description:
        "Build Racing playsets around your house, and use radio controlled cars that link to your switch remotes to race on the tracks you build. Rated E",
      price: 54.99,
      quantity: 25000,
      categoryId: 4,
      image: "https://mklive.nintendo.com/assets/img/global/logo-game.png",
    },
    {
      title: "Halo",
      description:
        "Set in the 26th Century, take control of Master Chief, a cybernetically enhanced supersoldier, and battle aliens as you discover the secrets of Halo, a ring shaped artificial world. First Person Shooter. Rated T",
      price: 35.99,
      quantity: 4300,
      categoryId: 1,
      image:
        "https://lh3.googleusercontent.com/proxy/vbDFJp1qOtjGyK-Weie54ume4fEESWOWNKGWv-BzBsOHll8_SxTfJTZLSBQVhEUlH6NBFVgYRScaqwqxCEdEGgTc2-nR",
    },
    {
      title: "Halo",
      description:
        "Set in the 26th Century, take control of Master Chief, a cybernetically enhanced supersoldier, and battle aliens as you discover the secrets of Halo, a ring shaped artificial world. First Person Shooter. Rated T",
      price: 35.99,
      quantity: 4300,
      categoryId: 2,
      image:
        "https://lh3.googleusercontent.com/proxy/vbDFJp1qOtjGyK-Weie54ume4fEESWOWNKGWv-BzBsOHll8_SxTfJTZLSBQVhEUlH6NBFVgYRScaqwqxCEdEGgTc2-nR",
    },
    {
      title: "Halo 2",
      description:
        "Take control of Master Chief, and ocassioanlly the Arbiter, a Covenenant Defect in the conflict between the United Nations Space Command, the Covenenant, and the parasitic Flood. First Person Shooter. Rated T",
      price: 37.99,
      quantity: 8000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/b1/Halo_2_Symbol.png/revision/latest/scale-to-width-down/250?cb=20161229064006",
    },
    {
      title: "Halo 2",
      description:
        "Take control of Master Chief, and ocassioanlly the Arbiter, a Covenenant Defect in the conflict between the United Nations Space Command, the Covenenant, and the parasitic Flood. First Person Shooter. Rated T",
      price: 37.99,
      quantity: 8000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/b1/Halo_2_Symbol.png/revision/latest/scale-to-width-down/250?cb=20161229064006",
    },
    {
      title: "Halo 3",
      description:
        "Take control of Master Chief in the interstellar war between humanity, the Covenenant, and the parasitic Flood. First Person Shooter. Rated T",
      price: 39.99,
      quantity: 10540,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/71/Halo_3_Logo.png",
    },
    {
      title: "Halo 3",
      description:
        "Take control of Master Chief in the interstellar war between humanity, the Covenenant, and the parasitic Flood. First Person Shooter. Rated T",
      price: 39.99,
      quantity: 10540,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/71/Halo_3_Logo.png",
    },
    {
      title: "Halo 3: ODST",
      description:
        "In the Midst of an alien invasion, take control of 'Orbital Drop Shock Troopers' and explore the ruined city of New Mombasa in search of your missing comrades. First person shooter Rated T",
      price: 35.99,
      quantity: 9000,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Halo_3_ODST_Box_Art.png/220px-Halo_3_ODST_Box_Art.png",
    },
    {
      title: "Halo 3: ODST",
      description:
        "In the Midst of an alien invasion, take control of 'Orbital Drop Shock Troopers' and explore the ruined city of New Mombasa in search of your missing comrades. First person shooter. Rated T",
      price: 35.99,
      quantity: 9000,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Halo_3_ODST_Box_Art.png/220px-Halo_3_ODST_Box_Art.png",
    },
    {
      title: "Halo: Reach",
      description:
        "Take control of Noble Six, and help his elite supersoldier squad defend the human world Reach from a Covenant attack. First Person Shooter. Rated T",
      price: 45.99,
      quantity: 12000,
      categoryId: 1,
      image:
        "https://i.pinimg.com/originals/5c/f6/27/5cf627e00b0774442bd1ccf0f1956a67.jpg",
    },
    {
      title: "Halo: Reach",
      description:
        "Take control of Noble Six, and help his elite supersoldier squad defend the human world Reach from a Covenant attack. First Person Shooter. Rated T",
      price: 45.99,
      quantity: 12000,
      categoryId: 2,
      image:
        "https://i.pinimg.com/originals/5c/f6/27/5cf627e00b0774442bd1ccf0f1956a67.jpg",
    },
    {
      title: "Halo 4",
      description:
        "Take control of Master Chief as he explores an ancient civilation's planet. First Person Shooter. Rated T",
      price: 52.99,
      quantity: 15000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/8/8c/Halo4.png/revision/latest/scale-to-width-down/2000?cb=20170119093736",
    },
    {
      title: "Halo 4",
      description:
        "Take control of Master Chief as he explores an ancient civilation's planet. First Person Shooter. Rated T",
      price: 52.99,
      quantity: 15000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/8/8c/Halo4.png/revision/latest/scale-to-width-down/2000?cb=20170119093736",
    },
    {
      title: "Halo 5: Guardians",
      description:
        "Master Chief, leader of Blue Team, takes his team on an unsactioned mission to find Cortana. Spartan Locke and fireteam Osiris is sent to retrieve him. First Person Shooter. Rated T",
      price: 55.99,
      quantity: 23000,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Logo_Halo_5_Guardians_schwarz.svg/2560px-Logo_Halo_5_Guardians_schwarz.svg.png",
    },
    {
      title: "Halo 5: Guardians",
      description:
        "Master Chief, leader of Blue Team, takes his team on an unsactioned mission to find Cortana. Spartan Locke and fireteam Osiris is sent to retrieve him. First Person Shooter. Rated T",
      price: 55.99,
      quantity: 23000,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Logo_Halo_5_Guardians_schwarz.svg/2560px-Logo_Halo_5_Guardians_schwarz.svg.png",
    },
    {
      title: "GoldenEye 007",
      description:
        "Play as James Bond to save the world against a plot by the Russians to use a space-based weapons named GoldenEye. Rated M",
      price: 45.99,
      quantity: 430,
      categoryId: 5,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Goldeneye-logo.svg/1280px-Goldeneye-logo.svg.png",
    },
    {
      title: "GoldenEye 007 Remake",
      description:
        "Play as James Bond to save the world against a plot by the Russians to use a space-based weapons named GoldenEye. Rated M",
      price: 45.99,
      quantity: 6800,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/GoldenEye_007_2010_remake_box_art.png/220px-GoldenEye_007_2010_remake_box_art.png",
    },
    {
      title: "GoldenEye 007 Remake",
      description:
        "Play as James Bond to save the world against a plot by the Russians to use a space-based weapons named GoldenEye. Rated M",
      price: 45.99,
      quantity: 6800,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/GoldenEye_007_2010_remake_box_art.png/220px-GoldenEye_007_2010_remake_box_art.png",
    },
    {
      title: "The Legend of Zelda",
      description:
        "Set in the fantasy land of Hyrule, take control of Link, an elf-boy who needs to collect eight fragments of the Triforce of Wisdom to save Princess Zelda from Ganon. Rated E",
      price: 54.99,
      quantity: 2000,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/e/ed/Tloz.jpg/revision/latest?cb=20200804074609",
    },
    {
      title: "The Legend of Zelda",
      description:
        "Set in the fantasy land of Hyrule, take control of Link, an elf-boy who needs to collect eight fragments of the Triforce of Wisdom to save Princess Zelda from Ganon. Rated E",
      price: 54.99,
      quantity: 2000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/e/ed/Tloz.jpg/revision/latest?cb=20200804074609",
    },
    {
      title: "Zelda II: The Adventure of Link",
      description:
        "Play as Link, and save Princess Zelda after she falls under a sleeping spell. Rated E",
      price: 54.99,
      quantity: 6437,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/e/ee/TAoL_Black_Logo.png/revision/latest?cb=20170127043039",
    },
    {
      title: "Zelda II: The Adventure of Link",
      description:
        "Play as Link, and save Princess Zelda after she falls under a sleeping spell. Rated E",
      price: 54.99,
      quantity: 6437,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/e/ee/TAoL_Black_Logo.png/revision/latest?cb=20170127043039",
    },
    {
      title: "The Legend of Zelda: A Link to the Past",
      description:
        "Many years before the events of the first two Zelda games, play as Link on his quest to save Hyrule, defeat Ganon, and rescue the descendants of the Seven Sages. Rated E",
      price: 54.99,
      quantity: 8500,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/cc/ALttP_Logo.png/revision/latest?cb=20170127003942",
    },
    {
      title: "The Legend of Zelda: Ocarina of Time",
      description:
        "Take control of Link, and travel through time on a quest to stop Ganondorf. Rated E",
      price: 59.99,
      quantity: 3200,
      categoryId: 5,
      image: "https://image.pngaaa.com/540/3854540-middle.png",
    },
    {
      title: "The Legend of Zelda: Ocarina of Time",
      description:
        "Take control of Link, and travel through time on a quest to stop Ganondorf. Rated E",
      price: 59.99,
      quantity: 3200,
      categoryId: 4,
      image: "https://image.pngaaa.com/540/3854540-middle.png",
    },
    {
      title: "The Legend of Zelda: Ocarina of Time",
      description:
        "Take control of Link, and travel through time on a quest to stop Ganondorf. Rated E",
      price: 59.99,
      quantity: 3200,
      categoryId: 6,
      image: "https://image.pngaaa.com/540/3854540-middle.png",
    },
    {
      title: "The Legend of Zelda: Majora's Mask",
      description:
        "Help Link save Termina, a world parallel to Hyrule. Rated E",
      price: 55.99,
      quantity: 4350,
      categoryId: 5,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/2d/MM_Logo.png/revision/latest?cb=20091127041259",
    },
    {
      title: "The Legend of Zelda: Majora's Mask",
      description:
        "Help Link save Termina, a world parallel to Hyrule. Rated E",
      price: 55.99,
      quantity: 4350,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/2d/MM_Logo.png/revision/latest?cb=20091127041259",
    },
    {
      title: "The Legend of Zelda: The Wind Waker",
      description: "Link attempts to save his siter from Ganon. Rated E",
      price: 44.99,
      quantity: 2100,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/3b/TWW_logo.png/revision/latest/scale-to-width-down/1200?cb=20110511023616",
    },
    {
      title: "The Legend of Zelda: Four Swords Adventures",
      description:
        "Play as Link and his three clones to save Hyrule from Shadow Link. Rated E",
      price: 44.99,
      quantity: 1850,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/1/19/FSA_Logo.png/revision/latest/scale-to-width-down/1200?cb=20091121180037",
    },
    {
      title: "The Legend of Zelda: Twilight Princess",
      description:
        "Play as Link, and try to save Hyrule from being engulfed by the corrupted parallel dimension, the Twilight Realm. Rated E",
      price: 44.99,
      quantity: 1545,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/a/a0/TPHD_Logo.png/revision/latest/scale-to-width-down/1200?cb=20160126044740",
    },
    {
      title: "The Legend of Zelda: Skyward Sword",
      description:
        "Play as Link, and navagate through Skyloft solving environmental and dungeon-based puzzles. Rated E",
      price: 44.99,
      quantity: 15000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/6/62/SS_Logo.png/revision/latest/scale-to-width-down/1200?cb=20180810191429",
    },
    {
      title: "The Legend of Zelda: Breath of the Wild",
      description:
        "Play as Link. After waking up from a one hundred-year slumber, Explore Hyrule on a quest to defeat Calamity Ganaon. Rated E",
      price: 49.99,
      quantity: 35000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/5/53/763px-BotW_NA_Logo.png/revision/latest?cb=20160701154320",
    },
    {
      title: "Sonic the Hedgehog CD",
      description:
        "Play as Sonic as he attempts to save Little Planet from the evil Docotr Robotnik. Rated E",
      price: 19.99,
      quantity: 1000,
      categoryId: 1,
      image: "http://retrocdn.net/images/4/43/SonicCD2011_PC_title.png",
    },
    {
      title: "Sonic the Hedgehog 4: Episode I",
      description:
        "Take control of Sonic, and help him defeat Doctor Eggman. Rated E",
      price: 24.99,
      quantity: 3200,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/9/95/Sonic-the-hedgehog-4-episode-1-cover.jpg/revision/latest?cb=20140208135414",
    },
    {
      title: "Sonic the Hedgehog 4: Episode II",
      description:
        "When Docotr Eggman finds and repairs Metal Sonic, Sonic must set out to defeat both Eggman and Metal Sonic. Rated E",
      price: 24.99,
      quantity: 2900,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/c/c1/500px-sonic-the-hedgehog-4-episode-2.png/revision/latest?cb=20140208140020",
    },
    {
      title: "Sonic Mania",
      description:
        "Help Sonic and Tails defeat Docotr Eggman again after he gains power from the Phantom Ruby, and retakes Little PLanet. Rated E",
      price: 34.99,
      quantity: 5600,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/8/8a/Sonic_Mania.svg/revision/latest/scale-to-width-down/300?cb=20210321123334",
    },
    {
      title: "Sonic Mania",
      description:
        "Help Sonic and Tails defeat Docotr Eggman again after he gains power from the Phantom Ruby, and retakes Little PLanet. Rated E",
      price: 34.99,
      quantity: 5600,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/8/8a/Sonic_Mania.svg/revision/latest/scale-to-width-down/300?cb=20210321123334",
    },
    {
      title: "Sonic Mania",
      description:
        "Help Sonic and Tails defeat Docotr Eggman again after he gains power from the Phantom Ruby, and retakes Little PLanet. Rated E",
      price: 34.99,
      quantity: 5600,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/8/8a/Sonic_Mania.svg/revision/latest/scale-to-width-down/300?cb=20210321123334",
    },
    {
      title: "Sonic Mania",
      description:
        "Help Sonic and Tails defeat Docotr Eggman again after he gains power from the Phantom Ruby, and retakes Little PLanet. Rated E",
      price: 34.99,
      quantity: 5600,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/8/8a/Sonic_Mania.svg/revision/latest/scale-to-width-down/300?cb=20210321123334",
    },
    {
      title: "Sonic 3D Blast",
      description:
        "Help Sonic on his journey to save the Flickies, a species of birds that have been enslaved by Doctor Robotnik. Rated E",
      price: 14.99,
      quantity: 2965,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/71/ME0001353085_2.jpg/revision/latest/scale-to-width-down/250?cb=20140209042044",
    },
    {
      title: "Sonic Adventure",
      description:
        "Help Sonic and friends collect the seven Chaos Emeralds and stop Docotr Robotnik from unleashing the ancient evil Chaos. Rated E",
      price: 17.99,
      quantity: 4000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/5/5c/Sonic_Adventure.png/revision/latest?cb=20190306080922",
    },
    {
      title: "Sonic Adventure",
      description:
        "Help Sonic and friends collect the seven Chaos Emeralds and stop Docotr Robotnik from unleashing the ancient evil Chaos. Rated E",
      price: 17.99,
      quantity: 4000,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/5/5c/Sonic_Adventure.png/revision/latest?cb=20190306080922",
    },
    {
      title: "Sonic Adventure",
      description:
        "Help Sonic and friends collect the seven Chaos Emeralds and stop Docotr Robotnik from unleashing the ancient evil Chaos. Rated E",
      price: 17.99,
      quantity: 4000,
      categoryId: 7,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/5/5c/Sonic_Adventure.png/revision/latest?cb=20190306080922",
    },
    {
      title: "Sonic Adventure 2",
      description:
        "Help Sonic and friends save the world from Shadow the Hedgehog, Docotr Eggman, and Rouge the Bat. Rated E",
      price: 19.99,
      quantity: 3200,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/3/37/500px-Sonic_Adventure_2_-_The_Trial.png/revision/latest?cb=20170131211028",
    },
    {
      title: "Sonic Adventure 2",
      description:
        "Help Sonic and friends save the world from Shadow the Hedgehog, Docotr Eggman, and Rouge the Bat. Rated E",
      price: 19.99,
      quantity: 3200,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/3/37/500px-Sonic_Adventure_2_-_The_Trial.png/revision/latest?cb=20170131211028",
    },
    {
      title: "Sonic Adventure 2",
      description:
        "Help Sonic and friends save the world from Shadow the Hedgehog, Docotr Eggman, and Rouge the Bat. Rated E",
      price: 19.99,
      quantity: 3200,
      categoryId: 7,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/3/37/500px-Sonic_Adventure_2_-_The_Trial.png/revision/latest?cb=20170131211028",
    },
    {
      title: "Sonic Heroes",
      description:
        "The player races a team of series characters through levels to amass rings, defeat robots, and collect the seven Chaos Emeralds needed to defeat Doctor Eggman. Rated E",
      price: 19.99,
      quantity: 5560,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/c/ce/Sonic_Heroes.png/revision/latest?cb=20190306081734",
    },
    {
      title: "Sonic Heroes",
      description:
        "The player races a team of series characters through levels to amass rings, defeat robots, and collect the seven Chaos Emeralds needed to defeat Doctor Eggman. Rated E",
      price: 19.99,
      quantity: 5560,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/c/ce/Sonic_Heroes.png/revision/latest?cb=20190306081734",
    },
    {
      title: "Sonic Heroes",
      description:
        "The player races a team of series characters through levels to amass rings, defeat robots, and collect the seven Chaos Emeralds needed to defeat Doctor Eggman. Rated E",
      price: 19.99,
      quantity: 5560,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/c/ce/Sonic_Heroes.png/revision/latest?cb=20190306081734",
    },
    {
      title: "Sonic Heroes",
      description:
        "The player races a team of series characters through levels to amass rings, defeat robots, and collect the seven Chaos Emeralds needed to defeat Doctor Eggman. Rated E",
      price: 19.99,
      quantity: 5560,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/c/ce/Sonic_Heroes.png/revision/latest?cb=20190306081734",
    },
    {
      title: "Shadow the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 23.99,
      quantity: 4500,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/2/28/Shadow_the_Hedgehog_Logo.png/revision/latest?cb=20190404133358",
    },
    {
      title: "Shadow the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 23.99,
      quantity: 4500,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/2/28/Shadow_the_Hedgehog_Logo.png/revision/latest?cb=20190404133358",
    },
    {
      title: "Shadow the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 23.99,
      quantity: 4500,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/2/28/Shadow_the_Hedgehog_Logo.png/revision/latest?cb=20190404133358",
    },
    {
      title: "Sonic the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 24.99,
      quantity: 6800,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/sonic/images/e/e5/Sonic_Next_Gen.jpg/revision/latest?cb=20191002075609",
    },
    {
      title: "Sonic the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 24.99,
      quantity: 6800,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/sonic/images/e/e5/Sonic_Next_Gen.jpg/revision/latest?cb=20191002075609",
    },
    {
      title: "Sonic Unleashed",
      description:
        "Take control of Sonic, as he attempts to restore order to his world after the evil Docotr Eggman destroys it using a powerful laser to unleash Dark Gaia, an ancient evil. Rated E",
      price: 24.99,
      quantity: 6230,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/7f/Sonic_Unleashed.png/revision/latest?cb=20200705150644",
    },
    {
      title: "Sonic Unleashed",
      description:
        "Take control of Sonic, as he attempts to restore order to his world after the evil Docotr Eggman destroys it using a powerful laser to unleash Dark Gaia, an ancient evil. Rated E",
      price: 24.99,
      quantity: 6230,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/7f/Sonic_Unleashed.png/revision/latest?cb=20200705150644",
    },
    {
      title: "Sonic Colors",
      description:
        "Help Sonic on his quest to stop Doctor Eggman from enslaving an alien race and taking over the world. Rated E",
      price: 29.99,
      quantity: 10050,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/77/Sonic_Colors%E2%84%A2_Logo.png/revision/latest?cb=20211002203650",
    },
    {
      title: "Sonic Colors",
      description:
        "Help Sonic on his quest to stop Doctor Eggman from enslaving an alien race and taking over the world. Rated E",
      price: 29.99,
      quantity: 10050,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/77/Sonic_Colors%E2%84%A2_Logo.png/revision/latest?cb=20211002203650",
    },
    {
      title: "Sonic Colors",
      description:
        "Help Sonic on his quest to stop Doctor Eggman from enslaving an alien race and taking over the world. Rated E",
      price: 29.99,
      quantity: 10050,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/77/Sonic_Colors%E2%84%A2_Logo.png/revision/latest?cb=20211002203650",
    },
    {
      title: "Sonic Colors",
      description:
        "Help Sonic on his quest to stop Doctor Eggman from enslaving an alien race and taking over the world. Rated E",
      price: 29.99,
      quantity: 10050,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/7/77/Sonic_Colors%E2%84%A2_Logo.png/revision/latest?cb=20211002203650",
    },
    {
      title: "Sonic Generations",
      description:
        "Play as Sonic and Tails as they form an alliance with their past selves. Rated E",
      price: 29.99,
      quantity: 9800,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sonic-Generations-transparent-bg.png",
    },
    {
      title: "Sonic Generations",
      description:
        "Play as Sonic and Tails as they form an alliance with their past selves. Rated E",
      price: 29.99,
      quantity: 9800,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sonic-Generations-transparent-bg.png",
    },
    {
      title: "Sonic Generations",
      description:
        "Play as Sonic and Tails as they form an alliance with their past selves. Rated E",
      price: 29.99,
      quantity: 9800,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sonic-Generations-transparent-bg.png",
    },
    {
      title: "Sonic Lost World",
      description:
        "Help Sonic stop the alien tribe called the Deadly Six as they seek to siphon energy from Lost Hex. Rated E",
      price: 24.99,
      quantity: 5690,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/6/6f/Sonic_Lost_World_Logo.png/revision/latest?cb=20200702223320",
    },
    {
      title: "Sonic Forces",
      description:
        "Take control of Sonic and his resistance force to stop Doctor Eggman after he conquers the world with his new ally, Infinite. Rated E",
      price: 29.99,
      quantity: 8000,
      categoryId: 1,
      image:
        "https://www.nicepng.com/png/detail/341-3416244_sonic-forces-logo-png-sonic-forces-nintendo-switch.png",
    },
    {
      title: "Sonic Forces",
      description:
        "Take control of Sonic and his resistance force to stop Doctor Eggman after he conquers the world with his new ally, Infinite. Rated E",
      price: 29.99,
      quantity: 8000,
      categoryId: 2,
      image:
        "https://www.nicepng.com/png/detail/341-3416244_sonic-forces-logo-png-sonic-forces-nintendo-switch.png",
    },
    {
      title: "Sonic Forces",
      description:
        "Take control of Sonic and his resistance force to stop Doctor Eggman after he conquers the world with his new ally, Infinite. Rated E",
      price: 29.99,
      quantity: 8000,
      categoryId: 3,
      image:
        "https://www.nicepng.com/png/detail/341-3416244_sonic-forces-logo-png-sonic-forces-nintendo-switch.png",
    },
    {
      title: "Sonic Forces",
      description:
        "Take control of Sonic and his resistance force to stop Doctor Eggman after he conquers the world with his new ally, Infinite. Rated E",
      price: 29.99,
      quantity: 8000,
      categoryId: 4,
      image:
        "https://www.nicepng.com/png/detail/341-3416244_sonic-forces-logo-png-sonic-forces-nintendo-switch.png",
    },
    {
      title: "Crazy Taxi",
      description:
        "Take control of a taxi cab, pick up passengers, and get them to their destination as quickly as possible. The crazier you drive, the better. Rated T",
      price: 24.99,
      quantity: 4000,
      categoryId: 1,
      image:
        "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fapptrigger.com%2Ffiles%2F2017%2F05%2Fcrazy-taxi-header.jpg",
    },
    {
      title: "Crazy Taxi",
      description:
        "Take control of a taxi cab, pick up passengers, and get them to their destination as quickly as possible. The crazier you drive, the better. Rated T",
      price: 24.99,
      quantity: 4000,
      categoryId: 3,
      image:
        "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fapptrigger.com%2Ffiles%2F2017%2F05%2Fcrazy-taxi-header.jpg",
    },
    {
      title: "Crazy Taxi",
      description:
        "Take control of a taxi cab, pick up passengers, and get them to their destination as quickly as possible. The crazier you drive, the better. Rated T",
      price: 24.99,
      quantity: 4000,
      categoryId: 7,
      image:
        "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fapptrigger.com%2Ffiles%2F2017%2F05%2Fcrazy-taxi-header.jpg",
    },
    {
      title: "Crazy Taxi 2",
      description:
        "Take control of a taxi cab, pick up passengers, and get them to their destination as quickly as possible. The crazier you drive, the better. Rated T",
      price: 27.99,
      quantity: 5200,
      categoryId: 7,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/6/65/Crazy_Taxi_2_Logo_1_a.gif/revision/latest?cb=20140212145815",
    },
    {
      title: "Crazy Taxi 3: High Roller",
      description:
        "Take control of a taxi cab, pick up passengers, and get them to their destination as quickly as possible. The crazier you drive, the better. Rated T",
      price: 27.99,
      quantity: 5200,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/3/36/1170181-crazy_taxi_3.png/revision/latest?cb=20140212150240",
    },
    {
      title: "Crazy Taxi 3: High Roller",
      description:
        "Take control of a taxi cab, pick up passengers, and get them to their destination as quickly as possible. The crazier you drive, the better. Rated T",
      price: 27.99,
      quantity: 5200,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/3/36/1170181-crazy_taxi_3.png/revision/latest?cb=20140212150240",
    },
    {
      title: "Half-life",
      description:
        "Play as Gordon Freeman, and help him escape the Black Mesa Research Faciltity after it is invaded by aliens. Rated M",
      price: 34.99,
      quantity: 4300,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Half-Life_Cover_Art.jpg/220px-Half-Life_Cover_Art.jpg",
    },
    {
      title: "Half-life",
      description:
        "Play as Gordon Freeman, and help him escape the Black Mesa Research Faciltity after it is invaded by aliens. Rated M",
      price: 34.99,
      quantity: 4300,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Half-Life_Cover_Art.jpg/220px-Half-Life_Cover_Art.jpg",
    },
    {
      title: "Half-life 2",
      description:
        "Gorodon Freeman joins a resistance movement 20 years after the events of the first Half-Life game. Help liberate Earth from the alien empire knows as the Combine. Rated M",
      price: 39.99,
      quantity: 6500,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/b7/Half-Life_2.svg/revision/latest/scale-to-width-down/300?cb=20190608145642",
    },
    {
      title: "Half-life 2",
      description:
        "Gorodon Freeman joins a resistance movement 20 years after the events of the first Half-Life game. Help liberate Earth from the alien empire knows as the Combine. Rated M",
      price: 39.99,
      quantity: 6500,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/b7/Half-Life_2.svg/revision/latest/scale-to-width-down/300?cb=20190608145642",
    },
    {
      title: "Half-life 2",
      description:
        "Gorodon Freeman joins a resistance movement 20 years after the events of the first Half-Life game. Help liberate Earth from the alien empire knows as the Combine. Rated M",
      price: 39.99,
      quantity: 6500,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/b7/Half-Life_2.svg/revision/latest/scale-to-width-down/300?cb=20190608145642",
    },
    {
      title: "Half-life 2: Episode One",
      description:
        "Take control of Gordon Freeman as you help him and his friend Alyx Vance escape City 17. Rated M",
      price: 39.99,
      quantity: 7000,
      categoryId: 1,
      image:
        "https://e1.pngegg.com/pngimages/97/227/png-clipart-half-life-2-episode-1-icon-half-life2-episode1-half-life-2-logo-art-thumbnail.png",
    },
    {
      title: "Half-life 2: Episode One",
      description:
        "Take control of Gordon Freeman as you help him and his friend Alyx Vance escape City 17. Rated M",
      price: 39.99,
      quantity: 7000,
      categoryId: 2,
      image:
        "https://e1.pngegg.com/pngimages/97/227/png-clipart-half-life-2-episode-1-icon-half-life2-episode1-half-life-2-logo-art-thumbnail.png",
    },
    {
      title: "Half-life 2: Episode One",
      description:
        "Take control of Gordon Freeman as you help him and his friend Alyx Vance escape City 17. Rated M",
      price: 39.99,
      quantity: 7000,
      categoryId: 3,
      image:
        "https://e1.pngegg.com/pngimages/97/227/png-clipart-half-life-2-episode-1-icon-half-life2-episode1-half-life-2-logo-art-thumbnail.png",
    },
    {
      title: "Half-life 2: Episode Two",
      description:
        "Travel through the mountains outside of City 17, and help Gordon Freeman and Alyx Vance find the resistance base. Rated M",
      price: 39.99,
      quantity: 7340,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/2d/Half-Life_2_Episode_Two_title.jpg",
    },
    {
      title: "Half-life 2: Episode Two",
      description:
        "Travel through the mountains outside of City 17, and help Gordon Freeman and Alyx Vance find the resistance base. Rated M",
      price: 39.99,
      quantity: 7340,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/2d/Half-Life_2_Episode_Two_title.jpg",
    },
    {
      title: "Half-life 2: Episode Two",
      description:
        "Travel through the mountains outside of City 17, and help Gordon Freeman and Alyx Vance find the resistance base. Rated M",
      price: 39.99,
      quantity: 7340,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/2d/Half-Life_2_Episode_Two_title.jpg",
    },
    {
      title: "Half-life: Alyx",
      description:
        "Set between the events of Half-Life and Half-Life 2, play as Alyx Vance on her mission to seize a superweapon that belongs to the Combine. Rated M",
      price: 49.99,
      quantity: 25000,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Half-Life_Alyx_Logo.png",
    },
    {
      title: "Resident Evil",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 4300,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Resident_Evil_1_cover.png/220px-Resident_Evil_1_cover.png",
    },
    {
      title: "Resident Evil",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 4300,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Resident_Evil_1_cover.png/220px-Resident_Evil_1_cover.png",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/capcomdatabase/images/b/b8/RE_Remake_Logo.png/revision/latest?cb=20190712212722",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/capcomdatabase/images/b/b8/RE_Remake_Logo.png/revision/latest?cb=20190712212722",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/capcomdatabase/images/b/b8/RE_Remake_Logo.png/revision/latest?cb=20190712212722",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/capcomdatabase/images/b/b8/RE_Remake_Logo.png/revision/latest?cb=20190712212722",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/capcomdatabase/images/b/b8/RE_Remake_Logo.png/revision/latest?cb=20190712212722",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/9/9d/Resident_Evil_2_logo.png/revision/latest?cb=20140309085835",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/9/9d/Resident_Evil_2_logo.png/revision/latest?cb=20140309085835",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 5,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/9/9d/Resident_Evil_2_logo.png/revision/latest?cb=20140309085835",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/9/9d/Resident_Evil_2_logo.png/revision/latest?cb=20140309085835",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 7,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/9/9d/Resident_Evil_2_logo.png/revision/latest?cb=20140309085835",
    },
    {
      title: "Resident Evil 2 (2019 remake)",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 29.99,
      quantity: 9800,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Resident_Evil_2_Remake.jpg/220px-Resident_Evil_2_Remake.jpg",
    },
    {
      title: "Resident Evil 2 (2019 remake)",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 29.99,
      quantity: 9800,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Resident_Evil_2_Remake.jpg/220px-Resident_Evil_2_Remake.jpg",
    },
    {
      title: "Resident Evil 2 (2019 remake)",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 29.99,
      quantity: 9800,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Resident_Evil_2_Remake.jpg/220px-Resident_Evil_2_Remake.jpg",
    },
    {
      title: "Resident Evil 3: Nemesis",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 29.99,
      quantity: 10000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/residentevil/images/c/c1/RE3logo.jpg/revision/latest?cb=20140126024556",
    },
    {
      title: "Resident Evil 3: Nemesis",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 29.99,
      quantity: 10000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/residentevil/images/c/c1/RE3logo.jpg/revision/latest?cb=20140126024556",
    },
    {
      title: "Resident Evil 3: Nemesis",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 29.99,
      quantity: 10000,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/residentevil/images/c/c1/RE3logo.jpg/revision/latest?cb=20140126024556",
    },
    {
      title: "Resident Evil 3: Nemesis",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 29.99,
      quantity: 10000,
      categoryId: 7,
      image:
        "https://static.wikia.nocookie.net/residentevil/images/c/c1/RE3logo.jpg/revision/latest?cb=20140126024556",
    },
    {
      title: "Resident Evil 3 (2020 remake)",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 39.99,
      quantity: 25000,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Resident_Evil_3.jpg/220px-Resident_Evil_3.jpg",
    },
    {
      title: "Resident Evil 3 (2020 remake)",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 39.99,
      quantity: 25000,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Resident_Evil_3.jpg/220px-Resident_Evil_3.jpg",
    },
    {
      title: "Resident Evil 3 (2020 remake)",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 39.99,
      quantity: 25000,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Resident_Evil_3.jpg/220px-Resident_Evil_3.jpg",
    },
    {
      title: "Resident Evil - Code: Veronica",
      description:
        "Three months after the event of Resident Evil 2, play as Claire Redfield and Chris Redfield as they try to survive on both a remote prison island, and a research facitlity in Antarctica. Rated M",
      price: 34.99,
      quantity: 9650,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/residentevil/images/2/26/Resident_Evil_CODE_Veronica.png/revision/latest?cb=20150529052207",
    },
    {
      title: "Resident Evil - Code: Veronica",
      description:
        "Three months after the event of Resident Evil 2, play as Claire Redfield and Chris Redfield as they try to survive on both a remote prison island, and a research facitlity in Antarctica. Rated M",
      price: 34.99,
      quantity: 9650,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/residentevil/images/2/26/Resident_Evil_CODE_Veronica.png/revision/latest?cb=20150529052207",
    },
    {
      title: "Resident Evil - Code: Veronica",
      description:
        "Three months after the event of Resident Evil 2, play as Claire Redfield and Chris Redfield as they try to survive on both a remote prison island, and a research facitlity in Antarctica. Rated M",
      price: 34.99,
      quantity: 9650,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/residentevil/images/2/26/Resident_Evil_CODE_Veronica.png/revision/latest?cb=20150529052207",
    },
    {
      title: "Resident Evil - Code: Veronica",
      description:
        "Three months after the event of Resident Evil 2, play as Claire Redfield and Chris Redfield as they try to survive on both a remote prison island, and a research facitlity in Antarctica. Rated M",
      price: 34.99,
      quantity: 9650,
      categoryId: 7,
      image:
        "https://static.wikia.nocookie.net/residentevil/images/2/26/Resident_Evil_CODE_Veronica.png/revision/latest?cb=20150529052207",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/f6/Resident_Evil_Zero.png/revision/latest?cb=20140926215921",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/f6/Resident_Evil_Zero.png/revision/latest?cb=20140926215921",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/f6/Resident_Evil_Zero.png/revision/latest?cb=20140926215921",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/f6/Resident_Evil_Zero.png/revision/latest?cb=20140926215921",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/f6/Resident_Evil_Zero.png/revision/latest?cb=20140926215921",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/6/66/Re4_logo.jpg/revision/latest/scale-to-width-down/2000?cb=20140208001441",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/6/66/Re4_logo.jpg/revision/latest/scale-to-width-down/2000?cb=20140208001441",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/6/66/Re4_logo.jpg/revision/latest/scale-to-width-down/2000?cb=20140208001441",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/6/66/Re4_logo.jpg/revision/latest/scale-to-width-down/2000?cb=20140208001441",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/6/66/Re4_logo.jpg/revision/latest/scale-to-width-down/2000?cb=20140208001441",
    },
    {
      title: "Resident Evil 5",
      description:
        "Play as Bioterrorism Security Assessment Alliance agents Chris Redfield and Sheva Alomar as they investigate terrorist threats. Rated M",
      price: 39.99,
      quantity: 16500,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/fb/REimage.png/revision/latest?cb=20140309090207",
    },
    {
      title: "Resident Evil 5",
      description:
        "Play as Bioterrorism Security Assessment Alliance agents Chris Redfield and Sheva Alomar as they investigate terrorist threats. Rated M",
      price: 39.99,
      quantity: 16500,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/fb/REimage.png/revision/latest?cb=20140309090207",
    },
    {
      title: "Resident Evil 5",
      description:
        "Play as Bioterrorism Security Assessment Alliance agents Chris Redfield and Sheva Alomar as they investigate terrorist threats. Rated M",
      price: 39.99,
      quantity: 16500,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/fb/REimage.png/revision/latest?cb=20140309090207",
    },
    {
      title: "Resident Evil 5",
      description:
        "Play as Bioterrorism Security Assessment Alliance agents Chris Redfield and Sheva Alomar as they investigate terrorist threats. Rated M",
      price: 39.99,
      quantity: 16500,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/f/fb/REimage.png/revision/latest?cb=20140309090207",
    },
    {
      title: "Resident Evil 6",
      description:
        "Play as Leon S Kennedy, Chris Redfield, Jake Muller, and Ada Wong as they confront the force responsible for a worldwide bio-terrorist attack. Rated M",
      price: 44.99,
      quantity: 21300,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Resident_Evil_6_box_artwork.png/220px-Resident_Evil_6_box_artwork.png",
    },
    {
      title: "Resident Evil 6",
      description:
        "Play as Leon S Kennedy, Chris Redfield, Jake Muller, and Ada Wong as they confront the force responsible for a worldwide bio-terrorist attack. Rated M",
      price: 44.99,
      quantity: 21300,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Resident_Evil_6_box_artwork.png/220px-Resident_Evil_6_box_artwork.png",
    },
    {
      title: "Resident Evil 6",
      description:
        "Play as Leon S Kennedy, Chris Redfield, Jake Muller, and Ada Wong as they confront the force responsible for a worldwide bio-terrorist attack. Rated M",
      price: 44.99,
      quantity: 21300,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Resident_Evil_6_box_artwork.png/220px-Resident_Evil_6_box_artwork.png",
    },
    {
      title: "Resident Evil 6",
      description:
        "Play as Leon S Kennedy, Chris Redfield, Jake Muller, and Ada Wong as they confront the force responsible for a worldwide bio-terrorist attack. Rated M",
      price: 44.99,
      quantity: 21300,
      categoryId: 4,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Resident_Evil_6_box_artwork.png/220px-Resident_Evil_6_box_artwork.png",
    },
    {
      title: "Resident Evil 7: Biohazard",
      description:
        "Play as Ethan Winters as he looks for his lost wife in a derelict plantation owned by an infected family. Rated M",
      price: 49.99,
      quantity: 27000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/capcomdatabase/images/3/35/Resident_Evil_7_Logo.png/revision/latest?cb=20191009140630",
    },
    {
      title: "Resident Evil 7: Biohazard",
      description:
        "Play as Ethan Winters as he looks for his lost wife in a derelict plantation owned by an infected family. Rated M",
      price: 49.99,
      quantity: 27000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/capcomdatabase/images/3/35/Resident_Evil_7_Logo.png/revision/latest?cb=20191009140630",
    },
    {
      title: "Resident Evil 7: Biohazard",
      description:
        "Play as Ethan Winters as he looks for his lost wife in a derelict plantation owned by an infected family. Rated M",
      price: 49.99,
      quantity: 27000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/capcomdatabase/images/3/35/Resident_Evil_7_Logo.png/revision/latest?cb=20191009140630",
    },
    {
      title: "Resident Evil Village",
      description:
        "Play as Ethan Winters as he looks for his kidnapped daughter in a village filled with mutant creatures. Rated M",
      price: 54.99,
      quantity: 40000,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Resident_Evil_Village_logo_black.svg/1200px-Resident_Evil_Village_logo_black.svg.png",
    },
    {
      title: "Resident Evil Village",
      description:
        "Play as Ethan Winters as he looks for his kidnapped daughter in a village filled with mutant creatures. Rated M",
      price: 54.99,
      quantity: 40000,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Resident_Evil_Village_logo_black.svg/1200px-Resident_Evil_Village_logo_black.svg.png",
    },
    {
      title: "Resident Evil Village",
      description:
        "Play as Ethan Winters as he looks for his kidnapped daughter in a village filled with mutant creatures. Rated M",
      price: 54.99,
      quantity: 40000,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Resident_Evil_Village_logo_black.svg/1200px-Resident_Evil_Village_logo_black.svg.png",
    },
    {
      title: "Pokemon: Let's Go Pikachu!",
      description:
        "Help Ash navigate the Kanto region and find all the pokemon. Rated E",
      price: 39.99,
      quantity: 5700,
      categoryId: 4,
      image:
        "https://cdn2.bulbagarden.net/upload/2/22/Pok%C3%A9mon_Lets_Go_Pikachu_Logo.png",
    },
    {
      title: "Pokemon: Let's Go Eevee!",
      description:
        "Help Ash navigate the Kanto region and find all the pokemon. Rated E",
      price: 39.99,
      quantity: 5340,
      categoryId: 4,
      image:
        "https://cdn2.bulbagarden.net/upload/8/8b/Pok%C3%A9mon_Lets_Go_Eevee_Logo.png",
    },
    {
      title: "Pokemon Sword",
      description:
        "Explore the Galar region and catch all the pokemon. Rated E",
      price: 44.99,
      quantity: 15000,
      categoryId: 4,
      image:
        "https://mms.businesswire.com/media/20190227005542/en/707863/23/Pokemon_Sword_Logo.jpg",
    },
    {
      title: "Pokemon Shield",
      description:
        "Explore the Galar region and catch all the pokemon. Rated E",
      price: 44.99,
      quantity: 15000,
      categoryId: 4,
      image:
        "https://2.bp.blogspot.com/--_r9petPycQ/XPxzBox1HxI/AAAAAAAADtc/-h0wBi8G8ioXPfkh0-qamUtqdbO7X3JzACKgBGAs/w2048-h2732-c/pokemon-shield-logo-uhdpaper.com-4K-82.jpg",
    },
    {
      title: "Pokemon Stadium",
      description:
        "Use your favorite Pokemon to battle against other Pokemon in this 3D turn-based battling system. Rated E",
      price: 29.99,
      quantity: 4000,
      categoryId: 5,
      image: "https://cdn2.bulbagarden.net/upload/5/5a/Stadium_logo.png",
    },
    {
      title: "Pokemon Stadium 2",
      description:
        "Use your favorite Pokemon to battle against other Pokemon in this 3D turn-based battling system. Rated E",
      price: 29.99,
      quantity: 4000,
      categoryId: 5,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/0/09/A7abc1b2-ecc7-4979-90a7-6ebf5a11e53f.png/revision/latest?cb=20190527013350",
    },
    {
      title: "Pokemon Box",
      description:
        "Trade and store Pokemon from your Ruby, Sapphire, Emerald, FireRed, and LeafGreen pokemon games. Allows user to interact with and breed their pokemon on GameCube. Also gives users the ability to play Ruby and Sapphire on GameCube. Rated E",
      price: 29.99,
      quantity: 8900,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/6/62/E06e2ac1-af53-45f5-b078-2c0bdec42ff6.png/revision/latest?cb=20190527013738",
    },
    {
      title: "Pokemon Home",
      description:
        "Provides cloud-based storage for your Pokemon. Users alos have the abiltiy to trade and transfer pokemon from previous storage systems. Rated E",
      price: 29.99,
      quantity: 8900,
      categoryId: 4,
      image:
        "https://cdn2.bulbagarden.net/upload/thumb/0/01/Pok%C3%A9mon_HOME_logo.png/1200px-Pok%C3%A9mon_HOME_logo.png",
    },
    {
      title: "Pokemon Colosseum",
      description:
        "Explore the desert region of Orre, and help Wes rescue Shadow Pokemon. Rated E",
      price: 29.99,
      quantity: 11000,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/5/54/Pok%C3%A9mon_Colosseum.png/revision/latest?cb=20131023091658",
    },
    {
      title: "Pokemon XD: Gale of Darkness",
      description:
        "Explore the desert region of Orre, and help rescue Shadow Pokemon. Rated E",
      price: 34.99,
      quantity: 13000,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/4/44/Pok%C3%A9mon_XD_Gale_of_Darkness_logo.png/revision/latest?cb=20190527013815",
    },
    {
      title: "Pokemon Snap",
      description: "Take picutres of Pokemon. Rated E",
      price: 29.99,
      quantity: 4500,
      categoryId: 5,
      image:
        "https://static.wikia.nocookie.net/mudae/images/7/7c/Pokemon_Snap_Logo.png/revision/latest?cb=20201030131206",
    },
    {
      title: "New Pokemon Snap",
      description: "Take picutres of Pokemon. Rated E",
      price: 39.99,
      quantity: 18000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/4/41/New_Pokemon_Snap.png/revision/latest?cb=20200618090905",
    },
    {
      title: "Animal Crossing",
      description:
        "an endless and non-linear game in which a human takes up residence in a village inhabited by anthropomorphic animals. Rated E",
      price: 29.99,
      quantity: 4300,
      categoryId: 5,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/d/d2/Animal_Crossing_logo.png/revision/latest?cb=20171025115130",
    },
    {
      title: "Animal Crossing",
      description:
        "an endless and non-linear game in which a human takes up residence in a village inhabited by anthropomorphic animals. Rated E",
      price: 29.99,
      quantity: 4300,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/d/d2/Animal_Crossing_logo.png/revision/latest?cb=20171025115130",
    },
    {
      title: "Animal Crossing: New Horizons",
      description:
        "an endless and non-linear game in which a human takes up residence in a village inhabited by anthropomorphic animals. Rated E",
      price: 39.99,
      quantity: 28000,
      categoryId: 4,
      image:
        "https://static.wikia.nocookie.net/animalcrossing/images/9/92/NewHorizons.png/revision/latest?cb=20210123051957",
    },
    {
      title: "The Sims",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 5000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/ba/The_Sims_2004.png/revision/latest/scale-to-width-down/300?cb=20130506221327",
    },
    {
      title: "The Sims",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 5000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/ba/The_Sims_2004.png/revision/latest/scale-to-width-down/300?cb=20130506221327",
    },
    {
      title: "The Sims",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 5000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/ba/The_Sims_2004.png/revision/latest/scale-to-width-down/300?cb=20130506221327",
    },
    {
      title: "The Sims",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 5000,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/b/ba/The_Sims_2004.png/revision/latest/scale-to-width-down/300?cb=20130506221327",
    },
    {
      title: "The Sims 2",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 8700,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/e/ee/The_Sims_2_%28Pre-release%29.png/revision/latest?cb=20130511124159",
    },
    {
      title: "The Sims 2",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 8700,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/e/ee/The_Sims_2_%28Pre-release%29.png/revision/latest?cb=20130511124159",
    },
    {
      title: "The Sims 2",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 8700,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/e/ee/The_Sims_2_%28Pre-release%29.png/revision/latest?cb=20130511124159",
    },
    {
      title: "The Sims 2",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 8700,
      categoryId: 6,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/e/ee/The_Sims_2_%28Pre-release%29.png/revision/latest?cb=20130511124159",
    },
    {
      title: "MySims SkyHeroes",
      description:
        "The player starts out as an unknown pilot and leads the resistance to the evil Morcubus and his drones who plan to take over the skyways Rated E",
      price: 29.99,
      quantity: 10000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/mysims/images/c/c9/MSSH_Logo.png/revision/latest/scale-to-width-down/2000?cb=20100505183028",
    },
    {
      title: "MySims SkyHeroes",
      description:
        "The player starts out as an unknown pilot and leads the resistance to the evil Morcubus and his drones who plan to take over the skyways Rated E",
      price: 29.99,
      quantity: 10000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/mysims/images/c/c9/MSSH_Logo.png/revision/latest/scale-to-width-down/2000?cb=20100505183028",
    },
    {
      title: "The Sims 3",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 29.99,
      quantity: 11000,
      categoryId: 1,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/d/da/The-sims-3-logo-480x100.png/revision/latest?cb=20210312233742",
    },
    {
      title: "The Sims 3",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 29.99,
      quantity: 11000,
      categoryId: 2,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/d/da/The-sims-3-logo-480x100.png/revision/latest?cb=20210312233742",
    },
    {
      title: "The Sims 3",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 29.99,
      quantity: 11000,
      categoryId: 3,
      image:
        "https://static.wikia.nocookie.net/logopedia/images/d/da/The-sims-3-logo-480x100.png/revision/latest?cb=20210312233742",
    },
    {
      title: "The Sims 4",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 29.99,
      quantity: 15000,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Logo_of_The_Sims_4.svg/1200px-Logo_of_The_Sims_4.svg.png",
    },
    {
      title: "The Sims 4",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 29.99,
      quantity: 15000,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Logo_of_The_Sims_4.svg/1200px-Logo_of_The_Sims_4.svg.png",
    },
    {
      title: "The Sims 4",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 29.99,
      quantity: 15000,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Logo_of_The_Sims_4.svg/1200px-Logo_of_The_Sims_4.svg.png",
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
