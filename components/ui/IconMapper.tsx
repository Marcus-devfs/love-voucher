import {
    CloudSun,
    Sparkles,
    ShoppingBag,
    Moon,
    Utensils,
    Heart,
    Hand,
    Film,

    Gift,
    Star,
    LucideProps,
    Smartphone
} from "lucide-react";

interface IconMapperProps extends LucideProps {
    name: string;
}

export function IconMapper({ name, ...props }: IconMapperProps) {
    switch (name) {
        case 'cloud-sun': return <CloudSun {...props} />;
        case 'sparkles': return <Sparkles {...props} />;
        case 'shopping-bag': return <ShoppingBag {...props} />;
        case 'moon': return <Moon {...props} />;
        case 'utensils': return <Utensils {...props} />;
        case 'heart': return <Heart {...props} />;
        case 'hand': return <Hand {...props} />;
        case 'film': return <Film {...props} />;
        case 'smartphone-off': return <Smartphone {...props} />;
        case 'gift': return <Gift {...props} />;
        case 'star': return <Star {...props} />;
        default: return <Star {...props} />;
    }
}
