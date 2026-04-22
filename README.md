# Combo Gym - Full Stack Booking System 🥊

Μια ολοκληρωμένη εφαρμογή για γυμναστήριο πυγμαχίας, χτισμένη με το MERN stack (Postgres αντί για Mongo) και Redis.

### Features:
- **Real-time Booking:** Σύστημα κρατήσεων με προστασία από race conditions (SQL Transactions & Redis).
- **Token System:** Οι χρήστες αγοράζουν tokens για να κλείσουν θέσεις.
- **Automated Sunday Reset:** Cron job που επαναφέρει τις θέσεις κάθε Κυριακή στις 12:00.
- **Industrial UI:** Custom σχεδιασμός με React & Material UI.

### Tech Stack:
- **Frontend:** React, TypeScript, Material UI, Axios.
- **Backend:** Node.js, Express, PostgreSQL.
- **Caching:** Redis για ταχύτητα στα slots.