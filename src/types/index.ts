export interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface PhotoCard {
  id: number;
  title: string;
  description: string;
  imageClass: string;
}

export interface BotMessage {
  text: string;
  timestamp: Date;
  isUser: boolean;
}

export interface Command {
  name: string;
  description: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  url: string;
}