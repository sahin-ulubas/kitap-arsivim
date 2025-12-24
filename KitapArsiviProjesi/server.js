const express = require('express');
const app = express();
//  port ayarı
const PORT = process.env.PORT || 3000; 
const db = require('./models/db');
const kitapController = require('./kitapController');

// a
app.set('view engine', 'ejs');
app.set('views', './views'); 

// Statik Dosyalar (CSS, Resimler)
app.use(express.static('public')); 


app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// --- ROTALAR ---

// 1. Ana Sayfa
app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Kitap Arşivim - Ana Sayfa' }); 
});

// 2. Hakkında Sayfası
app.get('/hakkinda', (req, res) => {
    res.render('hakkinda', { pageTitle: 'Proje Hakkında' });
});

// 3. Kitap Listeleme 
app.get('/kitaplar', kitapController.listele); 

// 4. Yeni Kitap Ekleme 
app.get('/kitaplar/ekle', kitapController.ekleFormu); 
app.post('/kitaplar', kitapController.kaydet);

// 5. Kitap Güncelleme
app.get('/kitaplar/guncelle/:id', kitapController.guncelleFormu);
app.post('/kitaplar/guncelle/:id', kitapController.guncelle);

// 6. Kitap Silme
app.get('/kitaplar/sil/:id', kitapController.sil);

// Sunucuyu Başlatma
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`); 
});