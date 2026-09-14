import { StoryScene, ExperimentMaterial, ConstructionStep } from '../types';

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    title: 'Muntele adormit și floarea dragă',
    stageName: '1. Liniște și somn lung',
    angerLevel: 0,
    grumpyFace: 'sleeping',
    flowerState: 'healthy',
    hatOn: true,
    cloudState: 'none',
    text: 'Pe un munte îndepărtat, trăia un vulcan pe nume Grumpy. Era un vulcan liniștit, care dormea de sute de ani, cu o floare frumoasă crescută chiar pe vârful lui și o pălărie moale de zăpadă.',
    dialogue: 'Zzz... Ce bine e să dorm la soare cu floarea mea dragă...',
    childActionPrompt: 'Atinge floarea lui Grumpy ca să o mângâi!',
    soundCue: 'pop'
  },
  {
    id: 2,
    title: 'Norul obraznic fură pălăria de zăpadă',
    stageName: '2. Prima glumă proastă (Un pic supărat)',
    angerLevel: 25,
    grumpyFace: 'annoyed',
    flowerState: 'fine',
    hatOn: false,
    cloudState: 'sneaking',
    text: 'Într-o zi, un nor negru și obraznic a venit pe furiș și i-a furat pălăria de zăpadă de pe creștet, doar așa, în glumă! Grumpy s-a trezit și s-a supărat un pic, dar a încercat să fie răbdător.',
    dialogue: '„Nu-i nimic... o să-mi crească alta”, și-a zis Grumpy în barbă.',
    childActionPrompt: 'Atinge norul obraznic ca să-l cerți!',
    soundCue: 'cloudGiggle'
  },
  {
    id: 3,
    title: 'Ploaia rece peste floare',
    stageName: '3. Ca un ceainic pe foc (Se încălzește)',
    angerLevel: 60,
    grumpyFace: 'boiling',
    flowerState: 'wet',
    hatOn: false,
    cloudState: 'raining',
    text: 'Dar norul obraznic s-a întors a doua zi și i-a udat toată floarea cu picături de ploaie rece. Grumpy s-a supărat ceva mai tare de data asta. Simțea cum înăuntrul lui începe să se încălzească, ca un ceainic pus pe foc!',
    dialogue: 'Fâââș... Puf-puf! Simt cum fierbe ceva cald în burta mea!',
    childActionPrompt: 'Apasă pe burta lui Grumpy ca să auzi cum fierbe ceainicul!',
    soundCue: 'kettle'
  },
  {
    id: 4,
    title: 'Floarea dărâmată de vânt și gălăgie',
    stageName: '4. Picătura care a umplut paharul!',
    angerLevel: 95,
    grumpyFace: 'exploding',
    flowerState: 'knocked',
    hatOn: false,
    cloudState: 'stormy',
    text: 'A treia zi, norul obraznic a adus și mai mulți prieteni-nori și au făcut atâta gălăgie și vânt încât i-au dărâmat floarea de tot! Asta a fost prea mult pentru Grumpy!',
    dialogue: '„NU MAI POT SĂ ȚIN SUPĂRAREA ÎN MINE!” a bubuit Grumpy din adâncul lui.',
    childActionPrompt: 'Pregătește oțetul! Este momentul erupției!',
    soundCue: 'rumble'
  },
  {
    id: 5,
    title: 'Marea Erupție și Eliberarea!',
    stageName: '5. Eliberare și calm regăsit',
    angerLevel: 10,
    grumpyFace: 'relieved',
    flowerState: 'reborn',
    hatOn: false,
    cloudState: 'fleeing',
    text: 'Și dintr-o dată, tot ce simțea Grumpy — toată supărarea adunată — a țâșnit afară pe gura muntelui, ca o lavă portocalie fierbinte, cu bule și spumă, împrăștiindu-se peste tot! După ce a erupt, Grumpy s-a simțit dintr-o dată mult mai bine, mai ușor, mai calm. Norii obraznici au fugit speriați, iar Grumpy a putut, în sfârșit, să doarmă liniștit din nou.',
    dialogue: 'Ahhh... Ce ușor mă simt acum! Nu mai e nicio presiune în mine!',
    childActionPrompt: 'Bravo! L-ai ajutat pe Grumpy să-și elibereze supărarea!',
    soundCue: 'celebration'
  }
];

export const EXPERIMENT_MATERIALS: ExperimentMaterial[] = [
  {
    id: 'bottle',
    name: 'Sticlă de plastic mică (500 ml)',
    amount: '1 bucată',
    role: 'Burta lui Grumpy în care se adună supărarea',
    iconName: 'Wine',
    checked: false,
    tip: 'O sticlă de apă sau suc, spălată și uscată'
  },
  {
    id: 'cardboard',
    name: 'Carton, mucava sau ziare vechi',
    amount: 'câteva coli',
    role: 'Formează corpul conului de munte în jurul sticlei',
    iconName: 'Layers',
    checked: false,
    tip: 'Ziarele mototolite se așază foarte ușor cu bandă'
  },
  {
    id: 'tape',
    name: 'Bandă adezivă / bandă de mascare',
    amount: '1 rolă',
    role: 'Fixează muntele și ține sticla stabilă',
    iconName: 'Tape',
    checked: false
  },
  {
    id: 'paints',
    name: 'Vopsea maro, verde, roșu/portocaliu',
    amount: 'tempera sau acrilic',
    role: 'Pentru a da viață muntelui și feței lui Grumpy',
    iconName: 'Palette',
    checked: false,
    tip: 'Include și o pensulă sau burete'
  },
  {
    id: 'soda',
    name: 'Bicarbonat de sodiu',
    amount: '2-3 linguri',
    role: 'Supărarea acumulată a lui Grumpy (baza chimică)',
    iconName: 'Sparkles',
    checked: false,
    tip: 'Pus în sticlă înainte de începerea poveștii'
  },
  {
    id: 'vinegar',
    name: 'Oțet alb alimentar',
    amount: '1/2 pahar (100-150 ml)',
    role: 'Norul obraznic care îl atinge la ultima glumă (acidul)',
    iconName: 'FlaskConical',
    checked: false,
    tip: 'Ține oțetul într-o căniță ușor de turnat'
  },
  {
    id: 'food_color',
    name: 'Colorant alimentar roșu / portocaliu',
    amount: 'câteva picături',
    role: 'Colorează spuma ca o lavă adevărată incandescentă',
    iconName: 'Flame',
    checked: false
  },
  {
    id: 'dish_soap',
    name: 'Detergent lichid de vase',
    amount: '1 linguriță (opțional)',
    role: 'Captează dioxidul de carbon făcând spuma mult mai densă și pufoasă',
    iconName: 'Droplets',
    checked: false,
    tip: 'Opțional, dar face erupția spectaculoasă!'
  },
  {
    id: 'tray',
    name: 'Tavă mare sau farfurie adâncă',
    amount: '1 tavă',
    role: 'Pentru a prinde toată lava și a nu murdări masa',
    iconName: 'Square',
    checked: false,
    tip: 'Puteți face experimentul și afară, pe iarbă sau trotuar'
  }
];

export const CONSTRUCTION_STEPS: ConstructionStep[] = [
  {
    stepNumber: 1,
    title: 'Construiește-l pe Grumpy',
    subtitle: 'Modelarea corpului vulcanic',
    instructions: [
      'Așază sticla goală în centrul tăvii de lucru.',
      'Modelează carton sau ziare mototolite în jurul sticlei, dându-i o formă conică de munte.',
      'Lasă neapărat gura sticlei liberă la vârf (acesta e craterul pe unde va ieși lava!).',
      'Fixează bine ziarele cu fâșii generoase de bandă adezivă de jur împrejur.'
    ],
    kidRole: 'Mototolește ziarele și ajută la lipirea benzii adezive în jurul sticlei.',
    adultRole: 'Asigură-te că sticla este verticală, stabilă pe tavă și că gura sticlei rămâne deschisă.',
    warning: 'Dacă sticla nu e stabilă, se poate răsturna în timpul erupției!',
    icon: 'Mountain'
  },
  {
    stepNumber: 2,
    title: 'Dă-i o față lui Grumpy',
    subtitle: 'Pictura și cele două expresii faciale',
    instructions: [
      'Vopsește exteriorul muntelui cu maro și verde (poți lăsa zăpada pe creștet!).',
      'Lasă să se usuce câteva minute.',
      'Desenați împreună ochii și gura lui Grumpy — o față liniștită și adormită.',
      'Truc isteț: Desenați pe o foaie separată o față supărată cu sprâncene încruntate, pe care o veți lipi temporar peste cea liniștită când avansează povestea!'
    ],
    kidRole: 'Pictează versanții muntelui și desenează ochii, gura și floricica de pe creștet.',
    adultRole: 'Ajută la tăierea măștilor de hârtie cu expresiile schimbătoare.',
    icon: 'Smile'
  },
  {
    stepNumber: 3,
    title: 'Pregătește „supărarea” din interior',
    subtitle: 'Încărcarea craterului cu ingrediente secrete',
    instructions: [
      'Cu o pâlnie de hârtie sau o lingură, toarnă în sticlă cele 2-3 linguri de bicarbonat de sodiu.',
      'Adaugă 3-5 picături de colorant alimentar roșu sau portocaliu.',
      'Toarnă o linguriță de detergent lichid de vase (face bule mari de spumă).',
      'Burta lui Grumpy este acum gata! Bicarbonatul reprezintă supărarea care stă ascunsă în el.'
    ],
    kidRole: 'Numără cu voce tare lingurile de bicarbonat și pune picăturile de culoare magică.',
    adultRole: 'Ține gâtul sticlei stabil ca să nu se verse bicarbonatul pe lângă.',
    icon: 'Sparkles'
  },
  {
    stepNumber: 4,
    title: 'Spune povestea etapizat, cu pauze',
    subtitle: 'Construirea suspansului și tensiunii emoționale',
    instructions: [
      'Nu spuneți toată povestea dintr-o dată! Creați suspans la fiecare supărare.',
      'Momentul 1: „Norul i-a furat pălăria... Grumpy e doar un pic supărat.” (fața rămâne calmă, sticla stă nemișcată).',
      'Momentul 2: „Norul i-a udat floarea... Grumpy se încălzește pe dinăuntru ca un ceainic!” (copilul schimbă fața cu cea încruntată).',
      'Momentul 3: „Norii i-au dărâmat toată floarea... Grumpy nu mai poate ține în el!”'
    ],
    kidRole: 'Schimbă expresia feței lui Grumpy și ține cănița cu oțet pregătită.',
    adultRole: 'Citește povestea cu voce teatrală și creează atmosfera de ceainic fierbinte.',
    icon: 'BookOpen'
  },
  {
    stepNumber: 5,
    title: 'Declanșează Erupția!',
    subtitle: 'Momentul culminant: eliberarea lavei spumoase',
    instructions: [
      'Chiar la cuvintele: „...și Grumpy A ERUPT!”, toarnă oțetul direct în gura sticlei!',
      'Urmăriți reacția: spuma crește în câteva secunde, face bule zgomotoase și se revarsă peste versanți.',
      'Lăsați copilul să se bucure de spectacolul spumei colorate!',
      'După erupție, spuneți: „Uite cum s-a liniștit Grumpy... acum se simte ușor și vesel!”'
    ],
    kidRole: 'Toarnă oțetul cu grijă (ghidat de mână de adult) și strigă „ERUPE, GRUMPY!”.',
    adultRole: 'Ghidează mâna copilului și bucură-te împreună cu el de erupție.',
    warning: 'Copilul nu trebuie să ducă mâinile cu spumă sau oțet la ochi.',
    icon: 'Flame'
  }
];

export const GUIDED_QUESTIONS = [
  {
    q: 'Crezi că Grumpy s-a supărat dintr-o dată, sau puțin câte puțin?',
    hint: 'Discutați despre cum norul a venit de trei ori. Supărarea s-a adunat pas cu pas, exact ca atunci când cineva ne deranjează repetat.',
    concept: 'Acumularea treptată a emoțiilor'
  },
  {
    q: 'Ce s-a întâmplat în interiorul lui Grumpy chiar înainte să erupă?',
    hint: 'S-a simțit ca un ceainic pus pe foc! În corp simțim căldură în obraji, bătăi rapide ale inimii și mușchi încordați când suntem furioși.',
    concept: 'Semnele fizice ale furiei în corpul nostru'
  },
  {
    q: 'Cum crezi că se simte Grumpy acum, după ce a erupt — mai bine sau mai rău?',
    hint: 'Mult mai ușor și mai calm! Presiunea a scăzut, dar e important să învățăm cum să eliberăm presiunea fără să distrugem florile din jur.',
    concept: 'Eliberarea tensiunii și căutarea calmului'
  },
  {
    q: 'Ce credeți că s-ar întâmpla dacă punem mai multă „supărare” (bicarbonat) sau mai mult „nor obraznic” (oțet)?',
    hint: 'Testați în simulator sau repetați experimentul cu cantități duble! Gazul format (dioxidul de carbon) va fi mai mult și lava va țâșni mai sus.',
    concept: 'Gândire științifică & variația variabilelor'
  }
];

export const SCIENCE_EXPLANATION = {
  title: 'Legătura Poveste — Știință & Emoții',
  chemistry: 'Bicarbonatul de sodiu este o BAZĂ, iar oțetul conține ACID ACETIC. Când se întâlnesc, are loc o reacție chimică rapidă de neutralizare, din care rezultă apă, acetat de sodiu și un gaz invizibil: DIOXID DE CARBON (CO₂). Detergentul prinde gazul în milioane de bule mici, creând spuma densă!',
  pressure: 'Pentru că gazul ocupă mult mai mult spațiu decât pulberea și lichidul inițial, în sticlă se creează PRESIUNE. Neavând unde să se ducă, gazul împinge lichidul cu forță în sus pe gâtul sticlei — exact ca magma dintr-un vulcan real!',
  emotionalLink: 'Această reacție este metafora perfectă pentru copii: Când ținem supărările ascunse fără să vorbim despre ele, presiunea crește în interiorul nostru ca gazul din sticlă. Până la urmă, o simplă picătură poate declanșa o explozie. Soluția este să învățăm să lăsăm gazul să iasă încet, cu vorbe bune și respirație!'
};
