const data = {
  categories: [
    {
      name: 'Dining set',
      slug: 'dining-set',
      image: '/static/banner1.jpg',
      description: '',
    },
    {
      name: 'Kettle set',
      slug: 'kettle-set',
      image: '/static/banner2.jpg',
      description: '',
    },
    {
      name: 'Mugs',
      slug: 'mugs',
      image: '/static/banner5.jpg',
      description: '',
    },
    {
      name: 'Cups',
      slug: 'cups',
      image: '/static/banner4.png',
      description: '',
    },
  ],

  // categoryBanner: [
  //   '/banners/banner1.JPG',
  //   '/banners/banner2.JPG',
  //   '/banners/banner3.jpg',
  // ],
  products: [
    {
      name: 'Star Mug',
      slug: 'star-mug',
      category: 'Mugs',
      images: [
        '/static/products/starmug/image1.jpg',
        '/static/products/starmug/image2.jpg',
        '/static/products/starmug/image3.jpg',
      ],
      price: 599,
      countInStock: 20,
      isFeatured: true,
      description:
        'Enhance your coffe or tea experience with these hand painted mugs by MISAAKA. These Stoneware coffee mugs are a perfect addition to your kitchen and dining ware.',
    },
    {
      name: 'Floral Mug',
      slug: 'floral-mug',
      category: 'Mugs',
      images: [
        '/static/products/floralmug/image1.jpg',
        '/static/products/floralmug/image2.jpg',
        '/static/products/floralmug/image3.jpg',
      ],
      price: 699,
      isFeatured: true,
      countInStock: 20,
      description:
        'Enhance your coffe or tea experience with these hand painted mugs by MISAAKA. These Stoneware coffee mugs are a perfect addition to your kitchen and dining ware.',
    },
    {
      name: 'White Kettle Set',
      slug: 'white-kettle-set',
      category: 'Kettle set',
      images: [
        '/static/products/whitekettleset/image1.jpg',
        '/static/products/whitekettleset/image2.jpg',
        '/static/products/whitekettleset/image3.jpg',
        '/static/products/whitekettleset/image4.jpg',
      ],
      price: 1599,
      countInStock: 10,
      isFeatured: true,
      description:
        'Enhance your coffe or tea experience with these hand painted mugs by MISAAKA. These Stoneware coffee mugs are a perfect addition to your kitchen and dining ware.',
    },
    {
      name: 'Aqua plate & bowl set',
      slug: 'aqua-plate-&-bowl-set',
      category: 'Dining set',
      images: [
        '/static/products/plateandbowl/image1.JPG',
        '/static/products/plateandbowl/image2.JPG',
        '/static/products/plateandbowl/image3.JPG',
        '/static/products/plateandbowl/image4.JPG',
      ],
      price: 1399,
      countInStock: 5,
      isFeatured: true,
      description:
        'Enhance your coffe or tea experience with these hand painted mugs by MISAAKA. These Stoneware coffee mugs are a perfect addition to your kitchen and dining ware.',
    },
    {
      name: 'Red kettle set',
      slug: 'red-kettle-set',
      category: 'Kettle set',
      images: [
        '/static/products/redKettle/image1.jpg',
        '/static/products/redKettle/image2.jpg',
        '/static/products/redKettle/image3.jpg',
      ],
      price: 2599,
      countInStock: 5,
      isFeatured: true,
      description:
        'Material is Ceramic. Pack of a Kettle and 4 small cups Microwave and dishwasher safe. Color is Red. Handmade with LOVE by Indian Artisans',
    },
    {
      name: 'Cup and saucer',
      slug: 'cup-and-saucer',
      category: 'Cups',
      images: [
        '/static/products/tealteacup/image1.jpg',
        '/static/products/tealteacup/image2.jpg',
        '/static/products/tealteacup/image3.jpg',
      ],
      price: 599,
      countInStock: 2,
      isFeatured: true,
      description:
        "Don't start it with a Dizzy Hangover. Welcome the morning of fresh year with these CUP & SAUCER",
    },
    {
      name: 'Leaf plate and Bowl',
      slug: 'leaf-plate-and-bowl',
      category: 'Dining set',
      images: [
        '/static/products/leafplatebowl/image1.jpg',
        '/static/products/leafplatebowl/image2.jpg',
        '/static/products/leafplatebowl/image3.jpg',
      ],
      price: 2199,
      countInStock: 2,
      isFeatured: false,
      description:
        "Don't start it with a Dizzy Hangover. Welcome the morning of fresh year with these CUP & SAUCER",
    },
    {
      name: 'Blue kettle',
      slug: 'blue-kettle',
      category: 'Kettle set',
      images: [
        '/static/products/bluekettle/image1.JPG',
        '/static/products/bluekettle/image2.JPG',
      ],
      price: 489,
      countInStock: 2,
      isFeatured: true,
      description:
        'This is a large tea pot or Coffee Pot with a lovely shaped perfect for sunny afternoon teas in the garden. If you are looking for an everyday teapot that holds a few mugs worth of hot brew, this is your pick.☕This classic style teapot features contemporary qualities such as being dishwasher and oven safe withstands high temperatures, serves for a long time without losing its functional qualities and appearance. 💙Slight and minor color change could be noticed as each product is individually made by hand. Flash used in the shoot and difference in screen✨ resolutions could also be a reason.',
    },
    {
      name: 'Set of 6 Elegant Kulhad',
      slug: 'set-of-6-elegant-kulhad',
      category: 'Cups',
      images: [
        '/static/products/whitekulhad/image1.png',
        '/static/products/whitekulhad/image2.png',
        '/static/products/whitekulhad/image3.png',
      ],
      price: 679,
      countInStock: 2,
      isFeatured: false,
      description:
        "Set of 6 Elegant Kulhad in a beautiful pattern .These elegant tea cups with easy grip handles are the perfect way to enjoy your brew. This set also make a beautiful and thoughtful gift.🎁 For those in love with that finery of the old world, these Stoneware kullad mugs are the right choice for their favourite tea. Enjoy your hot milk / coffee / tea / soup in this finely glazed,brilliant handmade kullad mugs.✨✨ It's Handmade and material- Stoneware Set contents- 6 ceramic kulhad❤️ Height - 3 inch , Diameter - 3Microwave and dishwasher safe ✔️",
    },
    {
      name: 'Set of 6 blue cups',
      slug: 'set-of-6-blue-cups',
      category: 'Cups',
      images: [
        '/static/products/bluecups/image1.png',
        '/static/products/bluecups/image2.png',
        '/static/products/bluecups/image3.png',
      ],
      price: 829,
      countInStock: 2,
      isFeatured: false,
      description:
        'Made from fine porcelain. Durable, dishwasher safe and microwave safe !! Colour: Blue The stylish design of the cups or mugs look visually appealing and is an excellent way to welcome your guests with.✨ Package Contents: 6-Pieces Cups☕',
    },
    {
      name: 'Set of 5 Floral Kulhad',
      slug: 'set-of-5-floral-kulhad',
      category: 'Cups',
      images: [
        '/static/products/bluekulhad/image1.png',
        '/static/products/bluekulhad/image2.png',
        '/static/products/bluekulhad/image3.png',
      ],
      price: 850,
      countInStock: 2,
      isFeatured: false,
      description:
        'Made from fine porcelain. Durable, dishwasher safe and microwave safe !! Colour: White🤍 The stylish design of the cups or mugs look visually appealing and is an excellent way to welcome your guests with.✨ Package Contents: 5-Pieces Cups☕',
    },
    {
      name: 'Set of 2 stripe cups',
      slug: 'set-of-2-stripe-cups',
      category: 'Cups',
      images: [
        '/static/products/bngcup/image1.png',
        '/static/products/bngcup/image2.png',
        '/static/products/bngcup/image3.png',
      ],
      price: 950,
      countInStock: 2,
      isFeatured: false,
      description:
        'Made from fine porcelain. Durable, dishwasher safe and microwave safe !! Colour: White🤍 The stylish design of the cups or mugs look visually appealing and is an excellent way to welcome your guests with.✨ Package Contents: 2-Pieces Cups☕',
    },
    {
      name: 'Set of 2 orange mugs',
      slug: 'set-of-2-orange-mugs',
      category: 'Mugs',
      images: [
        '/static/products/orangemug/image1.png',
        '/static/products/orangemug/image2.png',
        '/static/products/orangemug/image3.png',
      ],
      price: 360,
      countInStock: 2,
      isFeatured: false,
      description:
        'Made from fine porcelain. Durable, dishwasher safe and microwave safe !! Colour: White and orange  Design: Orange stripes.  The stylish design of the cups or mugs look visually appealing and is an excellent way to welcome your guests with.✨ Package Contents: 2-Pieces Mugs☕',
    },
  ],
};
module.exports = data;
