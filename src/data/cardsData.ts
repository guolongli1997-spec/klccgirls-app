import { PhotoCard } from '@/types';

export const photoCards: PhotoCard[] = [
  { id: 1, title: 'Pixel Quest', description: 'Retro adventure with full-screen support.', imageClass: 'img-1' },
  { id: 2, title: 'Maze Runner', description: 'Navigate mazes with motion controls.', imageClass: 'img-2' },
  { id: 3, title: 'Star Duel', description: '1v1 duels in space. New gestures!', imageClass: 'img-3' },
  { id: 4, title: 'Gem Hunter', description: 'Collect gems in immersive landscapes.', imageClass: 'img-4' },
  { id: 5, title: 'Sky Racer', description: 'High-speed racing with device tilt.', imageClass: 'img-5' },
  { id: 6, title: 'Aqua Blast', description: 'Underwater shooter with 3D audio.', imageClass: 'img-6' },
  { id: 7, title: 'Fury Fight', description: "Beat 'em up with VR-like tracking.", imageClass: 'img-7' },
  { id: 8, title: 'Mystic Woods', description: 'Explore enchanted forests in 4K.', imageClass: 'img-8' },
  { id: 9, title: 'Cyber Sprint', description: 'Cybernetic runner with leaderboards.', imageClass: 'img-9' },
  { id: 10, title: 'Shadow Clash', description: 'Shadow stealth & action.', imageClass: 'img-10' },
  { id: 11, title: 'Neon Drift', description: 'Neon racing with dynamic obstacles.', imageClass: 'img-11' },
  { id: 12, title: 'Crystal Cave', description: 'Puzzle & platformer in crystal caves.', imageClass: 'img-12' },
  { id: 13, title: 'Iron Forge', description: 'Build & battle with metal giants.', imageClass: 'img-13' },
  { id: 14, title: 'Eclipse War', description: 'Sci-fi war with real-time strategy.', imageClass: 'img-14' },
  { id: 15, title: 'Storm Chaser', description: 'Weather-based survival game.', imageClass: 'img-15' },
  { id: 16, title: 'Lunar Trek', description: 'Moon base exploration & mining.', imageClass: 'img-16' },
  { id: 17, title: 'Vortex Arena', description: 'Arena brawler with unique heroes.', imageClass: 'img-17' },
  { id: 18, title: 'Phantom Ops', description: 'Tactical shooter with squad commands.', imageClass: 'img-18' },
  { id: 19, title: 'Rogue Deck', description: 'Card battler with endless combos.', imageClass: 'img-19' },
  { id: 20, title: 'Zen Garden', description: 'Relaxing garden with mini games.', imageClass: 'img-20' },
];

export const slideImages = [
  {
    id: 1,
    image: 'https://picsum.photos/id/1015/1200/600',
    title: '🚀 Mini Apps 2.0 Launch',
    description: 'The largest update in mini apps history.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/1018/1200/600',
    title: '🌍 Full-Screen & Geolocation',
    description: 'Immersive experiences with full-screen and location.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/1020/1200/600',
    title: '🎮 Device Motion Tracking',
    description: 'Control games with device motion.',
  },
  {
    id: 4,
    image: 'https://picsum.photos/id/1024/1200/600',
    title: '🏠 Home Screen Shortcuts',
    description: 'Access your favorite apps in one tap.',
  },
  {
    id: 5,
    image: 'https://picsum.photos/id/1035/1200/600',
    title: '✨ 10+ New Features',
    description: 'Gifts, emoji status, subscriptions and more.',
  },
];

export const commands: Command[] = [
  { name: '/start', description: 'Welcome message' },
  { name: '/help', description: 'Show available commands' },
  { name: '/channel', description: 'Get channel invite' },
  { name: '/about', description: 'About this service' },
  { name: '/status', description: 'Check bot status' },
  { name: '/ai [question]', description: 'Ask AI assistant' },
];