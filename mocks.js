import React from 'react'
import Image from './components/Image'
import Price from './components/Price'
import Label from './components/Label'
import faker from 'faker'

export function createPromotionalFilters() {
  return [
    { name: 'All', slug: 'all' },
    { name: 'Seasonal', slug: 'seasonal' },
    { name: 'Must Buy', slug: 'must-buy' },
    { name: 'Purchase with Purchase', slug: 'purchase-with-purchase' },
    { name: 'Clearance', slug: 'clearance' },
    { name: 'Carton Deals', slug: 'carton-deals' },
    { name: 'All', slug: 'all' },
    { name: 'Seasonal', slug: 'seasonal' },
    { name: 'Must Buy', slug: 'must-buy' },
    { name: 'Purchase with Purchase', slug: 'purchase-with-purchase' },
    { name: 'Clearance', slug: 'clearance' },
    { name: 'Carton Deals', slug: 'carton-deals' },
  ]
}

export function createCartSummary() {
  return {
    subtotal: <Price amount={42.68} />,
    coupons: [
      {
        code: 'something',
        desc: 'CHRISTMAS OFF',
        rebate: <Price amount={-1.05} />,
      },
      {
        code: 'something else',
        desc:
          '10% off on all orders for Score members only with no minimum spend',
        rebate: '-10%',
      },
    ],
    collections: [
      {
        slug: 'delivery',
        name: 'Delivery',
        price: <Price amount={7.0} />,
      },
      {
        slug: 'pick-up',
        name: 'Pick up',
        price: <Price amount={0} />,
      },
    ],
    total: <Price amount={49.68} />,
    saved: (
      <Label
        text={
          <span>
            Saved <Price amount={0.45} />
          </span>
        }
      />
    ),
  }
}

export function createCartItem({ withPromos = false } = {}) {
  function createPromos() {
    return {
      promotions: [
        {
          name: 'Buy $200+ FREE Playdoh Set',
          achieved: false,
          image: (
            <Image
              alt="promo-image"
              src="https://via.placeholder.com/40"
              width="40"
              height="40"
            />
          ),
        },
        {
          name: 'Buy 6 get $43.60 off',
          achieved: true,
          image: (
            <Image
              alt="promo-image"
              src="https://via.placeholder.com/40"
              width="40"
              height="40"
            />
          ),
        },
      ],
    }
  }

  return {
    image: (
      <Image
        alt="product-image"
        src="https://via.placeholder.com/64"
        width="64"
        height="64"
      />
    ),
    title: 'Abbott Grow School Milk Formula - 6 Years Onward',
    label: <Label text="1.8kg" />,
    price: <Price amount={7.95} />,
    usualPrice: <Price amount={8.95} outdated />,
    quantity: 5,
    ...(withPromos && createPromos()),
  }
}

export function createCartItems(...args) {
  return Array(6).fill(createCartItem(...args))
}

export function createSort() {
  return {
    relevance: 'Relevancy',
    newest: 'Newest',
    top: 'Top rated',
    'price-ascending': 'Price: Low to high',
    'price-descending': 'Price: High to low',
  }
}

export function createBuyAny() {
  return {
    qualifyingCount: 2,
    discount: 5,
    products: createProducts(),
  }
}

export function createProduct(args) {
  return {
    images: ['https://via.placeholder.com/158x88'],
    description: 'product-image',
    name: 'Rokeby Farms Whole Protein Smoothie - Banana, Honey & Cinnamon',
    id: faker.random.uuid(),
    storeSpecificData: [
      {
        mrp: 8.95,
        discount: 1.0,
      },
    ],
    slug: faker.lorem.slug(),
    ...args,
  }
}

export function createProducts(args) {
  return Array(6).fill(createProduct(args))
}

export function createDietary() {
  return [
    <Image
      alt="halal"
      key="1"
      src="https://via.placeholder.com/32x32"
      width="32"
      height="32"
      round
    />,
    <Image
      alt="vegan"
      key="2"
      src="https://via.placeholder.com/32x32"
      width="32"
      height="32"
      round
    />,
  ]
}

export function createProductCollection(args) {
  return {
    collection: {
      count: 10,
      offset: 20,
      product: Array(10).fill(createProduct()),
    },
    ...args,
  }
}

export const pickupLocations = [
  {
    Store: {
      id: 1,
      name: 'Store 1',
      address: 'Store 1 address',
    },
  },
]

export function createImageCarouselCard() {
  return {
    imageUrl: 'https://via.placeholder.com/300',
    title: 'Image Dummy Title',
    text: 'Image Dummy Subtitle',
    link: 'https://via.placeholder.com/300',
  }
}

export const dataCategory = {
  collection: [
    {
      category: {
        clientId: null,
        description: null,
        id: 4621,
        image:
          'https://storage.googleapis.com/zopsmart-uploads/originals/20181118/3DMB_SubBanner-20181118-075219.jpg',
        name: 'Meat Balls',
        parentCategory: {
          clientId: null,
          description: null,
          id: 4568,
          image:
            'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/ChilledFood_CatBanner-20181114-114627.jpg',
          name: 'Chilled Food',
          parentCategory: {
            clientId: null,
            description: null,
            id: 4547,
            image:
              'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Chilled_SideBanner-20181114-112259.jpg',
            name: 'Chilled',
            parentCategory: null,
            productsCount: 21,
            slug: 'chilled',
            status: 'ENABLED',
          },
          productsCount: 9,
          slug: 'chilled-food',
          status: 'ENABLED',
        },
        productsCount: 3,
        slug: 'meat-balls',
        status: 'ENABLED',
      },
    },
    {
      category: {
        clientId: null,
        description: null,
        id: 4623,
        image:
          'https://storage.googleapis.com/zopsmart-uploads/originals/20181118/Christmas_SubBanner_Nov2018-20181118-075239.jpg',
        name: 'Beancurd & Tofu',
        parentCategory: {
          clientId: null,
          description: null,
          id: 4568,
          image:
            'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/ChilledFood_CatBanner-20181114-114627.jpg',
          name: 'Chilled Food',
          parentCategory: {
            clientId: null,
            description: null,
            id: 4547,
            image:
              'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Chilled_SideBanner-20181114-112259.jpg',
            name: 'Chilled',
            parentCategory: null,
            productsCount: 21,
            slug: 'chilled',
            status: 'ENABLED',
          },
          productsCount: 9,
          slug: 'chilled-food',
          status: 'ENABLED',
        },
        productsCount: 3,
        slug: 'beancurd-tofu',
        status: 'ENABLED',
      },
    },
    {
      category: {
        clientId: null,
        description: null,
        id: 4627,
        image:
          'https://storage.googleapis.com/zopsmart-uploads/originals/20181118/MumsAndBabies_SubBanner_Nov2018-20181118-075255.jpg',
        name: 'Juices',
        parentCategory: {
          clientId: null,
          description: null,
          id: 4570,
          image:
            'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/ChilledDrinks_CatBanner-20181114-114739.jpg',
          name: 'Chilled Drinks',
          parentCategory: {
            clientId: null,
            description: null,
            id: 4547,
            image:
              'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Chilled_SideBanner-20181114-112259.jpg',
            name: 'Chilled',
            parentCategory: null,
            productsCount: 21,
            slug: 'chilled',
            status: 'ENABLED',
          },
          productsCount: 3,
          slug: 'chilled-drinks',
          status: 'ENABLED',
        },
        productsCount: 3,
        slug: 'juices',
        status: 'ENABLED',
      },
    },
    {
      category: {
        clientId: null,
        description: null,
        id: 4633,
        image:
          'https://storage.googleapis.com/zopsmart-uploads/originals/20181118/Dairyproducts_343x200-20181118-075455.jpg',
        name: 'Frozen Fruits',
        parentCategory: {
          clientId: null,
          description: null,
          id: 4576,
          image:
            'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/dfbd-20181114-115004.jpg',
          name: 'Frozen Greens',
          parentCategory: {
            clientId: null,
            description: null,
            id: 4548,
            image:
              'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Nestle-frozen-food-products-678x381-20181114-153610.jpg',
            name: 'Frozen',
            parentCategory: null,
            productsCount: 18,
            slug: 'frozen',
            status: 'ENABLED',
          },
          productsCount: 6,
          slug: 'frozen-greens',
          status: 'ENABLED',
        },
        productsCount: 3,
        slug: 'frozen-fruits',
        status: 'ENABLED',
      },
    },
  ],
  title: 'Top Categories',
}

export function ProductDescription(args) {
  return {
    title: 'Description',
    data:
      '• Scientifically formulated by Mead Johnson Nutrition with 17mg DHA and 34mg ARA\n• DHA and ARA are important building blocks for brain and eye development',
    ...args,
  }
}

export function ProductDetails(args) {
  return (
    args || {
      product: {
        code: 200,
        status: 'SUCCESS',
        data: {
          page: {
            id: 4,
            layouts: [
              {
                data: {},
                name: 'ProductDetail',
                value: {
                  brand: null,
                  categories: [
                    {
                      clientId: null,
                      description: null,
                      id: 4572,
                      image:
                        'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Stage1Milk_HeaderBanner_Jun2018-20181114-114832.jpg',
                      name: 'Stage 1 Milk',
                      parentCategory: {
                        clientId: null,
                        description: null,
                        id: 4549,
                        image: null,
                        name: 'INFANT',
                        parentCategory: {
                          clientId: null,
                          description: null,
                          id: 4542,
                          image:
                            'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Baby-and-Child-Products-20181114-153312.jpg',
                          name: 'Baby & Child',
                          parentCategory: null,
                          productsCount: 33,
                          slug: 'baby-child',
                          status: 'ENABLED',
                        },
                        productsCount: 6,
                        slug: 'infant',
                        status: 'ENABLED',
                      },
                      productsCount: 3,
                      slug: 'stage-1-milk',
                      status: 'ENABLED',
                    },
                  ],
                  description:
                    '• Scientifically formulated by Mead Johnson Nutrition with 17mg DHA and 34mg ARA\n• DHA and ARA are important building blocks for brain and eye development',
                  hasVariants: 0,
                  id: 247704,
                  images: [
                    'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/13050603_XL1-20181114-123631.jpg',
                  ],
                  imagesExtra: [
                    'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/13050603_XL1-20181114-123631.jpg',
                  ],
                  isSoldByWeight: false,
                  item: {
                    barcodes: [],
                    clientItemId: null,
                    entityId: 247704,
                    entityType: 'PRODUCT',
                    id: 272275,
                  },
                  metaData: null,
                  name: 'Enfamil A+ Infant Milk Powder - A.R. (0 To 12 Months)',
                  properties: [],
                  slug: 'enfamil-a-infant-milk-powder-ar-0-to-12-months',
                  soldByWeight: 0,
                  status: 'ENABLED',
                  storeSpecificData: [
                    {
                      aisle: null,
                      barcodes: [],
                      currency: {
                        id: 106,
                        name: 'SGD',
                        symbol: '$',
                      },
                      discount: '0.00000',
                      mrp: '63.20000',
                      multipleMrp: [],
                      rack: null,
                      sellingPrice: '63.20000',
                      shelf: null,
                      stock: 400,
                      store: {
                        address: '1 Joo Koon Cir, Singapore 629116',
                        clientStoreId: null,
                        id: 20,
                        latitude: '1.3271623000000',
                        longitude: '103.6788611000000',
                        name: 'FP Hub',
                      },
                      storeId: 20,
                      tax: [],
                    },
                  ],
                  tags: [],
                  variants: [],
                },
              },
            ],
            name: 'PRODUCT',
          },
        },
      },
      similar: {
        code: 200,
        status: 'SUCCESS',
        data: {
          count: 3,
          limit: 20,
          offset: 0,
          product: [
            {
              brand: null,
              categories: [
                {
                  clientId: null,
                  description: null,
                  id: 4572,
                  image:
                    'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Stage1Milk_HeaderBanner_Jun2018-20181114-114832.jpg',
                  name: 'Stage 1 Milk',
                  parentCategory: {
                    clientId: null,
                    description: null,
                    id: 4549,
                    image: null,
                    name: 'INFANT',
                    parentCategory: {
                      clientId: null,
                      description: null,
                      id: 4542,
                      image:
                        'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Baby-and-Child-Products-20181114-153312.jpg',
                      name: 'Baby & Child',
                      parentCategory: null,
                      productsCount: 33,
                      slug: 'baby-child',
                      status: 'ENABLED',
                    },
                    productsCount: 6,
                    slug: 'infant',
                    status: 'ENABLED',
                  },
                  productsCount: 3,
                  slug: 'stage-1-milk',
                  status: 'ENABLED',
                },
              ],
              description:
                '• Scientifically formulated by Mead Johnson Nutrition with 17mg DHA and 34mg ARA\n• DHA and ARA are important building blocks for brain and eye development',
              hasVariants: 0,
              id: 247704,
              images: [
                'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/13050603_XL1-20181114-123631.jpg',
              ],
              imagesExtra: [
                'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/13050603_XL1-20181114-123631.jpg',
              ],
              isSoldByWeight: false,
              item: {
                barcodes: [],
                clientItemId: null,
                entityId: 247704,
                entityType: 'PRODUCT',
                id: 272275,
              },
              metaData: null,
              name: 'Enfamil A+ Infant Milk Powder - A.R. (0 To 12 Months)',
              properties: [],
              slug: 'enfamil-a-infant-milk-powder-ar-0-to-12-months',
              soldByWeight: 0,
              status: 'ENABLED',
              storeSpecificData: [
                {
                  aisle: null,
                  barcodes: [],
                  currency: {
                    id: 106,
                    name: 'SGD',
                    symbol: '$',
                  },
                  discount: '0.00000',
                  mrp: '63.20000',
                  multipleMrp: [],
                  rack: null,
                  sellingPrice: '63.20000',
                  shelf: null,
                  stock: 400,
                  store: {
                    address: '1 Joo Koon Cir, Singapore 629116',
                    clientStoreId: null,
                    id: 20,
                    latitude: '1.3271623000000',
                    longitude: '103.6788611000000',
                    name: 'FP Hub',
                  },
                  storeId: 20,
                  tax: [],
                },
              ],
              tags: [],
              variants: [],
            },
            {
              brand: null,
              categories: [
                {
                  clientId: null,
                  description: null,
                  id: 4572,
                  image:
                    'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Stage1Milk_HeaderBanner_Jun2018-20181114-114832.jpg',
                  name: 'Stage 1 Milk',
                  parentCategory: {
                    clientId: null,
                    description: null,
                    id: 4549,
                    image: null,
                    name: 'INFANT',
                    parentCategory: {
                      clientId: null,
                      description: null,
                      id: 4542,
                      image:
                        'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Baby-and-Child-Products-20181114-153312.jpg',
                      name: 'Baby & Child',
                      parentCategory: null,
                      productsCount: 33,
                      slug: 'baby-child',
                      status: 'ENABLED',
                    },
                    productsCount: 6,
                    slug: 'infant',
                    status: 'ENABLED',
                  },
                  productsCount: 3,
                  slug: 'stage-1-milk',
                  status: 'ENABLED',
                },
              ],
              description:
                'Breast milk is the best for your baby. The World Health Organisation recommends exclusive breastfeeding for the first six months of life. Unnecessary introduction of bottle feeding or other food and drinks will have a negative impact on breastfeeding. After six months of age, infants should receive age-appropriate foods while breastfeeding continues for up to two years of age or beyond. Consult your doctor before deciding to use infant formula or if you have difficulty breastfeeding.',
              hasVariants: 0,
              id: 247705,
              images: [
                'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/13134983_XL1-20181114-123729.jpg',
              ],
              imagesExtra: [
                'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/13134983_XL1-20181114-123729.jpg',
              ],
              isSoldByWeight: false,
              item: {
                barcodes: [],
                clientItemId: null,
                entityId: 247705,
                entityType: 'PRODUCT',
                id: 272276,
              },
              metaData: null,
              name: "Australia's Own Diamond Infant Milk Formula - Stage 1",
              properties: [],
              slug: 'australias-own-diamond-infant-milk-formula-stage-1',
              soldByWeight: 0,
              status: 'ENABLED',
              storeSpecificData: [
                {
                  aisle: null,
                  barcodes: [],
                  currency: {
                    id: 106,
                    name: 'SGD',
                    symbol: '$',
                  },
                  discount: '0.00000',
                  mrp: '35.00000',
                  multipleMrp: [],
                  rack: null,
                  sellingPrice: '35.00000',
                  shelf: null,
                  stock: 400,
                  store: {
                    address: '1 Joo Koon Cir, Singapore 629116',
                    clientStoreId: null,
                    id: 20,
                    latitude: '1.3271623000000',
                    longitude: '103.6788611000000',
                    name: 'FP Hub',
                  },
                  storeId: 20,
                  tax: [],
                },
              ],
              tags: [],
              variants: [],
            },
            {
              brand: null,
              categories: [
                {
                  clientId: null,
                  description: null,
                  id: 4572,
                  image:
                    'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Stage1Milk_HeaderBanner_Jun2018-20181114-114832.jpg',
                  name: 'Stage 1 Milk',
                  parentCategory: {
                    clientId: null,
                    description: null,
                    id: 4549,
                    image: null,
                    name: 'INFANT',
                    parentCategory: {
                      clientId: null,
                      description: null,
                      id: 4542,
                      image:
                        'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/Baby-and-Child-Products-20181114-153312.jpg',
                      name: 'Baby & Child',
                      parentCategory: null,
                      productsCount: 33,
                      slug: 'baby-child',
                      status: 'ENABLED',
                    },
                    productsCount: 6,
                    slug: 'infant',
                    status: 'ENABLED',
                  },
                  productsCount: 3,
                  slug: 'stage-1-milk',
                  status: 'ENABLED',
                },
              ],
              description:
                'Breast milk is the best for your baby. The World Health Organisation recommends exclusive breastfeeding for the first six months of life. Unnecessary introduction of bottle feeding or other food and drinks will have a negative impact on breastfeeding. After six months of age, infants should receive age-appropriate foods while breastfeeding continues for up to two years of age or beyond. Consult your doctor before deciding to use infant formula or if you have difficulty breastfeeding.',
              hasVariants: 0,
              id: 247707,
              images: [
                'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/2-20181114-124025.jpg',
              ],
              imagesExtra: [
                'https://storage.googleapis.com/zopsmart-uploads/originals/20181114/2-20181114-124025.jpg',
              ],
              isSoldByWeight: false,
              item: {
                barcodes: [],
                clientItemId: null,
                entityId: 247707,
                entityType: 'PRODUCT',
                id: 272278,
              },
              metaData: null,
              name: 'Bimbosan Organic Baby Milk Formula - Stage 1',
              properties: [],
              slug: 'bimbosan-organic-baby-milk-formula-stage-1',
              soldByWeight: 0,
              status: 'ENABLED',
              storeSpecificData: [
                {
                  aisle: null,
                  barcodes: [],
                  currency: {
                    id: 106,
                    name: 'SGD',
                    symbol: '$',
                  },
                  discount: '0.00000',
                  mrp: '29.90000',
                  multipleMrp: [],
                  rack: null,
                  sellingPrice: '29.90000',
                  shelf: null,
                  stock: 400,
                  store: {
                    address: '1 Joo Koon Cir, Singapore 629116',
                    clientStoreId: null,
                    id: 20,
                    latitude: '1.3271623000000',
                    longitude: '103.6788611000000',
                    name: 'FP Hub',
                  },
                  storeId: 20,
                  tax: [],
                },
              ],
              tags: [],
              variants: [],
            },
          ],
        },
      },
    }
  )
}

export const imgValue = {
  images: [
    {
      imageUrl:
        'https://storage.googleapis.com/zopsmart-uploads/originals/20181115/1%281%29-20181115-093043.jpg',
      link: 'https://via.placeholder.com/300',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      text:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit quoi aliquip ex ea commodo consequat',
    },
    {
      imageUrl:
        'https://storage.googleapis.com/zopsmart-uploads/originals/20181115/2%282%29-20181115-093425.jpg',
      link: 'https://via.placeholder.com/300',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      text:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit quoi aliquip ex ea commodo consequat',
    },
    {
      imageUrl:
        'https://storage.googleapis.com/zopsmart-uploads/originals/20181115/3%283%29-20181115-093949.jpg',
      link: 'https://via.placeholder.com/300',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      text:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit quoi aliquip ex ea commodo consequat',
    },
    {
      imageUrl:
        'https://storage.googleapis.com/zopsmart-uploads/originals/20181115/4%284%29-20181115-094004.jpg',
      link: 'https://via.placeholder.com/300',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      text:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit quoi aliquip ex ea commodo consequat',
    },
    {
      imageUrl:
        'https://storage.googleapis.com/zopsmart-uploads/originals/20181115/5%285%29-20181115-094027.jpg',
      link: 'https://via.placeholder.com/300',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      text:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit quoi aliquip ex ea commodo consequat',
    },
    {
      imageUrl:
        'https://storage.googleapis.com/zopsmart-uploads/originals/20181115/6%286%29-20181115-094042.jpg',
      link: 'https://via.placeholder.com/300',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      text:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit quoi aliquip ex ea commodo consequat',
    },
  ],
}

export const CategoryList = [
  {
    name: 'Frozen',
    slug: '/category/frozen',
    image:
      'https://gaia.adage.com/images/bin/image/x-large/0415p06-Frozen-Food-Aisle-3x2.jpg',
    subCategories: [
      {
        name: 'Ice Cream',
        slug: '/category/ice-cream',
        subCategories: [
          {
            name: 'Tubs',
            slug: '/category/tubs',
          },
        ],
      },
      {
        name: 'Frozen Desserts',
        slug: '/category/frozen-desserts',
        subCategories: [
          {
            name: 'Frozen Cakes',
            slug: '/category/frozen-cakes',
          },
          {
            name: 'Other Desserts',
            slug: '/category/other-desserts',
          },
        ],
      },
      {
        name: 'Frozen Greens',
        slug: '/category/frozen-greens',
        subCategories: [
          {
            name: 'Frozen Fruits',
            slug: '/category/frozen-fruits',
          },
          {
            name: 'Frozen Vegetables',
            slug: '/category/frozen-vegetables',
          },
        ],
      },
      {
        name: 'Frozen Finger Food',
        slug: '/category/frozen-finger-food',
        subCategories: [
          {
            name: 'Chicken Delights',
            slug: '/category/chicken-delights',
          },
        ],
      },
    ],
  },
  {
    name: 'Chilled',
    slug: '/category/chilled',
    subCategories: [
      {
        name: 'Delicatessen',
        slug: '/category/delicatessen',
        subCategories: [
          {
            name: 'Ham & Salami',
            slug: '/category/ham-salami',
          },
          {
            name: 'Sausages & Bacon',
            slug: '/category/sausages-bacon',
          },
        ],
      },
      {
        name: 'Chilled Food',
        slug: '/category/chilled-food',
        subCategories: [
          {
            name: 'Fish Balls & Fish Cakes',
            slug: '/category/fish-balls-fish-cakes',
          },
          {
            name: 'Meat Balls',
            slug: '/category/meat-balls',
          },
          {
            name: 'Beancurd & Tofu',
            slug: '/category/beancurd-tofu',
          },
        ],
      },
      {
        name: 'Chilled Desserts',
        slug: '/category/chilled-desserts',
        subCategories: [
          {
            name: 'Puddings & Jellies',
            slug: '/category/puddings-jellies',
          },
        ],
      },
      {
        name: 'Chilled Drinks',
        slug: '/category/chilled-drinks',
        subCategories: [
          {
            name: 'Juices',
            slug: '/category/juices',
          },
        ],
      },
    ],
  },
  {
    name: 'Dairy',
    slug: '/category/dairy',
    subCategories: [
      {
        name: 'Milk',
        slug: '/category/milk',
        subCategories: [
          {
            name: 'Fresh Milk',
            slug: '/category/fresh-milk',
          },
          {
            name: 'Cultured Milk',
            slug: '/category/cultured-milk',
          },
          {
            name: 'Soya Milk',
            slug: '/category/soya-milk',
          },
        ],
      },
      {
        name: 'CHEESE',
        slug: '/category/cheese',
        subCategories: [
          {
            name: 'Blocks',
            slug: '/category/blocks',
          },
          {
            name: 'Cheese Spreads',
            slug: '/category/cheese-spreads',
          },
          {
            name: 'Sliced',
            slug: '/category/sliced',
          },
        ],
      },
      {
        name: 'Dairy Spreads',
        slug: '/category/dairy-spreads',
        subCategories: [
          {
            name: 'Butter',
            slug: '/category/butter',
          },
          {
            name: 'Margarine',
            slug: '/category/margarine',
          },
        ],
      },
      {
        name: 'Cream',
        slug: '/category/cream',
        subCategories: [
          {
            name: 'Whipping Creams',
            slug: '/category/whipping-creams',
          },
          {
            name: 'Other Creams',
            slug: '/category/other-creams',
          },
        ],
      },
    ],
  },
  {
    name: 'Tesco',
    slug: '/category/tesco',
    subCategories: [
      {
        name: 'TESCO FOOD',
        slug: '/category/tesco-food',
        subCategories: [
          {
            name: 'Frozen',
            slug: '/category/frozen-1',
          },
          {
            name: 'Cereal, Bakery & Spread',
            slug: '/category/cereal-bakery-spread',
          },
          {
            name: 'Baking & Cooking',
            slug: '/category/baking-cooking',
          },
        ],
      },
      {
        name: 'TESCO NON-FOOD',
        slug: '/category/tesco-non-food',
        subCategories: [
          {
            name: 'Home Care',
            slug: '/category/home-care',
          },
          {
            name: 'Home & Living',
            slug: '/category/home-living',
          },
        ],
      },
    ],
  },
  {
    name: 'Fresh Produce',
    slug: '/category/fresh-produce',
    subCategories: [
      {
        name: 'Eggs',
        slug: '/category/eggs',
        subCategories: [
          {
            name: 'Fresh Eggs',
            slug: '/category/fresh-eggs',
          },
        ],
      },
    ],
  },
  {
    name: 'Housebrand',
    slug: '/category/housebrand',
    subCategories: [
      {
        name: 'FAIRPRICE',
        slug: '/category/fairprice',
        subCategories: [
          {
            name: 'Dairy',
            slug: '/category/dairy-1',
          },
          {
            name: 'Frozen',
            slug: '/category/frozen-2',
          },
          {
            name: 'Chilled',
            slug: '/category/chilled-1',
          },
        ],
      },
      {
        name: 'FairPrice Gold',
        slug: '/category/fairprice-gold',
        subCategories: [
          {
            name: 'Baking & Cooking',
            slug: '/category/baking-cooking-1',
          },
          {
            name: 'Drinks & Snacks',
            slug: '/category/drinks-snacks',
          },
        ],
      },
      {
        name: 'Homeproud',
        slug: '/category/homeproud',
        subCategories: [
          {
            name: 'Home Care',
            slug: '/category/home-care-1',
          },
          {
            name: 'Home & Living',
            slug: '/category/home-living-1',
          },
        ],
      },
      {
        name: 'Budget',
        slug: '/category/budget',
        subCategories: [
          {
            name: 'Chilled',
            slug: '/category/chilled-2',
          },
          {
            name: 'Baking & Cooking',
            slug: '/category/baking-cooking-2',
          },
          {
            name: 'Home Care',
            slug: '/category/home-care-2',
          },
        ],
      },
    ],
  },
  {
    name: 'Baby & Child',
    slug: '/category/baby-child',
    subCategories: [
      {
        name: 'INFANT',
        slug: '/category/infant',
        subCategories: [
          {
            name: 'Essentials',
            slug: '/category/essentials',
          },
          {
            name: 'Stage 1 Milk',
            slug: '/category/stage-1-milk',
          },
        ],
      },
      {
        name: 'MILK POWDER',
        slug: '/category/milk-powder',
        subCategories: [
          {
            name: 'Stage 2',
            slug: '/category/stage-2',
          },
          {
            name: 'Stage 3',
            slug: '/category/stage-3',
          },
          {
            name: 'Stage 4 & Above',
            slug: '/category/stage-4-above',
          },
        ],
      },
      {
        name: 'FOOD',
        slug: '/category/food',
        subCategories: [
          {
            name: 'Cereals',
            slug: '/category/cereals',
          },
          {
            name: 'Meals & Juices',
            slug: '/category/meals-juices',
          },
          {
            name: 'Organic Baby Food',
            slug: '/category/organic-baby-food',
          },
        ],
      },
      {
        name: 'BABY CARE',
        slug: '/category/baby-care',
        subCategories: [
          {
            name: 'Baby Laundry',
            slug: '/category/baby-laundry',
          },
          {
            name: 'Baby Wipes',
            slug: '/category/baby-wipes',
          },
          {
            name: 'Dental Care',
            slug: '/category/dental-care',
          },
        ],
      },
    ],
  },
]

export const CategoryDetailsData = {
  name: 'Dairy',
  slug: '/category/dairy',
  subCategories: [
    {
      name: 'Milk',
      slug: '/category/milk',
      subCategories: [
        {
          name: 'Fresh Milk',
          slug: '/category/fresh-milk',
        },
        {
          name: 'Cultured Milk',
          slug: '/category/cultured-milk',
        },
        {
          name: 'Soya Milk',
          slug: '/category/soya-milk',
        },
      ],
    },
    {
      name: 'Cheese',
      slug: '/category/cheese',
      subCategories: [
        {
          name: 'Blocks',
          slug: '/category/blocks',
        },
        {
          name: 'Cheese Spreads',
          slug: '/category/cheese-spreads',
        },
        {
          name: 'Sliced',
          slug: '/category/sliced',
        },
      ],
    },
    {
      name: 'Dairy Spreads',
      slug: '/category/dairy-spreads',
      subCategories: [
        {
          name: 'Butter',
          slug: '/category/butter',
        },
        {
          name: 'Margarine',
          slug: '/category/margarine',
        },
      ],
    },
    {
      name: 'Cream',
      slug: '/category/cream',
      subCategories: [
        {
          name: 'Whipping Creams',
          slug: '/category/whipping-creams',
        },
        {
          name: 'Other Creams',
          slug: '/category/other-creams',
        },
      ],
    },
  ],
}

export const UserData = {
  accessToken: '1548326403.2118zop5c49960333b285.09639754',
  addresses: [
    {
      address: 'HortPark',
      city: 'Singapore',
      clientId: null,
      id: 6,
      landmark: 'Alexandra Road',
      latitude: '1.2787362000000',
      longitude: '103.8023471841300',
      metaData: null,
      pincode: 119578,
    },
    {
      address: 'Safar punggol',
      city: 'Singapore',
      clientId: null,
      id: 21,
      landmark: '9 Sentul Cres, Singapore',
      latitude: '1.4098386882454',
      longitude: '103.9053146465600',
      metaData: null,
      pincode: 828654,
    },
  ],
  clientId: null,
  clientIds: [],
  defaultAddress: {
    address: 'HortPark',
    city: 'Singapore',
    clientId: null,
    id: 6,
    landmark: 'Alexandra Road',
    latitude: '1.2787362000000',
    longitude: '103.8023471841300',
    metaData: null,
    pincode: 119578,
  },
  emails: [
    {
      email: 'vageesha@zopnow.com',
      id: 24,
      status: 'NEW',
    },
  ],
  id: 25,
  image:
    'https://www.gravatar.com/avatar/97317c71e4887f3d5203e4574f8c8b04?d=https://ui-avatars.com/api/name=Vageesha+B+R',
  isRegistered: true,
  joinedOn: '2019-01-08',
  joinedTime: '2019-01-08 13:00:48',
  lastLoginTime: '2019-01-24 18:40:03',
  lastOrderedOn: '2019-01-15 14:25:46',
  metaData: {
    Gender: 'Male',
    'JWC Member': false,
    'Marital Status': 'Unmarried',
    NRIC: '',
  },
  name: 'Vageesha B R',
  phones: [
    {
      id: 25,
      phone: '+918971469589',
      status: 'VERIFIED',
    },
  ],
  totalAmount: '74.80',
  totalOrders: 8,
  updatedAt: '2019-01-24 18:40:03',
}

export const filterDummyData = {
  Brands: [
    { label: 'A jemina', checked: false, group: 'Brands' },
    { label: 'A/Nat Bake', checked: false, group: 'Brands' },
    { label: 'Absolute Organic', checked: false, group: 'Brands' },
    { label: 'Adams', checked: false, group: 'Brands' },
  ],
  Price: [
    { label: '< $3', checked: false, group: 'Price' },
    { label: '$3 - $5', checked: false, group: 'Price' },
  ],
  Dieatry: [
    { label: 'Organic', checked: false, group: 'Dieatry' },
    { label: 'Halal', checked: false, group: 'Dieatry' },
    { label: 'Vegetarian', checked: false, group: 'Dieatry' },
  ],
  Country: [
    { label: 'Australia', checked: false, group: 'Country' },
    { label: 'Singapore', checked: false, group: 'Country' },
  ],
}

export const sortDummyData = [
  'Relevancy',
  'Newest',
  'Top rated',
  'Price: Low to high',
  'Price: High to low',
  'Brand A-Z',
  'Brand Z-A',
]
export const brandDummyData = {
  B: [
    {
      clientId: null,
      description: null,
      id: 2512,
      image: null,
      logo: null,
      name: 'BCOINTREAU',
      productsCount: 1,
      slug: 'cointreau',
      status: 'ENABLED',
    },
  ],
  A: [
    {
      clientId: null,
      description: null,
      id: 2513,
      image: null,
      logo: null,
      name: 'ALAMARCA',
      productsCount: 1,
      slug: 'lamarca',
      status: 'ENABLED',
    },
  ],
  C: [
    {
      clientId: null,
      description: null,
      id: 2511,
      image: null,
      logo: null,
      name: 'CHOSPICARE',
      productsCount: 1,
      slug: 'hospicare',
      status: 'ENABLED',
    },
  ],
  D: [
    {
      clientId: null,
      description: null,
      id: 2510,
      image: null,
      logo: null,
      name: 'DAURORA',
      productsCount: 1,
      slug: 'aurora',
      status: 'ENABLED',
    },
  ],
  E: [
    {
      clientId: null,
      description: null,
      id: 2509,
      image: null,
      logo: null,
      name: 'EZOUT',
      productsCount: 1,
      slug: 'zout',
      status: 'ENABLED',
    },
  ],
  F: [
    {
      clientId: null,
      description: null,
      id: 2508,
      image: null,
      logo: null,
      name: 'FPARAGOLD',
      productsCount: 1,
      slug: 'paragold',
      status: 'ENABLED',
    },
  ],
  G: [
    {
      clientId: null,
      description: null,
      id: 2507,
      image: null,
      logo: null,
      name: 'GSIMPLY FINEST',
      productsCount: 1,
      slug: 'simply-finest',
      status: 'ENABLED',
    },
  ],
  H: [
    {
      clientId: null,
      description: null,
      id: 2506,
      image: null,
      logo: null,
      name: 'HNISHIKI',
      productsCount: 1,
      slug: 'nishiki',
      status: 'ENABLED',
    },
  ],
  I: [
    {
      clientId: null,
      description: null,
      id: 2505,
      image: null,
      logo: null,
      name: "ICARTE D'OR",
      productsCount: 1,
      slug: 'carte-dor',
      status: 'ENABLED',
    },
  ],
  J: [
    {
      clientId: null,
      description: null,
      id: 2504,
      image: null,
      logo: null,
      name: 'JFULLERS',
      productsCount: 1,
      slug: 'fullers',
      status: 'ENABLED',
    },
  ],
  K: [
    {
      clientId: null,
      description: null,
      id: 2503,
      image: null,
      logo: null,
      name: 'KDIAL',
      productsCount: 1,
      slug: 'dial',
      status: 'ENABLED',
    },
  ],
  L: [
    {
      clientId: null,
      description: null,
      id: 2502,
      image: null,
      logo: null,
      name: 'LUNA & LARRY',
      productsCount: 1,
      slug: 'luna-larry',
      status: 'ENABLED',
    },
  ],
  M: [
    {
      clientId: null,
      description: null,
      id: 2501,
      image: null,
      logo: null,
      name: 'MBRITER',
      productsCount: 1,
      slug: 'briter',
      status: 'ENABLED',
    },
  ],
  N: [
    {
      clientId: null,
      description: null,
      id: 2500,
      image: null,
      logo: null,
      name: 'NATURASYNC',
      productsCount: 1,
      slug: 'naturasync',
      status: 'ENABLED',
    },
  ],
  O: [
    {
      clientId: null,
      description: null,
      id: 2499,
      image: null,
      logo: null,
      name: "OBIRD'S",
      productsCount: 1,
      slug: 'birds',
      status: 'ENABLED',
    },
  ],
  P: [
    {
      clientId: null,
      description: null,
      id: 2498,
      image: null,
      logo: null,
      name: 'PCJ FRSHWAY',
      productsCount: 1,
      slug: 'cj-frshway',
      status: 'ENABLED',
    },
  ],
  Q: [
    {
      clientId: null,
      description: null,
      id: 2497,
      image: null,
      logo: null,
      name: 'QBORMIOLI',
      productsCount: 1,
      slug: 'bormioli',
      status: 'ENABLED',
    },
  ],
  R: [
    {
      clientId: null,
      description: null,
      id: 2496,
      image: null,
      logo: null,
      name: 'RG/THUNDER',
      productsCount: 1,
      slug: 'gthunder',
      status: 'ENABLED',
    },
  ],
  S: [
    {
      clientId: null,
      description: null,
      id: 2495,
      image: null,
      logo: null,
      name: 'SOLIVE GOLD',
      productsCount: 1,
      slug: 'olive-gold',
      status: 'ENABLED',
    },
  ],
  T: [
    {
      clientId: null,
      description: null,
      id: 2494,
      image: null,
      logo: null,
      name: 'TGREATWALL',
      productsCount: 1,
      slug: 'greatwall',
      status: 'ENABLED',
    },
  ],
  U: [
    {
      clientId: null,
      description: null,
      id: 2493,
      image: null,
      logo: null,
      name: 'UPMK',
      productsCount: 1,
      slug: 'pmk',
      status: 'ENABLED',
    },
  ],
  V: [
    {
      clientId: null,
      description: null,
      id: 2492,
      image: null,
      logo: null,
      name: 'VSALONSIP',
      productsCount: 1,
      slug: 'salonsip',
      status: 'ENABLED',
    },
  ],
  W: [
    {
      clientId: null,
      description: null,
      id: 2491,
      image: null,
      logo: null,
      name: 'WDOT DESIGN',
      productsCount: 1,
      slug: 'dot-design',
      status: 'ENABLED',
    },
  ],
  X: [
    {
      clientId: null,
      description: null,
      id: 2490,
      image: null,
      logo: null,
      name: 'XROBITUSSIN',
      productsCount: 1,
      slug: 'robitussin',
      status: 'ENABLED',
    },
  ],
  Y: [
    {
      clientId: null,
      description: null,
      id: 2489,
      image: null,
      logo: null,
      name: "YFRITZ'S",
      productsCount: 1,
      slug: 'fritzs',
      status: 'ENABLED',
    },
  ],
  Z: [
    {
      clientId: null,
      description: null,
      id: 2488,
      image: null,
      logo: null,
      name: 'ZDOUBLE PRAWN',
      productsCount: 1,
      slug: 'double-prawn',
      status: 'ENABLED',
    },
  ],
  '#': [],
}

export const storeDummyData = {
  Zone: [
    { label: 'North', checked: false, group: 'Zone' },
    { label: 'South', checked: false, group: 'Zone' },
    { label: 'East', checked: false, group: 'Zone' },
    { label: 'West', checked: false, group: 'Zone' },
    { label: 'Central', checked: false, group: 'Zone' },
  ],
  'Store type': [
    { label: 'FairPrice', checked: false, group: 'Store type' },
    { label: 'FairPrice Finest', checked: false, group: 'Store type' },
    { label: 'FairPrice Shop', checked: false, group: 'Store type' },
    { label: 'FairPrice Xtra', checked: false, group: 'Store type' },
    { label: 'FairPrice Club', checked: false, group: 'Store type' },
  ],
  'Service type': [
    { label: 'Click & Collect', checked: false, group: 'Dieatry' },
    { label: 'Scan & Go', checked: false, group: 'Dieatry' },
  ],
}
