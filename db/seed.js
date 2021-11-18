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
            image VARCHAR(5000),
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
        "https://www.techadvisor.com/cmsdata/features/3783623/cod_warzone_logo_thumb1200_16-9.jpg",
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 2,
      image:
        "https://www.techadvisor.com/cmsdata/features/3783623/cod_warzone_logo_thumb1200_16-9.jpg",
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 3,
      image:
        "https://www.techadvisor.com/cmsdata/features/3783623/cod_warzone_logo_thumb1200_16-9.jpg",
    },
    {
      title: "Call of Duty Warzone",
      description:
        "Play as a special-ops soldier in this battle royale style game. Rated M ",
      price: 40.99,
      quantity: 7000,
      categoryId: 4,
      image:
        "https://www.techadvisor.com/cmsdata/features/3783623/cod_warzone_logo_thumb1200_16-9.jpg",
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
        "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/vgd/VGD_SEE_THEM_RISE.jpg",
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
        "https://cdn.vox-cdn.com/thumbor/AVG6p4rjfpw9fpr1qvECDzl4h0E=/0x0:1920x1200/1200x800/filters:focal(807x447:1113x753)/cdn.vox-cdn.com/uploads/chorus_image/image/63295805/morrowind.0.jpg",
    },
    {
      title: "The Elder Scrolls III: Morrowind",
      description:
        "Open-World action role-player style game. Travel around Morrowind while doing a bunch of quests. Rated M",
      price: 40.99,
      quantity: 1100,
      categoryId: 2,
      image:
        "https://cdn.vox-cdn.com/thumbor/AVG6p4rjfpw9fpr1qvECDzl4h0E=/0x0:1920x1200/1200x800/filters:focal(807x447:1113x753)/cdn.vox-cdn.com/uploads/chorus_image/image/63295805/morrowind.0.jpg",
    },
    {
      title: "The Elder Scrolls III: Morrowind",
      description:
        "Open-World action role-player style game. Travel around Morrowind while doing a bunch of quests. Rated M",
      price: 40.99,
      quantity: 1100,
      categoryId: 3,
      image:
        "https://cdn.vox-cdn.com/thumbor/AVG6p4rjfpw9fpr1qvECDzl4h0E=/0x0:1920x1200/1200x800/filters:focal(807x447:1113x753)/cdn.vox-cdn.com/uploads/chorus_image/image/63295805/morrowind.0.jpg",
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
      image: "http://www.finalfantasykingdom.net/2ps1/logo.jpg",
    },
    {
      title: "Final Fantasy II",
      description:
        "Help Firion, Maria, and Guy fight Emperor Mateus' hellspawn and save the world. Fantasy RPG. Rated E",
      price: 34.99,
      quantity: 670,
      categoryId: 3,
      image: "http://www.finalfantasykingdom.net/2ps1/logo.jpg",
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
        "https://gh.cdn.sewest.net/assets/original/ff-pixelremaster/images/5.png",
    },
    {
      title: "Final Fantasy V",
      description:
        "Help Bartz and his party  keep the Crystals from being exploited by the evil socerer Exdeath's influence and prevent his resurgence. Fantasy RPG. Rated E",
      price: 37.99,
      quantity: 1500,
      categoryId: 3,
      image:
        "https://gh.cdn.sewest.net/assets/original/ff-pixelremaster/images/5.png",
    },
    {
      title: "Final Fantasy VI",
      description:
        "Set in a world with technology resembling the Second Industrial Revolution, the game's story follows an expanding cast that includes fourteen permanent playable characters. The narrative depicts numerous more mature themes throughout the entire game than its previous installments including a rebellion against an immoral military dictatorship, pursuit of a magical arms race, use of chemical weapons in warfare, depictions of violent and apocalyptic confrontations, several personal redemption arcs, teenage pregnancy, and the renewal of hope and life itself. Fantasy RPG. Rated M",
      price: 40.99,
      quantity: 1645,
      categoryId: 1,
      image:
        "https://cdn.freebiesupply.com/logos/large/2x/final-fantasy-vi-logo-png-transparent.png",
    },
    {
      title: "Final Fantasy VI",
      description:
        "Set in a world with technology resembling the Second Industrial Revolution, the game's story follows an expanding cast that includes fourteen permanent playable characters. The narrative depicts numerous more mature themes throughout the entire game than its previous installments including a rebellion against an immoral military dictatorship, pursuit of a magical arms race, use of chemical weapons in warfare, depictions of violent and apocalyptic confrontations, several personal redemption arcs, teenage pregnancy, and the renewal of hope and life itself. Fantasy RPG. Rated M",
      price: 40.99,
      quantity: 1645,
      categoryId: 3,
      image:
        "https://cdn.freebiesupply.com/logos/large/2x/final-fantasy-vi-logo-png-transparent.png",
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
        "https://www.pngitem.com/pimgs/m/525-5259501_icona-gabranth-final-fantasy-ix-logo-hd-png.png",
    },
    {
      title: "Final Fantasy IX",
      description:
        "Players follow a thief named Zidane Tribal who kidnaps princess Garnet Til Alexandros XVII as part of a ploy by the neighboring nation of Lindblum. He joins Garnet and a growing cast of characters on a quest to take down her mother, Queen Brahne of Alexandria, who started the war. Fantasy RPG. Rated M",
      price: 42.99,
      quantity: 3200,
      categoryId: 2,
      image:
        "https://www.pngitem.com/pimgs/m/525-5259501_icona-gabranth-final-fantasy-ix-logo-hd-png.png",
    },
    {
      title: "Final Fantasy IX",
      description:
        "Players follow a thief named Zidane Tribal who kidnaps princess Garnet Til Alexandros XVII as part of a ploy by the neighboring nation of Lindblum. He joins Garnet and a growing cast of characters on a quest to take down her mother, Queen Brahne of Alexandria, who started the war. Fantasy RPG. Rated M",
      price: 42.99,
      quantity: 3200,
      categoryId: 3,
      image:
        "https://www.pngitem.com/pimgs/m/525-5259501_icona-gabranth-final-fantasy-ix-logo-hd-png.png",
    },
    {
      title: "Final Fantasy IX",
      description:
        "Players follow a thief named Zidane Tribal who kidnaps princess Garnet Til Alexandros XVII as part of a ploy by the neighboring nation of Lindblum. He joins Garnet and a growing cast of characters on a quest to take down her mother, Queen Brahne of Alexandria, who started the war. Fantasy RPG. Rated M",
      price: 42.99,
      quantity: 3200,
      categoryId: 4,
      image:
        "https://www.pngitem.com/pimgs/m/525-5259501_icona-gabranth-final-fantasy-ix-logo-hd-png.png",
    },
    {
      title: "Final Fantasy X",
      description:
        "Help a group of adventurers on their quest to defeat a rampaging monster known as Sin. Fantasy RPG. Rated M",
      price: 45.99,
      quantity: 6000,
      categoryId: 1,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d1cec3ab-18e2-4db8-a5b6-0e2723694736/d4204zv-9b4fe5c1-f631-4901-b667-965d0f35c36e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QxY2VjM2FiLTE4ZTItNGRiOC1hNWI2LTBlMjcyMzY5NDczNlwvZDQyMDR6di05YjRmZTVjMS1mNjMxLTQ5MDEtYjY2Ny05NjVkMGYzNWMzNmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BTtsQV8XFO8jf6D0ZdhT1XE_ZiFMAlBLcklz82F75Gw",
    },
    {
      title: "Final Fantasy X",
      description:
        "Help a group of adventurers on their quest to defeat a rampaging monster known as Sin. Fantasy RPG. Rated M",
      price: 45.99,
      quantity: 6000,
      categoryId: 2,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d1cec3ab-18e2-4db8-a5b6-0e2723694736/d4204zv-9b4fe5c1-f631-4901-b667-965d0f35c36e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QxY2VjM2FiLTE4ZTItNGRiOC1hNWI2LTBlMjcyMzY5NDczNlwvZDQyMDR6di05YjRmZTVjMS1mNjMxLTQ5MDEtYjY2Ny05NjVkMGYzNWMzNmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BTtsQV8XFO8jf6D0ZdhT1XE_ZiFMAlBLcklz82F75Gw",
    },
    {
      title: "Final Fantasy X",
      description:
        "Help a group of adventurers on their quest to defeat a rampaging monster known as Sin. Fantasy RPG. Rated M",
      price: 45.99,
      quantity: 6000,
      categoryId: 3,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d1cec3ab-18e2-4db8-a5b6-0e2723694736/d4204zv-9b4fe5c1-f631-4901-b667-965d0f35c36e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QxY2VjM2FiLTE4ZTItNGRiOC1hNWI2LTBlMjcyMzY5NDczNlwvZDQyMDR6di05YjRmZTVjMS1mNjMxLTQ5MDEtYjY2Ny05NjVkMGYzNWMzNmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BTtsQV8XFO8jf6D0ZdhT1XE_ZiFMAlBLcklz82F75Gw",
    },
    {
      title: "Final Fantasy X",
      description:
        "Help a group of adventurers on their quest to defeat a rampaging monster known as Sin. Fantasy RPG. Rated M",
      price: 45.99,
      quantity: 6000,
      categoryId: 4,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d1cec3ab-18e2-4db8-a5b6-0e2723694736/d4204zv-9b4fe5c1-f631-4901-b667-965d0f35c36e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QxY2VjM2FiLTE4ZTItNGRiOC1hNWI2LTBlMjcyMzY5NDczNlwvZDQyMDR6di05YjRmZTVjMS1mNjMxLTQ5MDEtYjY2Ny05NjVkMGYzNWMzNmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BTtsQV8XFO8jf6D0ZdhT1XE_ZiFMAlBLcklz82F75Gw",
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
        "https://www.pngkey.com/png/detail/143-1431063_final-fantasy-xiii-logo-final-fantasy-xiii-transparent.png",
    },
    {
      title: "Final Fantasy XIII",
      description:
        "The game takes place in the fictional floating world of Cocoon, whose government, the Sanctum, is ordering a purge of civilians who have supposedly come into contact with Pulse, the much-feared world below. The former soldier Lightning begins her fight against the government in order to save her sister who has been branded as an unwilling servant to a god-like being from Pulse, making her an enemy of Cocoon. Lightning is soon joined by a band of allies, and together the group also become marked by the same Pulse creature. They rally against the Sanctum while trying to discover their assigned task and whether they can avoid being turned into monsters or crystals at the completion. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 10000,
      categoryId: 2,
      image:
        "https://www.pngkey.com/png/detail/143-1431063_final-fantasy-xiii-logo-final-fantasy-xiii-transparent.png",
    },
    {
      title: "Final Fantasy XIII",
      description:
        "The game takes place in the fictional floating world of Cocoon, whose government, the Sanctum, is ordering a purge of civilians who have supposedly come into contact with Pulse, the much-feared world below. The former soldier Lightning begins her fight against the government in order to save her sister who has been branded as an unwilling servant to a god-like being from Pulse, making her an enemy of Cocoon. Lightning is soon joined by a band of allies, and together the group also become marked by the same Pulse creature. They rally against the Sanctum while trying to discover their assigned task and whether they can avoid being turned into monsters or crystals at the completion. Fantasy RPG. Rated T",
      price: 49.99,
      quantity: 10000,
      categoryId: 3,
      image:
        "https://www.pngkey.com/png/detail/143-1431063_final-fantasy-xiii-logo-final-fantasy-xiii-transparent.png",
    },
    {
      title: "Final Fantasy XIV: A Realm Reborn",
      description:
        "Bahamut, a primal dragon, escapes from its lunar prison to initiate the Seventh Umbral Calamity, an apocalyptic event which destroys much of Eorzea. Through the gods' blessing, the player character escapes the devastation by time traveling five years into the future. As Eorzea recovers and rebuilds, the player must deal with the impending threat of invasion by the Garlean Empire from the north. Fantasy MMORPG. Rated T",
      price: 54.99,
      quantity: 15000,
      categoryId: 1,
      image:
        "https://www.nicepng.com/png/detail/143-1433168_final-fantasy-xiv-final-fantasy-xiv-logo.png",
    },
    {
      title: "Final Fantasy XIV: A Realm Reborn",
      description:
        "Bahamut, a primal dragon, escapes from its lunar prison to initiate the Seventh Umbral Calamity, an apocalyptic event which destroys much of Eorzea. Through the gods' blessing, the player character escapes the devastation by time traveling five years into the future. As Eorzea recovers and rebuilds, the player must deal with the impending threat of invasion by the Garlean Empire from the north. Fantasy MMORPG. Rated T",
      price: 54.99,
      quantity: 15000,
      categoryId: 2,
      image:
        "https://www.nicepng.com/png/detail/143-1433168_final-fantasy-xiv-final-fantasy-xiv-logo.png",
    },
    {
      title: "Final Fantasy XIV: A Realm Reborn",
      description:
        "Bahamut, a primal dragon, escapes from its lunar prison to initiate the Seventh Umbral Calamity, an apocalyptic event which destroys much of Eorzea. Through the gods' blessing, the player character escapes the devastation by time traveling five years into the future. As Eorzea recovers and rebuilds, the player must deal with the impending threat of invasion by the Garlean Empire from the north. Fantasy MMORPG. Rated T",
      price: 54.99,
      quantity: 15000,
      categoryId: 3,
      image:
        "https://www.nicepng.com/png/detail/143-1433168_final-fantasy-xiv-final-fantasy-xiv-logo.png",
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
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6414/6414113_sd.jpg",
    },
    {
      title: "Super Mario Kart",
      description:
        "Use your favorite Mario Kingdom characters to race against other Mario characters. Rated E",
      price: 35.99,
      quantity: 4500,
      categoryId: 4,
      image: "https://i.redd.it/rsgp6bte7fu61.png",
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
        "https://www.pinclipart.com/picdir/middle/227-2273022_mario-kart-8-deluxe-logo-png-clipart.png",
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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwDyJ5vaGahShH3AkoCS41dl1C49_jwfOHIA&usqp=CAU",
    },
    {
      title: "Halo",
      description:
        "Set in the 26th Century, take control of Master Chief, a cybernetically enhanced supersoldier, and battle aliens as you discover the secrets of Halo, a ring shaped artificial world. First Person Shooter. Rated T",
      price: 35.99,
      quantity: 4300,
      categoryId: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwDyJ5vaGahShH3AkoCS41dl1C49_jwfOHIA&usqp=CAU",
    },
    {
      title: "Halo 2",
      description:
        "Take control of Master Chief, and ocassioanlly the Arbiter, a Covenenant Defect in the conflict between the United Nations Space Command, the Covenenant, and the parasitic Flood. First Person Shooter. Rated T",
      price: 37.99,
      quantity: 8000,
      categoryId: 1,
      image:
        "https://www.logolynx.com/images/logolynx/ac/ac1628d06aa15cd58689f15ac44f5093.jpeg",
    },
    {
      title: "Halo 2",
      description:
        "Take control of Master Chief, and ocassioanlly the Arbiter, a Covenenant Defect in the conflict between the United Nations Space Command, the Covenenant, and the parasitic Flood. First Person Shooter. Rated T",
      price: 37.99,
      quantity: 8000,
      categoryId: 2,
      image:
        "https://www.logolynx.com/images/logolynx/ac/ac1628d06aa15cd58689f15ac44f5093.jpeg",
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
      image: "https://gotgame.com/wp-content/uploads/2012/09/Halo-4-Logo.jpg",
    },
    {
      title: "Halo 4",
      description:
        "Take control of Master Chief as he explores an ancient civilation's planet. First Person Shooter. Rated T",
      price: 52.99,
      quantity: 15000,
      categoryId: 2,
      image: "https://gotgame.com/wp-content/uploads/2012/09/Halo-4-Logo.jpg",
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
        "https://cdn.gamer-network.net/2016/usgamer/zelda1header.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/long-time-coming-finishing-the-original-legend-of-zelda-in-2016.jpg",
    },
    {
      title: "The Legend of Zelda",
      description:
        "Set in the fantasy land of Hyrule, take control of Link, an elf-boy who needs to collect eight fragments of the Triforce of Wisdom to save Princess Zelda from Ganon. Rated E",
      price: 54.99,
      quantity: 2000,
      categoryId: 4,
      image:
        "https://cdn.gamer-network.net/2016/usgamer/zelda1header.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/long-time-coming-finishing-the-original-legend-of-zelda-in-2016.jpg",
    },
    {
      title: "Zelda II: The Adventure of Link",
      description:
        "Play as Link, and save Princess Zelda after she falls under a sleeping spell. Rated E",
      price: 54.99,
      quantity: 6437,
      categoryId: 4,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1760baf8-7504-4742-94ac-54f678ab1687/d3foves-96d13b61-c0fb-4915-8ee2-6a9a9126d4b5.png/v1/fill/w_300,h_202,strp/the_adventure_of_link_logo_by_vladictivo_d3foves-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjAyIiwicGF0aCI6IlwvZlwvMTc2MGJhZjgtNzUwNC00NzQyLTk0YWMtNTRmNjc4YWIxNjg3XC9kM2ZvdmVzLTk2ZDEzYjYxLWMwZmItNDkxNS04ZWUyLTZhOWE5MTI2ZDRiNS5wbmciLCJ3aWR0aCI6Ijw9MzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.coEpECnKu8CUxobsDqu-lr9ed-2dLVWO34P8ghweQ7E",
    },
    {
      title: "Zelda II: The Adventure of Link",
      description:
        "Play as Link, and save Princess Zelda after she falls under a sleeping spell. Rated E",
      price: 54.99,
      quantity: 6437,
      categoryId: 6,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1760baf8-7504-4742-94ac-54f678ab1687/d3foves-96d13b61-c0fb-4915-8ee2-6a9a9126d4b5.png/v1/fill/w_300,h_202,strp/the_adventure_of_link_logo_by_vladictivo_d3foves-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjAyIiwicGF0aCI6IlwvZlwvMTc2MGJhZjgtNzUwNC00NzQyLTk0YWMtNTRmNjc4YWIxNjg3XC9kM2ZvdmVzLTk2ZDEzYjYxLWMwZmItNDkxNS04ZWUyLTZhOWE5MTI2ZDRiNS5wbmciLCJ3aWR0aCI6Ijw9MzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.coEpECnKu8CUxobsDqu-lr9ed-2dLVWO34P8ghweQ7E",
    },
    {
      title: "The Legend of Zelda: A Link to the Past",
      description:
        "Many years before the events of the first two Zelda games, play as Link on his quest to save Hyrule, defeat Ganon, and rescue the descendants of the Seven Sages. Rated E",
      price: 54.99,
      quantity: 8500,
      categoryId: 4,
      image:
        "https://assets1.ignimgs.com/2019/06/04/legend-of-zelda-a-link-to-the-past---button-3-1559683061447.jpg",
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
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/The_Legend_of_Zelda_Majora%27s_Mask.svg/1024px-The_Legend_of_Zelda_Majora%27s_Mask.svg.png",
    },
    {
      title: "The Legend of Zelda: Majora's Mask",
      description:
        "Help Link save Termina, a world parallel to Hyrule. Rated E",
      price: 55.99,
      quantity: 4350,
      categoryId: 6,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/The_Legend_of_Zelda_Majora%27s_Mask.svg/1024px-The_Legend_of_Zelda_Majora%27s_Mask.svg.png",
    },
    {
      title: "The Legend of Zelda: The Wind Waker",
      description: "Link attempts to save his siter from Ganon. Rated E",
      price: 44.99,
      quantity: 2100,
      categoryId: 6,
      image:
        "https://gamingbolt.com/wp-content/uploads/2013/01/The-Legend-of-Zelda-The-Wind-Waker-Wii-U-Box-Art.jpg",
    },
    {
      title: "The Legend of Zelda: Four Swords Adventures",
      description:
        "Play as Link and his three clones to save Hyrule from Shadow Link. Rated E",
      price: 44.99,
      quantity: 1850,
      categoryId: 6,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/The_Legend_of_Zelda_Four_Swords_Adventures_Game_Cover.jpg/220px-The_Legend_of_Zelda_Four_Swords_Adventures_Game_Cover.jpg",
    },
    {
      title: "The Legend of Zelda: Twilight Princess",
      description:
        "Play as Link, and try to save Hyrule from being engulfed by the corrupted parallel dimension, the Twilight Realm. Rated E",
      price: 44.99,
      quantity: 1545,
      categoryId: 6,
      image:
        "https://www.pngkit.com/png/detail/178-1784034_bladeinthelights-profile-myanimelist-legend-of-zelda-twilight-princess.png",
    },
    {
      title: "The Legend of Zelda: Skyward Sword",
      description:
        "Play as Link, and navagate through Skyloft solving environmental and dungeon-based puzzles. Rated E",
      price: 44.99,
      quantity: 15000,
      categoryId: 4,
      image:
        "https://primewikis.com/wp-content/uploads/The-Legend-of-Zelda-Skyward-Sword-HD-Cover.jpg",
    },
    {
      title: "The Legend of Zelda: Breath of the Wild",
      description:
        "Play as Link. After waking up from a one hundred-year slumber, Explore Hyrule on a quest to defeat Calamity Ganaon. Rated E",
      price: 49.99,
      quantity: 35000,
      categoryId: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7mW8A3doFSck7HeBzqJwEUxgZMmdrToUYA&usqp=CAU",
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
        "https://upload.wikimedia.org/wikipedia/en/b/b3/S4%2CEP1_boxart.png",
    },
    {
      title: "Sonic the Hedgehog 4: Episode II",
      description:
        "When Docotr Eggman finds and repairs Metal Sonic, Sonic must set out to defeat both Eggman and Metal Sonic. Rated E",
      price: 24.99,
      quantity: 2900,
      categoryId: 1,
      image:
        "https://fanatical.imgix.net/product/original/b8e51a2b-4ee5-43cc-946b-0ba7aad3e315.jpg?auto=compress,format&w=400&fit=crop&h=",
    },
    {
      title: "Sonic Mania",
      description:
        "Help Sonic and Tails defeat Docotr Eggman again after he gains power from the Phantom Ruby, and retakes Little PLanet. Rated E",
      price: 34.99,
      quantity: 5600,
      categoryId: 1,
      image:
        "https://image.api.playstation.com/cdn/UP0177/CUSA07023_00/pvfMACRlDW27Agp9HjDxL8CcmqxZL1V5.png",
    },
    {
      title: "Sonic Mania",
      description:
        "Help Sonic and Tails defeat Docotr Eggman again after he gains power from the Phantom Ruby, and retakes Little PLanet. Rated E",
      price: 34.99,
      quantity: 5600,
      categoryId: 2,
      image:
        "https://image.api.playstation.com/cdn/UP0177/CUSA07023_00/pvfMACRlDW27Agp9HjDxL8CcmqxZL1V5.png",
    },
    {
      title: "Sonic Mania",
      description:
        "Help Sonic and Tails defeat Docotr Eggman again after he gains power from the Phantom Ruby, and retakes Little PLanet. Rated E",
      price: 34.99,
      quantity: 5600,
      categoryId: 3,
      image:
        "https://image.api.playstation.com/cdn/UP0177/CUSA07023_00/pvfMACRlDW27Agp9HjDxL8CcmqxZL1V5.png",
    },
    {
      title: "Sonic Mania",
      description:
        "Help Sonic and Tails defeat Docotr Eggman again after he gains power from the Phantom Ruby, and retakes Little PLanet. Rated E",
      price: 34.99,
      quantity: 5600,
      categoryId: 4,
      image:
        "https://image.api.playstation.com/cdn/UP0177/CUSA07023_00/pvfMACRlDW27Agp9HjDxL8CcmqxZL1V5.png",
    },
    {
      title: "Sonic 3D Blast",
      description:
        "Help Sonic on his journey to save the Flickies, a species of birds that have been enslaved by Doctor Robotnik. Rated E",
      price: 14.99,
      quantity: 2965,
      categoryId: 1,
      image:
        "https://www.pngfind.com/pngs/m/471-4713946_sonic3d-logo-sonic-3d-blast-logo-hd-png.png",
    },
    {
      title: "Sonic Adventure",
      description:
        "Help Sonic and friends collect the seven Chaos Emeralds and stop Docotr Robotnik from unleashing the ancient evil Chaos. Rated E",
      price: 17.99,
      quantity: 4000,
      categoryId: 1,
      image:
        "https://w7.pngwing.com/pngs/404/978/png-transparent-sonic-adventure-2-battle-sonic-the-hedgehog-sonic-unleashed-others.png",
    },
    {
      title: "Sonic Adventure",
      description:
        "Help Sonic and friends collect the seven Chaos Emeralds and stop Docotr Robotnik from unleashing the ancient evil Chaos. Rated E",
      price: 17.99,
      quantity: 4000,
      categoryId: 6,
      image:
        "https://w7.pngwing.com/pngs/404/978/png-transparent-sonic-adventure-2-battle-sonic-the-hedgehog-sonic-unleashed-others.png",
    },
    {
      title: "Sonic Adventure",
      description:
        "Help Sonic and friends collect the seven Chaos Emeralds and stop Docotr Robotnik from unleashing the ancient evil Chaos. Rated E",
      price: 17.99,
      quantity: 4000,
      categoryId: 7,
      image:
        "https://w7.pngwing.com/pngs/404/978/png-transparent-sonic-adventure-2-battle-sonic-the-hedgehog-sonic-unleashed-others.png",
    },
    {
      title: "Sonic Adventure 2",
      description:
        "Help Sonic and friends save the world from Shadow the Hedgehog, Docotr Eggman, and Rouge the Bat. Rated E",
      price: 19.99,
      quantity: 3200,
      categoryId: 1,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1a036121-2ee1-4713-907c-3c88645565dc/dbtsl77-337a64ae-e247-4fbe-bf5d-b9ee76fd4d26.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFhMDM2MTIxLTJlZTEtNDcxMy05MDdjLTNjODg2NDU1NjVkY1wvZGJ0c2w3Ny0zMzdhNjRhZS1lMjQ3LTRmYmUtYmY1ZC1iOWVlNzZmZDRkMjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vIZn0uEARXqgd_4bzuDBPlFaI9jryJdSPiUaztnPX-Q",
    },
    {
      title: "Sonic Adventure 2",
      description:
        "Help Sonic and friends save the world from Shadow the Hedgehog, Docotr Eggman, and Rouge the Bat. Rated E",
      price: 19.99,
      quantity: 3200,
      categoryId: 6,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1a036121-2ee1-4713-907c-3c88645565dc/dbtsl77-337a64ae-e247-4fbe-bf5d-b9ee76fd4d26.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFhMDM2MTIxLTJlZTEtNDcxMy05MDdjLTNjODg2NDU1NjVkY1wvZGJ0c2w3Ny0zMzdhNjRhZS1lMjQ3LTRmYmUtYmY1ZC1iOWVlNzZmZDRkMjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vIZn0uEARXqgd_4bzuDBPlFaI9jryJdSPiUaztnPX-Q",
    },
    {
      title: "Sonic Adventure 2",
      description:
        "Help Sonic and friends save the world from Shadow the Hedgehog, Docotr Eggman, and Rouge the Bat. Rated E",
      price: 19.99,
      quantity: 3200,
      categoryId: 7,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1a036121-2ee1-4713-907c-3c88645565dc/dbtsl77-337a64ae-e247-4fbe-bf5d-b9ee76fd4d26.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFhMDM2MTIxLTJlZTEtNDcxMy05MDdjLTNjODg2NDU1NjVkY1wvZGJ0c2w3Ny0zMzdhNjRhZS1lMjQ3LTRmYmUtYmY1ZC1iOWVlNzZmZDRkMjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vIZn0uEARXqgd_4bzuDBPlFaI9jryJdSPiUaztnPX-Q",
    },
    {
      title: "Sonic Heroes",
      description:
        "The player races a team of series characters through levels to amass rings, defeat robots, and collect the seven Chaos Emeralds needed to defeat Doctor Eggman. Rated E",
      price: 19.99,
      quantity: 5560,
      categoryId: 1,
      image:
        "https://i.pinimg.com/originals/96/68/8f/96688fa0eb2a5912db42cf90ee27fa30.jpg",
    },
    {
      title: "Sonic Heroes",
      description:
        "The player races a team of series characters through levels to amass rings, defeat robots, and collect the seven Chaos Emeralds needed to defeat Doctor Eggman. Rated E",
      price: 19.99,
      quantity: 5560,
      categoryId: 2,
      image:
        "https://i.pinimg.com/originals/96/68/8f/96688fa0eb2a5912db42cf90ee27fa30.jpg",
    },
    {
      title: "Sonic Heroes",
      description:
        "The player races a team of series characters through levels to amass rings, defeat robots, and collect the seven Chaos Emeralds needed to defeat Doctor Eggman. Rated E",
      price: 19.99,
      quantity: 5560,
      categoryId: 3,
      image:
        "https://i.pinimg.com/originals/96/68/8f/96688fa0eb2a5912db42cf90ee27fa30.jpg",
    },
    {
      title: "Sonic Heroes",
      description:
        "The player races a team of series characters through levels to amass rings, defeat robots, and collect the seven Chaos Emeralds needed to defeat Doctor Eggman. Rated E",
      price: 19.99,
      quantity: 5560,
      categoryId: 6,
      image:
        "https://i.pinimg.com/originals/96/68/8f/96688fa0eb2a5912db42cf90ee27fa30.jpg",
    },
    {
      title: "Shadow the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 23.99,
      quantity: 4500,
      categoryId: 2,
      image:
        "https://e7.pngegg.com/pngimages/527/440/png-clipart-shadow-the-hedgehog-sonic-the-hedgehog-amy-rose-logo-others-emblem-text.png",
    },
    {
      title: "Shadow the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 23.99,
      quantity: 4500,
      categoryId: 3,
      image:
        "https://e7.pngegg.com/pngimages/527/440/png-clipart-shadow-the-hedgehog-sonic-the-hedgehog-amy-rose-logo-others-emblem-text.png",
    },
    {
      title: "Shadow the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 23.99,
      quantity: 4500,
      categoryId: 6,
      image:
        "https://e7.pngegg.com/pngimages/527/440/png-clipart-shadow-the-hedgehog-sonic-the-hedgehog-amy-rose-logo-others-emblem-text.png",
    },
    {
      title: "Sonic the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 24.99,
      quantity: 6800,
      categoryId: 2,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/edb2d0a0-bb4d-4aa9-9bf0-faad934503f7/de6etqp-3831398c-fe4c-4389-8054-3d66c7ea4184.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VkYjJkMGEwLWJiNGQtNGFhOS05YmYwLWZhYWQ5MzQ1MDNmN1wvZGU2ZXRxcC0zODMxMzk4Yy1mZTRjLTQzODktODA1NC0zZDY2YzdlYTQxODQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.zHlSmQHSy9AG8teVraBZUUy5LeYHU2DDDawg-s0--Y8",
    },
    {
      title: "Sonic the Hedgehog",
      description:
        "The game follows Shadow the Hedgehog, a creation of Doctor Eggman's grandfather, Prof. Gerald Robotnik, as he attempts to learn about his past while suffering from amnesia. Rated E",
      price: 24.99,
      quantity: 6800,
      categoryId: 3,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/edb2d0a0-bb4d-4aa9-9bf0-faad934503f7/de6etqp-3831398c-fe4c-4389-8054-3d66c7ea4184.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VkYjJkMGEwLWJiNGQtNGFhOS05YmYwLWZhYWQ5MzQ1MDNmN1wvZGU2ZXRxcC0zODMxMzk4Yy1mZTRjLTQzODktODA1NC0zZDY2YzdlYTQxODQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.zHlSmQHSy9AG8teVraBZUUy5LeYHU2DDDawg-s0--Y8",
    },
    {
      title: "Sonic Unleashed",
      description:
        "Take control of Sonic, as he attempts to restore order to his world after the evil Docotr Eggman destroys it using a powerful laser to unleash Dark Gaia, an ancient evil. Rated E",
      price: 24.99,
      quantity: 6230,
      categoryId: 2,
      image: "https://image.pngaaa.com/214/4115214-middle.png",
    },
    {
      title: "Sonic Unleashed",
      description:
        "Take control of Sonic, as he attempts to restore order to his world after the evil Docotr Eggman destroys it using a powerful laser to unleash Dark Gaia, an ancient evil. Rated E",
      price: 24.99,
      quantity: 6230,
      categoryId: 3,
      image: "https://image.pngaaa.com/214/4115214-middle.png",
    },
    {
      title: "Sonic Colors",
      description:
        "Help Sonic on his quest to stop Doctor Eggman from enslaving an alien race and taking over the world. Rated E",
      price: 29.99,
      quantity: 10050,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Sonic_Colors_box_artwork.png/220px-Sonic_Colors_box_artwork.png",
    },
    {
      title: "Sonic Colors",
      description:
        "Help Sonic on his quest to stop Doctor Eggman from enslaving an alien race and taking over the world. Rated E",
      price: 29.99,
      quantity: 10050,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Sonic_Colors_box_artwork.png/220px-Sonic_Colors_box_artwork.png",
    },
    {
      title: "Sonic Colors",
      description:
        "Help Sonic on his quest to stop Doctor Eggman from enslaving an alien race and taking over the world. Rated E",
      price: 29.99,
      quantity: 10050,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Sonic_Colors_box_artwork.png/220px-Sonic_Colors_box_artwork.png",
    },
    {
      title: "Sonic Colors",
      description:
        "Help Sonic on his quest to stop Doctor Eggman from enslaving an alien race and taking over the world. Rated E",
      price: 29.99,
      quantity: 10050,
      categoryId: 4,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Sonic_Colors_box_artwork.png/220px-Sonic_Colors_box_artwork.png",
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
        "https://i.kym-cdn.com/entries/icons/original/000/020/668/sonic_lost_world.png",
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
        "https://w1.pngwing.com/pngs/53/135/png-transparent-bicycle-crazy-taxi-2-video-games-dreamcast-playstation-2-forza-motorsport-2-tokyo-xtreme-racer-zero-bicycle-helmets.png",
    },
    {
      title: "Crazy Taxi 3: High Roller",
      description:
        "Take control of a taxi cab, pick up passengers, and get them to their destination as quickly as possible. The crazier you drive, the better. Rated T",
      price: 27.99,
      quantity: 5200,
      categoryId: 1,
      image: "https://segaretro.org/images/e/e4/Crazy_Taxi_3_title_screen.png",
    },
    {
      title: "Crazy Taxi 3: High Roller",
      description:
        "Take control of a taxi cab, pick up passengers, and get them to their destination as quickly as possible. The crazier you drive, the better. Rated T",
      price: 27.99,
      quantity: 5200,
      categoryId: 2,
      image: "https://segaretro.org/images/e/e4/Crazy_Taxi_3_title_screen.png",
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
        "https://seeklogo.com/images/H/Half_Life_2-logo-311E7C043C-seeklogo.com.png",
    },
    {
      title: "Half-life 2",
      description:
        "Gorodon Freeman joins a resistance movement 20 years after the events of the first Half-Life game. Help liberate Earth from the alien empire knows as the Combine. Rated M",
      price: 39.99,
      quantity: 6500,
      categoryId: 2,
      image:
        "https://seeklogo.com/images/H/Half_Life_2-logo-311E7C043C-seeklogo.com.png",
    },
    {
      title: "Half-life 2",
      description:
        "Gorodon Freeman joins a resistance movement 20 years after the events of the first Half-Life game. Help liberate Earth from the alien empire knows as the Combine. Rated M",
      price: 39.99,
      quantity: 6500,
      categoryId: 3,
      image:
        "https://seeklogo.com/images/H/Half_Life_2-logo-311E7C043C-seeklogo.com.png",
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
        "https://fanart.tv/fanart/movies/1576/hdmovielogo/resident-evil-5129fce8667e0.png",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 1,
      image:
        "https://fanart.tv/fanart/movies/1576/hdmovielogo/resident-evil-5129fce8667e0.png",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 2,
      image:
        "https://fanart.tv/fanart/movies/1576/hdmovielogo/resident-evil-5129fce8667e0.png",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 3,
      image:
        "https://fanart.tv/fanart/movies/1576/hdmovielogo/resident-evil-5129fce8667e0.png",
    },
    {
      title: "Resident Evil (2002 remake)",
      description:
        "Play as Chris Redfield and Jill Valentine, two members of the elite task force S.T.A.R.S., as they try to escape a mansion infested with zombies and monsters. Rated M",
      price: 24.99,
      quantity: 7500,
      categoryId: 4,
      image:
        "https://fanart.tv/fanart/movies/1576/hdmovielogo/resident-evil-5129fce8667e0.png",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 1,
      image:
        "https://gamingbolt.com/wp-content/uploads/2014/04/resident-evil-2.jpg",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 3,
      image:
        "https://gamingbolt.com/wp-content/uploads/2014/04/resident-evil-2.jpg",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 5,
      image:
        "https://gamingbolt.com/wp-content/uploads/2014/04/resident-evil-2.jpg",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 6,
      image:
        "https://gamingbolt.com/wp-content/uploads/2014/04/resident-evil-2.jpg",
    },
    {
      title: "Resident Evil 2",
      description:
        "Two months after the events of the first Resident Evil game, help Leon S. Kennedy and Claire Redfield escape Raccoon City after a biological weapons turns the citizens into zombies. Rated M",
      price: 27.99,
      quantity: 8100,
      categoryId: 7,
      image:
        "https://gamingbolt.com/wp-content/uploads/2014/04/resident-evil-2.jpg",
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
        "https://deadentertainment.com/uploads/resident-evil-3-fan-made-hd-graphics-mod-75c099w06o.png",
    },
    {
      title: "Resident Evil 3: Nemesis",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 29.99,
      quantity: 10000,
      categoryId: 3,
      image:
        "https://deadentertainment.com/uploads/resident-evil-3-fan-made-hd-graphics-mod-75c099w06o.png",
    },
    {
      title: "Resident Evil 3: Nemesis",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 29.99,
      quantity: 10000,
      categoryId: 6,
      image:
        "https://deadentertainment.com/uploads/resident-evil-3-fan-made-hd-graphics-mod-75c099w06o.png",
    },
    {
      title: "Resident Evil 3: Nemesis",
      description:
        "Play as Jill Valentine as she tries to escape from the zombie infested Raccoon City Rated M",
      price: 29.99,
      quantity: 10000,
      categoryId: 7,
      image:
        "https://deadentertainment.com/uploads/resident-evil-3-fan-made-hd-graphics-mod-75c099w06o.png",
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
      image: "https://m.media-amazon.com/images/I/517JMPHYKCL.jpg",
    },
    {
      title: "Resident Evil - Code: Veronica",
      description:
        "Three months after the event of Resident Evil 2, play as Claire Redfield and Chris Redfield as they try to survive on both a remote prison island, and a research facitlity in Antarctica. Rated M",
      price: 34.99,
      quantity: 9650,
      categoryId: 3,
      image: "https://m.media-amazon.com/images/I/517JMPHYKCL.jpg",
    },
    {
      title: "Resident Evil - Code: Veronica",
      description:
        "Three months after the event of Resident Evil 2, play as Claire Redfield and Chris Redfield as they try to survive on both a remote prison island, and a research facitlity in Antarctica. Rated M",
      price: 34.99,
      quantity: 9650,
      categoryId: 6,
      image: "https://m.media-amazon.com/images/I/517JMPHYKCL.jpg",
    },
    {
      title: "Resident Evil - Code: Veronica",
      description:
        "Three months after the event of Resident Evil 2, play as Claire Redfield and Chris Redfield as they try to survive on both a remote prison island, and a research facitlity in Antarctica. Rated M",
      price: 34.99,
      quantity: 9650,
      categoryId: 7,
      image: "https://m.media-amazon.com/images/I/517JMPHYKCL.jpg",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 1,
      image:
        "https://www.residentevil.com/0/_asset/images/bio0-share-global.png",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 2,
      image:
        "https://www.residentevil.com/0/_asset/images/bio0-share-global.png",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 3,
      image:
        "https://www.residentevil.com/0/_asset/images/bio0-share-global.png",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 4,
      image:
        "https://www.residentevil.com/0/_asset/images/bio0-share-global.png",
    },
    {
      title: "Resident Evil Zero",
      description:
        "Play as S.T.A.R.S. officer Rebecca Chambers and covict Billy Coen as they explore an abandoned Umbrella training facility. Rated M",
      price: 34.99,
      quantity: 7600,
      categoryId: 6,
      image:
        "https://www.residentevil.com/0/_asset/images/bio0-share-global.png",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 1,
      image:
        "https://www.gamespot.com/a/uploads/scale_medium/536/5360430/3208280-untitled-1.jpg",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 2,
      image:
        "https://www.gamespot.com/a/uploads/scale_medium/536/5360430/3208280-untitled-1.jpg",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 3,
      image:
        "https://www.gamespot.com/a/uploads/scale_medium/536/5360430/3208280-untitled-1.jpg",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 4,
      image:
        "https://www.gamespot.com/a/uploads/scale_medium/536/5360430/3208280-untitled-1.jpg",
    },
    {
      title: "Resident Evil 4",
      description:
        "Play as Leon S Kennedy on his mission to rescue the U.S. prsident's daughter from a cult. Rated M",
      price: 39.99,
      quantity: 16000,
      categoryId: 6,
      image:
        "https://www.gamespot.com/a/uploads/scale_medium/536/5360430/3208280-untitled-1.jpg",
    },
    {
      title: "Resident Evil 5",
      description:
        "Play as Bioterrorism Security Assessment Alliance agents Chris Redfield and Sheva Alomar as they investigate terrorist threats. Rated M",
      price: 39.99,
      quantity: 16500,
      categoryId: 1,
      image: "https://m.media-amazon.com/images/I/61u+ibniWuL._SY355_.jpg",
    },
    {
      title: "Resident Evil 5",
      description:
        "Play as Bioterrorism Security Assessment Alliance agents Chris Redfield and Sheva Alomar as they investigate terrorist threats. Rated M",
      price: 39.99,
      quantity: 16500,
      categoryId: 2,
      image: "https://m.media-amazon.com/images/I/61u+ibniWuL._SY355_.jpg",
    },
    {
      title: "Resident Evil 5",
      description:
        "Play as Bioterrorism Security Assessment Alliance agents Chris Redfield and Sheva Alomar as they investigate terrorist threats. Rated M",
      price: 39.99,
      quantity: 16500,
      categoryId: 3,
      image: "https://m.media-amazon.com/images/I/61u+ibniWuL._SY355_.jpg",
    },
    {
      title: "Resident Evil 5",
      description:
        "Play as Bioterrorism Security Assessment Alliance agents Chris Redfield and Sheva Alomar as they investigate terrorist threats. Rated M",
      price: 39.99,
      quantity: 16500,
      categoryId: 4,
      image: "https://m.media-amazon.com/images/I/61u+ibniWuL._SY355_.jpg",
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
      image: "https://i.kym-cdn.com/photos/images/original/001/197/904/9a4.jpg",
    },
    {
      title: "Resident Evil 7: Biohazard",
      description:
        "Play as Ethan Winters as he looks for his lost wife in a derelict plantation owned by an infected family. Rated M",
      price: 49.99,
      quantity: 27000,
      categoryId: 2,
      image: "https://i.kym-cdn.com/photos/images/original/001/197/904/9a4.jpg",
    },
    {
      title: "Resident Evil 7: Biohazard",
      description:
        "Play as Ethan Winters as he looks for his lost wife in a derelict plantation owned by an infected family. Rated M",
      price: 49.99,
      quantity: 27000,
      categoryId: 3,
      image: "https://i.kym-cdn.com/photos/images/original/001/197/904/9a4.jpg",
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
        "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_7/SI_N64_PokemonStadium2_image1600w.jpg",
    },
    {
      title: "Pokemon Box",
      description:
        "Trade and store Pokemon from your Ruby, Sapphire, Emerald, FireRed, and LeafGreen pokemon games. Allows user to interact with and breed their pokemon on GameCube. Also gives users the ability to play Ruby and Sapphire on GameCube. Rated E",
      price: 29.99,
      quantity: 8900,
      categoryId: 6,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Pokemon_BOX_Ruby_Sapphire.svg/1280px-Pokemon_BOX_Ruby_Sapphire.svg.png",
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
        "https://cdn2.steamgriddb.com/file/sgdb-cdn/logo_thumb/91109a77036a730296d6305a9794fa13.png",
    },
    {
      title: "Pokemon XD: Gale of Darkness",
      description:
        "Explore the desert region of Orre, and help rescue Shadow Pokemon. Rated E",
      price: 34.99,
      quantity: 13000,
      categoryId: 6,
      image:
        "https://media.gamestop.com/i/gamestop/10039269/Pokemon-XD-Gale-of-Darkness",
    },
    {
      title: "Pokemon Snap",
      description: "Take picutres of Pokemon. Rated E",
      price: 29.99,
      quantity: 4500,
      categoryId: 5,
      image:
        "https://upload.wikimedia.org/wikipedia/en/0/0a/Pok%C3%A9mon_Snap_Coverart.png",
    },
    {
      title: "New Pokemon Snap",
      description: "Take picutres of Pokemon. Rated E",
      price: 39.99,
      quantity: 18000,
      categoryId: 4,
      image:
        "https://i2.wp.com/mynintendonews.com/wp-content/uploads/2021/01/new_pokemon_snap_logo.jpg?ssl=1",
    },
    {
      title: "Animal Crossing",
      description:
        "an endless and non-linear game in which a human takes up residence in a village inhabited by anthropomorphic animals. Rated E",
      price: 29.99,
      quantity: 4300,
      categoryId: 5,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/82/Animal_Crossing_Coverart.png",
    },
    {
      title: "Animal Crossing",
      description:
        "an endless and non-linear game in which a human takes up residence in a village inhabited by anthropomorphic animals. Rated E",
      price: 29.99,
      quantity: 4300,
      categoryId: 6,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/82/Animal_Crossing_Coverart.png",
    },
    {
      title: "Animal Crossing: New Horizons",
      description:
        "an endless and non-linear game in which a human takes up residence in a village inhabited by anthropomorphic animals. Rated E",
      price: 39.99,
      quantity: 28000,
      categoryId: 4,
      image:
        "https://www.thumbsticks.com/wp-content/uploads/2021/10/animal-crossing-new-horizons-logo-1200x900.jpg",
    },
    {
      title: "The Sims",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 5000,
      categoryId: 1,
      image:
        "https://i.kym-cdn.com/entries/icons/facebook/000/014/002/sims.jpg",
    },
    {
      title: "The Sims",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 5000,
      categoryId: 2,
      image:
        "https://i.kym-cdn.com/entries/icons/facebook/000/014/002/sims.jpg",
    },
    {
      title: "The Sims",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 5000,
      categoryId: 3,
      image:
        "https://i.kym-cdn.com/entries/icons/facebook/000/014/002/sims.jpg",
    },
    {
      title: "The Sims",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 5000,
      categoryId: 6,
      image:
        "https://i.kym-cdn.com/entries/icons/facebook/000/014/002/sims.jpg",
    },
    {
      title: "The Sims 2",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 8700,
      categoryId: 1,
      image: "https://lparchive.org/The-Sims-2/Images/1-Sims2HD.PNG",
    },
    {
      title: "The Sims 2",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 8700,
      categoryId: 2,
      image: "https://lparchive.org/The-Sims-2/Images/1-Sims2HD.PNG",
    },
    {
      title: "The Sims 2",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 8700,
      categoryId: 3,
      image: "https://lparchive.org/The-Sims-2/Images/1-Sims2HD.PNG",
    },
    {
      title: "The Sims 2",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated E",
      price: 24.99,
      quantity: 8700,
      categoryId: 6,
      image: "https://lparchive.org/The-Sims-2/Images/1-Sims2HD.PNG",
    },
    {
      title: "MySims SkyHeroes",
      description:
        "The player starts out as an unknown pilot and leads the resistance to the evil Morcubus and his drones who plan to take over the skyways Rated E",
      price: 29.99,
      quantity: 10000,
      categoryId: 2,
      image: "https://media.gamestop.com/i/gamestop/10077851/MySims-SkyHeroes",
    },
    {
      title: "MySims SkyHeroes",
      description:
        "The player starts out as an unknown pilot and leads the resistance to the evil Morcubus and his drones who plan to take over the skyways Rated E",
      price: 29.99,
      quantity: 10000,
      categoryId: 3,
      image: "https://media.gamestop.com/i/gamestop/10077851/MySims-SkyHeroes",
    },
    {
      title: "The Sims 3",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated T",
      price: 29.99,
      quantity: 11000,
      categoryId: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Sims3cover.jpg/220px-Sims3cover.jpg",
    },
    {
      title: "The Sims 3",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated T",
      price: 29.99,
      quantity: 11000,
      categoryId: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Sims3cover.jpg/220px-Sims3cover.jpg",
    },
    {
      title: "The Sims 3",
      description:
        "A simulation of the daily activities of one or more virtual people in a suburban household near a fictional city. Rated T",
      price: 29.99,
      quantity: 11000,
      categoryId: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Sims3cover.jpg/220px-Sims3cover.jpg",
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
