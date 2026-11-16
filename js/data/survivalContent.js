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
          'Screee—welcome aboard the perch, {name}! I am kift90, scouting high above the Welcome Centre on Pteranodon wings. Check the Noticeboard beside me to review PC readiness, Evrima basics, and all 6 expedition stops before spreading your wings!',
        tips:
          'Station 01 Briefing for {name} (Welcome Centre):\n' +
          '• Inspect the Welcome Noticeboard beside me with [E] to read what Evrima offers and verify your PC specs.\n' +
          '• Pteranodon Pro Tip: Use upward air currents, conserve stamina on long glides over open cliffs, and never land low near water where Deinosuchus ambush!',
        hint: 'Press the button below to inspect the Welcome Centre Noticeboard directly, {name}.'
      },
      kenzy: {
        role: 'Triceratops • Station 02 Heavy Steam & EAC Guardian',
        greeting:
          'Hold steady, {name}! I am kenzy, standing guard here as Triceratops at the Steam & Easy Anti-Cheat Station. Before charging into Evrima servers, make sure your Steam branch and EAC files are armored tight!',
        tips:
          'Station 02 Briefing for {name} (Steam & EAC Terminal):\n' +
          '• Open the terminal monitor with [E] for the 10-step Steam Properties → Betas → "evrima" setup walkthrough.\n' +
          '• Check the EAC Verification tab so you never get kicked mid-combat due to missing Easy Anti-Cheat files.\n' +
          '• Trike Pro Tip: Herbivores thrive on timing and positioning—face predators head-on with horns ready and protect your flanks!',
        hint: 'Click below to launch the Steam & EAC Terminal right now, {name}.'
      },
      apollo: {
        role: 'Maiasaura • Station 03 Community Herd Guide',
        greeting:
          'Hey there, {name}! I am apollo on Maiasaura lookout here at the Community Outpost. Surviving in The Isle is always better with a trustworthy herd—let me show you where the verified servers live!',
        tips:
          'Station 03 Briefing for {name} (Community Directory):\n' +
          '• Read the bulletin board with [E] to browse verified Discord communities (including IsleLink 18+ and Obsidian Isle).\n' +
          '• Always verify rules in the official server Discord before picking a spawn or joining pack/herd fights.\n' +
          '• Maia Pro Tip: Keep an ear out for approaching footsteps while browsing diets—awareness saves the whole herd!',
        hint: 'Open the Community Directory Board below, {name}, to inspect server policies and Discord portals.'
      },
      mapotofu: {
        role: 'Tyrannosaurus • Station 04 Apex Companion & Server Guide',
        greeting:
          'Grrr… greetings, {name}! I am mapotofu, keeping watch over the Companion Application Station in full Tyrannosaurus scale. Just so you know—our Primeval Malaysia crew plays across a lot of servers, but our main ones are IsleLink and Obsidian Isle!',
        tips:
          'Station 04 Briefing for {name} (Main Servers & Companion Apps):\n' +
          '• Main Servers: We play across many Evrima servers, but the main two are IsleLink (18+, official companion download at https://islelink.gg/download) and Obsidian Isle (companion distributed inside their official Discord).\n' +
          '• Community Extras: Check Noctua Isle and Dino Den inside Destination 03 too!\n' +
          '• Rex Pro Tip: Large carnivores burn massive calories—plan hunts around waterholes and only install companion tools from official links!',
        hint: 'Inspect the Companion Desk below, {name}, for official IsleLink (islelink.gg/download) & Obsidian Isle links.'
      },
      kmy: {
        role: 'Tyrannosaurus • Station 05 Northern Departure Warden',
        greeting:
          'Roar! Looking sharp, {name}. I am kmy guarding the left flank of the Expedition Departure Gate alongside Zapicy. Once every step across the outpost is ticked off, you are cleared to hunt in Primeval Malaysia!',
        tips:
          'Station 05 Briefing for {name} (Departure Gate):\n' +
          '• Interact with the Departure Gate plaque ([E]) to confirm your Steam branch, EAC verification, community rules, and survival prep.\n' +
          '• Rex Ambush Tip: Crouch silently in dense tree cover before closing distance—once a prey hears your heavy footsteps, you lose the element of surprise!',
        hint: 'Open the Departure Gate Checklist below, {name}, to review your launch readiness.'
      },
      Zapicy: {
        role: 'Tyrannosaurus • Station 05 Apex Marshal',
        greeting:
          'Welcome to the North Gate, {name}! I am Zapicy, co-warden with kmy here at Destination 05. Make sure you also visit the Survival Training Camp on the western trail with sai, Dom, and Shanks outside the gate!',
        tips:
          'Station 05 Combat & Departure Advice for {name}:\n' +
          '• Open the Departure Checklist ([E]) before launching The Isle from Steam.\n' +
          '• Never fight empty-stomached with under 50% stamina—regain stam in cover, check bleed status, and pick terrain that favors your dinosaur!',
        hint: 'Check the Departure Checklist below, {name}, before stepping onto the island.'
      },
      sai: {
        role: 'Allosaurus • Survival Training Ground Combat Instructor',
        greeting:
          'Welcome inside the palisade, {name}! I am sai, running tactical drills here at the Primeval Malaysia Training Camp on Allosaurus. Around this bonfire, Dom and I teach everything you need to stay alive past juvenile!',
        tips:
          'Survival Ground — Combat & Stamina Drills for {name}:\n' +
          '• Interact with the Training Board behind the bonfire ([E]) for all 6 survival tabs: Controls, Diets, Stamina, Nesting, Night Vision & Pro Tips.\n' +
          '• Allosaurus Tip: Apply pressure with controlled bleed bites, circle wider than shorter-turning targets, and disengage immediately if you drop below 40% stam!',
        hint: 'Open the Survival Training Manual below, {name}, for the full Evrima survival handbook.'
      },
      Dom: {
        role: 'Dilophosaurus • Survival Training Ground Night & Scent Instructor',
        greeting:
          'Hiss… step closer to the bonfire light, {name}! I am Dom on Dilophosaurus duty here at the Survival Camp. Daytime ambushers look flashy, but once dusk falls on Evrima, stealth, scent, and Night Vision decide who eats!',
        tips:
          'Survival Ground — Night, Scent & Ambush Craft for {name}:\n' +
          '• Press [N] in-game at dusk/night for Night Vision, hold [Q] to sniff diet organs/water/sanctuaries, and [H] to rest safely inside thick bushes.\n' +
          '• Dilo Tip: Stay quiet in foliage at night, weave around flanks rather than face-tanking heavy skulls, and listen closely to bushes and water splashes!',
        hint: 'Open the Survival Training Manual below, {name}, to read every survival mechanic in detail.'
      },
      shanks: {
        role: 'Ceratosaurus • Outside Wall Secret Mutation Whisperer',
        greeting:
          '(whispers low from beside the wooden wall) Psst… lean closer, {name}. Keep your voice down so sai and Dom inside don’t hear us… Tell me, {name}—do you actually know the Hidden Mutations buried inside Evrima, like Reniculate Kidneys or Reinforced Tendons… and the secret ritual to unlock them in one life?',
        tips:
          '(leans his horned Cerato skull in closer) Very well, {name}… Normal mutations appear on everyone’s growth wheel—but Hidden Mutations only unlock once your body endures specific survival trials in that same life!\n\nPick any secret below to hear the exact unlock condition, {name}—and don’t waste your Cerato’s bacteria-coated bite while grinding them!',
        hint: 'Ask Shanks about each hidden mutation below, {name}, or reveal all unlock conditions at once.'
      },
      cocomelon: {
        role: 'Light Blue Carnotaurus • Courting & Nesting Coach',
        greeting:
          'Hey {name}! I’m Cocomelon—me and J5 built this 3-egg nest between S4 and S5 to teach you how Courting and Nesting work in The Isle: Evrima!\n\n' +
          'Before you even think about eggs, {name}, know the 4 Golden Courting Rules:\n' +
          '• Same Species & Opposite Sex: You and your partner must be the exact same dinosaur species (male + female) and mature enough to breed.\n' +
          '• Leave Groups First: NEITHER dinosaur can already be in a pack or herd—leave any active group before courting!\n' +
          '• Face-to-Face Ritual (Hold N): Stand facing each other closely (Deinosuchus must float at the water surface) and both HOLD [N] simultaneously until the court animation completes.\n' +
          '• Place Your Nest (Hold N): Pick flat, hidden terrain away from open hotspots and HOLD [N] to construct your nest mound!',
        tips:
          'My Carno Nesting Pro Checklist for you, {name}:\n' +
          '• Nest Debris & Types: Most land nests require carrying sticks/twigs or mud chunks with [G] / [E] to upgrade nest integrity before laying eggs.\n' +
          '• Hide Your Scent & Silhouette: Never build right beside major drinking rocks—Carno hatchlings are noisy and draw hungry Ceratosaurus and Rex packs!\n' +
          '• Keep Diet High (α / β / γ): Maintaining strong Alpha, Beta, and Gamma nutrients during gestation prevents rotten eggs and gives healthier babies.\n' +
          '• Talk to J5 across the nest for egg temperature, TAB invite codes, and hatchling mutation inheritance!',
        hint: 'Press the action button to inspect the Training Manual, or walk across the nest to speak with pink Carno J5!'
      },
      j5: {
        role: 'Pink Carnotaurus • Eggs, Incubation & Family Care Coach',
        greeting:
          'Hi {name}! I’m J5, guarding these 3 warm eggs alongside Cocomelon. Once courting succeeds and your nest is built, here is how to raise a healthy clutch:\n\n' +
          '• Laying & Clutch Management: Females enter gestation and lay eggs into the nest. If a weak diet turns an egg rotten, stand up and HOLD [E] to clear rotten eggs immediately!\n' +
          '• Temperature & Incubation: Either parent must sit/stand over the nest so the egg temperature gauge stays warm—leaving eggs uncovered in rain or cold storms kills them.\n' +
          '• Public vs Private Nest ([TAB]): Open [TAB] → Nest Menu to either invite friends with a private Passcode or set your nest Public for servers/community players to hatch using [Spacebar]!',
        tips:
          'Hatchling Care & Inheritance Tips from J5, {name}:\n' +
          '• Feeding Hatchlings: Young hatchlings spawn fragile with empty stomachs—press/hold [E] near the nest to regurgitate food for babies or carry meat chunks home with [G].\n' +
          '• Inherited Mutations: When hatchlings spawn inside a well-tended nest, they can inherit upgraded/parental mutations directly from their parents!\n' +
          '• Coordinate Shifts: One Carno watches the skyline with [Q] scent pulses while the other incubates eggs or hunts small prey along the plains.',
        hint: 'Check all 3 speckled eggs in our nest mound, {name}, and open the Survival Training Manual for full controls!'
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
          'Screee—selamat tiba di pos utama, {name}! Saya kift90, meninjau kawasan Pusat Alu-aluan dengan sayap Pteranodon. Periksa Papan Alu-aluan di sebelah saya untuk info PC, asas Evrima, dan kesemua 6 stesen sebelum mula terbang!',
        tips:
          'Taklimat Stesen 01 untuk {name} (Pusat Alu-aluan):\n' +
          '• Tekan [E] pada Papan Alu-aluan di sebelah saya untuk melihat pengenalan Evrima serta keperluan PC.\n' +
          '• Tip Pteranodon: Jimatkan stamina ketika meluncur di antara tebing, dan jangan mendarat rendah berhampiran air tempat Deinosuchus bersembunyi!',
        hint: 'Tekan butang di bawah untuk membuka Papan Alu-aluan terus, {name}.'
      },
      kenzy: {
        role: 'Triceratops • Pengawal Stesen 02 Steam & EAC',
        greeting:
          'Berdiri teguh, {name}! Saya kenzy, menjaga Stesen Steam & Easy Anti-Cheat dengan Triceratops. Sebelum merempuh masuk pelayan Evrima, pastikan cabang Steam dan fail EAC anda benar-benar lengkap!',
        tips:
          'Taklimat Stesen 02 untuk {name} (Terminal Steam & EAC):\n' +
          '• Buka monitor terminal ([E]) untuk panduan 10 langkah Steam Properties → Betas → "evrima".\n' +
          '• Semak tab Pengesahan EAC supaya anda tidak ditendang keluar kerana isu Easy Anti-Cheat.\n' +
          '• Tip Trike: Sentiasa hadapkan tanduk ke arah pemangsa dan lindungi bahagian rusuk serta belakang anda!',
        hint: 'Klik di bawah untuk membuka Terminal Steam & EAC terus sekarang, {name}.'
      },
      apollo: {
        role: 'Maiasaura • Pemandu Kawanan Komuniti Stesen 03',
        greeting:
          'Hai {name}! Saya apollo sebagai peninjau Maiasaura di Pos Komuniti. Bermain The Isle jauh lebih menyeronokkan apabila bersama komuniti yang sah dan dipercayai—jom semak senarai portal komuniti di sini!',
        tips:
          'Taklimat Stesen 03 untuk {name} (Direktori Komuniti):\n' +
          '• Baca papan direktori ([E]) untuk meneroka senarai komuniti rasmi seperti IsleLink (18+) dan Obsidian Isle.\n' +
          '• Sentiasa semak peraturan pelayan di Discord rasmi sebelum menyertai kawanan atau pertempuran.\n' +
          '• Tip Maia: Pasang telinga mendengar derapan kaki pemangsa ketika meragut makanan—kepekaan menyelamatkan seluruh kawanan!',
        hint: 'Buka Papan Direktori Komuniti di bawah, {name}, untuk menyemak pautan Discord rasmi.'
      },
      mapotofu: {
        role: 'Tyrannosaurus • Pakar Aplikasi Pendamping & Pelayan Stesen 04',
        greeting:
          'Grrr… salam perkenalan, {name}! Saya mapotofu, mengawal Stesen Aplikasi Pendamping sebagai Tyrannosaurus. Untuk makluman—geng kami bermain di banyak pelayan The Isle, tetapi pelayan utama kami ialah IsleLink dan Obsidian Isle!',
        tips:
          'Taklimat Stesen 04 untuk {name} (Pelayan Utama & Aplikasi Pendamping):\n' +
          '• Pelayan Utama: Kami bermain di pelbagai pelayan, namun dua pelayan utama ialah IsleLink (18+, muat turun companion rasmi di https://islelink.gg/download) dan Obsidian Isle (diedar melalui Discord rasmi).\n' +
          '• Komuniti Tambahan: Anda juga boleh meneroka Noctua Isle & Dino Den di Destinasi 03!\n' +
          '• Tip Rex: Sentiasa muat turun aplikasi pendamping daripada pautan rasmi sahaja!',
        hint: 'Periksa Meja Aplikasi Pendamping di bawah, {name}, untuk pautan rasmi IsleLink & Obsidian Isle.'
      },
      kmy: {
        role: 'Tyrannosaurus • Pengawal Gerbang Utara Stesen 05',
        greeting:
          'Roar! Nampak bersedia nampaknya, {name}. Saya kmy yang mengawal sisi kiri Gerbang Pelepasan Ekspedisi bersama Zapicy. Apabila semua persiapan pos selesai, anda sedia berburu di dunia The Isle!',
        tips:
          'Taklimat Stesen 05 untuk {name} (Gerbang Pelepasan):\n' +
          '• Tekan [E] pada plak gerbang untuk menyemak senarai persediaan akhir Steam, EAC, peraturan komuniti, dan kemahiran survival.\n' +
          '• Tip Serang Hendap Rex: Merangkak perlahan di balik rimbunan pokok sebelum memecut—langkah kaki yang kuat mudah mengantoikan posisi anda!',
        hint: 'Buka Senarai Semak Gerbang Pelepasan di bawah sebelum melancarkan permainan, {name}.'
      },
      Zapicy: {
        role: 'Tyrannosaurus • Marsyal Gerbang Pelepasan Stesen 05',
        greeting:
          'Selamat datang ke Gerbang Utara, {name}! Saya Zapicy, bertugas bersama kmy di Destinasi 05. Pastikan anda turut singgah ke Kem Latihan Survival di laluan barat bersama sai, Dom, dan Shanks di luar pagar!',
        tips:
          'Nasihat Pertempuran & Pelepasan untuk {name}:\n' +
          '• Buka Senarai Semak Pelepasan ([E]) sebagai pengesahan terakhir sebelum melancarkan The Isle.\n' +
          '• Jangan memulakan pertarungan jika stamina bawah 50%—cari perlindungan untuk memulihkan tenaga dan pendarahan dahulu!',
        hint: 'Semak senarai pelepasan di bawah atau kunjungi Kem Latihan Survival, {name}.'
      },
      sai: {
        role: 'Allosaurus • Jurulatih Tempur Kem Latihan Survival',
        greeting:
          'Selamat datang ke dalam benteng kayu, {name}! Saya sai, jurulatih tempur Allosaurus di Kem Latihan Primeval Malaysia. Di keliling unggun api ini, saya dan Dom melatih segala asas untuk hidup lama sehingga dewasa!',
        tips:
          'Kem Survival untuk {name} — Latihan Tempur & Stamina:\n' +
          '• Buka Papan Manual Survival di belakang unggun api ([E]) untuk 6 tab lengkap: Kawalan, Diet, Stamina, Pembiakan, Penglihatan Malam & Tip Pro.\n' +
          '• Tip Allosaurus: Kawal serangan pendarahan secara berperingkat dan jangan sesekali habiskan stamina di bawah 40% semasa bertarung!',
        hint: 'Buka Manual Latihan Survival di bawah, {name}, untuk mempelajari semua mekanik The Isle.'
      },
      Dom: {
        role: 'Dilophosaurus • Jurulatih Malam & Deria Bau Kem Survival',
        greeting:
          'Hiss… rapatlah ke cahaya unggun api, {name}! Saya Dom, jurulatih Dilophosaurus di Kem Latihan Survival. Bila malam menjelma di Evrima, deria bau, bunyi, dan Penglihatan Malam menentukan siapa pemburu dan siapa mangsa!',
        tips:
          'Kem Survival untuk {name} — Teknik Malam & Deria Bau:\n' +
          '• Tekan [N] pada waktu senja/malam untuk Night Vision, tahan [Q] untuk menghidu bau diet/air/sanctuary, dan [H] untuk berehat di dalam semak.\n' +
          '• Tip Dilo: Manfaatkan rimbunan malam untuk mengelak serangan hadapan dinosaur berat dan pasang telinga pada setiap bunyi semak!',
        hint: 'Buka Manual Latihan Survival di bawah, {name}, untuk membaca kesemua panduan penuh.'
      },
      shanks: {
        role: 'Ceratosaurus • Pembisik Mutasi Tersembunyi Luar Benteng',
        greeting:
          '(berbisik perlahan dari balik pagar kayu) Psst… rapat sedikit, {name}. Jangan kuat sangat nanti sai dengan Dom di dalam terdengar… Cuba jawab, {name}—tahu tak tentang Mutasi Tersembunyi (Hidden Mutations) di Evrima, macam Reniculate Kidneys atau Reinforced Tendons… dan syarat rahsia nak membukanya dalam satu nyawa?',
        tips:
          '(menundukkan kepala bertanduk Cerato lebih dekat) Bagus, {name}… Mutasi biasa memang muncul pada roda pembesaran—tetapi Mutasi Tersembunyi hanya terbuka jika tubuh anda melepasi ujian hidup tertentu!\n\nPilih mana-mana rahsia mutasi di bawah untuk tahu syarat sebenar membukanya, {name}!',
        hint: 'Klik mutasi rahsia di bawah untuk tanya Shanks secara terperinci, {name}.'
      },
      cocomelon: {
        role: 'Carnotaurus Biru Muda • Jurulatih Courting & Sarang',
        greeting:
          'Hai {name}! Saya Cocomelon—saya dan J5 bina sarang 3 telur di antara S4 dan S5 ini untuk ajar anda cara Courting dan Nesting dalam The Isle: Evrima!\n\n' +
          'Fahami 4 Syarat Asas Courting sebelum bertelur, {name}:\n' +
          '• Spesies Sama & Berlainan Jantina: Pasangan mestilah spesies sama (jantan + betina) dan cukup umur dewasa.\n' +
          '• Keluar Group Dahulu: KEDUA-DUA dinosaur tidak boleh berada dalam mana-mana pack/herd semasa memulakan courting!\n' +
          '• Ritual Berdepan (Tahan N): Berdiri berhadapan (Deinosuchus wajib di permukaan air) dan sama-sama TAHAN [N] sehingga animasi berpasangan selesai.\n' +
          '• Bina Sarang (Tahan N): Pilih kawasan rata yang tersorok dari laluan pemangsa dan TAHAN [N] untuk bina sarang!',
        tips:
          'Tip Sarang Carno daripada Cocomelon, {name}:\n' +
          '• Kumpul Bahan Sarang: Beberapa jenis sarang memerlukan anda mengutip ranting/lumpur menggunakan [G] dan pasang dengan [E] sebelum bertelur.\n' +
          '• Sorok Lokasi Sarang: Jangan bina berhampiran batu minuman utama sungai—bunyi anak menetas menarik perhatian pemangsa besar!\n' +
          '• Kekalkan Nutrien Diet (α / β / γ): Penuhi simbol Alpha, Beta dan Gamma agar telur sihat dan tidak busuk.',
        hint: 'Berbual dengan J5 (Carnotaurus merah jambu) di sebelah untuk ilmu penjagaan telur & anak!'
      },
      j5: {
        role: 'Carnotaurus Merah Jambu • Pakar Penjagaan Telur & Anak',
        greeting:
          'Hai {name}! Saya J5, menjaga 3 biji telur ini bersama Cocomelon. Lepas siap courting dan sarang dibina, ini cara menguruskan telur & anak:\n\n' +
          '• Jaga Suhu & Telur Busuk: Salah seorang ibu/bapa perlu duduk di sarang supaya suhu telur kekal panas. Jika ada telur rosak/busuk akibat diet rendah, berdiri dan TAHAN [E] untuk buang telur busuk!\n' +
          '• Jemputan Sarang ([TAB]): Buka menu [TAB] → Nest untuk tetapkan kod rahsia (Private Passcode) bagi rakan atau buka secara Public supaya pemain lain boleh menetas dengan menekan [Spacebar].',
        tips:
          'Tip Menjaga Anak & Pewarisan Mutasi dari J5, {name}:\n' +
          '• Suap Anak Baru Menetas: Tekan/tahan [E] di sarang untuk memuntahkan makanan (regurgitate) bagi anak kecil, atau bawa pulang ketulan daging menggunakan [G].\n' +
          '• Pewarisan Mutasi: Anak yang menetas dari sarang ibu bapa berpotensi mewarisi mutasi terkuat ibu bapa!\n' +
          '• Bergilir Mengawal: Seorang menjaga sarang manakala seorang lagi menghidu [Q] dan memburu sekitar padang.',
        hint: 'Perhatikan 3 telur di sarang kami ini, {name}, dan buka Manual Kem Latihan untuk rujukan penuh!'
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
          'Screee—welcome ke pos kem {name}! Aku kift90, jaga port Welcome Centre ni naik Pteranodon. Check dulu Papan Notice sebelah aku ni untuk spec PC, intro Evrima, dengan 6 stesen kat kem ni sebelum terbang tinggi!',
        tips:
          'Briefing Stesen 01 untuk {name} (Welcome Centre):\n' +
          '• Tekan [E] kat Papan Notice sebelah aku ni untuk check benda wajib sebelum start.\n' +
          '• Tip Ptera: Jimat stamina masa glide jauh, jangan syok terbang rendah sangat atas sungai sebab Deinosuchus tunggu nak ngap kat bawah tu!',
        hint: 'Klik button kat bawah kalau nak terus buka Papan Welcome Centre, {name}!'
      },
      kenzy: {
        role: 'Triceratops • Penjaga Stesen 02 Steam & EAC',
        greeting:
          'Steady {name}! Aku kenzy, jaga port Terminal Steam & Easy Anti-Cheat pakai Triceratops. Sebelum korang rempuh server Evrima, make sure Steam branch dengan EAC korang dah padu, takde error!',
        tips:
          'Briefing Stesen 02 untuk {name} (Terminal Steam & EAC):\n' +
          '• Tekan [E] kat monitor tu untuk follow 10 step tukar branch ke "evrima" dalam Steam Properties.\n' +
          '• Check sekali tab EAC Verification biar tak kena kick tiba-tiba masa tengah main.\n' +
          '• Tip Trike: Jangan bagi belakang kat carnivore—halakan tanduk depan-depan dan jaga stamina block!',
        hint: 'Tekan bawah ni untuk buka terus Terminal Steam & EAC, {name}!'
      },
      apollo: {
        role: 'Maiasaura • Guide Komuniti Stesen 03',
        greeting:
          'Yo {name}! Aku apollo kat pos Maiasaura depan Papan Komuniti ni. Main The Isle lagi syok kalau masuk server komuniti yang elok dan verified—jom tengok port mana yang onz!',
        tips:
          'Briefing Stesen 03 untuk {name} (Direktori Komuniti):\n' +
          '• Tekan [E] kat papan tu untuk check senarai komuniti rasmi macam IsleLink (18+) dan Obsidian Isle.\n' +
          '• Baca rules dalam Discord rasmi diaorang dulu sebelum main—jangan main redah nanti kena warn admin!\n' +
          '• Tip Maia: Tengah makan pun telinga kena alert bunyi tapak kaki dalam hutan!',
        hint: 'Buka Direktori Komuniti kat bawah ni, {name}, untuk tengok link Discord rasmi!'
      },
      mapotofu: {
        role: 'Tyrannosaurus • Otai Stesen 04 Companion & Server Utama',
        greeting:
          'Grrr… apa khabar {name}! Aku mapotofu, jaga Meja Companion App pakai T-Rex kat sini. Bagitahu awal-awal ya—geng Primeval Malaysia memang main banyak server, tapi dua server utama kitaorang ialah IsleLink dengan Obsidian Isle!',
        tips:
          'Briefing Stesen 04 untuk {name} (Server Utama & Companion App):\n' +
          '• Server Utama: Memang kitaorang pusing banyak server, tapi main server ialah IsleLink (18+, link rasmi companion kat https://islelink.gg/download) dan Obsidian Isle (ambil companion kat Discord rasmi diaorang).\n' +
          '• Server Extra: Boleh check juga Noctua Isle dengan Dino Den kat Destinasi 03!\n' +
          '• Tip Rex: Download companion app dari sumber official je—elak link scam!',
        hint: 'Tekan bawah ni, {name}, untuk tengok link rasmi IsleLink & Obsidian Isle!'
      },
      kmy: {
        role: 'Tyrannosaurus • Warden Pintu Pelepasan Stesen 05',
        greeting:
          'Roar! Dah nak ready masuk server ke tu, {name}? Aku kmy jaga tiang kiri Gerbang Pelepasan dengan Zapicy. Kalau semua stesen dah check elok, barulah padu nak survive dalam Primeval Malaysia!',
        tips:
          'Briefing Stesen 05 untuk {name} (Pintu Pelepasan):\n' +
          '• Tekan [E] kat papan gerbang tu untuk double-check semua step Steam, EAC, komuniti, dengan survival dah siap.\n' +
          '• Tip Ambush Rex: Jalan tunduk senyap-senyap ikut celah pokok besar dulu—kalau mangsa dengar bunyi tapak kaki berat kau, memang lesap dia lari!',
        hint: 'Buka Senarai Semak Pelepasan kat bawah, {name}, untuk tengok readiness korang.'
      },
      Zapicy: {
        role: 'Tyrannosaurus • Marshal Kanan Stesen 05',
        greeting:
          'Selamat sampai ke Gerbang Utara, {name}! Aku Zapicy, partner kmy kat Destinasi 05 ni. Jangan lupa singgah Kem Latihan Survival kat belah barat dengan sai, Dom, dan Shanks kat luar pagar dulu!',
        tips:
          'Pesan Otai S5 untuk {name}:\n' +
          '• Check Senarai Pelepasan ([E]) biar tak tertinggal satu benda pun sebelum launch game.\n' +
          '• Kalau stamina bawah 50%, jangan gatal nak fight! Cari semak, rehat, bagi bleed berhenti dulu!',
        hint: 'Tekan bawah, {name}, untuk check Senarai Pelepasan atau gerak ke Kem Survival.'
      },
      sai: {
        role: 'Allosaurus • Cikgu Combat Kem Latihan Survival',
        greeting:
          'Masuk je ikut pintu gerbang tu, {name}! Aku sai, instructor Allosaurus kat Primeval Malaysia Training Camp ni. Kat keliling unggun api ni, aku dengan Dom ajar semua skill wajib biar dino korang hidup lama!',
        tips:
          'Kem Survival untuk {name} — Latihan Fight & Stamina:\n' +
          '• Tekan [E] kat Papan Manual belakang unggun api tu untuk buka semua 6 tab: Controls, Diet, Stamina, Nesting, Night Vision & Pro Tips.\n' +
          '• Tip Allo: Main gigit bleed dan jaga spacing—jangan sesekali habiskan stamina sampai kosong kalau tengah kena kejar!',
        hint: 'Tekan bawah ni, {name}, untuk buka Manual Latihan Survival penuh!'
      },
      Dom: {
        role: 'Dilophosaurus • Cikgu Malam & Bau Kem Latihan Survival',
        greeting:
          'Hiss… mari duduk dekat sikit kat unggun api ni, {name}! Aku Dom pakai Dilophosaurus jaga sesi malam Survival Camp. Siang memang ramai tunjuk taring, tapi bila malam gelap kat Evrima, bau, bunyi, dengan Night Vision yang tentukan siapa menang!',
        tips:
          'Kem Survival untuk {name} — Ilmu Malam & Ambush:\n' +
          '• Tekan [N] bila malam untuk buka Night Vision, tahan [Q] untuk hidu bau makanan/air/sanctuary, dan tekan [H] untuk rehat dalam semak tebal.\n' +
          '• Tip Dilo: Malam-malam jangan bising, serang dari tepi/belakang dan dengar betul-betul bunyi semak berdekatan!',
        hint: 'Tekan bawah ni, {name}, untuk baca semua tab Manual Latihan Survival.'
      },
      shanks: {
        role: 'Ceratosaurus • Pembisik Rahsia Mutasi Luar Pagar',
        greeting:
          '(bisik perlahan sebelah pagar kayu) Psst… sini jap {name}. Slow sikit suara tu, jangan bagi sai dengan Dom kat dalam tu dengar… Kau tahu tak pasal Hidden Mutations dalam The Isle: Evrima, macam Reniculate Kidneys atau Reinforced Tendons… dengan cara nak unlock benda tu?',
        tips:
          '(condongkan kepala Cerato rapat-rapat) Haa dengar sini, {name}… Mutasi biasa tu memang keluar automatik—tapi Hidden Mutations kena buat benda rahsia dalam nyawa yang sama baru dia muncul!\n\nKlik mana-mana mutasi kat bawah ni kalau nak aku bisikkan cara unlock dia, {name}!',
        hint: 'Pilih mutasi rahsia kat bawah untuk korek rahsia daripada Shanks, {name}.'
      },
      cocomelon: {
        role: 'Carnotaurus Biru Muda • Cikgu Courting & Buat Sarang',
        greeting:
          'Yo {name}! Aku Cocomelon—aku dengan J5 bikin sarang 3 telur kat antara S4 dengan S5 ni nak ajar korang cara Courting dengan Nesting kat The Isle: Evrima!\n\n' +
          'Sebelum nak bertelur, ingat 4 Syarat Wajib Courting ni, {name}:\n' +
          '• Spesies Sama & Jantina Lain: Kena jantan + betina spesies sama dan dah cukup umur membiak.\n' +
          '• Keluar Group Dulu: Dua-dua TAK BOLEH ada dalam mana-mana pack/herd! Leave group dulu kalau dah join kawan.\n' +
          '• Mengadap Muka & Hold [N]: Duduk rapat mengadap (kalau buaya Deino wajib atas air) lepas tu sama-sama HOLD [N] sampai jadi pasangan!\n' +
          '• Pacak Sarang (Hold N): Cari tanah rata tersorok dalam semak, lepas tu HOLD [N] untuk naikkan sarang!',
        tips:
          'Tips Carno Cocomelon untuk {name}:\n' +
          '• Kutip Ranting/Lumpur: Ada sarang kena angkat ranting guna [G] lepas tu tekan [E] kat sarang sebelum boleh bertelur.\n' +
          '• Jaga Port & Diet (α / β / γ): Penuhkan nutrien Alpha, Beta dengan Gamma masa bunting supaya telur cun dan tak cepat busuk.\n' +
          '• Lepas ni tanya pulak J5 kat sebelah pasal jaga 3 telur dengan passcode sarang!',
        hint: 'Tengok sarang 3 telur ni atau sembang dengan J5 (Carno pink) kat sebelah!'
      },
      j5: {
        role: 'Carnotaurus Pink • Pakar Jaga Telur, Suhu & Anak',
        greeting:
          'Hi {name}! Aku J5, tengah erami 3 biji telur ni dengan Cocomelon. Bila pasangan dah siap bina sarang, ni benda wajib korang buat:\n\n' +
          '• Eram Suhu & Buang Telur Busuk: Bergilir duduk atas sarang bagi telur panas. Kalau ada telur rosak/busuk, bangun lepas tu HOLD [E] nak buang telur busuk!\n' +
          '• Menu Sarang ([TAB]): Tekan [TAB] → Nest boleh set Sarang Public (sesiapa boleh request masuk) atau Private Passcode untuk member je menetas tekan [Spacebar]!',
        tips:
          'Tips Jaga Baby Dino dari J5, {name}:\n' +
          '• Bagi Anak Makan: Baby baru keluar lemah—tahan [E] kat sarang untuk muntahkan makanan (regurgitate) atau angkut daging guna [G] bawak balik sarang.\n' +
          '• Waris Mutasi Ibu Bapa: Anak yang lahir dari sarang boleh mewarisi mutasi padu mak pak dia tau!\n' +
          '• Cover Kawasan: Sorang tunggu sarang, sorang lagi hold [Q] scan bau cari mangsa dekat padang.',
        hint: 'Check Manual Kem Latihan Survival untuk hafal semua simbol α β γ dengan butang kawalan!'
      }
    }
  }
};

export const SURVIVAL_MANUAL = {
  en: {
    intro:
      'Welcome inside Primeval Malaysia Training Camp (fact-checked against theisle.info)! Explore every tab below to master Evrima core controls, Alpha (α) / Beta (β) / Gamma (γ) diets, HUD status icons, courting & nesting, Elder entombing, and pro habits.',
    markReviewedBtn: 'Mark Survival Training Complete',
    reviewedBadge: '✓ SURVIVAL TRAINING COMPLETED',
    instructorsNote: 'Inside Instructors: sai (Allosaurus) & Dom (Dilophosaurus) • Nesting Coaches outside S4–S5: Cocomelon & J5 (Carnotaurus)',
    iconsSectionTitle: 'Evrima HUD Status & Diet Symbols Reference',
    tabs: [
      {
        id: 'controls',
        label: '1. CONTROLS & MOVES',
        title: 'Verified Evrima Default Controls, Combat & Senses',
        summary: 'Fact-checked Evrima keybinds—including Night Vision (X), Courting/Nesting (Hold N), and Safe-Log Sleep (Hold H).',
        cards: [
          {
            heading: 'Locomotion, Posture & Safe-Log',
            items: [
              'WASD — Move • Shift — Sprint • Space — Jump (or Hatch from an invited nest egg)',
              'CTRL — Crouch / Dive underwater to shrink silhouette and mute footsteps',
              'Z — Toggle Walk / Trot (also acts as airbrake for Pteranodon) • C — Species movement / trot toggle',
              'H — Rest to recover stamina/bleeding fast • Hold H — Sleep (required to Safe-Log out safely & access Entomb)'
            ]
          },
          {
            heading: 'Combat, Specials & Scent (Q / X / TAB)',
            items: [
              'Left Click (LMB) — Primary Bite / Strike • Right Click (RMB) — Special Species Ability (Pounce, Ram, Charge, Thrust)',
              'Alt + LMB / RMB — Free-look & directional Alt-attack behind or beside your dinosaur',
              'Hold Q — Scent Pulse (tracks water, food organs, diet plants, migration zones & sanctuaries)',
              'X — Toggle Night Vision • TAB — Open Character Profile, α / β / γ Diet, Mutations & Nest menu'
            ]
          },
          {
            heading: 'Calls (1–4), Interact (E/G) & Nesting (N)',
            items: [
              '1 — Broadcast (loud long-range roar) • 2 — Friendly (pack/herd invite when facing same species)',
              '3 — Aggressive Threat Display • 4 — Danger / Submissive Call',
              'E — Eat / Drink / Interact / Hold E to clean rotten eggs • G — Grab/Carry meat chunks, twigs, or small prey',
              'Hold N — Court opposite-sex partner (out of group) OR construct a Nest on flat cover'
            ]
          }
        ]
      },
      {
        id: 'diet',
        label: '2. α / β / γ DIET & WATER',
        title: 'Alpha (α), Beta (β), Gamma (γ) Nutrients & Safe Drinking',
        summary: 'Combining all three Greek diet symbols unlocks Perfect Diet growth bonuses and qualifies your dinosaur for Prime / Elder progression.',
        cards: [
          {
            heading: 'The 3 Evrima Nutrient Symbols (Hold Q / TAB)',
            items: [
              'α (Alpha — Carbohydrates): Essential energy nutrient; carnivores harvest α by eating Lungs from carcasses.',
              'β (Beta — Proteins): Muscle & growth nutrient; carnivores harvest β by eating Hearts from carcasses.',
              'γ (Gamma — Lipids / Fats): Endurance & recovery nutrient; carnivores harvest γ by eating Intestines from carcasses.',
              'Perfect Diet & Elder Rule: Keeping α, β, and γ balanced speeds Growth, Stamina/Health regen & bleed recovery; holding at least 1% in all three qualifies for Prime/Elder bonuses!'
            ]
          },
          {
            heading: 'Herbivore Grazing & Stomach Preservation',
            items: [
              'Herbivores/Omnivores track species-specific fruits, roots, and algae shown via Hold Q scent pulses matching α, β, and γ.',
              'Emergency Graze: Plain grass prevents starvation (~20% hunger) without giving nutrient buffs—save stomach space for true diet plants!'
            ]
          },
          {
            heading: 'Surviving Waterholes (Deinosuchus Warning!)',
            items: [
              'Never drink directly at deep murky river drop-offs or popular drinking rocks—giant Deinosuchus crocodiles lurk just beneath the surface.',
              'Drink at shallow sunlit riffles, narrow stream bends, or isolated ponds while spinning your camera continuously!'
            ]
          }
        ]
      },
      {
        id: 'stamina',
        label: '3. STAMINA & HEALING',
        title: 'Stamina Management, Fractures, Bleed & Oxygen',
        summary: 'In Evrima, draining your stamina bar or ignoring bleed/fracture HUD icons is almost always fatal.',
        cards: [
          {
            heading: 'Golden Rule of Stamina',
            items: [
              'NEVER sprint continuously across open plains until empty. Keep at least 60% stamina in reserve whenever traveling.',
              'Stamina regenerates fastest when still or crouching; press H to sit and recover before pushing across open ground.',
              'When chased, break line of sight around rocks and dense forest trunks rather than running in a straight line.'
            ]
          },
          {
            heading: 'Bleed, Fractures & Dehydration Alerts',
            items: [
              'Bleed Icon (Drop): Sprinting drains blood fast—halt, wallow in mud pools, and rest (H) until clotting completes.',
              'Fractures (Leg/Body/Head): Steep falls cripple speed or bite damage; rest safely in cover until the fracture bar clears.',
              'Monitor Hunger, Thirst, Dehydration & Oxygen hexagons on your HUD—never drown mid-swim or cross plains dry!'
            ]
          }
        ]
      },
      {
        id: 'nesting',
        label: '4. NESTING & ELDER',
        title: 'Courting (Hold N), Nesting, Packs & Elder Entombing',
        summary: 'Raise offspring together with Cocomelon & J5’s rules, protect juveniles in Sanctuaries, and Entomb at 100% Elder!',
        cards: [
          {
            heading: 'Courting & Nesting Essentials (Hold N)',
            items: [
              'Find a same-species, opposite-sex partner (neither in any active group); face closely and both HOLD N to court.',
              'Hold N on hidden flat terrain to build your nest, deposit sticks/debris with G/E if needed, and keep diet α/β/γ high to avoid rotten eggs.',
              'Sit on eggs to keep temperature warm, Hold E to clear rotten eggs, and use TAB → Nest for Public or Passcode invitations (Space to hatch!).'
            ]
          },
          {
            heading: 'Mutations & Elder Entombing (100% Growth)',
            items: [
              'Pick normal mutations at Juvenile, Sub-Adult, and Adult slots, or unlock Secret Mutations like Shanks teaches outside the wall.',
              'Elder Entombing: At 100% growth (Elder), Hold H to sleep, open TAB → Mutations, and select Entomb to restart at 25% Juvenile carrying upgraded stacked mutations (up to 4 generations / 16 slots)!'
            ]
          },
          {
            heading: 'Sanctuaries, Migration & Server Rules',
            items: [
              'Follow red palm-tree icons (Hold Q) to Juvenile Sanctuaries guarded against adult apexes by bees; follow footprints to Migration feeding zones.',
              'Always verify mix-packing, over-packing, and body-down rules in Destination 03 before grouping (Press 2).'
            ]
          }
        ]
      },
      {
        id: 'night',
        label: '5. NIGHT & STEALTH',
        title: 'Night Vision (X Key), Storms, Mud & Audio Survival',
        summary: 'Survive pitch-black nights, rainstorms, and nocturnal stalkers like Dilophosaurus and Troodon.',
        cards: [
          {
            heading: 'Mastering Darkness (X Key — Not N!)',
            items: [
              'Press X to toggle Night Vision on or off (Hold N is strictly for Courting & Nesting!). Vision range varies widely by species.',
              'Avoid sprinting blindly near cliff edges during tropical storms—crouch silently in evergreen cover until visibility clears.'
            ]
          },
          {
            heading: 'Audio & Mud Camouflage',
            items: [
              'Wallowing in mud pits applies a protective coat that dampens scent trails and slows light bleeding.',
              'Use stereo headphones: foliage rustles, heavy footsteps, and water splashes betray hidden ambushes before you spot them!'
            ]
          }
        ]
      },
      {
        id: 'tips',
        label: '6. PRO SURVIVAL TIPS',
        title: 'Veteran Habits Fact-Checked for Primeval Malaysia',
        summary: 'Key habits that double your survival odds on Gateway from day one.',
        cards: [
          {
            heading: 'Top 6 Mistakes New Survivors Make',
            items: [
              'Spamming 1-calls (Broadcast) gives away your exact location and growth size to hungry Allosaurus, Carno, and Rex packs.',
              'Never go AFK in the open or beside water—crouch deep inside dark bushes and scan horizon silhouettes first.',
              'Always Hold H to Safe-Log through the full timer so your dinosaur disappears cleanly instead of standing defenseless.',
              'Do not trust random 2-calls beside fresh kills—keep escape corridors behind you at all times.',
              'Verify Gateway map legends [M] frequently so you know freshwater riffles vs Deinosuchus-heavy rivers.',
              'Visit Cocomelon & J5 at the Carnotaurus Nest (between S4 & S5) for hands-on courting/nesting coaching and join our Discord!'
            ]
          }
        ]
      }
    ]
  },

  ms: {
    intro:
      'Selamat datang ke Kem Latihan Primeval Malaysia (disemak fakta berpandukan theisle.info)! Kuasai kawalan Evrima yang tepat, sistem diet simbol Alpha (α), Beta (β), Gamma (γ), ikon status HUD, courting & sarang, serta Elder Entombing.',
    markReviewedBtn: 'Tanda Latihan Survival Selesai',
    reviewedBadge: '✓ LATIHAN SURVIVAL SELESAI',
    instructorsNote: 'Jurulatih Dalam Kem: sai (Allosaurus) & Dom (Dilophosaurus) • Jurulatih Sarang antara S4–S5: Cocomelon & J5 (Carnotaurus)',
    iconsSectionTitle: 'Rujukan Ikon Status HUD & Simbol Diet Evrima',
    tabs: [
      {
        id: 'controls',
        label: '1. KAWALAN & AKSI',
        title: 'Kawalan Rasmi Evrima, Tempur & Panggilan Suara',
        summary: 'Kuasai keybind sebenar Evrima—Night Vision menggunakan butang X, manakala Courting/Sarang ialah Tahan N.',
        cards: [
          {
            heading: 'Pergerakan, Senyap & Log Keluar Selamat',
            items: [
              'WASD — Gerak • Shift — Pecut • Space — Lompat (atau menetas dari telur sarang)',
              'CTRL — Membongkok (Crouch) / Menyelam dalam air & kurangkan bunyi langkah',
              'Z — Tukar jalan/berlari anak (juga airbrake untuk Pteranodon) • C — Tukar kelajuan spesies',
              'H — Rehat pulih stamina & luka • Tahan H — Tidur (wajib untuk Safe-Log keluar & menu Entomb)'
            ]
          },
          {
            heading: 'Serangan, Deria Bau (Q) & Night Vision (X)',
            items: [
              'Klik Kiri (LMB) — Gigitan Utama • Klik Kanan (RMB) — Kuasa Khas Spesies (Pounce, Rempuhan dll.)',
              'Alt + LMB / RMB — Pandangan bebas & serangan arah belakang/sisi',
              'Tahan Q — Deria Bau (mengesan air, organ makanan, tumbuhan diet, migrasi & sanctuary)',
              'X — Tukar Night Vision • TAB — Buka Profil, Diet α / β / γ, Mutasi & Menu Sarang'
            ]
          },
          {
            heading: 'Panggilan (1–4), Interaksi (E/G) & Sarang (N)',
            items: [
              '1 — Broadcast (kuat, didengari jauh) • 2 — Friendly Call (jemput pack/herd apabila dekat)',
              '3 — Ancaman / Agresi • 4 — Bahaya / Menyerah',
              'E — Makan / Minum / Interaksi (Tahan E buang telur busuk) • G — Angkat daging, ranting atau anak',
              'Tahan N — Courting pasangan berlainan jantina (luar group) ATAU membina Sarang'
            ]
          }
        ]
      },
      {
        id: 'diet',
        label: '2. DIET α / β / γ & AIR',
        title: 'Sistem Diet Alpha (α), Beta (β), Gamma (γ) & Air Selamat',
        summary: 'Menyeimbangkan ketiga-tiga simbol nutrien Yunani memberi bonus Perfect Diet dan melayakkan watak anda ke fasa Prime / Elder.',
        cards: [
          {
            heading: '3 Simbol Nutrien Evrima (Tahan Q / TAB)',
            items: [
              'α (Alpha — Karbohidrat): Sumber tenaga; karnivor mendapat nutrien α daripada Paru-paru (Lungs) bangkai.',
              'β (Beta — Protein): Membina tubuh & pembesaran; karnivor mendapat nutrien β daripada Jantung (Hearts) bangkai.',
              'γ (Gamma — Lipid / Lemak): Ketahanan & pemulihan; karnivor mendapat nutrien γ daripada Usus (Intestines) bangkai.',
              'Syarat Perfect Diet & Elder: Menjaga keseimbangan α, β, dan γ mempercepatkan Growth serta pemulihan darah; memegang sekurang-kurangnya 1% pada ketiga-tiganya melayakkan anda ke tahap Prime/Elder!'
            ]
          },
          {
            heading: 'Meragut Rumput (Herbivor)',
            items: [
              'Herbivor mengesan tumbuhan diet sepadan α, β, γ menerusi deria bau [Q].',
              'Rumput biasa (Graze) hanya menahan lapar (~20% perut) tanpa bonus diet—simpan ruang perut untuk tumbuhan diet sebenar!'
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
        summary: 'Kehabisan stamina atau mengabaikan ikon amaran darah & dahaga hampir pasti membawa maut.',
        cards: [
          {
            heading: 'Peraturan Emas Stamina',
            items: [
              'JANGAN pecut sehingga stamina kosong di padang terbuka—simpan sekurang-kurangnya 60% stamina sebagai simpanan kecemasan.',
              'Berhenti di dalam semak dan tekan H untuk pulih cepat sebelum meneruskan perjalanan.'
            ]
          },
          {
            heading: 'Pendarahan, Patah Tulang & Oksigen',
            items: [
              'Berlari ketika mengalami pendarahan mempercepatkan kehilangan darah—berkubang dalam lumpur serta berehat diam (H) memperlahankan bleed.',
              'Kecederaan tulang akibat jatuh cerun mengurangkan kelajuan sehingga anda berehat cukup lama.',
              'Pantau ikon HUD Kelaparan, Kehausan, Dehidrasi, Darah & Oksigen sentiasa.'
            ]
          }
        ]
      },
      {
        id: 'nesting',
        label: '4. SARANG & ELDER',
        title: 'Courting (Tahan N), Sarang, Kawanan & Elder Entombing',
        summary: 'Ikut panduan Cocomelon & J5 membina sarang, jaga anak di Sanctuary, dan guna sistem Entomb apabila 100% Elder!',
        cards: [
          {
            heading: 'Asas Courting & Sarang (Tahan N)',
            items: [
              'Cari pasangan spesies sama & berlainan jantina (kedua-duanya wajib keluar dari group dahulu), berdiri berhadapan dan sama-sama TAHAN N.',
              'Tahan N di tanah rata tersorok untuk bina sarang, kumpul ranting [G]/[E] jika perlu, dan jaga diet α/β/γ supaya telur tidak busuk.',
              'Eram telur agar suhu kekal panas, tahan E untuk buang telur busuk, dan buka TAB → Nest untuk kod rahsia atau Public (Space untuk menetas!).'
            ]
          },
          {
            heading: 'Mutasi & Elder Entombing (100% Growth)',
            items: [
              'Pilih mutasi biasa di fasa Juvenile, Sub-Adult & Adult, atau buka Mutasi Tersembunyi daripada bisikan Shanks di luar dinding.',
              'Elder Entombing: Capai 100% growth (Elder), tidur dengan Tahan H, buka TAB → Mutations dan tekan Entomb untuk lahir semula sebagai 25% Juvenile bersama mutasi yang diperkuatkan (sehingga 4 generasi / 16 slot)!'
            ]
          },
          {
            heading: 'Sanctuary, Migrasi & Peraturan Pelayan',
            items: [
              'Ikut ikon pokok palma merah [Q] untuk ke Juvenile Sanctuary yang dilindungi lebah daripada pemangsa besar; ikut tapak kaki untuk Zon Migrasi.',
              'Patuhi had pack/herd (tekan 2 untuk jemput) dan peraturan pelayan komuniti di Destinasi 03.'
            ]
          }
        ]
      },
      {
        id: 'night',
        label: '5. MALAM & SENYAP',
        title: 'Night Vision (Butang X), Cuaca Ribut, Lumpur & Audio',
        summary: 'Kuasai waktu malam supaya tidak menjadi mangsa hendap Dilophosaurus atau Troodon.',
        cards: [
          {
            heading: 'Bertahan Pada Waktu Malam (Butang X)',
            items: [
              'Tekan X untuk aktifkan atau tutup Night Vision (Tahan N ialah untuk Courting & Sarang!). Jarak penglihatan berbeza mengikut spesies.',
              'Berhenti di balik rimbunan pokok tebal jika ribut gelap membataskan pandangan supaya tidak terjatuh gaung.'
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
        summary: 'Elakkan kesilapan lazim pemain baharu di Gateway sejak hari pertama.',
        cards: [
          {
            heading: '6 Perkara Penting Pemain Baharu',
            items: [
              'Jangan kerap menekan panggilan 1 (Broadcast) kerana pemangsa boleh menganggar saiz dan lokasi anda.',
              'Jangan sesekali AFK di tempat terbuka atau tepi tasik—sembunyi di semak gelap terlebih dahulu.',
              'Sentiasa Tahan H hingga kiraan tamat Safe-Log habis sebelum menutup permainan agar watak tidak mati terdedah.',
              'Jangan terlalu cepat mempercayai panggilan 2 berhampiran bangkai segar.',
              'Semak legenda Peta Gateway [M] untuk membezakan anak sungai cetek selamat daripada lubuk Deinosuchus.',
              'Lawati Cocomelon & J5 di Sarang Carnotaurus (antara S4 & S5) untuk latihan sarang lengkap serta sertai Discord komuniti!'
            ]
          }
        ]
      }
    ]
  },

  kl: {
    intro:
      'Welcome masuk Primeval Malaysia Training Camp bro (semua info ni kita fact-check terus ikut theisle.info)! Khatamkan controls Evrima betul, sistem diet Alpha (α), Beta (β), Gamma (γ), ikon HUD, courting & buat sarang, sampai Elder Entombing.',
    markReviewedBtn: 'Tanda Latihan Survival Dah Khatam',
    reviewedBadge: '✓ LATIHAN SURVIVAL KHATAM',
    instructorsNote: 'Cikgu Dalam Kem: sai (Allosaurus) & Dom (Dilophosaurus) • Cikgu Sarang antara S4–S5: Cocomelon & J5 (Carnotaurus)',
    iconsSectionTitle: 'Panduan Ikon Status HUD & Simbol Diet Evrima',
    tabs: [
      {
        id: 'controls',
        label: '1. CONTROLS & SKILL',
        title: 'Button Sebenar Evrima, Combat & Call Dino',
        summary: 'Hafal button betul ikut Evrima—Night Vision guna X, manakala Courting/Sarang baru guna Hold N!',
        cards: [
          {
            heading: 'Jalan, Menyelinap & Safe-Log',
            items: [
              'WASD — Gerak • Shift — Pecut • Space — Lompat (atau hatch keluar telur sarang)',
              'CTRL — Tunduk (Crouch) / Menyelam dalam air biar senyap tapak kaki',
              'Z — Tukar jalan/trot (atau airbrake untuk Pteranodon) • C — Tukar speed/trot spesies',
              'H — Duduk/Rest cepat pulih stamina & bleed • Hold H — Tidur (wajib buat Safe-Log & menu Entomb)'
            ]
          },
          {
            heading: 'Combat, Hidu Bau (Q) & Night Vision (X)',
            items: [
              'Left Click (LMB) — Gigit / Attack biasa • Right Click (RMB) — Skill Khas (Pounce, Tanduk, Rempuh dll.)',
              'Alt + LMB / RMB — Pusing kamera tengok belakang & Alt-Bite arah korang nak',
              'Hold Q — Hidu Bau (tunjuk port air, organ diet, buah, migrasi & sanctuary)',
              'X — Bukak Night Vision • TAB — Bukak Profile, Diet α / β / γ, Mutasi & Menu Sarang'
            ]
          },
          {
            heading: 'Call (1–4), Button Guna (E/G) & Sarang (N)',
            items: [
              '1 — Broadcast (kuat gila satu map dengar!) • 2 — Friendly Call (ajak join pack/herd)',
              '3 — Garang / Halau • 4 — Bahaya / Menyerah',
              'E — Makan / Minum / Interaksi (Hold E buang telur busuk) • G — Angkat daging, ranting atau baby',
              'Hold N — Courting pasangan berlainan jantina (luar group) ATAU pacak Sarang'
            ]
          }
        ]
      },
      {
        id: 'diet',
        label: '2. DIET α / β / γ & AIR',
        title: 'Sistem Diet Alpha (α), Beta (β), Gamma (γ) & Port Air',
        summary: 'Lengkapkan ketiga-tiga simbol nutrien ni baru dapat Perfect Diet dengan layak ke fasa Prime / Elder!',
        cards: [
          {
            heading: '3 Simbol Diet Evrima (Hold Q / TAB)',
            items: [
              'α (Alpha — Karbohidrat): Sumber tenaga; karnivor makan Paru-paru (Lungs) dari bangkai untuk isi α.',
              'β (Beta — Protein): Naikkan pembesaran otot; karnivor makan Jantung (Hearts) dari bangkai untuk isi β.',
              'γ (Gamma — Lipid / Lemak): Stamina & ketahanan; karnivor makan Usus (Intestines) dari bangkai untuk isi γ.',
              'Syarat Perfect Diet & Elder: Jaga α, β, dan γ sekali gus lajukan Growth dengan bleed recovery; hold at least 1% pada ketiga-tiganya untuk layak Prime/Elder!'
            ]
          },
          {
            heading: 'Graze Rumput (Herbivor Kecemasan)',
            items: [
              'Hold Q cari tumbuhan diet sepadan α, β, γ.',
              'Kalau terdesak lapar, herbivor boleh ragut rumput biasa (~20% perut), tapi tak bagi buff diet—simpan space untuk tumbuhan diet sebenar!'
            ]
          },
          {
            heading: 'Port Minum Selamat (Awas Buaya Deino!)',
            items: [
              'JANGAN minum dekat sungai besar yang dalam atau batu lepak terkenal—Deinosuchus memang standby ngap dari bawah air!',
              'Cari anak sungai cetek, lopak air hujan, atau hujung batu sambil pusing kamera kiri kanan.'
            ]
          }
        ]
      },
      {
        id: 'stamina',
        label: '3. STAMINA & BLEED',
        title: 'Jaga Stamina, Patah Kaki, Bleed & Oksigen',
        summary: 'Kat Evrima, kalau stamina kering atau buat tak tahu kat ikon bleed memang wassalam.',
        cards: [
          {
            heading: 'Pantang Larang Stamina',
            items: [
              'Jangan lari pecut sampai bar kosong dekat kawasan lapang! Sentiasa simpan at least 60% stamina standby kecemasan.',
              'Kalau stamina jatuh teruk, berhenti dalam semak tebal dan tekan H sebelum teruskan jalan.'
            ]
          },
          {
            heading: 'Bleed, Kaki Patah & Oksigen',
            items: [
              'Kalau kena gigit bleed, JANGAN lari jauh—cari semak, guling lumpur dan tekan H sampai darah berhenti.',
              'Elak terjun bukit curam sebab kaki patah buat dino slow gila sampai habis rest.',
              'Selalu tengok ikon HUD Lapar, Haus, Dehidrasi, Darah & Oksigen!'
            ]
          }
        ]
      },
      {
        id: 'nesting',
        label: '4. SARANG & ELDER',
        title: 'Courting (Hold N), Sarang, Pack & Elder Entombing',
        summary: 'Ikut ajaran Cocomelon & J5 pasal buat sarang, jaga baby kat Sanctuary, dengan cara Entomb bila 100% Elder!',
        cards: [
          {
            heading: 'Asas Courting & Sarang (Hold N)',
            items: [
              'Cari pasangan spesies sama jantina lain (dua-dua wajib keluar group dulu), mengadap muka dan sama-sama HOLD N.',
              'Hold N kat tanah rata tersorok nak bina sarang, angkut ranting [G]/[E] kalau perlu, dan jaga diet α/β/γ elak telur busuk.',
              'Duduk atas telur jaga suhu, hold E buang telur busuk, dan bukak TAB → Nest untuk Passcode Private atau Public (Space untuk menetas!).'
            ]
          },
          {
            heading: 'Mutasi & Elder Entombing (100% Growth)',
            items: [
              'Pilih mutasi biasa kat slot Juvenile/Sub-Adult/Adult, atau korek Secret Mutations daripada bisikan Shanks kat luar pagar.',
              'Elder Entombing: Bila 100% Elder, Hold H tidur, bukak TAB → Mutations, lepas tu tekan Entomb untuk respawn jadi 25% Juvenile bersama mutasi upgrade (sampai 4 generasi / 16 slot)!'
            ]
          },
          {
            heading: 'Sanctuary Pokok Merah, Migrasi & Rules',
            items: [
              'Hold Q ikut ikon pokok palma merah pergi Juvenile Sanctuary (ada makanan & lebah halau dino besar), ikut tapak kaki pergi Zon Migrasi.',
              'Jangan lupa ikut had pack/herd (tekan 2 invite) dengan rules body-down kat Destinasi 03.'
            ]
          }
        ]
      },
      {
        id: 'night',
        label: '5. MALAM & LUMPUR',
        title: 'Night Vision (Tekan X), Hujan Ribut, Lumpur & Bunyi',
        summary: 'Bila hari gelap, butang X, telinga dengan semak lagi penting dari mata.',
        cards: [
          {
            heading: 'Survival Waktu Gelap (Tekan X — Bukan N!)',
            items: [
              'Tekan X untuk hidupkan atau tutup Night Vision (Hold N untuk Courting & Sarang!). Jarak nampak malam berbeza ikut dino.',
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
        summary: 'Elak benda noob yang selalu buat player baru cepat respawn kat Gateway.',
        cards: [
          {
            heading: 'Pantang Larang Player Baru',
            items: [
              'Jangan spam button 1 (Broadcast) sesuka hati—itu macam jerit "mari makan aku kat sini!".',
              'Jangan AFK kat padang atau tepi sungai—masuk semak gelap, crouch, baru check chat/Discord.',
              'Sentiasa Hold H tunggu timer Safe-Log habis penuh kat tempat tersorok biar dino tak mati masa offline.',
              'Jangan terus percaya orang buat call 2 dekat bangkai baru—sentiasa standby laluan cabut lari.',
              'Rajin check legends Peta Gateway [M] untuk hafal port air cetek dengan sungai ada Deino.',
              'Singgah Sarang Carno Cocomelon & J5 (antara S4 & S5) untuk belajar courting/nesting & join Discord komuniti!'
            ]
          }
        ]
      }
    ]
  }
};

/**
 * In-game HUD & Nutrient icons sourced directly from icons/ (copied into public/icons/).
 */
export const SURVIVAL_HUD_ICONS = [
  {
    src: './icons/Neural_HexAlpha.png',
    label: {
      en: 'Alpha (α) — Carbs / Lungs',
      ms: 'Alpha (α) — Karbohidrat / Paru-paru',
      kl: 'Alpha (α) — Carbs / Paru-paru'
    }
  },
  {
    src: './icons/Neural_HexBeta.png',
    label: {
      en: 'Beta (β) — Protein / Hearts',
      ms: 'Beta (β) — Protein / Jantung',
      kl: 'Beta (β) — Protein / Jantung'
    }
  },
  {
    src: './icons/Neural_HexGamma.png',
    label: {
      en: 'Gamma (γ) — Lipids / Intestines',
      ms: 'Gamma (γ) — Lipid / Usus',
      kl: 'Gamma (γ) — Lemak / Usus'
    }
  },
  {
    src: './icons/FF_HealthGlyph.svg',
    label: {
      en: 'Health — Overall vitality',
      ms: 'Kesihatan — Nyawa keseluruhan',
      kl: 'Health — Nyawa dino'
    }
  },
  {
    src: './icons/Neural_HexStaminaFull.png',
    label: {
      en: 'Stamina — Keep ≥60% reserve',
      ms: 'Stamina — Simpan ≥60% kecemasan',
      kl: 'Stamina — Standby ≥60% selalu'
    }
  },
  {
    src: './icons/Neural_HexHungerFill.png',
    label: {
      en: 'Hunger — Stomach level',
      ms: 'Lapar — Tahap perut',
      kl: 'Lapar — Isi perut'
    }
  },
  {
    src: './icons/Neural_HexThirstFill.png',
    label: {
      en: 'Thirst — Safe hydration',
      ms: 'Dahaga — Hidrasi selamat',
      kl: 'Haus — Tahap air badan'
    }
  },
  {
    src: './icons/Neural_HexThirstDehydrated.png',
    label: {
      en: 'Dehydrated — Urgent water alert',
      ms: 'Dehidrasi — Amaran kurang air',
      kl: 'Kering — Cepat cari port air!'
    }
  },
  {
    src: './icons/Neural_HexBleedIndicator.png',
    label: {
      en: 'Bleeding — Rest (H) / Mud',
      ms: 'Berdarah — Rehat (H) / Lumpur',
      kl: 'Bleed — Duduk (H) / Lumpur'
    }
  },
  {
    src: './icons/FF_BleedGlyph.svg',
    label: {
      en: 'Bleed Damage — Active blood loss',
      ms: 'Kesan Bleed — Kehilangan darah',
      kl: 'Blood Loss — Darah tengah turun'
    }
  },
  {
    src: './icons/Neural_HexOxygenEmpty.png',
    label: {
      en: 'Oxygen — Swim / Dive breath',
      ms: 'Oksigen — Nafas dalam air',
      kl: 'Oksigen — Nafas masa menyelam'
    }
  },
  {
    src: './icons/Neural_HexRoarPowerIndicator.png',
    label: {
      en: 'Roar / Call Power Indicator',
      ms: 'Penunjuk Kuasa Ngauman / Call',
      kl: 'Kuasa Roar / Call'
    }
  },
  {
    src: './icons/Neural_UI_Warning_Sign.png',
    label: {
      en: 'Hazard / Critical Status Alert',
      ms: 'Amaran Bahaya / Status Kritikal',
      kl: 'Warning — Status Bahaya!'
    }
  }
];

/**
 * Shanks (Ceratosaurus) whispered guide & interactive Hidden Mutations database.
 */
export const SHANKS_MUTATIONS = {
  en: {
    askBtn: 'Ask Shanks: Hidden Mutations',
    promptTitle: 'Which Hidden Mutation do you want me to whisper, {name}?',
    revealAllLabel: 'Reveal All Secret Conditions',
    allLabel: 'ALL HIDDEN MUTATIONS',
    items: [
      {
        id: 'reniculate',
        name: 'Reniculate Kidneys',
        effect: 'Lets you drink saltwater freely without draining hydration or killing your dinosaur.',
        condition:
          'Keep drinking saltwater repeatedly in one life until the negative "Fluid Deficient" status debuff disappears.'
      },
      {
        id: 'reinforced',
        name: 'Reinforced Tendons',
        effect: 'Reduces the stamina cost every time your dinosaur jumps.',
        condition: 'Jump 50 times in a single life session (can be done safely while hidden in dense cover).'
      },
      {
        id: 'osteophagic',
        name: 'Osteophagic (Carnivore)',
        effect: 'Allows chewing carcass bones and speeds up bone-break / fracture healing.',
        condition: 'Eat bones from a carcass while you currently have a bone break (fracture).'
      },
      {
        id: 'tapetum',
        name: 'Augmented Tapetum (Carnivore)',
        effect: 'Enhances nighttime light amplification and Night Vision clarity in pitch-black darkness.',
        condition: 'Kill 5 players at night in a single life session.'
      }
    ]
  },

  ms: {
    askBtn: 'Tanya Shanks: Mutasi Tersembunyi',
    promptTitle: 'Mutasi tersembunyi mana yang kamu mahu saya bisikkan, {name}?',
    revealAllLabel: 'Dedah Semua Syarat Rahsia',
    allLabel: 'SEMUA MUTASI TERSEMBUNYI',
    items: [
      {
        id: 'reniculate',
        name: 'Reniculate Kidneys',
        effect: 'Membolehkan anda minum air masin laut dengan selamat tanpa membahayakan hidrasi.',
        condition:
          'Minum air masin berulang kali dalam satu nyawa sehingga kesan debuff "Fluid Deficient" hilang sepenuhnya.'
      },
      {
        id: 'reinforced',
        name: 'Reinforced Tendons',
        effect: 'Mengurangkan kos penggunaan stamina setiap kali dinosaur melompat.',
        condition: 'Lompat sebanyak 50 kali dalam satu sesi hidup yang sama (lakukan di dalam semak selamat).'
      },
      {
        id: 'osteophagic',
        name: 'Osteophagic (Karnivor)',
        effect: 'Membolehkan anda memakan tulang bangkai dan mempercepatkan penyembuhan tulang patah.',
        condition: 'Makan tulang daripada bangkai semasa dinosaur anda sedang mengalami tulang patah (fracture).'
      },
      {
        id: 'tapetum',
        name: 'Augmented Tapetum (Karnivor)',
        effect: 'Meningkatkan jarak dan kejelasan Penglihatan Malam (Night Vision) dalam gelap.',
        condition: 'Bunuh 5 pemain lain pada waktu malam dalam satu nyawa yang sama.'
      }
    ]
  },

  kl: {
    askBtn: 'Korek Rahsia Mutasi',
    promptTitle: 'Mutasi tersembunyi mana kau nak aku bisikkan ni, {name}?',
    revealAllLabel: 'Bongkar Semua Syarat',
    allLabel: 'SEMUA MUTASI TERSEMBUNYI',
    items: [
      {
        id: 'reniculate',
        name: 'Reniculate Kidneys',
        effect: 'Boleh minum air masin laut terus tanpa rosakkan hydration atau mati kering!',
        condition:
          'Minum je air masin laut berulang kali dalam nyawa yang sama sampai status debuff "Fluid Deficient" tu hilang.'
      },
      {
        id: 'reinforced',
        name: 'Reinforced Tendons',
        effect: 'Kurangkan stamina yang habis setiap kali korang melompat.',
        condition: 'Melompat 50 kali dalam satu nyawa (buat senyap-senyap dalam semak tebal!).'
      },
      {
        id: 'osteophagic',
        name: 'Osteophagic (Karnivor)',
        effect: 'Boleh kunyah tulang bangkai dengan cepatkan penyembuhan kaki/tulang patah.',
        condition: 'Makan tulang masa dino korang tengah ada fracture (tulang patah).'
      },
      {
        id: 'tapetum',
        name: 'Augmented Tapetum (Karnivor)',
        effect: 'Kuatkan lagi Night Vision biar nampak lagi jauh masa malam gelap.',
        condition: 'Kill 5 player lain pada waktu malam dalam satu nyawa.'
      }
    ]
  }
};

/**
 * Playable Evrima dinosaurs list & brief combat/survival summary (fact-checked via theisle.info).
 */
export const PLAYABLE_DINOSAURS = {
  ui: {
    en: {
      sectionTitle: 'Playable Dinosaurs in The Isle: Evrima (22 Species)',
      sectionSub: 'Verified roster summary from theisle.info—choose your survival style before spawning onto Gateway.',
      filterAll: 'All (22)',
      filterCarnivore: 'Carnivores (12)',
      filterHerbivore: 'Herbivores (8)',
      filterOmnivore: 'Omnivores (2)',
      dietLabels: { carnivore: 'CARNIVORE', herbivore: 'HERBIVORE', omnivore: 'OMNIVORE' }
    },
    ms: {
      sectionTitle: 'Senarai Dinosaur Boleh Dimain — The Isle: Evrima (22 Spesies)',
      sectionSub: 'Ringkasan roster disahkan dari theisle.info—pilih gaya hidup sebelum turun ke Gateway.',
      filterAll: 'Semua (22)',
      filterHerbivore: 'Herbivor (8)',
      filterCarnivore: 'Karnivor (12)',
      filterOmnivore: 'Omnivor (2)',
      dietLabels: { carnivore: 'KARNIVOR', herbivore: 'HERBIVOR', omnivore: 'OMNIVOR' }
    },
    kl: {
      sectionTitle: 'Senarai Dino Boleh Main Dalam Evrima (22 Spesies)',
      sectionSub: 'Info ringkas ikut theisle.info—pilih dino sesuai style korang sebelum turun Gateway!',
      filterAll: 'Semua (22)',
      filterCarnivore: 'Karnivor (12)',
      filterHerbivore: 'Herbivor (8)',
      filterOmnivore: 'Omnivor (2)',
      dietLabels: { carnivore: 'KARNIVOR', herbivore: 'HERBIVOR', omnivore: 'OMNIVOR' }
    }
  },
  roster: [
    // Carnivores (12)
    {
      name: 'Tyrannosaurus',
      diet: 'carnivore',
      tier: 'Apex Hunter',
      summary: {
        en: 'Heavyweight apex predator with crushing bone-break bites and devastating ambush damage.',
        ms: 'Pemangsa apeks paling berat dengan gigitan pematah tulang dan serangan hendap maut.',
        kl: 'Raja rimba paling padu—gigitan boleh patah tulang dan damage ambush memang ngam.'
      }
    },
    {
      name: 'Allosaurus',
      diet: 'carnivore',
      tier: 'Large Bleeder',
      summary: {
        en: 'Athletic large theropod excelling in pack pressure and relentless bleeding strikes.',
        ms: 'Theropod besar lincah yang handal memburu secara berkumpulan dengan kesan pendarahan tinggi.',
        kl: 'Karnivor besar lincah—main pack best, tekan bleed sampai mangsa rebah.'
      }
    },
    {
      name: 'Carnotaurus',
      diet: 'carnivore',
      tier: 'High-Speed Charger',
      summary: {
        en: 'Fastest plains runner among large carnivores, built for open-ground charges and stamina endurance.',
        ms: 'Pelari padang terbuka terpantas antara karnivor besar dengan serangan rempuhan laju.',
        kl: 'Kaki pecut padang rata—laju gila dan ada skill ram langgar mangsa.'
      }
    },
    {
      name: 'Ceratosaurus',
      diet: 'carnivore',
      tier: 'Brawler & Scavenger',
      summary: {
        en: 'Tough all-around carnivore armed with bacteria-infused bites, carcass buff, and poison immunity.',
        ms: 'Pemangsa serba boleh tahan lasak dengan gigitan bakteria dan imuniti makan bangkai busuk.',
        kl: 'Kaki gaduh serba boleh—gigitan ada bakteria buat lawan muntah dan kebal makan bangkai lama.'
      }
    },
    {
      name: 'Dilophosaurus',
      diet: 'carnivore',
      tier: 'Nocturnal Venom Stalker',
      summary: {
        en: 'Night-hunter wielding hallucinogenic venom clones that disorient prey in the dark.',
        ms: 'Pemburu malam dengan bisa halusinasi serta penglihatan malam sangat tajam.',
        kl: 'Hantu malam—night vision padu, gigit lepas tu clone halusinasi datang kacau mangsa.'
      }
    },
    {
      name: 'Baryonyx',
      diet: 'carnivore',
      tier: 'Semi-Aquatic Stalker',
      summary: {
        en: 'Spined river-edge predator comfortable hunting fish in waterways and ambushing shorelines.',
        ms: 'Pemangsa separa akuatik yang handal menangkap ikan dan menyerang di tepian sungai.',
        kl: 'Raja tepi paya—selamba berenang cari ikan dengan hendap dino minum air.'
      }
    },
    {
      name: 'Herrerasaurus',
      diet: 'carnivore',
      tier: 'Arboreal Ambush Assassin',
      summary: {
        en: 'Tree-climbing agility specialist able to scale trunks and dive-pounce prey from above.',
        ms: 'Pakar panjat pokok yang mampu menerkam mangsa dari dahan tinggi dengan tepat.',
        kl: 'Ninja atas pokok—boleh panjat batang kayu lepas tu terjun ngap mangsa dari atas!'
      }
    },
    {
      name: 'Austroraptor',
      diet: 'carnivore',
      tier: 'Shoreline Piscivore',
      summary: {
        en: 'Agile, feathered shoreline hunter specialized in fishing and dashing around wetlands.',
        ms: 'Pemangsa berbulu pantas yang pakar memburu ikan di kawasan muara dan tebing air.',
        kl: 'Pemburu tepi sungai laju—handal sauk ikan dengan lari celah paya.'
      }
    },
    {
      name: 'Omniraptor',
      diet: 'carnivore',
      tier: 'Pack Pounce Hunter',
      summary: {
        en: 'Coordinated pack hunter capable of latching onto larger targets and stacking lethal bleed.',
        ms: 'Pemburu pack lincah yang melompat berpaut (pounce) ke badan mangsa besar.',
        kl: 'Pakar main pack pounce—lompat melekat kat badan dino besar sampai habis darah!'
      }
    },
    {
      name: 'Troodon',
      diet: 'carnivore',
      tier: 'Tiny Venom Mimic',
      summary: {
        en: 'Small nocturnal pack mimic using neurotoxin bursts and deceptive vocal calls to bring down giants.',
        ms: 'Pemangsa kecil beracun neurotoksin yang memburu secara berkumpulan pada waktu malam.',
        kl: 'Kecil tapi berbisa—bila ramai dalam gelap, racun dia boleh tumbangkan dino besar!'
      }
    },
    {
      name: 'Deinosuchus',
      diet: 'carnivore',
      tier: 'Aquatic Apex Croc',
      summary: {
        en: 'Colossal freshwater ambush crocodile capable of dragging drinking dinosaurs beneath the surface.',
        ms: 'Buaya gergasi penguasa sungai yang menyambar dan mengheret mangsa ke dasar air.',
        kl: 'Boss sungai—menyorok bawah air tunggu dino cuai datang minum terus heret!'
      }
    },
    {
      name: 'Pteranodon',
      diet: 'carnivore',
      tier: 'Aerial Flyer & Scout',
      summary: {
        en: 'Soaring coastal flyer skimming rivers for fish and scouting entire biomes from the sky.',
        ms: 'Pterosaur terbang tinggi yang menyambar ikan di permukaan sungai dan meninjau peta.',
        kl: 'Boleh terbang satu map—makan ikan sambil intai port player lain dari atas.'
      }
    },
    // Herbivores (8)
    {
      name: 'Triceratops',
      diet: 'herbivore',
      tier: 'Apex Armored Tank',
      summary: {
        en: 'Massive three-horned powerhouse built to face-tank apex predators with lethal thrash & charges.',
        ms: 'Herbivor apeks bertanduk tiga dengan perisai tebal dan tandukan maut.',
        kl: 'Tanker padu—tanduk depan dengan rempuhan dia boleh layan T-Rex depan-depan!'
      }
    },
    {
      name: 'Stegosaurus',
      diet: 'herbivore',
      tier: 'Spiked Tail Defender',
      summary: {
        en: 'Towering armored giant whose spiked thagomizer tail inflicts catastrophic bleed.',
        ms: 'Gergasi berduri ekor yang menghasilkan pendarahan parah kepada mana-mana penyerang.',
        kl: 'Ekor duri tajam—sekali hayun kat muka pemangsa terus berdarah teruk.'
      }
    },
    {
      name: 'Maiasaura',
      diet: 'herbivore',
      tier: 'Fast Herd Nurturer',
      summary: {
        en: 'Quick, tireless herd herbivore with strong stamina, fast nesting care, and defensive kicks.',
        ms: 'Herbivor kawanan tangkas dengan stamina kuat serta sangat handal menjaga sarang.',
        kl: 'Laju, stamina tahan lama dan padu jaga sarang kawanan kat padang.'
      }
    },
    {
      name: 'Diabloceratops',
      diet: 'herbivore',
      tier: 'Mid-Tier Horned Brawler',
      summary: {
        en: 'Sturdy two-horned ceratopsian that holds ground stubbornly against mid-tier packs.',
        ms: 'Seratopsia bertanduk dua yang lasak bertahan menentang kumpulan pemangsa pertengahan.',
        kl: 'Tanduk dua tahan lasak—pandai jaga sudut memang susah karnivor nak tembus.'
      }
    },
    {
      name: 'Tenontosaurus',
      diet: 'herbivore',
      tier: 'Agile Tail-Slammer',
      summary: {
        en: 'Versatile mid-tier herbivore delivering fast directional kicks and heavy tail slams.',
        ms: 'Herbivor serba tangkas dengan hayunan ekor padu dan tendangan pantas.',
        kl: 'Kaki silat—ekor dengan tendangan belakang dia cukup buat Raptor terpelanting!'
      }
    },
    {
      name: 'Pachycephalosaurus',
      diet: 'herbivore',
      tier: 'Bone-Breaker Headbutt',
      summary: {
        en: 'Quick dome-headed charger capable of shattering predator legs and skulls in one ram.',
        ms: 'Penyerang berkepala keras yang mampu mematahkan kaki pemangsa dengan satu tandukan.',
        kl: 'Kepala batu—sekali hentak tepat kat kaki, pemangsa terus tempang!'
      }
    },
    {
      name: 'Dryosaurus',
      diet: 'herbivore',
      tier: 'Nimble Dodger',
      summary: {
        en: 'Lightweight evasive sprinter relying on tight turning radius and dense cover to vanish.',
        ms: 'Pelari kecil tangkas dengan pusingan tajam untuk meloloskan diri ke dalam semak.',
        kl: 'Kaki kelentong—badan kecik senang mengelak dan menyusup celah hutan.'
      }
    },
    {
      name: 'Hypsilophodon',
      diet: 'herbivore',
      tier: 'Tiny Spitter & Climber',
      summary: {
        en: 'Smallest agile herbivore able to perch off the ground and blind attackers with acidic spit.',
        ms: 'Herbivor paling kecil yang boleh melompat bertenggek dan meludah asid pada mata penyerang.',
        kl: 'Dino kecik lincah—boleh bertenggek dan ludah tepat kat muka musuh biar kabur!'
      }
    },
    // Omnivores (2)
    {
      name: 'Gallimimus',
      diet: 'omnivore',
      tier: 'Plains Speedster',
      summary: {
        en: 'Blazingly fast flock omnivore kicking up speed bursts while grazing plants, insects, or frogs.',
        ms: 'Omnivor berkumpulan paling pantas yang makan tumbuhan, serangga dan haiwan kecil.',
        kl: 'Sprinter padang—lari laju gila sambil kutip buah, katak dengan serangga!'
      }
    },
    {
      name: 'Beipiaosaurus',
      diet: 'omnivore',
      tier: 'Clawed Aqua-Forager',
      summary: {
        en: 'Semi-aquatic feathered omnivore diving for crustaceans alongside shoreline plants.',
        ms: 'Omnivor separa akuatik bercakar panjang yang menyelam mencari hidupan air dan tumbuhan.',
        kl: 'Omnivor suka menyelam—cakar panjang dia korek makanan kat dasar sungai dengan tepi air.'
      }
    }
  ]
};

/**
 * Bundled Evrima & EAC setup walkthrough videos (stored under public/videos/).
 */
export const SETUP_VIDEO_GUIDES = {
  en: {
    heading: 'Video Walkthroughs — Evrima Branch & EAC Setup',
    sub: 'Watch both step-by-step setup videos below (from assets/so3) to configure The Isle: Evrima and Easy Anti-Cheat properly.',
    evrimaTitle: '1. The Isle: Evrima Branch Setup Video',
    evrimaDesc: 'How to open Steam Properties, switch Betas to evrima, and download the Evrima build.',
    eacTitle: '2. Easy Anti-Cheat (EAC) Setup & Fix Video',
    eacDesc: 'How to verify/install bundled Easy Anti-Cheat files if the launcher reports EAC missing.'
  },
  ms: {
    heading: 'Video Panduan Setup — Evrima Branch & EAC',
    sub: 'Tonton kedua-dua video langkah demi langkah di bawah untuk memasang The Isle: Evrima dan Easy Anti-Cheat dengan betul.',
    evrimaTitle: '1. Video Setup The Isle: Evrima Branch',
    evrimaDesc: 'Cara buka Steam Properties, pilih tab Betas ke evrima, dan muat turun fail Evrima.',
    eacTitle: '2. Video Setup & Baik Pulih Easy Anti-Cheat (EAC)',
    eacDesc: 'Cara sahkan atau pasang pemasang EAC terbina sekiranya keluar ralat EAC tiada.'
  },
  kl: {
    heading: 'Video Tutorial Setup — Evrima Branch & EAC',
    sub: 'Tengok dua video tutorial ni kalau nak senang ikut step pasang The Isle: Evrima dengan Easy Anti-Cheat.',
    evrimaTitle: '1. Video Cara Setting Evrima Kat Steam',
    evrimaDesc: 'Cara tukar Properties → Betas kepada evrima dan download game betul.',
    eacTitle: '2. Video Cara Setup & Repair EAC',
    eacDesc: 'Cara settlekan Easy Anti-Cheat dalam folder game kalau keluar error tak boleh launch.'
  }
};

export function renderVideoGuideGrid(lang = 'en') {
  const v = SETUP_VIDEO_GUIDES[lang] || SETUP_VIDEO_GUIDES.en;
  return `
    <section class="step-card video-walkthrough-panel">
      <div class="step-eyebrow">VIDEO WALKTHROUGHS</div>
      <h3>${v.heading}</h3>
      <p class="step-summary">${v.sub}</p>
      <div class="video-guide-grid">
        <div class="video-guide-card">
          <h4>${v.evrimaTitle}</h4>
          <p>${v.evrimaDesc}</p>
          <video controls playsinline preload="metadata" class="setup-video-player">
            <source src="./videos/envrimasetup.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="video-guide-card">
          <h4>${v.eacTitle}</h4>
          <p>${v.eacDesc}</p>
          <video controls playsinline preload="metadata" class="setup-video-player">
            <source src="./videos/eacsetup.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  `;
}
