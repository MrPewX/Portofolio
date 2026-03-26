// js/cms.js

// ==========================================
// KONFIGURASI GOOGLE DRIVE DATABASE
// ==========================================
// Nanti isi variabel ini dengan URL Web App dari Google Apps Script
const GAS_URL = "https://script.google.com/macros/s/AKfycbxnvSMGVq0VqEKg9mF2ZBnBY5AZawADTAtekMbT0OTofrJVvddCcy-8FJXrD6Oe4bAjWQ/exec"; 

// ==========================================

// Default projects structure
let projectsData = [
    {
        id: 1,
        title: "Miloo Shop E-Commerce",
        img: "assets/img/ecommerce.png",
        tags: ["UI/UX", "React"],
        context: "Desain dan implementasi platform e-commerce premium dengan fokus pada konversi pengguna dan alur checkout yang mulus.",
        process: "Riset kompetitor ➔ Wireframing ➔ High-fidelity UI ➔ Frontend.",
        linkDemo: "https://demo.com",
        caseStudy: {
            hook: "<strong>Role:</strong> UI/UX Designer & Frontend Developer<br><br><strong>Timeline:</strong> 4 Minggu<br><br><strong>Tools:</strong> Figma, React.js, Tailwind CSS<br><br><strong>Problem:</strong> Pengguna sering meninggalkan keranjang belanja (cart abandonment) akibat alur checkout yang terlalu rumit dan memakan banyak halaman.",
            research: "<strong>User Persona:</strong> Millennial dan Gen Z yang menginginkan belanja online instan tanpa banyak klik.<br><br><strong>Competitor Analysis:</strong> E-commerce standar biasanya butuh 5 langkah checkout, Miloo Shop dibuat hanya butuh 2 langkah.<br><br><strong>User Flow:</strong> Beranda Produk ➔ Keranjang ➔ Checkout Satu Halaman ➔ Pembayaran Selesai.",
            design: "<strong>Wireframes:</strong> Sketsa awal berfokus pada kemudahan akses tombol 'Beli' dengan ibu jari pada layar HP.<br><br><strong>Design System:</strong> Palet warna Neon Pastel dipadukan dengan Glassmorphism untuk memberi kesan futuristik namun ramah.<br><br><strong>High-Fidelity:</strong> Tampilan akhir memiliki transisi 60fps yang memuaskan secara visual.",
            challenge: "<strong>Tantangan:</strong> Sulit mempertahankan state keranjang tetap aktif setelah halaman di-refresh tanpa menggunakan database berat.<br><br><strong>Solusi:</strong> Saya menggunakan kombinasi Context API di React dan sinkronisasi otomatis ke LocalStorage.<br><br><strong>Snippet Kode:</strong><br><pre>useEffect(() => localStorage.setItem('cart', JSON.stringify(cartState)), [cartState]);</pre>",
            result: "<strong>Fitur Utama:</strong> Checkout 1 Halaman, Kalkulasi Ongkir Otomatis, dan Light/Dark Mode Switcher.<br><br><strong>Apa yang Saya Pelajari:</strong> Dari proyek ini, saya memahami pentingnya optimasi performa *state management* agar interaksi UI tetap mulus."
        }
    },
    {
        id: 2,
        title: "Portal Akademik & Dashboard",
        img: "assets/img/dashboard.png",
        tags: ["Web App", "CI4"],
        context: "Sistem dashboard manajemen guru dan murid dengan fitur perpustakaan dan penjadwalan terintegrasi.",
        process: "Merancang database MySQL ➔ Membangun API ➔ Integrasi interface backend.",
        linkDemo: "https://admin-demo.com",
        caseStudy: {
            hook: "<strong>Role:</strong> Full-Stack Web Developer<br><br><strong>Timeline:</strong> 6 Minggu<br><br><strong>Tools:</strong> CodeIgniter 4, MySQL, Bootstrap, JavaScript Vanilla<br><br><strong>Problem:</strong> Sistem absensi dan rekap nilai sekolah masih diinput manual menggunakan Excel, sehingga rawan error dan lambat dibagikan ke orang tua.",
            research: "<strong>User Persona:</strong> Guru yang sibuk dan Admin staff sekolah bermobilitas tinggi.<br><br><strong>Competitor Analysis:</strong> LMS konvensional terlalu membingungkan bagi guru tua; sistem ini dirancang spesifik hanya menonjolkan fitur paling sering dipakai.<br><br><strong>User Flow:</strong> Login Guru ➔ Pilih Kelas ➔ Centang Absen ➔ Simpan.",
            design: "<strong>Wireframes:</strong> Layout berupa sidebar navigasi dengan kontainer dinamis utama.<br><br><strong>Design System:</strong> Desain tabular (*DataTables*) yang solid dan bersih, responsif di resolusi tablet.<br><br><strong>High-Fidelity:</strong> Penerapan tema Mikrotik Style di bagian panel kontrol admin.",
            challenge: "<strong>Tantangan:</strong> Relasi Tabel MySQL cukup rumit antara Jadwal Kelas, Guru, Murid, dan Pengurus Perpustakaan.<br><br><strong>Solusi:</strong> Menerapkan arsitektur *MVC (Model-View-Controller)* bawaan CI4 secara ketat dengan Database Seeding dan Migration Automation.<br><br><strong>Snippet Kode:</strong><br><pre>$builder->select('siswa.*, nilai.mtk')->join('nilai', 'nilai.id = siswa.id')->get();</pre>",
            result: "<strong>Fitur Utama:</strong> Export/Import Excel Otomatis, Pencetakan Rapor PDF instan, Pinjam Buku Perpustakaan via Barcode.<br><br><strong>Apa yang Saya Pelajari:</strong> Saya menguasai optimasi *Query JOIN* kompleks MySQL agar loading ribuan data siswa memakan waktu kurang dari 2 detik."
        }
    },
    {
        id: 3,
        title: "FinTech Mobile Interface",
        img: "assets/img/mobile.png",
        tags: ["Mobile UI", "Figma"],
        context: "Re-design aplikasi finansial untuk meningkatkan readability data dan aksesibilitas.",
        process: "User persona ➔ User flow re-mapping ➔ Pembuatan Design System.",
        linkDemo: "https://app.com",
        caseStudy: {
            hook: "<strong>Role:</strong> UI/UX Researcher & Designer<br><br><strong>Timeline:</strong> 3 Minggu<br><br><strong>Tools:</strong> Figma, FigJam, Zeplin<br><br><strong>Problem:</strong> Data portofolio saham pengguna lama terlihat bertumpuk dan tidak terbaca jelas sehingga menyebabkan salah eksekusi tombol Jual/Beli.",
            research: "<strong>User Persona:</strong> Investor ritel pemula usia 18-30 tahun yang membaca grafik di perjalanan.<br><br><strong>Competitor Analysis:</strong> Saya menganalisis 3 aplikasi broker saham Top Indonesia dan mengidentifikasi celah kurangnya hierarki tipografi pada laporan untung/rugi harian.<br><br><strong>User Flow:</strong> Buka Aplikasi ➔ Face ID ➔ Dashboard Portofolio ➔ Analisis Order.",
            design: "<strong>Wireframes:</strong> Pengurutan prioritas Visual *(Visual Hierarchy)* untuk memperbesar font total aset.<br><br><strong>Design System:</strong> Membentuk Tipografi *San Francisco* dengan rasio ukuran Emas (1.618).<br><br><strong>High-Fidelity:</strong> Implementasi Dark Mode premium dengan gradasi Hijau/Merah solid sebagai indikator profit.",
            challenge: "<strong>Tantangan:</strong> Memastikan teks grafik tetap sangat tajam tapi tetap memenuhi standar kontras kelayakan web internarional (WCAG AAA).<br><br><strong>Solusi:</strong> Saya menggunakan plugin Stark di Figma untuk memvalidasi *Color Contrast* dari warna biru tua ke setiap font abu-abu.<br><br><strong>Snippet Kode:</strong><br><pre>/* Konsep Styling */\n.text-profit { color: #10B981; font-weight: 700; }</pre>",
            result: "<strong>Fitur Utama:</strong> Dashboard Holistik yang bersih, Gestur usap (swipe) untuk langsung order Jual/Beli.<br><br><strong>Apa yang Saya Pelajari:</strong> Mendesain bukan sekadar mempercantik ruang, melainkan meminimalisir kesalahan dan mempercepat proses kerja saraf kognitif pengguna."
        }
    }
];

const defaultCaseStudyTemplate = {
    hook: "<strong>Role:</strong> <br><strong>Timeline:</strong> <br><strong>Tools:</strong> <br><strong>Problem:</strong> ",
    research: "<strong>User Persona:</strong> <br><strong>Competitor Analysis:</strong> <br><strong>User Flow:</strong> ",
    design: "<strong>Wireframes:</strong> <br><strong>Design System:</strong> <br><strong>High-Fidelity:</strong> ",
    challenge: "<strong>Tantangan:</strong> <br><strong>Solusi:</strong> <br><strong>Snippet Kode:</strong><br><pre></pre>",
    result: "<strong>Fitur Utama:</strong> <br><strong>Apa yang Saya Pelajari:</strong> "
};

document.addEventListener('DOMContentLoaded', async () => {
    await initContent();
    renderProjects();
    if(window.location.pathname.includes('project.html')) {
        renderCaseStudy();
    }

    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if(isAdmin) {
        enableEditMode();
    }
});

async function initContent() {
    let driveData = null;
    
    // 1. Coba ambil dari Google Drive jika URL sudah diisi
    if(GAS_URL !== "") {
        console.log("Mencoba mengambil data dari Google Drive...");
        try {
            // Bypass cache dengan menambahkan parameter timestamp
            const res = await fetch(GAS_URL + "?t=" + new Date().getTime(), {
                cache: 'no-store'
            });
            driveData = await res.json();
            console.log("Data berhasil diambil dari Drive:", driveData);
        } catch(e) {
            console.warn("Gagal mengambil data dari Google Drive, fallback ke LocalStorage", e);
        }
    }

    // 2. Restore standard HTML sections
    document.querySelectorAll('[data-edit-id]').forEach(el => {
        const key = el.getAttribute('data-edit-id');
        let savedContent = null;

        if (driveData && driveData[key]) {
            savedContent = driveData[key];
        } else {
            savedContent = localStorage.getItem('portfolio_' + key);
        }

        if(savedContent !== null) {
            if(el.tagName === 'IMG') {
                el.src = savedContent;
            } else {
                el.innerHTML = savedContent;
            }
        }
    });

    // 3. Load projects data - Smart Merge between Drive and Local
    let combinedProjects = [];
    const localProjsRaw = localStorage.getItem('portfolio_projects');
    let localProjects = [];
    if(localProjsRaw) {
        try { localProjects = JSON.parse(localProjsRaw); } catch(e) {}
    }

    if (driveData && driveData['projects']) {
        // Ambil data dari drive sebagai base
        combinedProjects = driveData['projects'];
        
        // Cek jika ada item di localProjects yang tidak ada di Drive (project baru gress)
        localProjects.forEach(lp => {
            if(!combinedProjects.find(dp => dp.id === lp.id)) {
                combinedProjects.push(lp);
            }
        });
    } else {
        combinedProjects = localProjects;
    }

    // Terakhir, pastikan semua data punya format case study 5-points
    combinedProjects.forEach(sp => {
        if(!sp.caseStudy || !sp.caseStudy.hook) {
            const defSource = projectsData.find(dp => dp.id === sp.id);
            if(defSource && defSource.caseStudy) {
                sp.caseStudy = defSource.caseStudy;
            } else {
                sp.caseStudy = JSON.parse(JSON.stringify(defaultCaseStudyTemplate));
            }
        }
    });

    if(combinedProjects.length > 0) {
        projectsData = combinedProjects;
    }
}

function renderProjects() {
    const container = document.getElementById('project-container');
    if(!container) return; // kalau bukan di index.html
    
    container.innerHTML = '';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    projectsData.forEach((proj, idx) => {
        let tagHtml = proj.tags.map(t => `<span class="tag" contenteditable="${isAdmin}">${t}</span>`).join('');
        
        let controlHtml = '';
        if(isAdmin) {
            controlHtml = `
            <div class="project-admin-controls" style="background:#000; display:flex; gap:10px; padding:5px;">
                <button class="btn btn-secondary btn-sm" onclick="deleteProject(${proj.id})">Hapus</button>
                <button class="btn btn-secondary btn-sm" onclick="changeProjectImage(${proj.id})">Ubah Gambar</button>
                <button class="btn btn-secondary btn-sm" onclick="changeDemoLink(${proj.id})">Ubah Link Demo</button>
            </div>
            `;
        }

        const projectCard = `
        <article class="case-study-card" data-aos="fade-up" data-aos-delay="${(idx+1)*50}" data-proj-id="${proj.id}">
            <div class="card-img" style="position:relative">
                <img src="${proj.img}" id="proj-img-${proj.id}" alt="${proj.title}">
                ${controlHtml}
                <div class="overlay" style="${isAdmin ? 'pointer-events:none; opacity:0;' : ''}">
                    <a href="${proj.linkDemo || '#'}" id="proj-demolink-${proj.id}" target="_blank" class="view-btn"><i class="fas fa-external-link-alt"></i> Lihat Demo</a>
                </div>
            </div>
            <div class="card-content">
                <div class="tags" id="proj-tags-${proj.id}">${tagHtml}</div>
                <h3 contenteditable="${isAdmin}" id="proj-title-${proj.id}">${proj.title}</h3>
                <p class="context"><strong contenteditable="${isAdmin}">Konteks:</strong> <span contenteditable="${isAdmin}" id="proj-ctx-${proj.id}">${proj.context}</span></p>
                <p class="process"><strong contenteditable="${isAdmin}">Proses:</strong> <span contenteditable="${isAdmin}" id="proj-pro-${proj.id}">${proj.process}</span></p>
                <a href="project.html?id=${proj.id}" class="read-more">Baca Case Study <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
        `;
        container.innerHTML += projectCard;
    });
}

// ============== ADMIN FUNCTIONS ==============

function enableEditMode() {
    // Show Admin Panel
    document.getElementById('admin-panel').classList.remove('hidden');
    document.getElementById('admin-add-project-container').classList.remove('hidden');

    // Make regular sections editable
    document.querySelectorAll('[data-edit-id]').forEach(el => {
        if(el.tagName !== 'IMG') {
            el.setAttribute('contenteditable', 'true');
            el.classList.add('editable-hover');
        }
    });

    // Fitur: Tambah Penanda Hapus Skill & Testimoni (Klik Ganda)
    const setDeletable = (selector) => {
        document.querySelectorAll(selector).forEach(el => {
            el.title = "Klik Ganda (Double Click) di sini untuk Menghapus item";
            el.style.cursor = "pointer";
            el.ondblclick = function(e) {
                e.stopPropagation(); // Mencegah klik menembus
                if(confirm('Yakin ingin menghapus item ini permanen?')) {
                    this.remove();
                }
            };
        });
    };
    setDeletable('.skill-item');
    setDeletable('.testimonial');

    // Fitur: Tombol Tambah Skill Baru
    const skillsCont = document.querySelector('.skills-container');
    if(skillsCont) {
        const btnSk = document.createElement('button');
        btnSk.className = "btn btn-secondary btn-sm border-dashed mt-3 mb-3 w-100";
        btnSk.innerHTML = "+ Tambah Keahlian Baru";
        btnSk.onclick = () => {
            const skill = prompt("Nama keahlian baru (Contoh: Node.JS):", "Skill Baru");
            if(!skill) return;
            const icon = prompt("Ketik Icon FontAwesome (kosongkan jika tidak hafal):", "fas fa-star") || "fas fa-star";
            const div = document.createElement('div');
            div.className = "skill-item editable-hover";
            div.innerHTML = `<i class="${icon}"></i> ${skill}`;
            skillsCont.appendChild(div);
            setDeletable('.skill-item'); // re-bind events
        };
        skillsCont.parentElement.insertBefore(btnSk, skillsCont.nextSibling);
    }

    // Fitur: Tombol Tambah Testimoni Baru
    const testiCont = document.querySelector('.testimonial-slider');
    if(testiCont) {
        const btnTs = document.createElement('button');
        btnTs.className = "btn btn-secondary btn-sm border-dashed mt-3 mb-3 w-100";
        btnTs.style.gridColumn = "1 / -1"; // merentang
        btnTs.innerHTML = "+ Tambah Testimoni Baru";
        btnTs.onclick = () => {
            const nama = prompt("Nama Klien:", "Budi");
            if(!nama) return;
            const peran = prompt("Peran/Jabatan Klien:", "Direktur Utama");
            const div = document.createElement('div');
            div.className = "testimonial glass editable-hover";
            div.innerHTML = `
                <i class="fas fa-quote-left quote-icon"></i>
                <p class="feedback" contenteditable="true">"Tulis ulasan/testimoni klien Anda di sini..."</p>
                <div class="client-info">
                    <div class="client-avatar">
                        <img src="https://i.pravatar.cc/150?u=${new Date().getTime()}" alt="${nama}">
                    </div>
                    <div>
                        <h4 contenteditable="true">${nama}</h4>
                        <span contenteditable="true">${peran || ''}</span>
                    </div>
                </div>
            `;
            testiCont.appendChild(div);
            setDeletable('.testimonial'); // re-bind events
        };
        testiCont.parentElement.insertBefore(btnTs, testiCont.nextSibling);
    }

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        window.location.reload();
    });

    // Add Project Button
    document.getElementById('add-project-btn').addEventListener('click', () => {
        const newId = new Date().getTime();
        projectsData.push({
            id: newId,
            title: "Project Judul Baru",
            img: "https://via.placeholder.com/400x300?text=Pilih+Gambar",
            tags: ["New"],
            context: "Deskripsi konteks di sini.",
            process: "Langkah-langkah di sini.",
            linkDemo: "#",
            caseStudy: JSON.parse(JSON.stringify(defaultCaseStudyTemplate))
        });
        renderProjects();
        
        // Silent Auto-Save ke Drive & Local Storage agar saat pindah ke halaman Detail, 
        // ID proyek sudah dikenali (mencegah black screen "Proyek tidak ditemukan")
        const saveBtn = document.getElementById('save-changes-btn');
        if(saveBtn) {
            // Bypass alert sementara agar tidak mengganggu UI experience
            const originalAlert = window.alert;
            window.alert = () => {}; 
            saveBtn.click();
            // Kembalikan alert setelah 1.5 detik (waktu aman Drive API POST)
            setTimeout(() => { window.alert = originalAlert; }, 1500);
        }
    });

    // Profile Image Upload (With Compression to avoid Drive/Payload limits)
    document.getElementById('profile-upload').addEventListener('change', e => {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 500;
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                document.getElementById('profile-img').src = canvas.toDataURL('image/jpeg', 0.8);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    // Save Changes
    document.getElementById('save-changes-btn').addEventListener('click', async () => {
        
        // Ganti teks tombol ke loading status
        const saveBtn = document.getElementById('save-changes-btn');
        const originalText = saveBtn.innerText;
        saveBtn.innerText = "Menyimpan...";
        saveBtn.disabled = true;

        let payloadDrive = {};

        // Save text replacements
        document.querySelectorAll('[data-edit-id]').forEach(el => {
            const key = el.getAttribute('data-edit-id');
            const dataVal = (el.tagName === 'IMG') ? el.src : el.innerHTML;
            
            // Simpan ke local storage selalu untuk jaga-jaga
            localStorage.setItem('portfolio_' + key, dataVal);
            
            // Masukkan ke Payload Google Drive
            payloadDrive[key] = dataVal;
        });

        // Save projects state
        projectsData.forEach(p => {
            const tNode = document.getElementById(`proj-title-${p.id}`);
            if(tNode) p.title = tNode.innerText;
            
            const cNode = document.getElementById(`proj-ctx-${p.id}`);
            if(cNode) p.context = cNode.innerText;
            
            const proNode = document.getElementById(`proj-pro-${p.id}`);
            if(proNode) p.process = proNode.innerText;
            
            const lNode = document.getElementById(`proj-demolink-${p.id}`);
            if(lNode) p.linkDemo = lNode.getAttribute('href'); 
            
            const imgNode = document.getElementById(`proj-img-${p.id}`);
            if(imgNode) p.img = imgNode.src;
            
            const tagsCont = document.getElementById(`proj-tags-${p.id}`);
            if(tagsCont) {
                let newTags = [];
                tagsCont.querySelectorAll('.tag').forEach(tagEl => {
                    newTags.push(tagEl.innerText);
                });
                p.tags = newTags.length > 0 ? newTags : ["Project"];
            }
        });
        
        localStorage.setItem('portfolio_projects', JSON.stringify(projectsData));
        payloadDrive['projects'] = projectsData;

        // Jika Google Drive URL diaktifkan, push kesana
        if(GAS_URL !== "") {
            try {
                // Untuk Google Apps Script POST, sangat disarankan menggunakan mode: 'no-cors'
                // Karena server Google mengembalikan Redirect (302) yang sering diblokir CORS browser
                await fetch(GAS_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Mencegah blokir CORS 
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8', 
                    },
                    body: JSON.stringify(payloadDrive)
                });
                // Karena menggunakan 'no-cors', kita tidak bisa membaca response JSON kembalian,
                // tapi asalkan tidak ada Exception, artinya proses kirim berhasil ter-trigger.
                alert("Perubahan berhasil dikirim ke Google Drive dan tersimpan!");
            } catch(e) {
                console.error("Fetch Error:", e);
                alert("Kesalahan menghubungkan ke Google Drive API. Cek Console untuk melihat log. (Pastikan link GAS_URL benar dan Web App di-deploy dengan akses 'Anyone'). Tersimpan lokal.");
            }
        } else {
            alert("Perubahan berhasil disimpan lokal! (Untuk integrasi Google Drive, masukkan Link Web App di js/cms.js)");
        }

        saveBtn.innerText = originalText;
        saveBtn.disabled = false;
    });
}

function deleteProject(id) {
    if(confirm("Yakin hapus project ini?")) {
        projectsData = projectsData.filter(p => p.id !== id);
        renderProjects();
    }
}

function changeProjectImage(id) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = event => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 500;
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const base64 = canvas.toDataURL('image/jpeg', 0.8);
                document.getElementById(`proj-img-${id}`).src = base64;
                const projDef = projectsData.find(p => p.id === id);
                if(projDef) projDef.img = base64;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function changeDemoLink(id) {
    const proj = projectsData.find(p => p.id === id);
    if(proj) {
        const newLink = prompt("Masukkan Link Demo baru (Mulai dengan http/https):", proj.linkDemo || "");
        if(newLink !== null) {
            proj.linkDemo = newLink.trim();
            document.getElementById(`proj-demolink-${id}`).href = proj.linkDemo;
        }
    }
}

// ============== CASE STUDY PAGE FUNCTIONS ==============
document.addEventListener('DOMContentLoaded', () => {
    // Only run if on project.html
    if(window.location.pathname.includes('project.html')) {
        if(localStorage.getItem('isAdmin') === 'true') {
            document.getElementById('admin-panel').classList.remove('hidden');
            
            document.getElementById('save-case-study-btn').addEventListener('click', async () => {
                const btn = document.getElementById('save-case-study-btn');
                const pId = getQueryId();
                const proj = projectsData.find(p => p.id === pId);
                
                if(proj) {
                    proj.title = document.getElementById('cs-title').innerText;
                    proj.caseStudy.hook = document.getElementById('cs-hook').innerHTML;
                    proj.caseStudy.research = document.getElementById('cs-res').innerHTML;
                    proj.caseStudy.design = document.getElementById('cs-des').innerHTML;
                    proj.caseStudy.challenge = document.getElementById('cs-chal').innerHTML;
                    proj.caseStudy.result = document.getElementById('cs-resl').innerHTML;
                    
                    localStorage.setItem('portfolio_projects', JSON.stringify(projectsData));
                    
                    btn.innerText = "Menyimpan...";
                    
                    // fetch payload
                    let payloadDrive = { projects: projectsData };
                    document.querySelectorAll('[data-edit-id]').forEach(el => {
                        const key = el.getAttribute('data-edit-id');
                        payloadDrive[key] = localStorage.getItem('portfolio_' + key);
                    });

                    if(GAS_URL !== "") {
                        try {
                            await fetch(GAS_URL, {
                                method: 'POST',
                                mode: 'no-cors',
                                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                body: JSON.stringify(payloadDrive)
                            });
                            alert("Case Study Tersimpan ke Google Drive!");
                        } catch(e) {
                            alert("Gagal konek Drive API. Tersimpan lokal.");
                        }
                    }
                    btn.innerText = "Simpan Detail";
                }
            });
        }
    }
});

function getQueryId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')); // Return ID from param ?id=
}

function renderCaseStudy() {
    const container = document.getElementById('case-study-content');
    if(!container) return;
    
    const id = getQueryId();
    const proj = projectsData.find(p => p.id === id);
    
    if(!proj) {
        container.innerHTML = `<h2 class="text-center">Proyek tidak ditemukan.</h2>`;
        return;
    }

        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if(!proj.caseStudy) proj.caseStudy = {hook:"", research:"", design:"", challenge:"", result:""};
        
        container.innerHTML = `
            <div>
                <img src="${proj.img}" style="width:100%; height:400px; object-fit:cover; border-radius:15px; margin-bottom:2rem; border:1px solid var(--border-glass);">
                <h1 class="mb-3" id="cs-title" contenteditable="${isAdmin}">${proj.title}</h1>
                <div class="tags mb-4">${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                
                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-bullseye" style="color:var(--accent-primary)"></i> 1. Judul & Ringkasan Eksekutif</h3>
                    <div id="cs-hook" class="mt-3 text-edit-block" contenteditable="${isAdmin}">${proj.caseStudy.hook || 'Belum ada data'}</div>
                </div>

                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-search" style="color:var(--accent-primary)"></i> 2. Analisis & Riset (The "Why")</h3>
                    <div id="cs-res" class="mt-3 text-edit-block" contenteditable="${isAdmin}">${proj.caseStudy.research || 'Belum ada data'}</div>
                </div>

                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-palette" style="color:var(--accent-primary)"></i> 3. Proses Desain (Visual Journey)</h3>
                    <div id="cs-des" class="mt-3 text-edit-block" contenteditable="${isAdmin}">${proj.caseStudy.design || 'Belum ada data'}</div>
                </div>

                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-dumbbell" style="color:var(--accent-primary)"></i> 4. Tantangan Teknis & Solusi</h3>
                    <div id="cs-chal" class="mt-3 text-edit-block" contenteditable="${isAdmin}">${proj.caseStudy.challenge || 'Belum ada data'}</div>
                </div>
                
                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-trophy" style="color:var(--accent-primary)"></i> 5. Hasil Akhir & Dampak</h3>
                    <div id="cs-resl" class="mt-3 text-edit-block" contenteditable="${isAdmin}">${proj.caseStudy.result || 'Belum ada data'}</div>
                </div>
                
                <div class="text-center mt-4">
                    <a href="${proj.linkDemo || '#'}" target="_blank" class="btn btn-primary btn-lg"><i class="fas fa-external-link-alt mr-2"></i> Kunjungi Demo Final</a>
                </div>
            </div>
        `;
        
        if(isAdmin) {
             container.querySelectorAll('[contenteditable="true"]').forEach(el => el.classList.add('editable-hover'));
        }
        
        // Fix AOS animation hidden element issue
        setTimeout(() => {
            if(typeof window.AOS !== 'undefined') AOS.refresh();
        }, 100);
}
