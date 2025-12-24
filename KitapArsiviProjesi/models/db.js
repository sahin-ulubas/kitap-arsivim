const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./kitaparsivi.db');

db.serialize(() => {
    // Tablo yapısını güncelledik (basim_yili eklendi)
    db.run(`CREATE TABLE IF NOT EXISTS kitaplar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kitap_adi TEXT,
        yazar TEXT,
        sayfa_sayisi INTEGER,
        basim_yili INTEGER
    )`);
});

module.exports = db;