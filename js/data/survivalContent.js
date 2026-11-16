/**
 * Localized Station Guide profiles (for each station's named dinosaur guide)
 * and the 6-tab Survival Training Ground Field Manual (en, ms, kl).
 */

export const GUIDE_TRANSLATIONS = {
  en: {
    openStationBtn: (stationTitle) => `Open ${stationTitle}`,
    jumpToStationBtn: (stationTitle) => `Go to ${stationTitle}`,
    byeGuideBtn: (name) => `Thanks, ${name}!`,
    guides: {
      kift90: {
        role: 'Pteranodon • Station 01 Sky Scout & Welcome Guide',
        greeting:
          'Screee—welcome aboard the perch, survivor! I am kift90, scouting high above the Welcome Centre on Pteranodon wings. Check the Noticeboard beside me to review PC readiness, Evrima basics, and all 6 expedition stops before spreading your wings!',
        tips:
          'Station 01 Briefing (Welcome Centre):\n' +
          '• Inspect the Welcome Noticeboard beside me with [E] to read what Evrima offers and verify your PC specs.\n' +
          '• Pteranodon Pro Tip: Use upward air currents, conserve stamina on long glides over open cliffs, and never land low near water where Deinosuchus ambush!',
        hint: 'Press the button below to inspect the Welcome Centre Noticeboard directly, or fly on down the western trail later!'
      },
      kenzy: {
        role: 'Triceratops • Station 02 Heavy Steam & EAC Guardian',
        greeting:
          'Hold steady, hatchling! I am kenzy, standing guard here as Triceratops at the Steam & Easy Anti-Cheat Station. Before charging into Evrima servers, make sure your Steam branch and EAC files are armored tight!',
        tips:
          'Station 02 Briefing (Steam & EAC Terminal):\n' +
          '• Open the terminal monitor with [E] for the 10-step Steam Properties → Betas → "evrima" setup walkthrough.\n' +
          '• Check the EAC Verification tab so you never get kicked mid-combat due to missing Easy Anti-Cheat files.\n' +
          '• Trike Pro Tip: Herbivores thrive on timing and positioning—face predators head-on with horns ready and protect your flanks!',
        hint: 'Click below to launch the Steam & EAC Terminal right now, or press ESC to explore.'
      },
      apollo: {
        role: 'Maiasaura • Station 03 Community Herd Guide',
        greeting:
          'Hey there, herd-mate! I am apollo on Maiasaura lookout here at the Community Outpost. Surviving in The Isle is always better with a trustworthy herd—let us show you where the verified servers live!',
        tips:
          'Station 03 Briefing (Community Directory):\n' +
          '• Read the bulletin board with [E] to browse verified Discord communities (including IsleLink 18+ and Obsidian Isle).\n' +
          '• Always verify rules in the official server Discord before picking a spawn or joining pack/herd fights.\n' +
          '• Maia Pro Tip: Keep an ear out for approaching footsteps while browsing diets—awareness saves the whole herd!',
        hint: 'Open the Community Directory Board below to inspect server policies and Discord portals.'
      },
      mapotofu: {
        role: 'Tyrannosaurus • Station 04 Apex Companion Specialist',
        greeting:
          'Grrr… greetings, challenger! I am mapotofu, keeping watch over the Companion Application Station in full Tyrannosaurus scale. Tools only help if you grab them from the right official channels—never shady links!',
        tips:
          'Station 04 Briefing (Companion Application Desk):\n' +
          '• Inspect the dual-monitor desk with [E] for safety rules and official Discord-only companion distribution notes.\n' +
          '• Never download third-party executables or "anticheat tweaks"—only trust admin-pinned channels.\n' +
          '• Rex Pro Tip: Large carnivores burn massive calories—plan hunts around waterholes and manage ambush stamina!',
        hint: 'Inspect the Companion Desk below for verified safety & setup information.'
      },
      kmy: {
        role: 'Tyrannosaurus • Station 05 Northern Departure Warden',
        greeting:
          'Roar! Looking sharp, explorer. I am kmy guarding the left flank of the Expedition Departure Gate alongside Zapicy. Once every step across the outpost is ticked off, you are cleared to hunt in Primeval Malaysia!',
        tips:
          'Station 05 Briefing (Departure Gate):\n' +
          '• Interact with the Departure Gate plaque ([E]) to confirm your Steam branch, EAC verification, community rules, and survival prep.\n' +
          '• Rex Ambush Tip: Crouch silently in dense tree cover before closing distance—once a prey hears your heavy footsteps, you lose the element of surprise!',
        hint: 'Open the Departure Gate Checklist below to review your launch readiness.'
      },
      Zapicy: {
        role: 'Tyrannosaurus • Station 05 Apex Marshal',
        greeting:
          'Welcome to the North Gate! I am Zapicy, co-warden with kmy here at Destination 05. Make sure you also visit the Survival Training Camp on the western trail with sai and Dom before stepping into live Evrima waters!',
        tips:
          'Station 05 Combat & Departure Advice:\n' +
          '• Open the Departure Checklist ([E]) before launching The Isle from Steam.\n' +
          '• Never fight empty-stomached with under 50% stamina—regain stam in cover, check bleed status, and pick terrain that favors your dinosaur!',
        hint: 'Check the Departure Checklist or hop to the Survival Training Ground to sharpen your field craft.'
      },
      sai: {
        role: 'Allosaurus • Survival Training Ground Combat Instructor',
        greeting:
          'Welcome inside the palisade, rookie! I am sai, running tactical drills here at the Primeval Malaysia Training Camp on Allosaurus. Around this bonfire, Dom and I teach everything you need to stay alive past juvenile!',
        tips:
          'Survival Ground — Combat & Stamina Drills:\n' +
          '• Interact with the Training Board behind the bonfire ([E]) for all 6 survival tabs: Controls, Diets, Stamina, Nesting, Night Vision & Pro Tips.\n' +
          '• Allosaurus Tip: Apply pressure with controlled bleed bites, circle wider than shorter-turning targets, and disengage immediately if you drop below 40% stam!',
        hint: 'Open the Survival Training Manual below for the full Evrima survival handbook.'
      },
      Dom: {
        role: 'Dilophosaurus • Survival Training Ground Night & Scent Instructor',
        greeting:
          'Hiss… step closer to the bonfire light! I am Dom on Dilophosaurus duty here at the Survival Camp. Daytime ambushers look flashy, but once dusk falls on Evrima, stealth, scent, and Night Vision decide who eats!',
        tips:
          'Survival Ground — Night, Scent & Ambush Craft:\n' +
          '• Press [N] in-game at dusk/night for Night Vision, hold [Q] to sniff diet organs/water/sanctuaries, and [H] to rest safely inside thick bushes.\n' +
          '• Dilo Tip: Stay quiet in foliage at night, weave around flanks rather than face-tanking heavy skulls, and listen closely to bushes and water splashes!',
        hint: 'Open the Survival Training Manual below to read every survival mechanic in detail.'
      }
    }
  },

  ms: {
    openStationBtn: (stationTitle) => `Buka ${stationTitle}`,
    jumpToStationBtn: (stationTitle) => `Pergi ke ${stationTitle}`,
    byeGuideBtn: (name) => `Terima kasih, ${name}!`,
    guides: {
      kift90: {
        role: 'Pteranodon • Pemandu Langit & Alu-aluan Stesen 01',
        greeting:
          'Screee—selamat tiba di pos utama, pengembara! Saya kift90, meninjau kawasan Pusat Alu-aluan dengan sayap Pteranodon. Periksa Papan Alu-aluan di sebelah saya untuk info PC, asas Evrima, dan kesemua 6 stesen sebelum mula terbang!',
        tips:
          'Taklimat Stesen 01 (Pusat Alu-aluan):\n' +
          '• Tekan [E] pada Papan Alu-aluan di sebelah saya untuk melihat pengenalan Evrima serta keperluan PC.\n' +
          '• Tip Pteranodon: Jimatkan stamina ketika meluncur di antara tebing, dan jangan mendarat rendah berhampiran air tempat Deinosuchus bersembunyi!',
        hint: 'Tekan butang di bawah untuk membuka Papan Alu-aluan terus atau teruskan ke laluan pos lain.'
      },
      kenzy: {
        role: 'Triceratops • Pengawal Stesen 02 Steam & EAC',
        greeting:
          'Berdiri teguh, pejuang baharu! Saya kenzy, menjaga Stesen Steam & Easy Anti-Cheat dengan Triceratops. Sebelum merempuh masuk pelayan Evrima, pastikan cabang Steam dan fail EAC anda benar-benar lengkap!',
        tips:
          'Taklimat Stesen 02 (Terminal Steam & EAC):\n' +
          '• Buka monitor terminal ([E]) untuk panduan 10 langkah Steam Properties → Betas → "evrima".\n' +
          '• Semak tab Pengesahan EAC supaya anda tidak ditendang keluar kerana isu Easy Anti-Cheat.\n' +
          '• Tip Trike: Sentiasa hadapkan tanduk ke arah pemangsa dan lindungi bahagian rusuk serta belakang anda!',
        hint: 'Klik di bawah untuk membuka Terminal Steam & EAC terus sekarang.'
      },
      apollo: {
        role: 'Maiasaura • Pemandu Kawanan Komuniti Stesen 03',
        greeting:
          'Hai rakan sekawan! Saya apollo sebagai peninjau Maiasaura di Pos Komuniti. Bermain The Isle jauh lebih menyeronokkan apabila bersama komuniti yang sah dan dipercayai—jom semak senarai portal komuniti di sini!',
        tips:
          'Taklimat Stesen 03 (Direktori Komuniti):\n' +
          '• Baca papan direktori ([E]) untuk meneroka senarai komuniti rasmi seperti IsleLink (18+) dan Obsidian Isle.\n' +
          '• Sentiasa semak peraturan pelayan di Discord rasmi sebelum menyertai kawanan atau pertempuran.\n' +
          '• Tip Maia: Pasang telinga mendengar derapan kaki pemangsa ketika meragut makanan—kepekaan menyelamatkan seluruh kawanan!',
        hint: 'Buka Papan Direktori Komuniti di bawah untuk menyemak pautan Discord rasmi.'
      },
      mapotofu: {
        role: 'Tyrannosaurus • Pakar Aplikasi Pendamping Stesen 04',
        greeting:
          'Grrr… salam perkenalan! Saya mapotofu, mengawal Stesen Aplikasi Pendamping dengan gagah sebagai Tyrannosaurus. Alat bantu hanya berguna jika dimuat turun daripada saluran rasmi—elakkan pautan meragukan!',
        tips:
          'Taklimat Stesen 04 (Meja Aplikasi Pendamping):\n' +
          '• Periksa meja berkembar monitor ([E]) untuk panduan keselamatan dan saluran Discord rasmi.\n' +
          '• Jangan sekali-kali memuat turun pemintas EAC atau fail pihak ketiga yang tidak disahkan admin.\n' +
          '• Tip Rex: Karnivor besar memerlukan kalori tinggi—rancang pemburuan dekat sumber air dan kawal stamina serang hendap!',
        hint: 'Periksa Meja Aplikasi Pendamping di bawah untuk langkah keselamatan muat turun.'
      },
      kmy: {
        role: 'Tyrannosaurus • Pengawal Gerbang Utara Stesen 05',
        greeting:
          'Roar! Nampak bersedia nampaknya. Saya kmy yang mengawal sisi kiri Gerbang Pelepasan Ekspedisi bersama Zapicy. Apabila semua persiapan pos selesai, anda sedia berburu di dunia The Isle!',
        tips:
          'Taklimat Stesen 05 (Gerbang Pelepasan):\n' +
          '• Tekan [E] pada plak gerbang untuk menyemak senarai persediaan akhir Steam, EAC, peraturan komuniti, dan kemahiran survival.\n' +
          '• Tip Serang Hendap Rex: Merangkak perlahan di balik rimbunan pokok sebelum memecut—langkah kaki yang kuat mudah mengantoikan posisi anda!',
        hint: 'Buka Senarai Semak Gerbang Pelepasan di bawah sebelum melancarkan permainan.'
      },
      Zapicy: {
        role: 'Tyrannosaurus • Marsyal Gerbang Pelepasan Stesen 05',
        greeting:
          'Selamat datang ke Gerbang Utara! Saya Zapicy, bertugas bersama kmy di Destinasi 05. Pastikan anda turut singgah ke Kem Latihan Survival di laluan barat bersama sai dan Dom sebelum masuk ke pelayan Evrima!',
        tips:
          'Nasihat Pertempuran & Pelepasan:\n' +
          '• Buka Senarai Semak Pelepasan ([E]) sebagai pengesahan terakhir sebelum melancarkan The Isle.\n' +
          '• Jangan memulakan pertarungan jika stamina bawah 50%—cari perlindungan untuk memulihkan tenaga dan pendarahan dahulu!',
        hint: 'Semak senarai pelepasan di bawah atau kunjungi Kem Latihan Survival untuk mendalami taktik survival.'
      },
      sai: {
        role: 'Allosaurus • Jurulatih Tempur Kem Latihan Survival',
        greeting:
          'Selamat datang ke dalam benteng kayu, rekrut! Saya sai, jurulatih tempur Allosaurus di Kem Latihan Primeval Malaysia. Di keliling unggun api ini, saya dan Dom melatih segala asas untuk hidup lama sehingga dewasa!',
        tips:
          'Kem Survival — Latihan Tempur & Stamina:\n' +
          '• Buka Papan Manual Survival di belakang unggun api ([E]) untuk 6 tab lengkap: Kawalan, Diet, Stamina, Pembiakan, Penglihatan Malam & Tip Pro.\n' +
          '• Tip Allosaurus: Kawal serangan pendarahan secara berperingkat dan jangan sesekali habiskan stamina di bawah 40% semasa bertarung!',
        hint: 'Buka Manual Latihan Survival di bawah untuk mempelajari semua mekanik The Isle.'
      },
      Dom: {
        role: 'Dilophosaurus • Jurulatih Malam & Deria Bau Kem Survival',
        greeting:
          'Hiss… rapatlah ke cahaya unggun api! Saya Dom, jurulatih Dilophosaurus di Kem Latihan Survival. Bila malam menjelma di Evrima, deria bau, bunyi, dan Penglihatan Malam menentukan siapa pemburu dan siapa mangsa!',
        tips:
          'Kem Survival — Teknik Malam & Deria Bau:\n' +
          '• Tekan [N] pada waktu senja/malam untuk Night Vision, tahan [Q] untuk menghidu bau diet/air/sanctuary, dan [H] untuk berehat di dalam semak.\n' +
          '• Tip Dilo: Manfaatkan rimbunan malam untuk mengelak serangan hadapan dinosaur berat dan pasang telinga pada setiap bunyi semak!',
        hint: 'Buka Manual Latihan Survival di bawah untuk membaca kesemua panduan penuh.'
      }
    }
  },

  kl: {
    openStationBtn: (stationTitle) => `Buka ${stationTitle}`,
    jumpToStationBtn: (stationTitle) => `Pergi ${stationTitle}`,
    byeGuideBtn: (name) => `Cun, thanks ${name}!`,
    guides: {
      kift90: {
        role: 'Pteranodon • Scout Udara & Guide Stesen 01',
        greeting:
          'Screee—welcome ke pos kem bro! Aku kift90, jaga port Welcome Centre ni naik Pteranodon. Check dulu Papan Notice sebelah aku ni untuk spec PC, intro Evrima, dengan 6 stesen kat kem ni sebelum terbang tinggi!',
        tips:
          'Briefing Stesen 01 (Welcome Centre):\n' +
          '• Tekan [E] kat Papan Notice sebelah aku ni untuk check benda wajib sebelum start.\n' +
          '• Tip Ptera: Jimat stamina masa glide jauh, jangan syok terbang rendah sangat atas sungai sebab Deinosuchus tunggu nak ngap kat bawah tu!',
        hint: 'Klik button kat bawah kalau nak terus buka Papan Welcome Centre!'
      },
      kenzy: {
        role: 'Triceratops • Penjaga Stesen 02 Steam & EAC',
        greeting:
          'Steady geng! Aku kenzy, jaga port Terminal Steam & Easy Anti-Cheat pakai Triceratops. Sebelum korang rempuh server Evrima, make sure Steam branch dengan EAC korang dah padu, takde error!',
        tips:
          'Briefing Stesen 02 (Terminal Steam & EAC):\n' +
          '• Tekan [E] kat monitor tu untuk follow 10 step tukar branch ke "evrima" dalam Steam Properties.\n' +
          '• Check sekali tab EAC Verification biar tak kena kick tiba-tiba masa tengah main.\n' +
          '• Tip Trike: Jangan bagi belakang kat carnivore—halakan tanduk depan-depan dan jaga stamina block!',
        hint: 'Tekan bawah ni untuk buka terus Terminal Steam & EAC!'
      },
      apollo: {
        role: 'Maiasaura • Guide Komuniti Stesen 03',
        greeting:
          'Yo geng sekawan! Aku apollo kat pos Maiasaura depan Papan Komuniti ni. Main The Isle lagi syok kalau masuk server komuniti yang elok dan verified—jom tengok port mana yang onz!',
        tips:
          'Briefing Stesen 03 (Direktori Komuniti):\n' +
          '• Tekan [E] kat papan tu untuk check senarai komuniti rasmi macam IsleLink (18+) dan Obsidian Isle.\n' +
          '• Baca rules dalam Discord rasmi diaorang dulu sebelum main—jangan main redah nanti kena warn admin!\n' +
          '• Tip Maia: Tengah makan pun telinga kena alert bunyi tapak kaki dalam hutan!',
        hint: 'Buka Direktori Komuniti kat bawah ni untuk tengok link Discord rasmi!'
      },
      mapotofu: {
        role: 'Tyrannosaurus • Otai Stesen 04 Companion App',
        greeting:
          'Grrr… apa khabar bro! Aku mapotofu, jaga Meja Companion App pakai T-Rex kat sini. Ingat ya, apa-apa companion tool kena ambil dari Discord rasmi je—jangan sesekali klik link pelik!',
        tips:
          'Briefing Stesen 04 (Meja Companion App):\n' +
          '• Tekan [E] kat meja monitor kembar tu untuk baca safety guidelines & sumber download sah.\n' +
          '• Jangan download fail third-party merata kalau tak nak kena scam atau kena ban EAC.\n' +
          '• Tip Rex: Dino besar cepat lapar—plan elok-elok bila nak sprint ambush mangsa kat tepi sungai!',
        hint: 'Tekan bawah ni untuk check Meja Companion App dengan lebih detail.'
      },
      kmy: {
        role: 'Tyrannosaurus • Warden Pintu Pelepasan Stesen 05',
        greeting:
          'Roar! Dah nak ready masuk server ke tu? Aku kmy jaga tiang kiri Gerbang Pelepasan dengan Zapicy. Kalau semua stesen dah check elok, barulah padu nak survive dalam Primeval Malaysia!',
        tips:
          'Briefing Stesen 05 (Pintu Pelepasan):\n' +
          '• Tekan [E] kat papan gerbang tu untuk double-check semua step Steam, EAC, komuniti, dengan survival dah siap.\n' +
          '• Tip Ambush Rex: Jalan tunduk senyap-senyap ikut celah pokok besar dulu—kalau mangsa dengar bunyi tapak kaki berat kau, memang lesap dia lari!',
        hint: 'Buka Senarai Semak Pelepasan kat bawah untuk tengok readiness korang.'
      },
      Zapicy: {
        role: 'Tyrannosaurus • Marshal Kanan Stesen 05',
        greeting:
          'Selamat sampai ke Gerbang Utara bro! Aku Zapicy, partner kmy kat Destinasi 05 ni. Jangan lupa singgah Kem Latihan Survival kat belah barat dengan sai dan Dom dulu sebelum terjun game betul!',
        tips:
          'Pesan Otai S5:\n' +
          '• Check Senarai Pelepasan ([E]) biar tak tertinggal satu benda pun sebelum launch game.\n' +
          '• Kalau stamina bawah 50%, jangan gatal nak fight! Cari semak, rehat, bagi bleed berhenti dulu!',
        hint: 'Tekan bawah untuk check Senarai Pelepasan atau gerak ke Kem Survival.'
      },
      sai: {
        role: 'Allosaurus • Cikgu Combat Kem Latihan Survival',
        greeting:
          'Masuk je ikut pintu gerbang tu, jangan malu-malu! Aku sai, instructor Allosaurus kat Primeval Malaysia Training Camp ni. Kat keliling unggun api ni, aku dengan Dom ajar semua skill wajib biar dino korang hidup lama!',
        tips:
          'Kem Survival — Latihan Fight & Stamina:\n' +
          '• Tekan [E] kat Papan Manual belakang unggun api tu untuk buka semua 6 tab: Controls, Diet, Stamina, Nesting, Night Vision & Pro Tips.\n' +
          '• Tip Allo: Main gigit bleed dan jaga spacing—jangan sesekali habiskan stamina sampai kosong kalau tengah kena kejar!',
        hint: 'Tekan bawah ni untuk buka Manual Latihan Survival penuh!'
      },
      Dom: {
        role: 'Dilophosaurus • Cikgu Malam & Bau Kem Latihan Survival',
        greeting:
          'Hiss… mari duduk dekat sikit kat unggun api ni! Aku Dom pakai Dilophosaurus jaga sesi malam Survival Camp. Siang memang ramai tunjuk taring, tapi bila malam gelap kat Evrima, bau, bunyi, dengan Night Vision yang tentukan siapa menang!',
        tips:
          'Kem Survival — Ilmu Malam & Ambush:\n' +
          '• Tekan [N] bila malam untuk buka Night Vision, tahan [Q] untuk hidu bau makanan/air/sanctuary, dan tekan [H] untuk rehat dalam semak tebal.\n' +
          '• Tip Dilo: Malam-malam jangan bising, serang dari tepi/belakang dan dengar betul-betul bunyi semak berdekatan!',
        hint: 'Tekan bawah ni untuk baca semua tab Manual Latihan Survival.'
      }
    }
  }
};

export const SURVIVAL_MANUAL = {
  en: {
    intro:
      'Welcome to the Primeval Malaysia Training Camp! Every tab below breaks down essential The Isle: Evrima survival mechanics—from keyboard controls and scent/diet buffs to combat stamina and staying alive at night.',
    markReviewedBtn: 'Mark Survival Training Complete',
    reviewedBadge: '✓ SURVIVAL TRAINING COMPLETED',
    instructorsNote: 'Field Instructors Inside Compound: sai (Allosaurus) & Dom (Dilophosaurus)',
    tabs: [
      {
        id: 'controls',
        label: '1. CONTROLS & MOVES',
        title: 'Core Evrima Movement, Combat & Vocal Calls',
        summary: 'Know your instincts before meeting another dinosaur in the jungle.',
        cards: [
          {
            heading: 'Locomotion & Stealth',
            items: [
              'WASD — Move, Shift — Sprint (watch stamina closely!)',
              'CTRL (Hold/Toggle) — Crouch to shrink profile, lower footstep noise, and ambush silently',
              'Z — Toggle Walk / Slow Trot to conserve stamina while still covering ground',
              'H — Sit/Rest rapidly regenerates stamina and heals bleeding/fractures faster'
            ]
          },
          {
            heading: 'Combat, Specials & Senses',
            items: [
              'Left Click (LMB) — Primary Bite / Strike (directional aiming matters!)',
              'Right Click (RMB) — Special Species Ability (Omniraptor Pounce, Trike Thrust, Pteranodon Dive/Skim, etc.)',
              'Alt + Mouse / Attack — Look freely & perform directional Alt-Bite behind or beside you',
              'Hold Q — Scent Pulse (reveals water, carcasses, plants, migrations & sanctuary zones)'
            ]
          },
          {
            heading: 'Essential Dino Calls (1–4) & Interact (E)',
            items: [
              '1 — Broadcast Call (loud, carries across biomes—use carefully!)',
              '2 — Friendly Call (send/accept Pack or Herd invites when close)',
              '3 — Threat / Agony Aggression Display • 4 — Danger / Submissive Retreat',
              'E — Eat / Drink / Pick Up / Interact • G — Grab/Carry small chunks or babies • N — Night Vision'
            ]
          }
        ]
      },
      {
        id: 'diet',
        label: '2. DIET & WATER',
        title: 'Diets, Nutrient Buffs & Safe Drinking',
        summary: 'Eating the right nutrient combinations gives huge growth speed and survival bonuses.',
        cards: [
          {
            heading: 'The 3-Hexagon Nutrient System (Hold Q / Tab)',
            items: [
              'Every species needs three nutrient shapes: S-Curve (Proteins), Three Dots (Lipids), and Double Lines (Carbohydrates).',
              'Matching different nutrients accelerates Growth Rate (+25% to +50%+), stamina recovery, bleed resistance, and night vision range.',
              'Hold Q to scan color-coded icons in the environment—organs inside carcasses give rich carnivore diets; specific fruits/roots feed herbivores.'
            ]
          },
          {
            heading: 'Herbivore Grazing & Stomach Preservation',
            items: [
              'Herbivores can "Graze" plain grass in emergencies to avoid starvation, keeping hunger around ~20% without granting diet buffs.',
              'Never over-gorge on junk diets; save room in your stomach for proper preferred diet plants!'
            ]
          },
          {
            heading: 'Surviving Waterholes (Deinosuchus Warning!)',
            items: [
              'Never drink directly at deep murky river drop-offs or popular drinking rocks—giant Deinosuchus crocodiles lurk just beneath the surface.',
              'Drink at shallow sunlit riffles, narrow stream bends, or water pools isolated from main rivers, and spin your camera constantly!'
            ]
          }
        ]
      },
      {
        id: 'stamina',
        label: '3. STAMINA & HEALING',
        title: 'Stamina Management, Fractures & Bleeding',
        summary: 'In Evrima, running out of stamina is almost always fatal.',
        cards: [
          {
            heading: 'Golden Rule of Stamina',
            items: [
              'NEVER sprint continuously across open plains until empty. Keep at least 60% stamina in reserve whenever traveling.',
              'Note that stamina regen slows sharply while walking above trotting speed—halt inside dense foliage and press H to recover.',
              'If chasing prey or fleeing a Rex/Allo, break line of sight around boulders/trees instead of running in a straight line.'
            ]
          },
          {
            heading: 'Bleed, Fractures & Recovery',
            items: [
              'Bleeding drains blood rapidly while sprinting or standing—wallowing in mud and resting still (H) slows blood loss dramatically.',
              'Bone fractures (leg/head/body breaks from falls or heavy hits) restrict speed and bite power until healed by resting.',
              'Avoid steep cliff jumps—even mid-tier dinosaurs easily break legs stepping off invisible ledges.'
            ]
          }
        ]
      },
      {
        id: 'nesting',
        label: '4. GROUPS & SANCTUARIES',
        title: 'Herds, Packs, Migration Zones & Sanctuaries',
        summary: 'Strength in numbers and juvenile safety zones keep hatchlings alive.',
        cards: [
          {
            heading: 'Joining Packs & Herds Safely',
            items: [
              'Press 2 facing a player of the same species to invite/join a group—only group with people you recognize or via Primeval Malaysia Discord rules.',
              'Respect each server’s mix-packing, over-packing, and body-down rules listed in Destination 03.'
            ]
          },
          {
            heading: 'Juvenile Sanctuaries & Migration Zones',
            items: [
              'Follow the red palm-tree scent icon to find Juvenile Sanctuaries—protected groves packed with food/mushrooms that deter apex adults with bee swarms.',
              'Follow the migration footprint scent icon for fresh herbivore diet clusters and active ecosystems.'
            ]
          }
        ]
      },
      {
        id: 'night',
        label: '5. NIGHT & STEALTH',
        title: 'Night Vision, Weather, Mud & Audio Survival',
        summary: 'Survive total darkness, tropical storms, and nocturnal stalkers like Dilophosaurus.',
        cards: [
          {
            heading: 'Mastering Darkness (N Key)',
            items: [
              'Press N to toggle Night Vision. Avoid sprinting blindly off cliffs when storm clouds make nights pitch black.',
              'Resting silently inside dense evergreen undergrowth makes your silhouette practically invisible until morning.'
            ]
          },
          {
            heading: 'Audio & Mud Camouflage',
            items: [
              'Mud pits let you wallow to apply a protective coat that dampens scent trails and reduces bleeding slightly.',
              'Listen carefully with headphones: rustling leaves, heavy footsteps, and water splashes betray hidden stalkers seconds before you see them!'
            ]
          }
        ]
      },
      {
        id: 'tips',
        label: '6. PRO SURVIVAL TIPS',
        title: 'Essential Veteran Habits for Primeval Malaysia',
        summary: 'Quick mindset shifts that double your lifespan on day one.',
        cards: [
          {
            heading: 'Top 6 Mistakes New Survivors Make',
            items: [
              'Spamming 1-calls (Broadcast) gives away your exact location and growth size to hungry Allosaurus and Tyrannosaurus packs.',
              'Never go AFK in the open or beside water—always crouch deep in dark bushes and monitor surroundings first.',
              'Learn safe logout timing: always sit/rest through the full logout countdown safely hidden so your dino isn’t left vulnerable!',
              'Do not trust random vocal calls near a carcass—keep clear escape routes behind you.',
              'Keep your graphics settings balanced for stable FPS so bush silhouettes and water ripples stay crystal clear.',
              'Join the Primeval Malaysia / verified community Discord for teammates, nests, and live server rule clarifications!'
            ]
          }
        ]
      }
    ]
  },

  ms: {
    intro:
      'Selamat datang ke Kem Latihan Primeval Malaysia! Setiap tab di bawah menerangkan mekanik survival penting The Isle: Evrima—daripada kawalan asas, sistem diet & bau, pengurusan stamina hinggalah petua penglihatan malam.',
    markReviewedBtn: 'Tanda Latihan Survival Selesai',
    reviewedBadge: '✓ LATIHAN SURVIVAL SELESAI',
    instructorsNote: 'Jurulatih Kem Di Dalam Benteng: sai (Allosaurus) & Dom (Dilophosaurus)',
    tabs: [
      {
        id: 'controls',
        label: '1. KAWALAN & AKSI',
        title: 'Kawalan Pergerakan, Tempur & Panggilan Suara',
        summary: 'Kuasai tindak balas refleks anda sebelum bertembung dinosaur lain di hutan.',
        cards: [
          {
            heading: 'Pergerakan & Senyap',
            items: [
              'WASD — Gerak, Shift — Pecut (pantau bar stamina sentiasa!)',
              'CTRL — Membongkok (Crouch) untuk kurangkan bunyi tapak kaki & bersembunyi di semak',
              'Z — Tukar ke mod berjalan perlahan bagi menjimatkan stamina jarak jauh',
              'H — Duduk/Berehat memulihkan stamina, pendarahan dan kecederaan tulang dengan cepat'
            ]
          },
          {
            heading: 'Serangan, Kuasa Khas & Deria Bau',
            items: [
              'Klik Kiri (LMB) — Gigitan / Serangan Utama',
              'Klik Kanan (RMB) — Kebolehan Khas Spesies (Pounce Omniraptor, Rempuhan Trike, Luncuran Pteranodon dll.)',
              'Alt + Tetikus / Serang — Pusing pandangan bebas & lakukan gigitan arah belakang/sisi',
              'Tahan Q — Deria Bau (mengesan air, bangkai, tumbuhan diet, migrasi & kawasan sanctuary)'
            ]
          },
          {
            heading: 'Panggilan Dinosaur (1–4) & Interaksi (E)',
            items: [
              '1 — Broadcast (kuat, didengari jauh—guna dengan berhati-hati!)',
              '2 — Friendly Call (jemput/sertai kawanan apabila berdekatan)',
              '3 — Ancaman / Agresi • 4 — Bahaya / Menyerah',
              'E — Makan / Minum / Interaksi • G — Angkat daging/anak • N — Night Vision'
            ]
          }
        ]
      },
      {
        id: 'diet',
        label: '2. DIET & AIR',
        title: 'Sistem Diet Nutrien & Cara Minum Selamat',
        summary: 'Kombinasi diet yang tepat mempercepatkan tumbesaran dan menaikkan ketahanan badan.',
        cards: [
          {
            heading: 'Sistem 3 Nutrien (Tahan Q / Tab)',
            items: [
              'Setiap spesies memerlukan 3 ikon nutrien: Bentuk S (Protein), 3 Titik (Lipid), dan Garis Berkembar (Karbohidrat).',
              'Melengkapkan gabungan diet memberi bonus Growth (+25% hingga +50%+), pemulihan stamina, rintangan pendarahan, dan penglihatan malam.',
              'Tahan Q untuk mengesan ikon bau—organ dalaman bangkai sangat penting untuk karnivor.'
            ]
          },
          {
            heading: 'Meragut Rumput (Herbivor)',
            items: [
              'Herbivor boleh meragut rumput biasa (Graze) ketika terdesak untuk elak kebuluran (~20% perut), tetapi tanpa bonus diet.',
              'Jangan penuhkan perut dengan makanan biasa jika anda sedang mencari tumbuhan diet sebenar!'
            ]
          },
          {
            heading: 'Amaran Tempat Minum (Deinosuchus!)',
            items: [
              'Elakkan minum di tebing sungai dalam atau batu tumpuan utama kerana Deinosuchus sentiasa menghendap di bawah air.',
              'Pilih anak sungai cetek, jeram berbatu cetek, atau kolam terpencil sambil memutar kamera tanpa henti.'
            ]
          }
        ]
      },
      {
        id: 'stamina',
        label: '3. STAMINA & LUKA',
        title: 'Pengurusan Stamina, Patah Tulang & Pendarahan',
        summary: 'Kehabisan stamina di tengah pertempuran hampir pasti membawa maut.',
        cards: [
          {
            heading: 'Peraturan Emas Stamina',
            items: [
              'JANGAN pecut sehingga stamina kosong di padang terbuka—simpan sekurang-kurangnya 60% stamina sebagai simpanan kecemasan.',
              'Stamina sukar pulih jika anda terus berlari anak; berhenti di dalam semak dan tekan H untuk pulih cepat.'
            ]
          },
          {
            heading: 'Pendarahan & Patah Tulang',
            items: [
              'Berlari ketika mengalami pendarahan mempercepatkan kehilangan darah—berkubang dalam lumpur serta berehat diam (H) memperlahankan pendarahan.',
              'Kecederaan tulang (kaki/kepala/badan) akibat terjatuh cerun tinggi mengurangkan kelajuan sehingga anda berehat cukup lama.'
            ]
          }
        ]
      },
      {
        id: 'nesting',
        label: '4. KAWANAN & SANCTUARY',
        title: 'Berkumpulan, Zon Migrasi & Sanctuary Anak',
        summary: 'Lindungi dinosaur muda di zon selamat sebelum berkembang dewasa.',
        cards: [
          {
            heading: 'Sertai Kawanan Dengan Selamat',
            items: [
              'Tekan 2 menghadap pemain spesies sama untuk membentuk pack atau herd.',
              'Sentiasa patuhi peraturan had saiz kumpulan dan peraturan bangkai (body-down) pelayan komuniti di Destinasi 03.'
            ]
          },
          {
            heading: 'Zon Sanctuary & Migrasi',
            items: [
              'Ikut ikon pokok palma merah semasa menghidu [Q] untuk ke Juvenile Sanctuary yang penuh makanan dan dilindungi lebah daripada pemangsa dewasa.',
              'Zon Migrasi bertanda tapak kaki pula menempatkan tumbuhan diet herbivor yang segar.'
            ]
          }
        ]
      },
      {
        id: 'night',
        label: '5. MALAM & SENYAP',
        title: 'Night Vision, Cuaca Ribut, Lumpur & Audio',
        summary: 'Kuasai waktu malam supaya tidak menjadi mangsa hendap Dilophosaurus.',
        cards: [
          {
            heading: 'Bertahan Pada Waktu Malam (Butang N)',
            items: [
              'Tekan N untuk aktifkan Night Vision apabila matahari terbenam.',
              'Berhenti di balik rimbunan pokok tebal jika hujan lebat membataskan pandangan supaya tidak terjatuh gaung.'
            ]
          },
          {
            heading: 'Audio & Penyamaran Lumpur',
            items: [
              'Kolam lumpur membolehkan anda menyalut badan untuk mengurangkan kesan bau serta membantu pendarahan.',
              'Gunakan fon kepala: bunyi dedaun berdesir dan derapan kaki sering menyelamatkan nyawa sebelum pemangsa kelihatan!'
            ]
          }
        ]
      },
      {
        id: 'tips',
        label: '6. TIP PRO',
        title: 'Kebiasaan Otai Untuk Bertahan Lama',
        summary: 'Elakkan kesilapan lazim pemain baharu sejak hari pertama.',
        cards: [
          {
            heading: '6 Perkara Penting Pemain Baharu',
            items: [
              'Jangan kerap menekan panggilan 1 (Broadcast) kerana pemangsa boleh menganggar saiz dan lokasi anda.',
              'Jangan sesekali AFK di tempat terbuka atau tepi tasik—sembunyi di semak gelap terlebih dahulu.',
              'Tunggu kiraan tamat logout hingga selesai sebelum menutup permainan supaya watak anda tidak tinggal terdedah.',
              'Jangan terlalu cepat mempercayai panggilan mesra berhampiran bangkai segar.',
              'Laraskan tetapan grafik supaya FPS kekal stabil dan bayang semak serta kocakan air jelas kelihatan.',
              'Sertai komuniti Primeval Malaysia / Discord rasmi untuk mencari rakan sekumpulan dan panduan terkini!'
            ]
          }
        ]
      }
    ]
  },

  kl: {
    intro:
      'Welcome masuk Primeval Malaysia Training Camp bro! Semua tab kat bawah ni kumpulkan ilmu wajib untuk survive dalam The Isle: Evrima—dari button kawalan, diet & hidu bau, jaga stamina, sampai tips malam dan combat.',
    markReviewedBtn: 'Tanda Latihan Survival Dah Khatam',
    reviewedBadge: '✓ LATIHAN SURVIVAL KHATAM',
    instructorsNote: 'Cikgu Kem Kat Dalam Ni: sai (Allosaurus) & Dom (Dilophosaurus)',
    tabs: [
      {
        id: 'controls',
        label: '1. CONTROLS & SKILL',
        title: 'Kawalan Gerak, Serang & Call Dino',
        summary: 'Biasakan jari dulu sebelum bertembung dino lain tengah hutan.',
        cards: [
          {
            heading: 'Jalan, Lari & Menyelinap',
            items: [
              'WASD — Gerak, Shift — Pecut (jangan sampai stamina kosong bro!)',
              'CTRL — Tunduk (Crouch) biar senyap tapak kaki dengan senang menyorok',
              'Z — Tukar jalan slow/trot biar jimat tenaga bila travel jauh',
              'H — Duduk/Rest untuk pulih stamina dengan cepat dan kurangkan bleed'
            ]
          },
          {
            heading: 'Combat, Ability & Hidu Bau',
            items: [
              'Left Click (LMB) — Gigit / Attack biasa',
              'Right Click (RMB) — Skill Khas (Omniraptor Pounce, Trike Tanduk, Pteranodon Dive dll.)',
              'Alt + Mouse / Attack — Pusing kamera tengok belakang & Alt-Bite arah yang korang nak',
              'Hold Q — Hidu Bau (tunjuk port air, bangkai, buah diet, migrasi & sanctuary)'
            ]
          },
          {
            heading: 'Call Dino (1–4) & Button Wajib (E/N/G)',
            items: [
              '1 — Broadcast (kuat gila satu map dengar—hati-hati kalau kecik lagi!)',
              '2 — Friendly Call (ajak join pack/herd bila jumpa member sekampung)',
              '3 — Garang / Halau • 4 — Mintak ampun / Bahaya',
              'E — Makan / Minum / Tekan • G — Angkat daging/anak • N — Night Vision'
            ]
          }
        ]
      },
      {
        id: 'diet',
        label: '2. DIET & AIR',
        title: 'Combo Diet Nutrien & Port Minum Selamat',
        summary: 'Makan ikut diet combo baru dino cepat membesar dengan stamina padu.',
        cards: [
          {
            heading: 'Sistem 3 Ikon Diet (Hold Q / Tab)',
            items: [
              'Setiap dino ada 3 bentuk nutrien: Bentuk S (Protein), 3 Titik (Lipid), dengan 2 Garis (Carbs).',
              'Campur ketiga-tiga diet ni naikkan Growth speed kaw-kaw, regen stamina lagi laju, dengan kuatkan night vision.',
              'Hold Q masa cari makanan—karnivor kena makan organ dalaman bangkai, herbivor cari pokok/buah bertanda diet.'
            ]
          },
          {
            heading: 'Graze Rumput (Herbivor Kecemasan)',
            items: [
              'Kalau terdesak lapar sangat, herbivor boleh ragut rumput biasa (Graze) bagi tahan lapar (~20%), tapi tak bagi buff diet.',
              'Jangan makan sampai kenyang benda kosong—simpan space perut untuk diet sebenar!'
            ]
          },
          {
            heading: 'Port Minum Selamat (Awas Buaya Deino!)',
            items: [
              'JANGAN minum dekat sungai besar yang dalam atau batu lepak terkenal—Deinosuchus memang standby ngap dari bawah air!',
              'Cari anak sungai cetek, lopak air hujan, atau hujung batu yang jelas nampak dasar sambil pusing kamera kiri kanan.'
            ]
          }
        ]
      },
      {
        id: 'stamina',
        label: '3. STAMINA & BLEED',
        title: 'Jaga Stamina, Patah Kaki & Pendarahan',
        summary: 'Kat Evrima, kalau stamina kering masa kena kejar memang wassalam.',
        cards: [
          {
            heading: 'Pantang Larang Stamina',
            items: [
              'Jangan lari pecut sampai bar kosong dekat kawasan lapang! Sentiasa simpan at least 60% stamina standby kecemasan.',
              'Kalau stamina jatuh teruk, berhenti dalam semak tebal dan tekan H—jalan laju lambat sangat nak regen.'
            ]
          },
          {
            heading: 'Bleed & Kaki Patah',
            items: [
              'Kalau kena gigit bleed, JANGAN lari jauh sangat sebab darah turun makin laju—cari semak dan tekan H (atau guling lumpur).',
              'Elak terjun bukit curam—silap sikit kaki terus patah dan dino jadi slow gila.'
            ]
          }
        ]
      },
      {
        id: 'nesting',
        label: '4. PACK & SANCTUARY',
        title: 'Main Pack/Herd, Migrasi & Sanctuary Anak',
        summary: 'Kecil-kecil menyorok kat sanctuary dulu, besar baru turun gelanggang.',
        cards: [
          {
            heading: 'Join Pack & Rules Server',
            items: [
              'Tekan 2 depan spesies sama untuk invite masuk kumpulan.',
              'Ikut betul-betul rules mix-pack dengan body-down server komuniti yang korang tengok kat Destinasi 03.'
            ]
          },
          {
            heading: 'Sanctuary Pokok Merah & Migrasi',
            items: [
              'Masa baru spawn kecik, hold Q dan ikut ikon pokok palma merah pergi Juvenile Sanctuary—ada makanan & lebah halau dino dewasa!',
              'Ikon tapak kaki migrasi tunjuk kawasan tumbuhan diet baru untuk herbivor.'
            ]
          }
        ]
      },
      {
        id: 'night',
        label: '5. MALAM & LUMPUR',
        title: 'Night Vision, Hujan Ribut, Lumpur & Bunyi',
        summary: 'Bila hari gelap, telinga dengan semak lagi penting dari mata.',
        cards: [
          {
            heading: 'Survival Waktu Gelap (Tekan N)',
            items: [
              'Tekan N untuk hidupkan Night Vision bila dah senja atau berkabus.',
              'Kalau ribut gelap gelita, lepak diam dalam pokok—jangan main redah nanti jatuh gaung percuma.'
            ]
          },
          {
            heading: 'Lumpur & Headphone Gaming',
            items: [
              'Berguling dalam lopak lumpur cover kesan bau dengan tolong perlahan sikit kesan bleed.',
              'Pakai headphone lagi ngam—bunyi daun kena langgar dengan bunyi air berombak tu tanda ada pemangsa tengah datang!'
            ]
          }
        ]
      },
      {
        id: 'tips',
        label: '6. TIPS OTAI',
        title: '6 Petua Otai Biar Dino Hidup Lama',
        summary: 'Elak benda noob yang selalu buat player baru cepat respawn.',
        cards: [
          {
            heading: 'Pantang Larang Player Baru',
            items: [
              'Jangan spam button 1 (Broadcast) sesuka hati—itu macam jerit "mari makan aku kat sini!".',
              'Jangan AFK kat padang atau tepi sungai—masuk semak gelap, crouch, baru check chat/Discord.',
              'Bila nak log out, tunggu timer logout habis penuh kat tempat tersorok biar dino tak mati kena makan masa offline.',
              'Jangan terus percaya orang buat call 2 dekat bangkai baru—sentiasa standby laluan cabut lari.',
              'Setting grafik biar FPS smooth supaya senang perasan kelibat dalam semak & riak air.',
              'Join Discord Primeval Malaysia atau komuniti verified untuk cari geng main, nest sekali, dan tanya otai!'
            ]
          }
        ]
      }
    ]
  }
};
