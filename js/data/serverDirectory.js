/**
 * Modular Community Directory configuration (per AGY.md Section 5 & Section 8).
 * Adding a new community only requires appending an entry to `communities`.
 * Only administrator-verified facts are included—no invented IPs, populations,
 * capacities, or unofficial download URLs.
 */
export const communities = [
  {
    id: 'islelink',
    name: 'IsleLink',
    discord: 'https://discord.gg/islelink',
    website: null,
    companionApp: null,
    ageRestriction: '18+',
    accessNotice: 'Adults only',
    region: null,
    description: {
      en: 'Official IsleLink community hub. All verified community information and announcements are provided through the official Discord server.',
      ms: 'Hab komuniti rasmi IsleLink. Semua maklumat komuniti yang disahkan dan pengumuman disediakan melalui pelayan Discord rasmi.',
      kl: 'Port komuniti rasmi IsleLink. Semua info sahih dengan pengumuman memang ada kat Discord rasmi diaorang je.'
    },
    verificationNote: {
      en: 'Official Discord is the primary information source. No separate website or companion app download is offered here.',
      ms: 'Discord rasmi ialah sumber maklumat utama. Tiada laman web berasingan atau muat turun aplikasi pendamping ditawarkan di sini.',
      kl: 'Discord rasmi je sumber info utama. Takde website lain atau download companion app kat sini.'
    }
  },
  {
    id: 'obsidian-isle',
    name: 'Obsidian Isle',
    discord: 'https://discord.gg/4CKwnyJ72C',
    website: null,
    companionApp: 'Distributed through Discord',
    ageRestriction: null,
    accessNotice: null,
    region: null,
    description: {
      en: 'Obsidian Isle community for The Isle: Evrima. Server rules, announcements, and the companion application are published by administrators on the official Discord.',
      ms: 'Komuniti Obsidian Isle untuk The Isle: Evrima. Peraturan pelayan, pengumuman, dan aplikasi pendamping diterbitkan oleh pentadbir di Discord rasmi.',
      kl: 'Komuniti Obsidian Isle untuk The Isle: Evrima. Rules server, announcement, dengan companion app semua admin letak kat Discord rasmi diaorang.'
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
  }
];
