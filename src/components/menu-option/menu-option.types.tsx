export interface MenuOptionProps {
  title: string;
  description: string;
  id: number;
  price: number;
  imgSrc: string | undefined;
  isPopoverOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
