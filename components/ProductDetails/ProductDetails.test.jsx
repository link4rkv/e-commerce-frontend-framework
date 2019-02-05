import React from 'react'
import { render } from 'react-testing-library'
import ProductDetails from './ProductDetails'
import { ProductDetails as data } from '../../mocks'

let dummyData = data()

it('should render a product', () => {
  const { getByText, getByAltText, getByTitle } = render(
    <ProductDetails data={dummyData} />
  )

  expect(getByText('Description')).toBeInTheDocument()
  expect(
    getByText(
      '• Scientifically formulated by Mead Johnson Nutrition with 17mg DHA and 34mg ARA'
    )
  ).toBeInTheDocument()
  expect(getByText(/•/)).toBeInTheDocument()
  expect(getByText(/Scientifically/)).toBeInTheDocument()

  expect(getByTitle('Description')).toBeInTheDocument()
  expect(getByText('Similar Product')).toBeInTheDocument()
  expect(getByAltText('Product-image')).toBeInTheDocument()
})

let userDefinedDummyData = data({
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
              name: 'Testing product name',
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
})

it('should render a product with userdeined data', () => {
  const { getByText } = render(<ProductDetails data={userDefinedDummyData} />)

  expect(getByText('Testing product name')).toBeInTheDocument()
  expect(getByText(/\$/)).toBeInTheDocument()
  expect(
    getByText(
      '• Scientifically formulated by Mead Johnson Nutrition with 17mg DHA and 34mg ARA'
    )
  ).toBeInTheDocument()
  expect(getByText(/•/)).toBeInTheDocument()
  expect(getByText(/Scientifically/)).toBeInTheDocument()
})
