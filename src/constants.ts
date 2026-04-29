import { Model3D } from './types';

export const MOCK_MODELS: Model3D[] = [
  {
    id: '1',
    title: 'X-9000 Cyber Helmet',
    price: 149.00,
    weight: 150,
    category: 'Prop',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    videoPreview: 'https://cdn.pixabay.com/video/2020/09/14/49646-459207018_tiny.mp4',
    creator: 'NeoForge Studios',
    stats: {
      polyCount: '45,800',
      textures: '4K PBR',
      rigged: false,
      animated: false,
      uvMapped: true,
    },
    formats: ['FBX', 'OBJ', 'BLEND'],
    description: 'High-fidelity tactical helmet designed for futuristic combat simulations.',
    rating: 4.9,
    reviews: 128
  },
  {
    id: '2',
    title: 'Sentinel MK-II Mecha',
    price: 599.00,
    weight: 850,
    category: 'Character',
    thumbnail: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop',
    videoPreview: 'https://cdn.pixabay.com/video/2022/10/18/135398-762147137_tiny.mp4',
    creator: 'Apex Robotics',
    stats: {
      polyCount: '280,000',
      textures: '8K PBR',
      rigged: true,
      animated: true,
      uvMapped: true,
    },
    formats: ['FBX', 'GLB', 'MA'],
    description: 'A fully rigged and animated AAA-quality mecha unit.',
    rating: 5.0,
    reviews: 84
  },
  {
    id: '3',
    title: 'Red Neon Katana',
    price: 89.00,
    weight: 120,
    category: 'Weapon',
    thumbnail: 'https://images.unsplash.com/photo-1595152230461-85018133b0a1?q=80&w=1000&auto=format&fit=crop',
    videoPreview: 'https://cdn.pixabay.com/video/2020/04/05/35760-408157776_tiny.mp4',
    creator: 'CyberEdge Labs',
    stats: {
      polyCount: '12,500',
      textures: '2K PBR',
      rigged: false,
      animated: false,
      uvMapped: true,
    },
    formats: ['FBX', 'OBJ', 'BLEND'],
    description: 'Stylized glowing katana with custom shader support.',
    rating: 4.8,
    reviews: 210
  }
];
