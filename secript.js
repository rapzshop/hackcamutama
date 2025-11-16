let streamAktif = null;
let perangkatDipilih = null;

// Load data izin dari localStorage (harusnya disimpan oleh web pengalih)
window.onload = function(){
    const data = localStorage.getItem("izin_pengguna");
    const listBox = document.getElementById("listPerangkat");

    if(!data){
        listBox.innerHTML = "Tidak ada perangkat yang memberi izin.";
        return;
    }

    const obj = JSON.parse(data);

    // Nama perangkat otomatis baca userAgent
    const namaHP = parseDevice(obj.perangkat);

    listBox.innerHTML = `
        <div class='device-box' onclick="pilihPerangkat('${namaHP}')">
            <b>${namaHP}</b><br>
            Lokasi: ${obj.lokasi.lat}, ${obj.lokasi.lon}<br>
            Waktu izin: ${obj.waktu}
        </div>
    `;
};

function parseDevice(ua){
    // Deteksi sederhana HP berdasarkan userAgent
    if(ua.includes("Vivo") || ua.includes("vivo")) return "Vivo Series";
    if(ua.includes("Samsung") || ua.includes("SM-")) return "Samsung Galaxy";
    if(ua.includes("OPPO") || ua.includes("Oppo")) return "OPPO";
    if(ua.includes("Xiaomi") || ua.includes("Redmi")) return "Xiaomi / Redmi";
    if(ua.includes("Infinix")) return "Infinix";
    return "Perangkat Tidak Dikenal";
}

function pilihPerangkat(nama){
    perangkatDipilih = nama;
    document.getElementById("kontrolKamera").style.display = "block";
    document.getElementById("judulPerangkat").innerText = "Kamera dari: " + nama;
}

async function gunakanDepan(){ mulaiKamera({ facingMode: "user" }); }
async function gunakanBelakang(){ mulaiKamera({ facingMode: { exact: "environment" } }); }

async function mulaiKamera(mode){
    try{
        if(streamAktif){ streamAktif.getTracks().forEach(t=>t.stop()); }
        streamAktif = await navigator.mediaDevices.getUserMedia({ video: mode });
        document.getElementById("stream").srcObject = streamAktif;
    } catch(e){ alert("Akses kamera gagal: " + e); }
}
