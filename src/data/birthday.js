/**
 * ─────────────────────────────────────────────────────────────
 *  ✨ Birthday Central — everything editable lives here ✨
 *
 *  Update this single file and the whole invitation follows.
 *  All names, dates and venues below are PLACEHOLDERS.
 * ─────────────────────────────────────────────────────────────
 */

export const birthday = {
  // 👑 The little celebrant
  baby: {
    name: 'Luhan', // shown in the navbar, hero and footer
    fullName: 'Luhan Beatriz Santos', // placeholder
    nickname: 'Lulu',
    ageTurning: 1,
    tagline:
      'Our little princess is turning one — join us for cake & magic!',
    // Framed portrait shown in the banner.
    photo: {
      src: '/images/luhan.jpg',
      alt: 'Luhan, our little birthday princess',
      width: 287,
      height: 323,
    },
  },

  // 🗓️ When the magic happens
  date: {
    label: 'Saturday, December 30, 2026', // pretty, human-readable
    iso: '2026-12-30T15:00:00', // machine-readable (countdown target)
    timeLabel: '3:00 PM',
    time: '15:00',
  },

  // 🏰 Where the celebration takes place
  venue: {
    name: 'Jollibee Almeda Highway',
    address: 'Almeda Highway, Naga City, Camarines Sur',
    mapsUrl: 'https://maps.app.goo.gl/FgbyY92ihk5GnAVk9',
  },

  // 🎀 Party details
  party: {
    theme: 'Once Upon a One',
    dressCode: 'Pastel fairytale — soft pinks, lavenders and baby blues',
    highlights: [
      'Royal welcome & photo wall',
      'Bubble magic show',
      'Storybook reading corner',
      'Cake time under the rainbow',
    ],
  },

  // ✉️ RSVP
  rsvp: {
    deadline: 'November 28, 2026',
    contact: {
      name: 'Mama Bella',
      phone: '+63 917 123 4567',
      email: 'hello@example.com',
    },
  },

  // 📸 Gallery — real photos live in public/images/.
  // width/height prevent layout shift while loading on mobile.
  // Captions are editable placeholders — rename to match each photo.
  photos: [
    {
      src: '/images/photo-1.jpg',
      alt: "Luhan's first year, photo 1",
      caption: 'Our little sunshine',
      width: 276,
      height: 276,
    },
    {
      src: '/images/photo-2.jpg',
      alt: "Luhan's first year, photo 2",
      caption: 'Bubble giggles',
      width: 285,
      height: 281,
    },
    {
      src: '/images/photo-3.jpg',
      alt: "Luhan's first year, photo 3",
      caption: 'Cake tasting day',
      width: 320,
      height: 320,
    },
    {
      src: '/images/photo-4.jpg',
      alt: "Luhan's first year, photo 4",
      caption: 'With Mama & Papa',
      width: 355,
      height: 357,
    },
    // Add more rows like the ones above to grow the gallery —
    // drop the file in public/images/ and repeat the pattern.
  ],
}

export default birthday
