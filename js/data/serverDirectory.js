/**
 * Modular Community Directory configuration (per AGY.md Section 5 & Section 8).
 * Only administrator-verified facts & user-verified links are included.
 */
export const communities = [
  {
    id: 'islelink',
    name: 'IsleLink',
    discord: 'https://discord.gg/islelink',
    website: 'https://islelink.gg',
    companionApp: 'Official IsleLink Companion App',
    companionUrl: 'https://islelink.gg/download',
    ageRestriction: '18+',
    accessNotice: 'Adults only',
    region: null,
    description: {
      en: 'Main Primeval Malaysia server partner & IsleLink community hub. Announcements, rules, and verified Discord portals are maintained for adults 18+, alongside the official IsleLink companion download.',
      ms: 'Rakan pelayan utama Primeval Malaysia & hab komuniti IsleLink. Pengumuman, peraturan, dan portal Discord sahih diselenggara untuk dewasa 18+, bersama muat turun rasmi aplikasi pendamping IsleLink.',
      kl: 'Antara server main Primeval Malaysia dengan port komuniti IsleLink. Rules, announcement, dan Discord sahih untuk 18+ disediakan, termasuk link rasmi download companion app IsleLink.'
    },
    verificationNote: {
      en: 'Official Discord & Official Companion Download (islelink.gg/download). Strictly 18+ adults-only community.',
      ms: 'Discord Rasmi & Muat Turun Aplikasi Pendamping Rasmi (islelink.gg/download). Komuniti dewasa 18+ sahaja.',
      kl: 'Discord Rasmi & Download Companion App Sahih (islelink.gg/download). Khas untuk komuniti dewasa 18+ sahaja.'
    }
  },
  {
    id: 'obsidian-isle',
    name: 'Obsidian Isle',
    discord: 'https://discord.gg/4CKwnyJ72C',
    website: null,
    companionApp: 'Distributed through Discord',
    companionUrl: null,
    ageRestriction: null,
    accessNotice: null,
    region: null,
    description: {
      en: 'Main Primeval Malaysia server hub for The Isle: Evrima. Server rules, announcements, and the Obsidian companion application are published by administrators inside the official Discord.',
      ms: 'Salah satu pelayan utama Primeval Malaysia untuk The Isle: Evrima. Peraturan pelayan, pengumuman, dan aplikasi pendamping diterbitkan oleh pentadbir di dalam Discord rasmi.',
      kl: 'Antara server main Primeval Malaysia untuk The Isle: Evrima. Rules server, announcement, dengan companion app semua admin post terus dalam Discord rasmi.'
    },
    companionInstructions: {
      en: [
        'Open the official community Discord.',
        'Review community announcements.',
        'Locate the companion application download published by administrators.',
        'Follow the published installation instructions.',
        'Review server rules and connection requirements.'
      ],
      ms: [
        'Buka Discord rasmi komuniti.',
        'Semak pengumuman komuniti.',
        'Cari muat turun aplikasi pendamping yang diterbitkan oleh pentadbir.',
        'Ikuti arahan pemasangan yang diterbitkan.',
        'Semak peraturan pelayan dan keperluan sambungan.'
      ],
      kl: [
        'Buka Discord rasmi komuniti.',
        'Check dulu bahagian announcement komuniti.',
        'Cari link download companion app yang admin sendiri post.',
        'Ikut step install yang admin dah tulis.',
        'Baca rules server dengan syarat nak masuk server.'
      ]
    }
  },
  {
    id: 'noctua-isle',
    name: 'Noctua Isle',
    discord: 'https://discord.gg/Z2NAfTgNVv',
    website: null,
    companionApp: null,
    companionUrl: null,
    ageRestriction: null,
    accessNotice: null,
    region: null,
    description: {
      en: 'Noctua Isle community Discord server for The Isle: Evrima players seeking structured packs, server announcements, and event coordination.',
      ms: 'Pelayan Discord komuniti Noctua Isle untuk pemain The Isle: Evrima yang mencari kumpulan, pengumuman pelayan, dan acara komuniti.',
      kl: 'Server Discord komuniti Noctua Isle untuk player The Isle: Evrima cari geng pack, check announcement server, dengan event komuniti.'
    },
    verificationNote: {
      en: 'Join the official Noctua Isle Discord for server rules, active events, and player channels.',
      ms: 'Sertai Discord rasmi Noctua Isle untuk peraturan pelayan, acara aktif, dan saluran pemain.',
      kl: 'Join Discord rasmi Noctua Isle untuk tengok rules server, event aktif, dengan channel lepak.'
    }
  },
  {
    id: 'dino-den',
    name: 'Dino Den',
    discord: 'https://discord.gg/thedinoden',
    website: 'https://dinoden.gg',
    companionApp: null,
    companionUrl: null,
    ageRestriction: null,
    accessNotice: null,
    region: null,
    description: {
      en: 'The Dino Den community portal for The Isle: Evrima—connect with active herds/packs, review community guidelines, and coordinate hunts on Discord.',
      ms: 'Portal komuniti The Dino Den untuk The Isle: Evrima—sertai kawanan aktif, semak garis panduan komuniti, dan rancang pemburuan di Discord.',
      kl: 'Port komuniti The Dino Den untuk The Isle: Evrima—cari geng pack/herd aktif, baca guideline komuniti, dan rancang hunt kat Discord.'
    },
    verificationNote: {
      en: 'Check dinoden.gg or the official Discord for verified server updates and community rules.',
      ms: 'Semak dinoden.gg atau Discord rasmi untuk maklumat pelayan sahih dan peraturan komuniti.',
      kl: 'Check dinoden.gg atau Discord rasmi untuk info server sahih dengan rules komuniti.'
    }
  }
];
