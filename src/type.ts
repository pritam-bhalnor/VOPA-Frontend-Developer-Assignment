export type Images = {
    sm: string;
    md: string;
    lg: string;
    thumbnail: string;
}

export type StrapiImages = {
    url: string;
    caption?: string;
    alternativeText?: string;
    formats: {
        small: {
            url: string;
            name: string;
        };
        large: {
            url: string;
            name: string;
        };
        medium: {
            url: string;
            name: string;
        };
        thumbnail: {
            url: string;
            name: string;
        };
    };
}

export type Service = {
    id: number;
    image: Images;
    price?: string;
    name: string;
    shortDescription?: string;
    detailedDescription?: string;
    includedServices?: string[];
}


export type HeroContent = {
    heading: string;
    description: string;
    backgroundImage: Images;
}

export type ContactInfo = {
    phone: string,
    mail: string,
    instagram?: string;
    facebook?: string;
    address?: string;
    whatsapp?: string;
    youtube?: string;
}