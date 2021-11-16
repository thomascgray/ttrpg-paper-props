export const UNIVERSAL_DATA = {
  rotation_degrees: 0,
  zoom: 1,
  paper_texture: "grey",
};

export const PAPER_TYPES = {
  NEWSPAPER: {
    name: "Newspaper",
    data: {
      ...UNIVERSAL_DATA,
      page_width_percentage: 80,
      title: "THE LOREM IPSUM",
      title_font: "font-sans",
      banner_text: "VOL DLXX",
      headline: "MORBI TEMPUS MOLLIS IPSUM AT!",
      headline_font: "font-serif",

      quote:
        "Maecenas molestie ac, erat sed ultrices. Ut in vehicula est, ut malesuada eros! Nunc condimentum, aliquet ante nec venenatis.",
      main_copy: `Sed nec nisl eu massa accumsan facilisis ut a lacus. Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. Aenean at tristique nunc, nec ornare nibh. 

![alt text](https://via.placeholder.com/350x150)

Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Suspendisse nec mauris aliquam, suscipit eros eget, imperdiet sapien. Sed bibendum molestie faucibus. Aenean faucibus placerat felis, nec vulputate velit faucibus at. Proin eget malesuada eros, et posuere leo. 

### Nam non gravida lectus. 

Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. Duis tristique metus arcu, ac porttitor risus maximus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec nisl eu massa accumsan facilisis ut a lacus. 

Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. Aenean at tristique nunc, nec ornare nibh. Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Suspendisse nec mauris aliquam, suscipit eros eget, imperdiet sapien. Sed bibendum molestie faucibus. 

# Aenean faucibus placerat felis, nec vulputate velit faucibus at. 

Proin eget malesuada eros, et posuere leo. Nam non gravida lectus. Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. Duis tristique metus arcu, ac porttitor risus maximus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec nisl eu massa accumsan facilisis ut a lacus. Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. 

![alt text](https://via.placeholder.com/350x150)

Duis tristique metus arcu, ac porttitor risus maximus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec nisl eu massa accumsan facilisis ut a lacus. 

Aenean at tristique nunc, nec ornare nibh. Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla.  Sed euismod metus sed mauris accumsan.

### Aenean faucibus placerat felis

Nnec vulputate velit faucibus at. Proin eget malesuada eros, et posuere leo. Nam non gravida lectus. Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. Duis tristique metus arcu, ac porttitor risus maximus at. 

![alt text](https://via.placeholder.com/350x150)

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec nisl eu massa accumsan facilisis ut a lacus. Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. 

Sed euismod metus sed mauris accumsan, in pretium arcu euismod. Aenean at tristique nunc, nec ornare nibh. Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Suspendisse nec mauris aliquam, suscipit eros eget, imperdiet sapien. Sed bibendum molestie faucibus. Aenean faucibus placerat felis, nec vulputate velit faucibus at. Proin eget malesuada eros, et posuere leo. Nam non gravida lectus. Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. 

![alt text](https://via.placeholder.com/350x150)

Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. Aenean at tristique nunc, nec ornare nibh. Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Suspendisse nec mauris aliquam, suscipit eros eget, imperdiet sapien. Sed bibendum molestie faucibus. Aenean faucibus placerat felis, nec vulputate velit faucibus at. Proin eget malesuada eros, et posuere leo. Nam non gravida lectus. Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. Duis tristique metus arcu, ac porttitor risus maximus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
      main_copy_columns: 4,
      is_main_copy_blurry: true,
      date: "1989-11-09",
    },
  },
  NEWSPAPER_CLIPPING: {
    name: "Newspaper Clipping",
    data: {
      ...UNIVERSAL_DATA,
      page_width: 400,
      page_height: 600,
      prefix_copy:
        "Nam sed tincidunt velit. Ut ac ultricies magna. Sed gravida metus est, eget bibendum purus pharetra sed. Maecenas scelerisque mauris ut ligula vestibulum auctor. Nulla pharetra arcu eros, eu fermentum tortor aliquet ac. In ut arcu accumsan, dictum massa id, pretium dui.",
      main_copy: `---

### Aenean ac semper!

Nulla nisi felis, ultrices nec orci at, sollicitudin viverra mauris. 

Mauris in pharetra nunc. Nullam semper metus mi, a iaculis nisi maximus sed. Proin sed turpis ipsum.

---`,
      suffix_copy: `## LOREM IPSUM!

Nulla nisi felis, ultrices nec orci at, sollicitudin viverra mauris. 

Mauris in pharetra nunc. Nullam semper metus mi, a iaculis nisi maximus sed. Proin sed turpis ipsum.`,

      is_prefix_blurry: true,
      is_suffix_blurry: true,
    },
  },
  WANTED_POSTER: {
    name: "Wanted Poster",
    data: {
      ...UNIVERSAL_DATA,
      page_width: 500,
      paper_texture: "beige",
      image_url:
        "https://i.pinimg.com/564x/5f/29/93/5f2993a98cc335257eb97eaae9eb38e4.jpg",
      headline: "WANTED!",
      headline_font: "font-serif",
      subtitle: "Etiam tempor, massa blandit cursus efficitur",
      subtitle_font: "font-serif",
      subtitle2: "DEAD OR ALIVE",
      subtitle2_font: "font-sans",
    },
  },
  HANDWRITTEN_LETTER: {
    name: "Handwritter Letter",
    data: {
      ...UNIVERSAL_DATA,
      page_width_percentage: 80,
      font_size: "prose-lg",
      font_weight: "font-normal",
      prefix: "To my Dearest,",
      prefix_alignment: "left",
      main_copy: `Dear Lorem Ipsum,

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 

Nulla suscipit sapien at ligula suscipit ultricies. Pellentesque sit amet vulputate sapien, et aliquet augue. 

__Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.__

Nulla scelerisque, sem vel efficitur gravida, nunc velit sagittis sapien, egestas interdum nunc lectus id velit. Donec sem nisl, maximus at orci quis, auctor faucibus elit. Aliquam consectetur rutrum augue eget tincidunt.

Sincerely, Lorem Ipsum`,
      suffix: "Love, Example Name",
      suffix_alignment: "left",
      font: "font-indie-flower",
    },
  },
  TICKET: {
    name: "Ticket",
    data: {
      ...UNIVERSAL_DATA,
      // page_width_percentage: 80,
      page_width: 500,
      page_height: 280,
      sawtooth_border: "sawtooth-border-none",
      rounded_corners: "rounded-none",

      hide_left_margin_copy: false,
      left_margin_copy: "CARTER AND DARK LTD.",

      hide_top_content: false,
      top_copy: "Nulla suscipit sapien",

      hide_right_margin_copy: false,
      right_margin_copy: "Ligula suscipit ultricies",

      hide_middle_left_copy: false,
      middle_left_copy: "Nulla suscipit sapien",

      hide_middle_right_copy: false,
      middle_right_copy: "Nulla suscipit sapien",

      hide_botom_copy: false,
      botom_copy: "Nulla suscipit sapien",

      // font_size: "prose-lg",
      // prefix: "To my Dearest,",
      // prefix_alignment: "left",

      font_weight: "font-normal",
      font: "font-serif",
    },
  },
  BLANK_PAGES: {
    name: "Blank Pages",
    data: {
      ...UNIVERSAL_DATA,
    },
  },
  RAGGED_JOURNAL_COVER: {
    name: "Ragged Journal Cover",
    propName: "RaggedJournalCover",
    data: {
      ...UNIVERSAL_DATA,

      prose_size: "prose-2xl",
      copy_colour: "gold",
      main_copy: `# MYSTICAL ARTIFACTS
      
## A STUDY IN THE STRANGE AND WEIRD


### A. COBALT ET.AL`,
      topPadding: "0em",
    },
  },
  NPC_CARD: {
    name: "NPC Card",
    data: {
      ...UNIVERSAL_DATA,
      page_width: 300,
      paper_texture: "beige",
      image_url:
        "https://i.pinimg.com/564x/74/35/d4/7435d4e62c3db13e5ec0e1c91293d624.jpg",
      // image_width: 80,
      text_line_one: "Phin Farros",
      text_line_two: "Spark Pusher and Race Fixer",
      text_line_three: "Arrogant, Indulgent, Brutal",
      font: "font-serif",
      font_weight: "font-normal",
      rounded_corners: "rounded-none",
      text_alignment: "text-left",
    },
  },
};
