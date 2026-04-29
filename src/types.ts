
export interface Model3D {
  id: string;
  title: string;
  price: number;
  weight: number; // in grams
  category: 'Character' | 'Environment' | 'Vehicle' | 'Prop' | 'Weapon';
  thumbnail: string;
  videoPreview: string;
  creator: string;
  stats: {
    polyCount: string;
    textures: string;
    rigged: boolean;
    animated: boolean;
    uvMapped: boolean;
  };
  formats: string[];
  description: string;
  rating: number;
  reviews: number;
  isHero?: boolean;
}

export interface CartItem {
  model: Model3D;
  quantity: number;
  selectedMaterial?: string;
  materialPrice?: number;
}
