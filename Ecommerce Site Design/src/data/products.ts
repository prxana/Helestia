import { Product } from '../context/CartContext';
import duniaImage from 'figma:asset/97bfb85ebbc1083a204bf7a697b9c07f41ef39f8.png';
import duniaHoverImage from 'figma:asset/e06f7270093bc3cdc2f7fb30057b10893adbcbb6.png';
import rayaImage from 'figma:asset/f43a98b6b8b30c488104d2263fa451d10838dbbc.png';
import rayaHoverImage from 'figma:asset/3fd651f0570d14082ada5bf32b7c4e43202b06c2.png';
import etaliaImage from 'figma:asset/77ce72ce162ccb82eacc57b1f95c2ff08c092e50.png';
import etaliaHoverImage from 'figma:asset/e4989795b2cbdc89f02c21b355c21396a7a3af6f.png';

export const products: Product[] = [
  {
    id: '1',
    name: 'Collection Dunia',
    price: 75,
    image: duniaImage,
    hoverImage: duniaHoverImage,
    description: 'Toile horloge élégante avec motifs floraux texturés en relief. La collection Dunia incarne la délicatesse et le raffinement avec ses sculptures organiques qui ornent les coins de la toile. Les aiguilles dorées contrastent harmonieusement avec le fond beige crème, créant une pièce intemporelle qui sublime votre intérieur.',
    texture: 'Relief floral sculpté',
    dimensions: '50 x 60 cm'
  },
  {
    id: '2',
    name: 'Collection Raya',
    price: 75,
    image: rayaImage,
    hoverImage: rayaHoverImage,
    description: 'Toile horloge sophistiquée avec lignes ondulées texturées en relief. La collection Raya évoque le mouvement fluide des vagues avec ses motifs organiques sculptés qui créent un jeu d\'ombres et de lumière. Les aiguilles dorées apportent une touche d\'élégance à ce design contemporain et apaisant.',
    texture: 'Relief lignes ondulées',
    dimensions: '50 x 60 cm'
  },
  {
    id: '3',
    name: 'Collection Etalia',
    price: 75,
    image: etaliaImage,
    hoverImage: etaliaHoverImage,
    description: 'Toile horloge minimaliste avec textures sophistiquées et finitions artisanales. La collection Etalia incarne l\'élégance intemporelle avec ses reliefs subtils qui capturent la lumière. Design épuré et raffiné pour un intérieur contemporain.',
    texture: 'Texture minimaliste raffinée',
    dimensions: '50 x 60 cm'
  }
];