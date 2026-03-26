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
            problem: "Pengguna kesulitan menavigasi produk karena layout yang membingungkan dan alur checkout terlalu panjang.",
            research: "Berdasarkan wawancara dengan 10+ user, 80% meninggalkan keranjang belanja (cart abandonment) akibat form pembayaran tidak responsif.",
            tech: "Figma (Prototyping), React.js (Frontend), Tailwind/CSS Vanilla (Styling).",
            challenges: "Mempertahankan kecepatan loading gambar produk resolusi tinggi tanpa mengurangi kualitas UI."
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
            problem: "Sistem absensi dan rekap nilai lama masih manual menggunakan Excel, sehingga rawan error dan lambat.",
            research: "Kepala sekolah dan guru membutuhkan laporan instan berbasis dashboard grafik harian.",
            tech: "CodeIgniter 4 (PHP), MySQL Server, Vanilla JavaScript (AOS, Chart.js).",
            challenges: "Migrasi data lama sebesar 2GB ke dalam struktur database relasional yang baru dan cepat."
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
            problem: "Data portofolio saham user terlihat bertumpuk dan tidak terbaca jelas saat menggunakan mode terang (Light Mode).",
            research: "Melihat heat-map klik user, 90% mengabaikan grafik karena warna yang kontrasnya tidak masuk standar aksesibilitas.",
            tech: "Desain menggunakan Figma dengan Plugin Accessibility Stark.",
            challenges: "Membuat sistem Design Token lengkap (Glassmorphism & Neon Dark Mode) yang terstruktur dan scalable."
        }
    }
];

document.addEventListener('DOMContentLoaded', async () => {
    await initContent();
    renderProjects();

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

    // 3. Load projects data
    let savedProjects = null;
    if (driveData && driveData['projects']) {
        savedProjects = driveData['projects'];
        projectsData = savedProjects;
    } else {
        const localProjs = localStorage.getItem('portfolio_projects');
        if(localProjs) {
            try { projectsData = JSON.parse(localProjs); } 
            catch(e) { console.error("Error parsing projects"); }
        }
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
            link: "#"
        });
        renderProjects();
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
            
            const lNode = document.getElementById(`proj-link-${p.id}`);
            if(lNode) p.link = lNode.getAttribute('href'); 
            
            p.img = document.getElementById(`proj-img-${p.id}`).src;
            
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
        renderCaseStudy();
        if(localStorage.getItem('isAdmin') === 'true') {
            document.getElementById('admin-panel').classList.remove('hidden');
            
            document.getElementById('save-case-study-btn').addEventListener('click', async () => {
                const btn = document.getElementById('save-case-study-btn');
                const pId = getQueryId();
                const proj = projectsData.find(p => p.id === pId);
                
                if(proj) {
                    proj.title = document.getElementById('cs-title').innerText;
                    proj.caseStudy.problem = document.getElementById('cs-prob').innerText;
                    proj.caseStudy.research = document.getElementById('cs-res').innerText;
                    proj.caseStudy.tech = document.getElementById('cs-tech').innerText;
                    proj.caseStudy.challenges = document.getElementById('cs-chal').innerText;
                    
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
    
    // Tunggu 500ms agar data Drive termuat (karena fetch initContent() async)
    setTimeout(() => {
        const id = getQueryId();
        const proj = projectsData.find(p => p.id === id);
        
        if(!proj) {
            container.innerHTML = `<h2 class="text-center">Proyek tidak ditemukan.</h2>`;
            return;
        }

        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if(!proj.caseStudy) proj.caseStudy = {problem:"", research:"", tech:"", challenges:""};
        
        container.innerHTML = `
            <div data-aos="fade-up">
                <img src="${proj.img}" style="width:100%; height:400px; object-fit:cover; border-radius:15px; margin-bottom:2rem; border:1px solid var(--border-glass);">
                <h1 class="mb-3" id="cs-title" contenteditable="${isAdmin}">${proj.title}</h1>
                <div class="tags mb-4">${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                
                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-exclamation-triangle" style="color:var(--accent-primary)"></i> Problem Statement</h3>
                    <p id="cs-prob" class="mt-2" contenteditable="${isAdmin}">${proj.caseStudy.problem || 'Belum ada data'}</p>
                </div>

                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-search" style="color:var(--accent-primary)"></i> User Research</h3>
                    <p id="cs-res" class="mt-2" contenteditable="${isAdmin}">${proj.caseStudy.research || 'Belum ada data'}</p>
                </div>

                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-code" style="color:var(--accent-primary)"></i> Detail Teknis & Tools</h3>
                    <p id="cs-tech" class="mt-2" contenteditable="${isAdmin}">${proj.caseStudy.tech || 'Belum ada data'}</p>
                </div>

                <div class="glass" style="padding: 2rem; margin-bottom: 2rem;">
                    <h3><i class="fas fa-dumbbell" style="color:var(--accent-primary)"></i> Tantangan & Solusi</h3>
                    <p id="cs-chal" class="mt-2" contenteditable="${isAdmin}">${proj.caseStudy.challenges || 'Belum ada data'}</p>
                </div>
                
                <div class="text-center mt-4">
                    <a href="${proj.linkDemo || '#'}" target="_blank" class="btn btn-primary btn-lg"><i class="fas fa-external-link-alt mr-2"></i> Kunjungi Demo Final</a>
                </div>
            </div>
        `;
        
        if(isAdmin) {
             container.querySelectorAll('[contenteditable="true"]').forEach(el => el.classList.add('editable-hover'));
        }
    }, 500); 
}
