const db = require('./models/db'); // db.js models klasöründe olduğu için

// 1. LİSTELEME VE İSTATİSTİKLER
exports.listele = (req, res) => {
    const query = "SELECT * FROM kitaplar ORDER BY id DESC"; 
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send("Veritabanı hatası");
        } else {
            const kitapListesi = rows || [];
            const toplamKitap = kitapListesi.length;
            const toplamSayfa = kitapListesi.reduce((toplam, k) => toplam + (Number(k.sayfa_sayisi) || 0), 0);

            res.render('kitaplar', { 
                kitaplar: kitapListesi, 
                pageTitle: 'Kitap Arşivim',
                stats: { toplamKitap, toplamSayfa }
            });
        }
    });
};

// 2. EKLEME FORMU VE KAYDETME
exports.ekleFormu = (req, res) => {
    res.render('kitap_ekle', { pageTitle: 'Yeni Kitap Ekle' });
};

exports.kaydet = (req, res) => {
    const { kitap_adi, yazar, sayfa_sayisi, basim_yili } = req.body;
    const query = "INSERT INTO kitaplar (kitap_adi, yazar, sayfa_sayisi, basim_yili) VALUES (?, ?, ?, ?)";
    db.run(query, [kitap_adi, yazar, sayfa_sayisi, basim_yili], (err) => {
        if (err) res.status(500).send("Kitap eklenirken hata oluştu.");
        else res.redirect('/kitaplar');
    });
};

// 3. GÜNCELLEME VE SİLME
exports.guncelleFormu = (req, res) => {
    db.get("SELECT * FROM kitaplar WHERE id = ?", [req.params.id], (err, row) => {
        if (err || !row) res.status(404).send("Kitap bulunamadı.");
        else res.render('kitap_guncelle', { kitap: row, pageTitle: 'Kitabı Güncelle' });
    });
};

exports.guncelle = (req, res) => {
    const { kitap_adi, yazar, sayfa_sayisi, basim_yili } = req.body;
    const query = "UPDATE kitaplar SET kitap_adi = ?, yazar = ?, sayfa_sayisi = ?, basim_yili = ? WHERE id = ?";
    db.run(query, [kitap_adi, yazar, sayfa_sayisi, basim_yili, req.params.id], (err) => {
        if (err) res.status(500).send("Güncelleme hatası");
        else res.redirect('/kitaplar');
    });
};

exports.sil = (req, res) => {
    db.run("DELETE FROM kitaplar WHERE id = ?", [req.params.id], (err) => {
        if (err) res.status(500).send("Silme hatası");
        else res.redirect('/kitaplar');
    });
};