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
    Smartphone,
    Armchair,
    Bath,
    Coffee,
    TreePine,
    Gamepad2,
    Music,
    CakeSlice,
    Baby,
    CarFront,
    Scissors
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

        // New icons
        case 'armchair': return <Armchair {...props} />;
        case 'bath': return <Bath {...props} />;
        case 'coffee': return <Coffee {...props} />;
        case 'tree-pine': return <TreePine {...props} />;
        case 'gamepad-2': return <Gamepad2 {...props} />;
        case 'music': return <Music {...props} />;
        case 'cake-slice': return <CakeSlice {...props} />;
        case 'baby': return <Baby {...props} />;
        case 'car': return <CarFront {...props} />;
        case 'scissors': return <Scissors {...props} />;

        default: return <Star {...props} />;
    }
}
