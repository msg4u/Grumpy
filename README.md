# 🌋 Grumpy - Vulcanul Emoțiilor

[![Website](https://shields.io)](https://grumpy-vulcanul-emotiilor.ai.studio/)
[![Built with](https://shields.io)](https://vitejs.dev)
[![Package Manager](https://shields.io)](https://bun.sh)

**Grumpy** este o aplicație web interactivă dedicată copiilor cu vârste cuprinse între **4 și 7 ani**. Proiectul îmbină **învățarea științifică** (geografie, fenomene naturale) cu **dezvoltarea inteligenței emoționale**, ajutându-i pe cei mici să înțeleagă și să își gestioneze furia într-un mod sănătos ("să se supere frumos").

✨ **Aplicația live poate fi accesată aici:** [grumpy-vulcanul-emotiilor.ai.studio](https://grumpy-vulcanul-emotiilor.ai.studio/)

---

## 🎯 Obiectivele Proiectului

- **Inteligență Emoțională:** Identificarea furiei și metafora vulcanului care „erupe” atunci când emoțiile devin prea puternice.
- **Învățare Științifică:** Introducerea conceptelor de bază despre vulcane, magmă și procese naturale pe înțelesul copiilor.
- **Reglare Emoțională:** Oferirea de tehnici practice și interactive prin care copiii pot învăța să se calmeze înainte ca „vulcanul interior” să erupă.

---

## 🚀 Tehnologii Utilizate

Proiectul este dezvoltat folosind un ecosistem modern, rapid și tipizat:

- **Frontend:** [Vite](https://vitejs.dev) + React / Vanilla (în funcție de structura aleasă)
- **Limbaj:** [TypeScript](https://typescriptlang.org) pentru un cod sigur și ușor de întreținut
- **Runtime & Package Manager:** [Bun](https://bun.sh) pentru instalare ultra-rapidă și execuție eficientă
- **Găzduire:** Proiect generat și rulat via Google AI Studio Sandbox

---

## 🛠️ Instalare și Rulare Locală

Urmează acești pași pentru a rula proiectul pe calculatorul tău.

### Cerințe preliminare
Asigură-te că ai instalat **Bun** pe sistemul tău. Dacă nu îl ai, îl poți instala rulând:
```bash
curl -fsSL https://bun.shinstall | bash
```

### Pași pentru pornire

1. **Clonează depozitul (repository-ul):**
   ```bash
   git clone https://github.com
   cd Grumpy
   ```

2. **Instalează dependențele:**
   ```bash
   bun install
   ```

3. **Configurează variabilele de mediu:**
   Copiază fișierul `.env.example` într-un fișier nou `.env` și completează cheile necesare (dacă este cazul):
   ```bash
   cp .env.example .env
   ```

4. **Pornește serverul de dezvoltare:**
   ```bash
   bun run dev
   ```
   Aplicația va fi disponibilă în browser la adresa indicată în terminal (de regulă `http://localhost:5173`).

---

## 📦 Structura Proiectului

```text
├── src/               # Codul sursă al aplicației (componente, logică, stiluri)
├── .env.example       # Exemplu de configurare a variabilelor de mediu
├── bun.lock           # Fișierul de blocare a versiunilor pentru Bun
├── index.html         # Punctul de intrare HTML al aplicației
├── metadata.json      # Metadatele specifice șablonului AI Studio
├── package.json       # Scripturile și dependențele proiectului
├── tsconfig.json      # Configurația compilatorului TypeScript
└── viteConfig.ts      # Configurarea serverului și build-ului Vite
```

---

## 🤝 Contribuții

Contribuțiile sunt oricând binevenite! Dacă dorești să îmbunătățești aplicația:
1. Fă un **Fork** proiectului.
2. Creează un branch pentru funcționalitatea ta (`git checkout -b feature/AmazingFeature`).
3. Dă **Commit** modificărilor tale (`git commit -m 'Add some AmazingFeature'`).
4. Dă **Push** către branch (`git push origin feature/AmazingFeature`).
5. Deschide un **Pull Request**.

---

## 📄 Licență

Acest proiect este generat pornind de la șablonul `google-gemini/aistudio-repository-template`. Consultă fișierele din proiect pentru detalii legate de drepturile de utilizare.

---
Concept creat cu ❤️ pentru copii și părinți deopotrivă.
