export type Review = {
  name: string
  title: string
  rating: number
  review: string
}

export const reviews: Review[] = [
  {
    name: 'Michael B.',
    title: 'Property Owner',
    rating: 5,
    review:
      'Jerome has done an amazing job on my rental properties. I highly recommend JBTradesmenLLC for remodels and repairs. We are lucky to have them taking care of our properties.',
  },
  {
    name: 'Sabrina J.',
    title: 'Property Owner',
    rating: 5,
    review:
      'Jerome was easy to work with and never cut corners. The stair railings looked great, the electrical work was completed quickly, and everything was done with quality craftsmanship.',
  },
  {
    name: 'Eric K.',
    title: 'Commercial Client',
    rating: 5,
    review: 'Jerome has been amazing to work with. Highly recommend!',
  },
  {
    name: 'Clayton B.',
    title: 'Residential Client',
    rating: 5,
    review:
      'Honest, fair, and great to work with. JBTradesmenLLC delivers quality workmanship and excellent customer service.',
  },
  {
    name: 'Todd V.',
    title: 'Homeowner',
    rating: 5,
    review:
      'The project was completed much faster than expected. Excellent communication, quality work, and outstanding customer service.',
  },
]
