export interface Product {
  id: string;
  sku: string;
  title: string;
  category: 'Occasionwear' | 'Everyday' | 'Floral' | 'Party';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'New' | 'Trending' | 'Atelier Drop' | 'Limited Piece' | 'Essential';
  imageUrl: string;
  additionalImages?: string[];
  colors: { name: string; hex: string }[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  description: string;
  fabric: string;
  inStock: boolean;
  stockCount: number;
  dateAdded: string;
  isMostLoved?: boolean;
  isJustArrived?: boolean;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'lavender-evening-dress',
    sku: 'VM-EVN-091',
    title: 'Lavender Evening Dress',
    category: 'Occasionwear',
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviewCount: 38,
    badge: 'Bestseller',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0krDZxU0HVzXoVwtOTRKnKoAEni-Rs7SMdbcwgsnaGBm87vuTHWgHTZK9wA0sJKkJIYvf2pCmxUH-RgcxvJ1B4WnwOuoWgo5jyUeWcCW8SaHiXLvv-tFIz98WTb4SiLPzUkxOyTi2GG45VRxwPLhjyXFxVQfmuZEp5MAyq83IxqhuTGcsEi3Vah86aHDzYfbvvQixaGNTeHGROUgq0W_u5vG6yVCshHsZZpAPVIR1Yoqh7GEkJ9Up',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0krDZxU0HVzXoVwtOTRKnKoAEni-Rs7SMdbcwgsnaGBm87vuTHWgHTZK9wA0sJKkJIYvf2pCmxUH-RgcxvJ1B4WnwOuoWgo5jyUeWcCW8SaHiXLvv-tFIz98WTb4SiLPzUkxOyTi2GG45VRxwPLhjyXFxVQfmuZEp5MAyq83IxqhuTGcsEi3Vah86aHDzYfbvvQixaGNTeHGROUgq0W_u5vG6yVCshHsZZpAPVIR1Yoqh7GEkJ9Up',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqnBELiYV5tNHJZZhNCfgtAsk_YJvODlMpIEzQm1-8ijaANNlQ7fPl-Wb_ZXJe9dn5FMPi4Fahchvlq4PxKA3_gCuY9MPb6SP1OVerUEacz-3py7mtazYN64JoyNa3IuiwPn7S64aV-f6K6zdfIMph5jScE4B2_Qeox4hvW2wbDKdRP0hxnzEnnLhhMf4rxdnGuGSAdkkhHF2OeuX0qE7OH6SrDiqjiQB0wJksI1MdLXHinyo2JzfR',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_LupJXH_hZ008HY_Ni8O5zaoofh3dX0BFaxqXQoU0SZxMm1-tFCc0qIlVUamZDcProaINW4G1XNy44ptpC4qC0PCmaI4tEexpPnu6Euc-0gMvzrfLLgz7Rd6uz0M5xuXplZ5kLcflpnTt1q9qQQeYKoXsXR_Os56i3J4aq3qoCTLdHxvyQpTD_GMd_J95HBPfyWL4uEZiCrK6vKFw8PqWCiFnBeBfha6_telFNahqxX6k9sy0FKGp',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOj-kXZ_8m3VpU8nlqSEska9k3iCrL_BKnyh9a19aGoLeZx3F91qm288KhCP-mrBorDgZMgP0dTSamZ6I8T1LC97lO89leiPwSujsKK6of_tkitvuyIQPxNi9NnIpSOxTqQ8TJ4zO9l686QCRr3t9trRMOcp4gsyY2opFz47RRmEtO336hm1eF4Hjqw1kmqCyxxn5gbN_JwyRdWIKOgPw_OkVJDJzYNHBYxc4HoAZCP2AwpE81DAXL'
    ],
    colors: [
      { name: 'Royal Lavender', hex: '#744F8D' },
      { name: 'Soft Lilac', hex: '#E5B9FF' },
      { name: 'Plum Noir', hex: '#1F1925' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An ethereal floor-grazing silhouette crafted in luminous lavender satin. Features a delicate cowl neckline, flattering bias cut that moves gracefully with every step, and adjustable criss-cross back straps.',
    fabric: '100% Mulberry Silk Satin with French seam finishing.',
    inStock: true,
    stockCount: 14,
    dateAdded: 'May 12, 2025',
    isMostLoved: true
  },
  {
    id: 'floral-midi-dress',
    sku: 'VM-FLR-202',
    title: 'Floral Midi Dress',
    category: 'Floral',
    price: 65,
    originalPrice: 85,
    rating: 4.8,
    reviewCount: 24,
    badge: 'New',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx4h1RdHroBQHwNCujIn4Y6UocgDtqAaSaD0ZshIHNLLeW1BRohmgTUBlAPDIAimCXgPnskZ_mVzpwukM1NWn1VqWGO2cyshDlq7j94DCXRPvn5Hlw0CzqCyrMlYyO5ZqPaC6ix_FWTm_z05DvVT1cepfwfsEZMoHYl7sfJ6DZpVCDo_3s7oNiTlQ6OvvYMwpJHsa-Iq3w-p1cjb4fxwDfitUKP9BQk7axPy-VGgX_Er4XCZxvDMOz',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiPrDKv58oA9Jzo51yJW2P3RJzEWo2vXdN7DulAJqtGebbDO8ggvlo9CPHIV9fVepN5UwX_hjrI2RP3feLG4DOZ2Vx4AZk_P_EtnqbdmS1yJW3NwSvMU6Ydq3XPLkVHo4kWWSWWuSvzIC49Kup5MnBjZn-HyUxIs5lv3Gx3Fc91f0-mnlAWwYZlwFYhgc078auHzoc7o4E5jSKMR-oV8h49OUteeFGVKG2ZGcCBy4wCRngc7qwUz-G'
    ],
    colors: [
      { name: 'Pale Blossom', hex: '#EADFEF' },
      { name: 'Amethyst Violet', hex: '#60378E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Romantic botanical prints dance across flowy georgette chiffon. Designed with gentle flutter sleeves, a smocked waistline, and an effortless tiered midi hem.',
    fabric: 'Georgette Silk & Eco-Chiffon with modal lining.',
    inStock: true,
    stockCount: 18,
    dateAdded: 'May 08, 2025',
    isMostLoved: true
  },
  {
    id: 'elegant-satin-dress',
    sku: 'VM-STN-303',
    title: 'Elegant Satin Dress',
    category: 'Party',
    price: 95,
    originalPrice: 135,
    rating: 5.0,
    reviewCount: 42,
    badge: 'Trending',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGpPza2EH63EtCY4XGPY5ZAQeeO7qLg22EENdKxLgRzqKp0YNkdPqu08gRt62P4VfcFcw9ekV_GwYh0lF8C0fGMyOYSOfaKWdmLUus4-jPBwcLMjeD2wybDbQMcBMyt0vJeSCHmbqNbU0PVTgFAkW6M5doVrUIviwHndqo3p6vYwfRSHKgNmBLavhOIGjjVzA50HKk3A_i5GbaIL_WCKYjokykyO06QxUjwoa9COZB6ep2g9UzE5dU',
    colors: [
      { name: 'Deep Violet', hex: '#563A71' },
      { name: 'Champagne Shimmer', hex: '#DBB8FF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Lustrous cocktail silhouette cut with precision tailoring. Delivers a dramatic yet poised asymmetric drape, side slit, and lustrous metallic sheen.',
    fabric: 'Heavy Silk Satin with stretch elastane backing.',
    inStock: true,
    stockCount: 8,
    dateAdded: 'Apr 28, 2025',
    isMostLoved: true
  },
  {
    id: 'everyday-linen-dress',
    sku: 'VM-LNN-314',
    title: 'Everyday Linen Dress',
    category: 'Everyday',
    price: 58,
    rating: 4.7,
    reviewCount: 19,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxwqkqUB2w9bOdp-kSAWXbXqOXnmPcH48j6kHA6acEJcvPpdOGlqaubSv7GumB0qRmMbkpA4dOk-T3QIRQTOCfJg02yTlxHRWvsvyyP5EVdiVTf4mNMLbKj6WUAr7148N9U_XadrOQxdNwymHLnuJlHeBMJWlIcj07eSH_08fY3ciAzjxLLjSCTIK-m3FTOuxxP5CxIM0GhW6jRKM2vnMKzZ7mXdmkiPYar_6hyDPN0tzVqfEd8nNH',
    colors: [
      { name: 'Oatmeal Lilac', hex: '#F0E4F5' },
      { name: 'Soft Slate', hex: '#4B4450' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Clean modern daywear crafted from breathable European linen. Tailored notch collar, self-tie belt, and seamless inset pockets for effortless day-to-night transitions.',
    fabric: '100% Normandy Washed Linen.',
    inStock: true,
    stockCount: 22,
    dateAdded: 'May 05, 2025',
    isMostLoved: true
  },
  {
    id: 'rose-print-wrap-dress',
    sku: 'VM-WRP-415',
    title: 'Rose Print Wrap Dress',
    category: 'Floral',
    price: 72,
    originalPrice: 98,
    rating: 4.8,
    reviewCount: 31,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6xuNueCqKN5K3inHlxLTM__UA_Yc5Bvus7NTR_S40SjlZTK5672oHJIh_8gT6dSI16u5fQvehGzBhTv_IRSQbqO93e4Np5dM8e1WVbdSPc-fwP_AkESJGxGaEhwEraVRA4wwKARXVhMalD80YV2bhBTiN9yEXAScUxO_s4cIJfuywDXuJJNssqhR_6Z7ojylpB08M7cnxGdtUx7QqVQJ2yeAMFxPLPQ9zCRGIPyRenvcIk0lxEJUK',
    colors: [
      { name: 'Muted Rose', hex: '#DBB9F9' },
      { name: 'Amethyst', hex: '#7950A8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Airy wrap silhouette featuring hand-drawn botanical rose motifs. Fluid cascading flounces, delicate ties, and flattering surplice neckline.',
    fabric: 'Lightweight Silk Crepe de Chine.',
    inStock: true,
    stockCount: 11,
    dateAdded: 'May 05, 2025',
    isMostLoved: true
  },
  {
    id: 'classic-black-dress',
    sku: 'VM-BLK-606',
    title: 'Classic Black Dress',
    category: 'Occasionwear',
    price: 79,
    rating: 4.9,
    reviewCount: 56,
    badge: 'Essential',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArTPU0n2GoxuwuOc03UqSnttaRbU6EPGo_uRNPwtYSnym4gKXGOLjM4OuCY8TBVJJ5tQ0s-UqQvG8cD9tGTTcZtTTKrBuG0Zp1mKKzZzAt3R4olfYy0yTwf8GCPr31ROOUd9QBZIs1PQwp4cLsoVb1B4hkLAPcs3tgo3mjAroNudRrZ46cuc753NEeQZlEHM8nHudkREkyJ193un23z_RSrmseLeKs4iXPtHjnjGqKHO0lj47eoPXW',
    colors: [
      { name: 'Noir Black', hex: '#1F1925' },
      { name: 'Velvet Midnight', hex: '#5B3773' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An architectural column dress with a sculptured square neckline and tailored back vent. Minimalist, modern, and enduring quiet luxury.',
    fabric: 'Double-face Italian Crepe with acetate lining.',
    inStock: true,
    stockCount: 16,
    dateAdded: 'Apr 20, 2025',
    isMostLoved: true
  },
  {
    id: 'amethyst-silk-slip-dress',
    sku: 'VM-SLK-104',
    title: 'Amethyst Silk Slip Dress',
    category: 'Party',
    price: 92,
    rating: 4.9,
    reviewCount: 27,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv1daqfgQrsIy-h7x3EP5vVPn7SORVOVypJDaGMw8T1wBL6KxWA5eQT2F1FVx0-0TemD9CpnFFo-Ow-XoMY7HMtmWq3JaKM8T5_RQNk3Ckl5Op1ZwJrqsm1X_ydrxujJSHU72HwQrWYdPzN_pB8iqx3Hly1zdZKz8rAsmyloXo3K0BwyL0ilOIHNvMg3jSdOKWR3SPbZPSAzKHWeUiHiPz-ymIPd1jVgm6FiAFowGEj0qTVKBj6YiA',
    colors: [
      { name: 'Amethyst', hex: '#60378E' },
      { name: 'Lilac Fog', hex: '#E5B9FF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Bias cut for liquid-like fluid movement that hugs contours with sublime grace. Slender spaghetti straps and subtle scooped back.',
    fabric: '100% Sandwashed Mulberry Silk.',
    inStock: true,
    stockCount: 3,
    dateAdded: 'May 10, 2025',
    isJustArrived: true
  },
  {
    id: 'lilac-tiered-ruffle-dress',
    sku: 'VM-RFL-707',
    title: 'Lilac Tiered Ruffle Dress',
    category: 'Everyday',
    price: 78,
    rating: 4.7,
    reviewCount: 18,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCknHQsvStTssuRqGt4cj9A6C1ZjTrdSaCkUJlNS6zfe1ddHgZb5StTPDsbhbu9lc6pdJAYpeUYEnXULaK455EG5BGfgc8TomaBj6Wcj-NyaCG6vW2ceueaeT_YDVWgzqal91FsDIFQ7VV8DzcqwapiCFsEmCq-KnhcgHwj2jZdrnFNVMLA6z-lc36ESMjFMCasM6ldDewX7Nu_MRQDiCaolkubbuwZtcfMyMvcF9HiKxrzAh5sDeeq',
    colors: [
      { name: 'Pale Lilac', hex: '#EADFEF' },
      { name: 'Soft Orchid', hex: '#C7A6E5' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Cascading tiers of soft organza and cotton voile give this romantic dress gentle volume. Perfect for garden parties and warm afternoon celebrations.',
    fabric: 'Silk-Cotton Voile with fine pleating.',
    inStock: true,
    stockCount: 9,
    dateAdded: 'May 08, 2025',
    isJustArrived: true
  },
  {
    id: 'plum-velvet-wrap-dress',
    sku: 'VM-VLV-501',
    title: 'Plum Velvet Wrap Dress',
    category: 'Occasionwear',
    price: 110,
    originalPrice: 150,
    rating: 5.0,
    reviewCount: 34,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0ZKMXnjZZghNEpVFaBZf0-Bac-sYu8DEwUx62M-loLWsAdNZJkqHpdVheeFhQ-1pjm-r3UtI2zyZwE6DCOWdYV0h4o5vvOVIaxv9TM3I_0ZzWZ2nF9t26l1IaKfhfZq7WVO5e9RJOj1YNnflSRiR1rn-81SA0YxMDmof-su4I205gQJ2qw4kg-v1v9iq9ivZ7VXIlcRXuSEsyVYdh0psRXh-N8FNqIcjJNhd_32VXFgXG1qCYrJcL',
    colors: [
      { name: 'Deep Plum', hex: '#47245F' },
      { name: 'Royal Violet', hex: '#60378E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A regal evening statement in rich stretch velvet. Features a kimono-style wrap front, sash tie, and deep jewel-tone lustre that catches evening chandelier lights.',
    fabric: 'Plush Silk Velvet with satin contrast piping.',
    inStock: true,
    stockCount: 1,
    dateAdded: 'May 01, 2025',
    isJustArrived: true
  },
  {
    id: 'pastel-peplum-dress',
    sku: 'VM-PPL-808',
    title: 'Pastel Peplum Dress',
    category: 'Everyday',
    price: 68,
    rating: 4.6,
    reviewCount: 15,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC9IzLBrlUFto2REBJAlz3cpkxsSiA9ZrMC28iDk8nh3oGOqiGfkFrF1feI07uB4-WZyjIBwI6QRsC9bt6YZHv3WbC2jmoCVK6_anShCDP7WUzCf1x7oDiMi84GCZjddpVw3A3LHP-qSZwj5jaTzseu-3Zq4Tcqz6xCh45TFGbI1ZLcCgRtjE_xXR-G4NaNwKu0z8UQCxE4gWLetWmELl3gmjr7UNuZfR9Z1tYzi5hpVo2RgbB8Pra',
    colors: [
      { name: 'Pastel Lilac', hex: '#EDE4F5' },
      { name: 'Wisteria', hex: '#7950A8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Crisp architectural peplum structure crafted in fine piqué cotton. Flattering fitted bodice and modern clean seams for daytime power dressing.',
    fabric: 'Structured Cotton Piqué with stretch lining.',
    inStock: true,
    stockCount: 12,
    dateAdded: 'Apr 25, 2025',
    isJustArrived: true
  },
  {
    id: 'atelier-violet-couture-gown',
    sku: 'VM-GOW-909',
    title: 'Atelier Violet Couture Gown',
    category: 'Occasionwear',
    price: 135,
    originalPrice: 180,
    rating: 5.0,
    reviewCount: 22,
    badge: 'Atelier Drop',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_LupJXH_hZ008HY_Ni8O5zaoofh3dX0BFaxqXQoU0SZxMm1-tFCc0qIlVUamZDcProaINW4G1XNy44ptpC4qC0PCmaI4tEexpPnu6Euc-0gMvzrfLLgz7Rd6uz0M5xuXplZ5kLcflpnTt1q9qQQeYKoXsXR_Os56i3J4aq3qoCTLdHxvyQpTD_GMd_J95HBPfyWL4uEZiCrK6vKFw8PqWCiFnBeBfha6_telFNahqxX6k9sy0FKGp',
    colors: [
      { name: 'Imperial Violet', hex: '#47245F' },
      { name: 'Royal Amethyst', hex: '#60378E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Floor-length gala masterpiece sculpted in cascading satin drapery. Features an architectural corseted bodice and graceful sweeping train.',
    fabric: 'Heavy Duchess Satin with inner boning.',
    inStock: true,
    stockCount: 4,
    dateAdded: 'Apr 18, 2025'
  },
  {
    id: 'metallic-shimmer-cocktail-dress',
    sku: 'VM-SHM-910',
    title: 'Metallic Shimmer Cocktail Dress',
    category: 'Party',
    price: 88,
    rating: 4.8,
    reviewCount: 29,
    badge: 'Limited Piece',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRZ_SNwTuX_Mu7DbAKYUuDOomL4y64W24I9eqwT4k7aSdcCEI48Du79EY1QyhaB8wjEKp7VRbwnPaioREfSUCuhcZyZbSqYKcrm2n-b95okoe3IxLPPYTAjIzTuyxnsKDxbd2sqIOezJLZx4fAW6ALNUL4D_V0l20qjWOuYmVsIIqTk3UWmVCwcatq-g5a8WrySkhuTODqRh3fbiRgtR80U-zcgzmH5e2AyYMbvLiak-Ub9Fgz7dgz',
    colors: [
      { name: 'Shimmer Amethyst', hex: '#7950A8' },
      { name: 'Smoky Silver', hex: '#CDC3D2' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'One-shoulder asymmetric micro cocktail silhouette with subtle metallic threads woven into soft jersey for incandescent evening radiance.',
    fabric: 'Lurex Metallic Blend with silk lining.',
    inStock: true,
    stockCount: 7,
    dateAdded: 'Apr 15, 2025'
  }
];

export const CATEGORIES = [
  {
    id: 'Everyday',
    title: 'Everyday Dresses',
    subtitle: 'Relaxed linen & cotton daytime looks',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDZNiQJxgZ7IHi3fPbdrnyrhCLsU8RPNCa5TmKG9wbY1_ctEHi040gFZOsvOnEYz0U1V3JQP8zjXok0V3sPdCIzJd0yyOZgPAxZyDBjUstz9oHUz9fRVcjRhKrOpWZFnXIhj3UiF79PfMpogpMEMj6AJcKo79EsEQk-lvXoGhad4pxJNmdkk83jOdx5np3D6nODB1RRDFitRfJmYwwGSlV4frOCoraZzkOwBtXNbDh6i1QjuGLszoz'
  },
  {
    id: 'Party',
    title: 'Party Dresses',
    subtitle: 'Cocktail silhouettes & metallic shimmer',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRZ_SNwTuX_Mu7DbAKYUuDOomL4y64W24I9eqwT4k7aSdcCEI48Du79EY1QyhaB8wjEKp7VRbwnPaioREfSUCuhcZyZbSqYKcrm2n-b95okoe3IxLPPYTAjIzTuyxnsKDxbd2sqIOezJLZx4fAW6ALNUL4D_V0l20qjWOuYmVsIIqTk3UWmVCwcatq-g5a8WrySkhuTODqRh3fbiRgtR80U-zcgzmH5e2AyYMbvLiak-Ub9Fgz7dgz'
  },
  {
    id: 'Occasionwear',
    title: 'Elegant Occasionwear',
    subtitle: 'Floor-length satin & evening gowns',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_LupJXH_hZ008HY_Ni8O5zaoofh3dX0BFaxqXQoU0SZxMm1-tFCc0qIlVUamZDcProaINW4G1XNy44ptpC4qC0PCmaI4tEexpPnu6Euc-0gMvzrfLLgz7Rd6uz0M5xuXplZ5kLcflpnTt1q9qQQeYKoXsXR_Os56i3J4aq3qoCTLdHxvyQpTD_GMd_J95HBPfyWL4uEZiCrK6vKFw8PqWCiFnBeBfha6_telFNahqxX6k9sy0FKGp'
  },
  {
    id: 'Floral',
    title: 'Floral Dresses',
    subtitle: 'Delicate botanical prints & flowy chiffon',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiPrDKv58oA9Jzo51yJW2P3RJzEWo2vXdN7DulAJqtGebbDO8ggvlo9CPHIV9fVepN5UwX_hjrI2RP3feLG4DOZ2Vx4AZk_P_EtnqbdmS1yJW3NwSvMU6Ydq3XPLkVHo4kWWSWWuSvzIC49Kup5MnBjZn-HyUxIs5lv3Gx3Fc91f0-mnlAWwYZlwFYhgc078auHzoc7o4E5jSKMR-oV8h49OUteeFGVKG2ZGcCBy4wCRngc7qwUz-G'
  }
];
