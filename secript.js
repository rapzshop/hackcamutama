let streamAktif = null;

window.onload = function(){
    const data = localStorage.getItem("izin_pengguna");
    if(!data){
        document.getElementById("infoPerangkat").innerText = "Tidak ada data izin. Pengguna belum menyetujui akses.";
        return;
    }
    document.getElementById("infoPerangkat").innerText = data;
};

function mintaKonfirmasi(){
    alert("Pengguna telah memberikan izin. Kamera siap diakses.");
}

async function gunakanDepan(){
    await mulaiKamera({ facingMode: "user" });
}

async function gunakanBelakang(){
    await mulaiKamera({ facingMode: { exact: "environment" }});
}

async function mulaiKamera(mode){
    try{
        if(streamAktif){
            streamAktif.getTracks().forEach(t=>t.stop());
        }
        streamAktif = await navigator.mediaDevices.getUserMedia({ video: mode });
        document.getElementById("stream").srcObject = streamAktif;
    } catch(e){
        alert("Gagal mengakses kamera: " + e);
    }
}
